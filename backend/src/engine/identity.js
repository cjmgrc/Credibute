/**
 * Identity resolution: turning raw commit authors into the people in a group.
 *
 * GitHub reports each commit author as { name, email, login }:
 *  - `login` is present only when GitHub could link the commit's email to an account.
 *  - Private emails arrive as noreply addresses: "12345+octocat@users.noreply.github.com"
 *    (current form) or "octocat@users.noreply.github.com" (legacy form).
 *  - Commits made with an unlinked email (e.g. "me@localhost") have no login at all.
 *
 * Rules, applied in this order. Every rule is deterministic and explainable:
 *  1. An explicit login identifies the person (case-insensitive).
 *  2. A noreply email identifies the login embedded in it.
 *  3. An email GitHub linked to exactly ONE login elsewhere in the same history belongs to that login.
 *  4. Otherwise the (lower-cased) email is its own, unverified identity.
 *  5. With no email either, the normalised name is the identity; with nothing at all, "unknown".
 *
 * We never guess that two identities are the same person from a similar name alone.
 * A matching name only produces a SUGGESTION that a human must confirm.
 *
 * Pure module: no HTTP, no GitHub client, no database.
 */

const NOREPLY = /^(?:\d+\+)?(.+)@users\.noreply\.github\.com$/

const compareStrings = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
const clean = (value) => (typeof value === 'string' && value.trim() !== '' ? value.trim() : null)
const bump = (map, value) => map.set(value, (map.get(value) ?? 0) + 1)

/** Most frequent value; ties go to the lowest string, so the answer never depends on input order. */
const mostCommon = (counts) =>
  [...counts.entries()].sort((a, b) => b[1] - a[1] || compareStrings(a[0], b[0]))[0]?.[0]

const byCommitsThenId = (a, b) => b.commits - a.commits || compareStrings(a.id, b.id)

export const normalizeEmail = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '')

/** Case-, accent- and spacing-insensitive form of a name, for comparing "María  Pérez" with "maria perez". */
export const normalizeName = (value) =>
  typeof value === 'string'
    ? value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim()
    : ''

export const isBotLogin = (login) => typeof login === 'string' && /\[bot\]$/i.test(login)

/** "12345+octocat@users.noreply.github.com" -> "octocat". Returns null for any other address. */
export function noreplyLogin(email) {
  const match = NOREPLY.exec(normalizeEmail(email))
  return match ? match[1] : null
}

function classify(author, emailToLogin) {
  const login = clean(author?.login)
  const email = normalizeEmail(author?.email)

  if (login) return { key: `login:${login.toLowerCase()}`, kind: 'login', login }

  const fromNoreply = noreplyLogin(email)
  if (fromNoreply) return { key: `login:${fromNoreply}`, kind: 'login' }

  const linked = emailToLogin.get(email)
  if (linked) return { key: `login:${linked}`, kind: 'login' }

  if (email) return { key: `email:${email}`, kind: 'email' }

  const name = normalizeName(author?.name)
  if (name) return { key: `name:${name}`, kind: 'name' }

  return { key: 'unknown', kind: 'unknown' }
}

/**
 * Groups commits by who wrote them.
 *
 * @param {Array<{ author?: { name?: string, email?: string, login?: string } | null }>} commits
 * @returns {Array<{ id: string, kind: 'login'|'email'|'name'|'unknown', username?: string,
 *   email?: string, emails: string[], name?: string, commits: number, bot: boolean }>}
 *   Sorted by commits (desc), then id, so the result is the same whatever order the commits arrive in.
 */
export function collectIdentities(commits) {
  // Pass 1: emails that GitHub itself linked to exactly one account (ambiguous ones are ignored).
  const linkedLogins = new Map()
  for (const commit of commits) {
    const login = clean(commit?.author?.login)
    const email = normalizeEmail(commit?.author?.email)
    if (!login || !email || noreplyLogin(email)) continue
    if (!linkedLogins.has(email)) linkedLogins.set(email, new Set())
    linkedLogins.get(email).add(login.toLowerCase())
  }
  const emailToLogin = new Map()
  for (const [email, logins] of linkedLogins) {
    if (logins.size === 1) emailToLogin.set(email, [...logins][0])
  }

  // Pass 2: bucket every commit.
  const groups = new Map()
  for (const commit of commits) {
    const author = commit?.author
    const { key, kind, login } = classify(author, emailToLogin)
    if (!groups.has(key)) {
      groups.set(key, { key, kind, logins: new Map(), emails: new Map(), names: new Map(), commits: 0 })
    }
    const group = groups.get(key)
    group.commits += 1
    if (login) bump(group.logins, login)
    const email = normalizeEmail(author?.email)
    if (email) bump(group.emails, email)
    const name = clean(author?.name)
    if (name) bump(group.names, name)
  }

  return [...groups.values()]
    .map((g) => {
      // Display casing comes from explicit logins; fall back to the (lower-case) key.
      const username = mostCommon(g.logins) ?? (g.kind === 'login' ? g.key.slice('login:'.length) : undefined)
      return {
        id: g.key,
        kind: g.kind,
        username,
        email: mostCommon(g.emails),
        emails: [...g.emails.keys()].sort(compareStrings),
        name: mostCommon(g.names),
        commits: g.commits,
        bot: g.kind === 'login' && isBotLogin(username),
      }
    })
    .sort(byCommitsThenId)
}

function suggestMember(identity, members) {
  const wanted = normalizeName(identity.name)
  if (!wanted) return undefined
  const matches = members.filter((m) => normalizeName(m.name) === wanted)
  return matches.length === 1 ? matches[0].id : undefined // ambiguous names are never suggested
}

/**
 * Applies a group's members and the identity->member `assignments` chosen so far.
 *
 * - Bots are set aside: they are neither members nor "unmatched" (commit 5 excludes their activity).
 * - Anything not assigned to an existing member is `unmatched`, with a `suggestedMemberId`
 *   when exactly one member has the same name. Nothing is ever assigned automatically here.
 * - An assignment that points at a member who no longer exists is ignored, so the identity
 *   resurfaces as unmatched instead of silently disappearing.
 *
 * Members with no identities are kept (a student added by hand who hasn't been matched yet).
 */
export function resolveIdentities(identities, { members = [], assignments = {} } = {}) {
  const memberIds = new Set(members.map((m) => m.id))
  const owned = new Map(members.map((m) => [m.id, []]))
  const unmatched = []
  const bots = []

  for (const identity of [...identities].sort(byCommitsThenId)) {
    if (identity.bot) {
      bots.push(identity)
      continue
    }
    const owner = Object.hasOwn(assignments, identity.id) ? assignments[identity.id] : undefined
    if (owner !== undefined && memberIds.has(owner)) {
      owned.get(owner).push(identity)
    } else {
      const suggestedMemberId = suggestMember(identity, members)
      unmatched.push(suggestedMemberId ? { ...identity, suggestedMemberId } : identity)
    }
  }

  const sum = (list) => list.reduce((total, i) => total + i.commits, 0)
  const resolved = members.map((m) => ({ ...m, identities: owned.get(m.id) }))
  const attributed = sum(resolved.flatMap((m) => m.identities))

  return {
    members: resolved,
    unmatched,
    bots,
    summary: { total: sum(identities), attributed, unmatched: sum(unmatched), bot: sum(bots) },
  }
}

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'user'

/**
 * First look at a repository: proposes one member per GitHub-verified person, busiest first, and returns
 * the `assignments` to persist. Identities without a verified login (e.g. "me@localhost") stay unmatched.
 * Afterwards the group is "curated" by the user: re-runs use resolveIdentities, and new people are NOT
 * added silently (a teacher's commit should never become a student).
 */
export function discoverMembers(identities) {
  const people = identities.filter((i) => !i.bot && i.kind === 'login').sort(byCommitsThenId)

  const used = new Set()
  const members = []
  const assignments = {}
  for (const person of people) {
    const base = `m_${slug(person.username)}`
    let id = base
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`
    used.add(id)
    members.push({ id, name: person.name ?? person.username })
    assignments[person.id] = id
  }

  return { ...resolveIdentities(identities, { members, assignments }), assignments }
}
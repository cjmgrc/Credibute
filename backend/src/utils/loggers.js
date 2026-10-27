const LEVELS = { debug: 10, info: 20, warn: 30, error: 40, silent: 100 }

const serialize = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) =>
      value instanceof Error ? [key, { name: value.name, message: value.message, stack: value.stack }] : [key, value],
    ),
  )

export function createLogger({ level = 'info', write = (line) => process.stdout.write(`${line}\n`) } = {}) {
  const threshold = LEVELS[level] ?? LEVELS.info
  const log = (name) => (msg, fields = {}) => {
    if (LEVELS[name] < threshold) return
    write(JSON.stringify({ time: new Date().toISOString(), level: name, msg, ...serialize(fields) }))
  }
  return { debug: log('debug'), info: log('info'), warn: log('warn'), error: log('error') }
}
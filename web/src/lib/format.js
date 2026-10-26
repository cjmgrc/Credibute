const lang = typeof navigator !== 'undefined' ? navigator.language : 'en';
export const pct = (n) => `${Math.round(n)}%`;
export const num = (n) => new Intl.NumberFormat(lang).format(n);
export const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('');
export const dateShort = (iso) => new Intl.DateTimeFormat(lang, { month: 'short', day: 'numeric' }).format(new Date(iso));
export const dateLong = (iso) => new Intl.DateTimeFormat(lang, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso));
export const dateTime = (iso) => new Intl.DateTimeFormat(lang, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
export const weekday = (d) => new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
export function relativeTime(iso, now = Date.now()) {
    const diff = Math.round((new Date(iso).getTime() - now) / 1000);
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
    const steps = [['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
    for (const [unit, secs] of steps)
        if (Math.abs(diff) >= secs)
            return rtf.format(Math.round(diff / secs), unit);
    return rtf.format(0, 'second');
}
export const weeksBetween = (from, to) => Math.max(1, Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 604_800_000));
export const greeting = (d = new Date()) => {
    const h = d.getHours();
    return h < 5 ? 'Good evening' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};
export const hostPath = (url) => url.replace(/^https?:\/\//, '');

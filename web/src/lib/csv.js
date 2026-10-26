/** RFC 4180 quoting, plus a guard against spreadsheet formula injection (=, +, -, @). */
const cell = (v) => {
    let s = String(v);
    if (/^[=+\-@\t\r]/.test(s))
        s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export const toCsv = (rows) => rows.map((r) => r.map(cell).join(',')).join('\r\n');
export function downloadText(filename, text, type = 'text/csv;charset=utf-8') {
    const url = URL.createObjectURL(new Blob(['\ufeff', text], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';
const TONES = ['bg-accent-soft text-accent-text', 'bg-ok-soft text-ok', 'bg-warn-soft text-warn', 'bg-bad-soft text-bad'];
const SIZES = { sm: 'size-7 text-[0.625rem]', md: 'size-9 text-[0.6875rem]', lg: 'size-12 text-sm' };
const Avatar = ({ name, tone = 0, size = 'md', square, className }) => (_jsx("span", { "aria-hidden": true, className: cn('grid shrink-0 place-items-center font-bold tracking-wide', square ? 'rounded-xl' : 'rounded-full', SIZES[size], TONES[tone % TONES.length], className), children: initials(name) }));
export default Avatar;

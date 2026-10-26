import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
const sizes = {
    sm: 'h-8 px-3 text-[0.8125rem]',
    md: 'h-10 px-4 text-[0.875rem]',
    lg: 'h-12 px-6 text-[0.9375rem]',
};
const variants = {
    primary: 'bg-accent text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(20_20_60/0.2)] hover:bg-accent-hover',
    secondary: 'border border-line bg-surface text-ink shadow-lift hover:border-line-strong',
    ghost: 'text-ink-2 hover:bg-sunken hover:text-ink',
    danger: 'bg-bad text-white hover:opacity-90',
};
export const buttonClass = (variant = 'primary', size = 'md', extra) => cn('inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold tracking-[-0.005em]', 'transition-[transform,background-color,border-color,box-shadow,color,opacity] duration-150 ease-out-strong', 'active:scale-[0.97] aria-disabled:pointer-events-none disabled:pointer-events-none disabled:opacity-45', sizes[size], variants[variant], extra);
const Button = (props) => {
    const { variant = 'primary', size = 'md', icon, trailing, className, children } = props;
    const cls = buttonClass(variant, size, className);
    const inner = (_jsxs(_Fragment, { children: [icon, children, trailing] }));
    if ('to' in props && props.to !== undefined) {
        const p = props;
        return _jsx(Link, { to: p.to, className: cls, onClick: p.onClick, children: inner });
    }
    if ('href' in props && props.href !== undefined) {
        const p = props;
        return _jsx("a", { href: p.href, target: p.target, rel: p.rel ?? (p.target === '_blank' ? 'noreferrer noopener' : undefined), className: cls, children: inner });
    }
    const { variant: _v, size: _s, icon: _i, trailing: _t, className: _c, children: _ch, type = 'button', ...rest } = props;
    return _jsx("button", { type: type, className: cls, ...rest, children: inner });
};
export default Button;

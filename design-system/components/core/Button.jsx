import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
const H = { sm: 'var(--control-h-sm)', md: 'var(--control-h-md)', lg: 'var(--control-h-lg)' };
const PX = { sm: 'var(--control-px-sm)', md: 'var(--control-px-md)', lg: 'var(--control-px-lg)' };
const FS = { sm: 'var(--text-sm)', md: 'var(--text-md)', lg: 'var(--text-lg)' };
export function Button({ variant = 'primary', size = 'md', icon, iconRight, disabled, loading, block, children, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const v = {
    primary: { bg: 'var(--sw-ink)', hbg: 'var(--sw-ink-800)', pbg: 'var(--sw-ink-950)', fg: 'var(--sw-paper)', bd: 'var(--sw-ink)' },
    accent: { bg: 'var(--accent)', hbg: 'var(--accent-hover)', pbg: 'var(--accent-press)', fg: 'var(--text-on-accent)', bd: 'var(--accent)' },
    secondary: { bg: 'transparent', hbg: 'var(--bg-sunken)', pbg: 'var(--sw-ink-100)', fg: 'var(--text-body)', bd: 'var(--border-strong)' },
    ghost: { bg: 'transparent', hbg: 'var(--bg-sunken)', pbg: 'var(--sw-ink-100)', fg: 'var(--text-body)', bd: 'transparent' },
    danger: { bg: 'var(--danger)', hbg: '#B8241F', pbg: '#8F1A16', fg: '#fff', bd: 'var(--danger)' },
  }[variant];
  const bg = press ? v.pbg : hover ? v.hbg : v.bg;
  const s = { display: block ? 'flex' : 'inline-flex', width: block ? '100%' : undefined, alignItems: 'center', justifyContent: 'center', gap: 8, height: H[size], padding: '0 ' + PX[size], font: 'var(--weight-medium) ' + FS[size] + '/1 var(--font-sans)', letterSpacing: 'var(--tracking-tight)', color: v.fg, background: bg, border: 'var(--border-w-strong) solid ' + v.bd, borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'var(--motion-hover)', whiteSpace: 'nowrap', textDecoration: 'none', boxSizing: 'border-box', ...style };
  return React.createElement('button', { type: 'button', disabled: disabled || loading, style: s, onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); }, onMouseDown: () => setPress(true), onMouseUp: () => setPress(false), ...rest },
    loading ? React.createElement('span', { style: { width: 12, height: 12, border: '1.5px solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'sw-spin .8s linear infinite' } }) : icon ? React.createElement(Icon, { name: icon, size: size === 'sm' ? 14 : 16 }) : null,
    children,
    iconRight ? React.createElement(Icon, { name: iconRight, size: size === 'sm' ? 14 : 16 }) : null);
}

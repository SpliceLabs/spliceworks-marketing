import React, { useState } from 'react';
import { Icon } from './Icon.jsx';
const H = { sm: 'var(--control-h-sm)', md: 'var(--control-h-md)', lg: 'var(--control-h-lg)' };
export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled, active, style, ...rest }) {
  const [hover, setHover] = useState(false);
  const filled = variant === 'primary';
  const s = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: H[size], height: H[size], padding: 0, color: filled ? 'var(--sw-paper)' : active ? 'var(--accent)' : 'var(--text-body)', background: filled ? (hover ? 'var(--sw-ink-800)' : 'var(--sw-ink)') : hover || active ? 'var(--bg-sunken)' : 'transparent', border: 'var(--border-w-strong) solid ' + (variant === 'secondary' ? 'var(--border-strong)' : filled ? 'var(--sw-ink)' : 'transparent'), borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, transition: 'var(--motion-hover)', boxSizing: 'border-box', ...style };
  return React.createElement('button', { type: 'button', 'aria-label': label, title: label, disabled, style: s, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), ...rest }, React.createElement(Icon, { name: icon, size: size === 'sm' ? 16 : 18 }));
}

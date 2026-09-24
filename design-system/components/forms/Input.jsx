import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
const Label = ({ children, hint, htmlFor, required }) => React.createElement('label', { htmlFor, style: { display: 'flex', justifyContent: 'space-between', font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 } }, children, required ? React.createElement('span', { style: { color: 'var(--sw-joint)' } }, ' *') : null, hint ? React.createElement('span', { style: { textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' } }, hint) : null);
export function Input({ label: lbl, hint, error, icon, size = 'md', disabled, style, id, ...rest }) {
  const [focus, setFocus] = useState(false);
  const [uid] = useState(() => id || 'in-' + Math.random().toString(36).slice(2, 7));
  const h = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  const box = { display: 'flex', alignItems: 'center', gap: 8, height: h, padding: '0 12px', background: disabled ? 'var(--bg-sunken)' : 'var(--surface-card)', border: '1px solid ' + (error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border)'), borderRadius: 'var(--radius-sm)', boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: 'var(--motion-hover)', boxSizing: 'border-box', opacity: disabled ? .6 : 1 };
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', minWidth: 0, ...style } },
    lbl ? React.createElement(Label, { htmlFor: uid, hint }, lbl) : null,
    React.createElement('div', { style: box },
      icon ? React.createElement(Icon, { name: icon, size: 16, style: { color: 'var(--text-muted)' } }) : null,
      React.createElement('input', { id: uid, disabled, onFocus: () => setFocus(true), onBlur: () => setFocus(false), style: { flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', font: 'var(--body-md)', color: 'var(--text-body)', padding: 0 }, ...rest })),
    error ? React.createElement('div', { style: { font: 'var(--body-sm)', color: 'var(--danger)', marginTop: 6 } }, error) : null);
}

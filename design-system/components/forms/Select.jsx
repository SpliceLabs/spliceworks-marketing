import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
const Label = ({ children, hint, htmlFor, required }) => React.createElement('label', { htmlFor, style: { display: 'flex', justifyContent: 'space-between', font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 6 } }, children, required ? React.createElement('span', { style: { color: 'var(--sw-joint)' } }, ' *') : null, hint ? React.createElement('span', { style: { textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' } }, hint) : null);
export function Select({ label: lbl, hint, options = [], size = 'md', disabled, style, id, ...rest }) {
  const [focus, setFocus] = useState(false);
  const [uid] = useState(() => id || 'sel-' + Math.random().toString(36).slice(2, 7));
  const h = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', minWidth: 0, ...style } },
    lbl ? React.createElement(Label, { htmlFor: uid, hint }, lbl) : null,
    React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'center' } },
      React.createElement('select', { id: uid, disabled, onFocus: () => setFocus(true), onBlur: () => setFocus(false), style: { appearance: 'none', WebkitAppearance: 'none', width: '100%', height: h, padding: '0 36px 0 12px', font: 'var(--body-md)', color: 'var(--text-body)', background: disabled ? 'var(--bg-sunken)' : 'var(--surface-card)', border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border)'), borderRadius: 'var(--radius-sm)', boxShadow: focus ? 'var(--shadow-focus)' : 'none', outline: 0, cursor: 'pointer', boxSizing: 'border-box' }, ...rest },
        options.map(o => typeof o === 'string' ? React.createElement('option', { key: o, value: o }, o) : React.createElement('option', { key: o.value, value: o.value }, o.label))),
      React.createElement(Icon, { name: 'chevron-down', size: 16, style: { position: 'absolute', right: 12, pointerEvents: 'none', color: 'var(--text-muted)' } })));
}

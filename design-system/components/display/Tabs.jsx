import React, { useState } from 'react';
export function Tabs({ items = [], value, defaultValue, onChange, size = 'md', style }) {
  const [inner, setInner] = useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const cur = value !== undefined ? value : inner;
  const [hover, setHover] = useState(null);
  return React.createElement('div', { role: 'tablist', style: { display: 'flex', gap: size === 'sm' ? 16 : 24, borderBottom: 'var(--hairline)', ...style } },
    items.map(it => { const v = it.value ?? it; const l = it.label ?? it; const on = v === cur;
      return React.createElement('button', { key: v, role: 'tab', type: 'button', 'aria-selected': on, onClick: () => { if (value === undefined) setInner(v); onChange && onChange(v); }, onMouseEnter: () => setHover(v), onMouseLeave: () => setHover(null), style: { position: 'relative', border: 0, background: 'transparent', padding: size === 'sm' ? '8px 0 10px' : '10px 0 12px', font: 'var(--weight-medium) ' + (size === 'sm' ? 'var(--text-sm)' : 'var(--text-md)') + '/1 var(--font-sans)', color: on ? 'var(--text-body)' : hover === v ? 'var(--text-secondary)' : 'var(--text-muted)', cursor: 'pointer', transition: 'var(--motion-hover)', display: 'inline-flex', gap: 8, alignItems: 'center' } },
        l, it.count !== undefined ? React.createElement('span', { style: { font: 'var(--label-sm)', color: 'var(--text-muted)' } }, it.count) : null,
        React.createElement('span', { style: { position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: on ? 'var(--sw-joint)' : 'transparent', transition: 'var(--motion-hover)' } })); }));
}

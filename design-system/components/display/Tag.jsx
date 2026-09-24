import React, { useState } from 'react';
import { Icon } from '../core/Icon.jsx';
export function Tag({ children, selected, onClick, onRemove, style }) {
  const [hover, setHover] = useState(false);
  const inter = !!(onClick || onRemove);
  return React.createElement('span', { onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 12px', borderRadius: 'var(--radius-pill)', font: 'var(--body-sm)', color: selected ? 'var(--sw-paper)' : 'var(--text-body)', background: selected ? 'var(--sw-ink)' : hover && inter ? 'var(--bg-sunken)' : 'transparent', border: '1px solid ' + (selected ? 'var(--sw-ink)' : 'var(--border)'), cursor: inter ? 'pointer' : 'default', transition: 'var(--motion-hover)', whiteSpace: 'nowrap', userSelect: 'none', ...style } },
    children,
    onRemove ? React.createElement('button', { type: 'button', 'aria-label': 'Remove', onClick: e => { e.stopPropagation(); onRemove(); }, style: { display: 'inline-flex', border: 0, background: 'transparent', color: 'inherit', padding: 0, margin: '0 -4px 0 0', cursor: 'pointer' } }, React.createElement(Icon, { name: 'x', size: 12, strokeWidth: 2 })) : null);
}

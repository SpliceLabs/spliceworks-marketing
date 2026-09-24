import React, { useState } from 'react';
export function Tooltip({ label, side = 'top', children, alwaysOpen, style }) {
  const [on, setOn] = useState(false);
  const show = on || alwaysOpen;
  const pos = { top: { bottom: '100%', left: '50%', transform: 'translate(-50%,-6px)' }, bottom: { top: '100%', left: '50%', transform: 'translate(-50%,6px)' }, left: { right: '100%', top: '50%', transform: 'translate(-6px,-50%)' }, right: { left: '100%', top: '50%', transform: 'translate(6px,-50%)' } }[side];
  return React.createElement('span', { onMouseEnter: () => setOn(true), onMouseLeave: () => setOn(false), onFocus: () => setOn(true), onBlur: () => setOn(false), style: { position: 'relative', display: 'inline-flex', ...style } }, children,
    show ? React.createElement('span', { role: 'tooltip', style: { position: 'absolute', ...pos, zIndex: 50, background: 'var(--sw-ink)', color: 'var(--sw-paper)', font: 'var(--label-sm)', letterSpacing: '.04em', padding: '6px 8px', borderRadius: 'var(--radius-xs)', whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: 'var(--shadow-sm)' } }, label) : null);
}

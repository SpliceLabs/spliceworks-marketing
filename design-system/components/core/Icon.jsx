import React from 'react';
/* Lucide glyph rendered from window.lucide (load https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js). 1.5px stroke matches the outlined W. */
export function Icon({ name, size = 18, strokeWidth = 1.5, style, ...rest }) {
  const pascal = String(name).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const L = typeof window !== 'undefined' ? window.lucide : null;
  let node = L ? (L.icons && L.icons[pascal]) || L[pascal] : null;
  // lucide UMD exposes icons either as IconNode arrays ([tag, attrs][]) or as ['svg', attrs, children]
  if (Array.isArray(node) && node.length === 3 && node[0] === 'svg' && Array.isArray(node[2])) node = node[2];
  const kids = Array.isArray(node) ? node.filter(n => Array.isArray(n) && typeof n[0] === 'string').map((n, i) => React.createElement(n[0], { key: i, ...n[1] })) : null;
  return React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, style: { flex: 'none', display: 'inline-block', verticalAlign: 'middle', ...style }, ...rest }, kids);
}

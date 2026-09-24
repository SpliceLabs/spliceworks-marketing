import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Toast({ tone = 'neutral', title, children, action, onDismiss, style }) {
  const icon = { neutral: 'info', success: 'circle-check', warning: 'triangle-alert', danger: 'octagon-alert' }[tone];
  const col = { neutral: 'var(--sw-blue-soft)', success: '#5FD3A3', warning: '#F2B94B', danger: '#FF8A85' }[tone];
  return React.createElement('div', { role: 'status', style: { display: 'flex', alignItems: 'flex-start', gap: 12, width: 360, maxWidth: '100%', padding: '12px 14px', background: 'var(--sw-ink)', color: 'var(--sw-paper)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', borderLeft: '3px solid ' + col, boxSizing: 'border-box', ...style } },
    React.createElement(Icon, { name: icon, size: 18, style: { color: col, marginTop: 1 } }),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      title ? React.createElement('div', { style: { font: 'var(--weight-semibold) var(--text-sm)/1.3 var(--font-sans)' } }, title) : null,
      children ? React.createElement('div', { style: { font: 'var(--body-sm)', color: 'var(--sw-ink-200)', marginTop: title ? 2 : 0 } }, children) : null,
      action ? React.createElement('div', { style: { marginTop: 8 } }, action) : null),
    onDismiss ? React.createElement('button', { type: 'button', 'aria-label': 'Dismiss', onClick: onDismiss, style: { border: 0, background: 'transparent', color: 'var(--sw-ink-300)', cursor: 'pointer', padding: 0, display: 'inline-flex' } }, React.createElement(Icon, { name: 'x', size: 16 })) : null);
}

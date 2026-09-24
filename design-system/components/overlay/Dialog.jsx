import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
export function Dialog({ open, title, eyebrow, children, actions, onClose, width = 480, inline, style }) {
  if (!open) return null;
  const panel = React.createElement('div', { role: 'dialog', 'aria-modal': !inline, 'aria-label': typeof title === 'string' ? title : undefined, onClick: e => e.stopPropagation(), style: { width, maxWidth: '100%', background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border)', borderTop: '3px solid var(--sw-ink)', borderRadius: 'var(--radius-md)', boxShadow: inline ? 'var(--shadow-md)' : 'var(--shadow-lg)', boxSizing: 'border-box', ...style } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '20px 24px 0' } },
      React.createElement('div', { style: { flex: 1 } },
        eyebrow ? React.createElement('div', { style: { font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 } }, eyebrow) : null,
        title ? React.createElement('h2', { style: { margin: 0, font: 'var(--heading-4)', letterSpacing: 'var(--tracking-tight)' } }, title) : null),
      onClose ? React.createElement(IconButton, { icon: 'x', label: 'Close', size: 'sm', onClick: onClose, style: { margin: '-6px -8px 0 0' } }) : null),
    React.createElement('div', { style: { padding: '16px 24px 24px', font: 'var(--body-md)', color: 'var(--text-secondary)' } }, children),
    actions ? React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '16px 24px', borderTop: 'var(--hairline)' } }, actions) : null);
  if (inline) return panel;
  return React.createElement('div', { onClick: onClose, style: { position: 'fixed', inset: 0, background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 } }, panel);
}

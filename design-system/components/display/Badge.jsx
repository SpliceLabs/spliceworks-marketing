import React from 'react';
export function Badge({ tone = 'neutral', dot, children, style }) {
  const t = { neutral: ['var(--bg-sunken)', 'var(--text-secondary)'], accent: ['var(--accent-soft)', 'var(--sw-blue-600)'], joint: ['var(--joint-soft)', 'var(--sw-joint-700)'], success: ['var(--success-soft)', '#12684A'], warning: ['var(--warning-soft)', '#7A4E08'], danger: ['var(--danger-soft)', '#8F1A16'], ink: ['var(--sw-ink)', 'var(--sw-paper)'] }[tone];
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, height: 20, padding: '0 8px', background: t[0], color: t[1], font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', borderRadius: 'var(--radius-xs)', whiteSpace: 'nowrap', ...style } },
    dot ? React.createElement('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'currentColor' } }) : null, children);
}

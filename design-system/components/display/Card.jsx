import React, { useState } from 'react';
export function Card({ eyebrow, title, meta, image, children, footer, inverse, interactive, padding = 'var(--space-6)', onClick, style }) {
  const [hover, setHover] = useState(false);
  const bg = inverse ? 'var(--sw-ink)' : 'var(--surface-card)';
  const fg = inverse ? 'var(--sw-paper)' : 'var(--text-body)';
  return React.createElement('article', { onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: { display: 'flex', flexDirection: 'column', background: bg, color: fg, border: '1px solid ' + (inverse ? 'var(--sw-ink)' : interactive && hover ? 'var(--border-strong)' : 'var(--border)'), borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: interactive ? 'pointer' : 'default', transition: 'var(--motion-hover)', boxSizing: 'border-box', ...style } },
    image ? React.createElement('div', { style: { aspectRatio: '16/9', background: inverse ? 'var(--sw-ink-800)' : 'var(--bg-sunken)', backgroundImage: typeof image === 'string' ? 'url(' + image + ')' : undefined, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid ' + (inverse ? 'var(--sw-ink-700)' : 'var(--border-subtle)') } }, typeof image === 'string' ? null : image) : null,
    React.createElement('div', { style: { padding, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 } },
      eyebrow ? React.createElement('div', { style: { font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--sw-blue-soft)' : 'var(--accent)' } }, eyebrow) : null,
      title ? React.createElement('h3', { style: { margin: 0, font: 'var(--heading-4)', letterSpacing: 'var(--tracking-tight)', textDecoration: interactive && hover ? 'underline' : 'none', textDecorationThickness: 1, textUnderlineOffset: 4 } }, title) : null,
      children ? React.createElement('div', { style: { font: 'var(--body-sm)', color: inverse ? 'var(--sw-ink-200)' : 'var(--text-secondary)', lineHeight: 1.5 } }, children) : null,
      meta ? React.createElement('div', { style: { marginTop: 'auto', paddingTop: 'var(--space-2)', font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: inverse ? 'var(--sw-ink-300)' : 'var(--text-muted)' } }, meta) : null),
    footer ? React.createElement('div', { style: { padding: '12px ' + padding, borderTop: '1px solid ' + (inverse ? 'var(--sw-ink-700)' : 'var(--border-subtle)'), display: 'flex', alignItems: 'center', gap: 8 } }, footer) : null);
}

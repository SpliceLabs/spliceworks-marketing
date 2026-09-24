import React from 'react';
export function Switch({ label, checked, defaultChecked, onChange, disabled, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInner(v => !v); onChange && onChange(!on); };
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, font: 'var(--body-md)', color: 'var(--text-body)', ...style } },
    React.createElement('button', { type: 'button', role: 'switch', 'aria-checked': on, disabled, onClick: toggle, style: { width: 36, height: 20, padding: 2, border: '1.5px solid ' + (on ? 'var(--sw-ink)' : 'var(--sw-ink-400)'), borderRadius: 'var(--radius-pill)', background: on ? 'var(--sw-ink)' : 'var(--surface-card)', cursor: 'inherit', display: 'flex', alignItems: 'center', transition: 'var(--motion-hover)', boxSizing: 'border-box' } },
      React.createElement('span', { style: { width: 13, height: 13, borderRadius: '50%', background: on ? 'var(--sw-joint)' : 'var(--sw-ink-400)', transform: on ? 'translateX(16px)' : 'translateX(0)', transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast)' } })),
    label);
}

import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function Radio({ label, description, checked, defaultChecked, onChange, disabled, name, value, style }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked !== undefined ? checked : inner;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInner(v => true); onChange && onChange(value); };
  const radio = true;
  return React.createElement('label', { style: { display: 'inline-flex', alignItems: 'flex-start', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1, font: 'var(--body-md)', color: 'var(--text-body)', ...style } },
    React.createElement('input', { type: radio ? 'radio' : 'checkbox', name, value, checked: isOn, disabled, onChange: toggle, style: { position: 'absolute', opacity: 0, width: 0, height: 0 } }),
    React.createElement('span', { 'aria-hidden': true, style: { width: 18, height: 18, flex: 'none', marginTop: 2, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: radio ? '50%' : 'var(--radius-xs)', border: '1.5px solid ' + (isOn ? 'var(--sw-ink)' : 'var(--sw-ink-400)'), background: isOn && !radio ? 'var(--sw-ink)' : 'var(--surface-card)', color: 'var(--sw-paper)', transition: 'var(--motion-hover)', boxSizing: 'border-box' } },
      isOn ? (radio ? React.createElement('span', { style: { width: 8, height: 8, borderRadius: '50%', background: 'var(--sw-joint)' } }) : React.createElement(Icon, { name: 'check', size: 12, strokeWidth: 2.5 })) : null),
    React.createElement('span', { style: { display: 'flex', flexDirection: 'column', gap: 2 } }, label, description ? React.createElement('span', { style: { font: 'var(--body-sm)', color: 'var(--text-secondary)' } }, description) : null));
}

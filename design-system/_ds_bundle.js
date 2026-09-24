/* @ds-bundle: {"format":4,"namespace":"SpliceWorksDesignSystem_f2e5fb","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tabs","sourcePath":"components/display/Tabs.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlay/Tooltip.jsx"}],"sourceHashes":{"components/core/Button.jsx":"1a764bef438f","components/core/Icon.jsx":"58a5756c2b9a","components/core/IconButton.jsx":"8c59087deea5","components/display/Badge.jsx":"febd6a7682c4","components/display/Card.jsx":"4e41c6a58d25","components/display/Tabs.jsx":"cac50761f0fc","components/display/Tag.jsx":"d961368d9827","components/forms/Checkbox.jsx":"f45c1c3c2319","components/forms/Input.jsx":"c9595de8f8d8","components/forms/Radio.jsx":"b009210b0774","components/forms/Select.jsx":"66f9eb868e40","components/forms/Switch.jsx":"a98876be5f89","components/overlay/Dialog.jsx":"89254b6d4df6","components/overlay/Toast.jsx":"de111ccd4848","components/overlay/Tooltip.jsx":"23f1bedb659d","ui_kits/editorial-site/Article.jsx":"952706593c5e","ui_kits/editorial-site/ArticleGrid.jsx":"051d26df8b51","ui_kits/editorial-site/Footer.jsx":"676c5bfa5236","ui_kits/editorial-site/Hero.jsx":"0b37f0f4e729","ui_kits/editorial-site/Nav.jsx":"f343f29850f5","ui_kits/editorial-site/Subscribe.jsx":"d7ba82a92112","ui_kits/editorial-site/app.jsx":"3bc899d41aa2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SpliceWorksDesignSystem_f2e5fb = window.SpliceWorksDesignSystem_f2e5fb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
/* Lucide glyph rendered from window.lucide (load https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js). 1.5px stroke matches the outlined W. */
function Icon({
  name,
  size = 18,
  strokeWidth = 1.5,
  style,
  ...rest
}) {
  const pascal = String(name).split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  const L = typeof window !== 'undefined' ? window.lucide : null;
  let node = L ? L.icons && L.icons[pascal] || L[pascal] : null;
  // lucide UMD exposes icons either as IconNode arrays ([tag, attrs][]) or as ['svg', attrs, children]
  if (Array.isArray(node) && node.length === 3 && node[0] === 'svg' && Array.isArray(node[2])) node = node[2];
  const kids = Array.isArray(node) ? node.filter(n => Array.isArray(n) && typeof n[0] === 'string').map((n, i) => React.createElement(n[0], {
    key: i,
    ...n[1]
  })) : null;
  return React.createElement('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    style: {
      flex: 'none',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style
    },
    ...rest
  }, kids);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const H = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)'
};
const PX = {
  sm: 'var(--control-px-sm)',
  md: 'var(--control-px-md)',
  lg: 'var(--control-px-lg)'
};
const FS = {
  sm: 'var(--text-sm)',
  md: 'var(--text-md)',
  lg: 'var(--text-lg)'
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  disabled,
  loading,
  block,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const v = {
    primary: {
      bg: 'var(--sw-ink)',
      hbg: 'var(--sw-ink-800)',
      pbg: 'var(--sw-ink-950)',
      fg: 'var(--sw-paper)',
      bd: 'var(--sw-ink)'
    },
    accent: {
      bg: 'var(--accent)',
      hbg: 'var(--accent-hover)',
      pbg: 'var(--accent-press)',
      fg: 'var(--text-on-accent)',
      bd: 'var(--accent)'
    },
    secondary: {
      bg: 'transparent',
      hbg: 'var(--bg-sunken)',
      pbg: 'var(--sw-ink-100)',
      fg: 'var(--text-body)',
      bd: 'var(--border-strong)'
    },
    ghost: {
      bg: 'transparent',
      hbg: 'var(--bg-sunken)',
      pbg: 'var(--sw-ink-100)',
      fg: 'var(--text-body)',
      bd: 'transparent'
    },
    danger: {
      bg: 'var(--danger)',
      hbg: '#B8241F',
      pbg: '#8F1A16',
      fg: '#fff',
      bd: 'var(--danger)'
    }
  }[variant];
  const bg = press ? v.pbg : hover ? v.hbg : v.bg;
  const s = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: H[size],
    padding: '0 ' + PX[size],
    font: 'var(--weight-medium) ' + FS[size] + '/1 var(--font-sans)',
    letterSpacing: 'var(--tracking-tight)',
    color: v.fg,
    background: bg,
    border: 'var(--border-w-strong) solid ' + v.bd,
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'var(--motion-hover)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    boxSizing: 'border-box',
    ...style
  };
  return React.createElement('button', {
    type: 'button',
    disabled: disabled || loading,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    ...rest
  }, loading ? React.createElement('span', {
    style: {
      width: 12,
      height: 12,
      border: '1.5px solid currentColor',
      borderRightColor: 'transparent',
      borderRadius: '50%',
      animation: 'sw-spin .8s linear infinite'
    }
  }) : icon ? React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16
  }) : null, children, iconRight ? React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: size === 'sm' ? 14 : 16
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const {
  useState
} = React;
const H = {
  sm: 'var(--control-h-sm)',
  md: 'var(--control-h-md)',
  lg: 'var(--control-h-lg)'
};
function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  disabled,
  active,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const filled = variant === 'primary';
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H[size],
    height: H[size],
    padding: 0,
    color: filled ? 'var(--sw-paper)' : active ? 'var(--accent)' : 'var(--text-body)',
    background: filled ? hover ? 'var(--sw-ink-800)' : 'var(--sw-ink)' : hover || active ? 'var(--bg-sunken)' : 'transparent',
    border: 'var(--border-w-strong) solid ' + (variant === 'secondary' ? 'var(--border-strong)' : filled ? 'var(--sw-ink)' : 'transparent'),
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'var(--motion-hover)',
    boxSizing: 'border-box',
    ...style
  };
  return React.createElement('button', {
    type: 'button',
    'aria-label': label,
    title: label,
    disabled,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    ...rest
  }, React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'sm' ? 16 : 18
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function Badge({
  tone = 'neutral',
  dot,
  children,
  style
}) {
  const t = {
    neutral: ['var(--bg-sunken)', 'var(--text-secondary)'],
    accent: ['var(--accent-soft)', 'var(--sw-blue-600)'],
    joint: ['var(--joint-soft)', 'var(--sw-joint-700)'],
    success: ['var(--success-soft)', '#12684A'],
    warning: ['var(--warning-soft)', '#7A4E08'],
    danger: ['var(--danger-soft)', '#8F1A16'],
    ink: ['var(--sw-ink)', 'var(--sw-paper)']
  }[tone];
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 20,
      padding: '0 8px',
      background: t[0],
      color: t[1],
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot ? React.createElement('span', {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
const {
  useState
} = React;
function Card({
  eyebrow,
  title,
  meta,
  image,
  children,
  footer,
  inverse,
  interactive,
  padding = 'var(--space-6)',
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  const bg = inverse ? 'var(--sw-ink)' : 'var(--surface-card)';
  const fg = inverse ? 'var(--sw-paper)' : 'var(--text-body)';
  return React.createElement('article', {
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: bg,
      color: fg,
      border: '1px solid ' + (inverse ? 'var(--sw-ink)' : interactive && hover ? 'var(--border-strong)' : 'var(--border)'),
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'var(--motion-hover)',
      boxSizing: 'border-box',
      ...style
    }
  }, image ? React.createElement('div', {
    style: {
      aspectRatio: '16/9',
      background: inverse ? 'var(--sw-ink-800)' : 'var(--bg-sunken)',
      backgroundImage: typeof image === 'string' ? 'url(' + image + ')' : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderBottom: '1px solid ' + (inverse ? 'var(--sw-ink-700)' : 'var(--border-subtle)')
    }
  }, typeof image === 'string' ? null : image) : null, React.createElement('div', {
    style: {
      padding,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      flex: 1
    }
  }, eyebrow ? React.createElement('div', {
    style: {
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--sw-blue-soft)' : 'var(--accent)'
    }
  }, eyebrow) : null, title ? React.createElement('h3', {
    style: {
      margin: 0,
      font: 'var(--heading-4)',
      letterSpacing: 'var(--tracking-tight)',
      textDecoration: interactive && hover ? 'underline' : 'none',
      textDecorationThickness: 1,
      textUnderlineOffset: 4
    }
  }, title) : null, children ? React.createElement('div', {
    style: {
      font: 'var(--body-sm)',
      color: inverse ? 'var(--sw-ink-200)' : 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, children) : null, meta ? React.createElement('div', {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-2)',
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--sw-ink-300)' : 'var(--text-muted)'
    }
  }, meta) : null), footer ? React.createElement('div', {
    style: {
      padding: '12px ' + padding,
      borderTop: '1px solid ' + (inverse ? 'var(--sw-ink-700)' : 'var(--border-subtle)'),
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  style
}) {
  const [inner, setInner] = useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const cur = value !== undefined ? value : inner;
  const [hover, setHover] = useState(null);
  return React.createElement('div', {
    role: 'tablist',
    style: {
      display: 'flex',
      gap: size === 'sm' ? 16 : 24,
      borderBottom: 'var(--hairline)',
      ...style
    }
  }, items.map(it => {
    const v = it.value ?? it;
    const l = it.label ?? it;
    const on = v === cur;
    return React.createElement('button', {
      key: v,
      role: 'tab',
      type: 'button',
      'aria-selected': on,
      onClick: () => {
        if (value === undefined) setInner(v);
        onChange && onChange(v);
      },
      onMouseEnter: () => setHover(v),
      onMouseLeave: () => setHover(null),
      style: {
        position: 'relative',
        border: 0,
        background: 'transparent',
        padding: size === 'sm' ? '8px 0 10px' : '10px 0 12px',
        font: 'var(--weight-medium) ' + (size === 'sm' ? 'var(--text-sm)' : 'var(--text-md)') + '/1 var(--font-sans)',
        color: on ? 'var(--text-body)' : hover === v ? 'var(--text-secondary)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'var(--motion-hover)',
        display: 'inline-flex',
        gap: 8,
        alignItems: 'center'
      }
    }, l, it.count !== undefined ? React.createElement('span', {
      style: {
        font: 'var(--label-sm)',
        color: 'var(--text-muted)'
      }
    }, it.count) : null, React.createElement('span', {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: on ? 'var(--sw-joint)' : 'transparent',
        transition: 'var(--motion-hover)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
const {
  useState
} = React;
function Tag({
  children,
  selected,
  onClick,
  onRemove,
  style
}) {
  const [hover, setHover] = useState(false);
  const inter = !!(onClick || onRemove);
  return React.createElement('span', {
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 12px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--body-sm)',
      color: selected ? 'var(--sw-paper)' : 'var(--text-body)',
      background: selected ? 'var(--sw-ink)' : hover && inter ? 'var(--bg-sunken)' : 'transparent',
      border: '1px solid ' + (selected ? 'var(--sw-ink)' : 'var(--border)'),
      cursor: inter ? 'pointer' : 'default',
      transition: 'var(--motion-hover)',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...style
    }
  }, children, onRemove ? React.createElement('button', {
    type: 'button',
    'aria-label': 'Remove',
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      display: 'inline-flex',
      border: 0,
      background: 'transparent',
      color: 'inherit',
      padding: 0,
      margin: '0 -4px 0 0',
      cursor: 'pointer'
    }
  }, React.createElement(__ds_scope.Icon, {
    name: 'x',
    size: 12,
    strokeWidth: 2
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  name,
  value,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(v => !v);
    onChange && onChange(!isOn);
  };
  const radio = false;
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      font: 'var(--body-md)',
      color: 'var(--text-body)',
      ...style
    }
  }, React.createElement('input', {
    type: radio ? 'radio' : 'checkbox',
    name,
    value,
    checked: isOn,
    disabled,
    onChange: toggle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), React.createElement('span', {
    'aria-hidden': true,
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      marginTop: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radio ? '50%' : 'var(--radius-xs)',
      border: '1.5px solid ' + (isOn ? 'var(--sw-ink)' : 'var(--sw-ink-400)'),
      background: isOn && !radio ? 'var(--sw-ink)' : 'var(--surface-card)',
      color: 'var(--sw-paper)',
      transition: 'var(--motion-hover)',
      boxSizing: 'border-box'
    }
  }, isOn ? radio ? React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--sw-joint)'
    }
  }) : React.createElement(__ds_scope.Icon, {
    name: 'check',
    size: 12,
    strokeWidth: 2.5
  }) : null), React.createElement('span', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label, description ? React.createElement('span', {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--text-secondary)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const {
  useState
} = React;
const Label = ({
  children,
  hint,
  htmlFor,
  required
}) => React.createElement('label', {
  htmlFor,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    font: 'var(--label-md)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    marginBottom: 6
  }
}, children, required ? React.createElement('span', {
  style: {
    color: 'var(--sw-joint)'
  }
}, ' *') : null, hint ? React.createElement('span', {
  style: {
    textTransform: 'none',
    letterSpacing: 0,
    color: 'var(--text-muted)'
  }
}, hint) : null);
function Input({
  label: lbl,
  hint,
  error,
  icon,
  size = 'md',
  disabled,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const [uid] = useState(() => id || 'in-' + Math.random().toString(36).slice(2, 7));
  const h = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  const box = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: h,
    padding: '0 12px',
    background: disabled ? 'var(--bg-sunken)' : 'var(--surface-card)',
    border: '1px solid ' + (error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border)'),
    borderRadius: 'var(--radius-sm)',
    boxShadow: focus ? 'var(--shadow-focus)' : 'none',
    transition: 'var(--motion-hover)',
    boxSizing: 'border-box',
    opacity: disabled ? .6 : 1
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, lbl ? React.createElement(Label, {
    htmlFor: uid,
    hint
  }, lbl) : null, React.createElement('div', {
    style: box
  }, icon ? React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      color: 'var(--text-muted)'
    }
  }) : null, React.createElement('input', {
    id: uid,
    disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 0,
      background: 'transparent',
      font: 'var(--body-md)',
      color: 'var(--text-body)',
      padding: 0
    },
    ...rest
  })), error ? React.createElement('div', {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--danger)',
      marginTop: 6
    }
  }, error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  name,
  value,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const isOn = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(v => true);
    onChange && onChange(value);
  };
  const radio = true;
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      font: 'var(--body-md)',
      color: 'var(--text-body)',
      ...style
    }
  }, React.createElement('input', {
    type: radio ? 'radio' : 'checkbox',
    name,
    value,
    checked: isOn,
    disabled,
    onChange: toggle,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), React.createElement('span', {
    'aria-hidden': true,
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      marginTop: 2,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radio ? '50%' : 'var(--radius-xs)',
      border: '1.5px solid ' + (isOn ? 'var(--sw-ink)' : 'var(--sw-ink-400)'),
      background: isOn && !radio ? 'var(--sw-ink)' : 'var(--surface-card)',
      color: 'var(--sw-paper)',
      transition: 'var(--motion-hover)',
      boxSizing: 'border-box'
    }
  }, isOn ? radio ? React.createElement('span', {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--sw-joint)'
    }
  }) : React.createElement(__ds_scope.Icon, {
    name: 'check',
    size: 12,
    strokeWidth: 2.5
  }) : null), React.createElement('span', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label, description ? React.createElement('span', {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--text-secondary)'
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const {
  useState
} = React;
const Label = ({
  children,
  hint,
  htmlFor,
  required
}) => React.createElement('label', {
  htmlFor,
  style: {
    display: 'flex',
    justifyContent: 'space-between',
    font: 'var(--label-md)',
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    marginBottom: 6
  }
}, children, required ? React.createElement('span', {
  style: {
    color: 'var(--sw-joint)'
  }
}, ' *') : null, hint ? React.createElement('span', {
  style: {
    textTransform: 'none',
    letterSpacing: 0,
    color: 'var(--text-muted)'
  }
}, hint) : null);
function Select({
  label: lbl,
  hint,
  options = [],
  size = 'md',
  disabled,
  style,
  id,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const [uid] = useState(() => id || 'sel-' + Math.random().toString(36).slice(2, 7));
  const h = size === 'sm' ? 'var(--control-h-sm)' : size === 'lg' ? 'var(--control-h-lg)' : 'var(--control-h-md)';
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...style
    }
  }, lbl ? React.createElement(Label, {
    htmlFor: uid,
    hint
  }, lbl) : null, React.createElement('div', {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, React.createElement('select', {
    id: uid,
    disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: h,
      padding: '0 36px 0 12px',
      font: 'var(--body-md)',
      color: 'var(--text-body)',
      background: disabled ? 'var(--bg-sunken)' : 'var(--surface-card)',
      border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border)'),
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      outline: 0,
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    ...rest
  }, options.map(o => typeof o === 'string' ? React.createElement('option', {
    key: o,
    value: o
  }, o) : React.createElement('option', {
    key: o.value,
    value: o.value
  }, o.label))), React.createElement(__ds_scope.Icon, {
    name: 'chevron-down',
    size: 16,
    style: {
      position: 'absolute',
      right: 12,
      pointerEvents: 'none',
      color: 'var(--text-muted)'
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(v => !v);
    onChange && onChange(!on);
  };
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .5 : 1,
      font: 'var(--body-md)',
      color: 'var(--text-body)',
      ...style
    }
  }, React.createElement('button', {
    type: 'button',
    role: 'switch',
    'aria-checked': on,
    disabled,
    onClick: toggle,
    style: {
      width: 36,
      height: 20,
      padding: 2,
      border: '1.5px solid ' + (on ? 'var(--sw-ink)' : 'var(--sw-ink-400)'),
      borderRadius: 'var(--radius-pill)',
      background: on ? 'var(--sw-ink)' : 'var(--surface-card)',
      cursor: 'inherit',
      display: 'flex',
      alignItems: 'center',
      transition: 'var(--motion-hover)',
      boxSizing: 'border-box'
    }
  }, React.createElement('span', {
    style: {
      width: 13,
      height: 13,
      borderRadius: '50%',
      background: on ? 'var(--sw-joint)' : 'var(--sw-ink-400)',
      transform: on ? 'translateX(16px)' : 'translateX(0)',
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  eyebrow,
  children,
  actions,
  onClose,
  width = 480,
  inline,
  style
}) {
  if (!open) return null;
  const panel = React.createElement('div', {
    role: 'dialog',
    'aria-modal': !inline,
    'aria-label': typeof title === 'string' ? title : undefined,
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: '1px solid var(--border)',
      borderTop: '3px solid var(--sw-ink)',
      borderRadius: 'var(--radius-md)',
      boxShadow: inline ? 'var(--shadow-md)' : 'var(--shadow-lg)',
      boxSizing: 'border-box',
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '20px 24px 0'
    }
  }, React.createElement('div', {
    style: {
      flex: 1
    }
  }, eyebrow ? React.createElement('div', {
    style: {
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: 8
    }
  }, eyebrow) : null, title ? React.createElement('h2', {
    style: {
      margin: 0,
      font: 'var(--heading-4)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, title) : null), onClose ? React.createElement(__ds_scope.IconButton, {
    icon: 'x',
    label: 'Close',
    size: 'sm',
    onClick: onClose,
    style: {
      margin: '-6px -8px 0 0'
    }
  }) : null), React.createElement('div', {
    style: {
      padding: '16px 24px 24px',
      font: 'var(--body-md)',
      color: 'var(--text-secondary)'
    }
  }, children), actions ? React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '16px 24px',
      borderTop: 'var(--hairline)'
    }
  }, actions) : null);
  if (inline) return panel;
  return React.createElement('div', {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      zIndex: 100
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
function Toast({
  tone = 'neutral',
  title,
  children,
  action,
  onDismiss,
  style
}) {
  const icon = {
    neutral: 'info',
    success: 'circle-check',
    warning: 'triangle-alert',
    danger: 'octagon-alert'
  }[tone];
  const col = {
    neutral: 'var(--sw-blue-soft)',
    success: '#5FD3A3',
    warning: '#F2B94B',
    danger: '#FF8A85'
  }[tone];
  return React.createElement('div', {
    role: 'status',
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 360,
      maxWidth: '100%',
      padding: '12px 14px',
      background: 'var(--sw-ink)',
      color: 'var(--sw-paper)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      borderLeft: '3px solid ' + col,
      boxSizing: 'border-box',
      ...style
    }
  }, React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    style: {
      color: col,
      marginTop: 1
    }
  }), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title ? React.createElement('div', {
    style: {
      font: 'var(--weight-semibold) var(--text-sm)/1.3 var(--font-sans)'
    }
  }, title) : null, children ? React.createElement('div', {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--sw-ink-200)',
      marginTop: title ? 2 : 0
    }
  }, children) : null, action ? React.createElement('div', {
    style: {
      marginTop: 8
    }
  }, action) : null), onDismiss ? React.createElement('button', {
    type: 'button',
    'aria-label': 'Dismiss',
    onClick: onDismiss,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--sw-ink-300)',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex'
    }
  }, React.createElement(__ds_scope.Icon, {
    name: 'x',
    size: 16
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  label,
  side = 'top',
  children,
  alwaysOpen,
  style
}) {
  const [on, setOn] = useState(false);
  const show = on || alwaysOpen;
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%,-6px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,6px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-6px,-50%)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(6px,-50%)'
    }
  }[side];
  return React.createElement('span', {
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, show ? React.createElement('span', {
    role: 'tooltip',
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 50,
      background: 'var(--sw-ink)',
      color: 'var(--sw-paper)',
      font: 'var(--label-sm)',
      letterSpacing: '.04em',
      padding: '6px 8px',
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      boxShadow: 'var(--shadow-sm)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/Article.jsx
try { (() => {
const {
  Badge,
  Tag,
  IconButton,
  Tooltip,
  Button
} = window.SpliceWorksDesignSystem_f2e5fb;
function Article({
  go
}) {
  const p = {
    margin: '0 0 var(--space-5)',
    font: 'var(--body-lg)',
    lineHeight: 'var(--leading-loose)'
  };
  return /*#__PURE__*/React.createElement("article", {
    style: {
      padding: 'var(--space-16) var(--gutter-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-md)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Field notes"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--label-md)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "6 Sep 2026 \xB7 4 min read")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 'var(--space-5) 0 var(--space-6)',
      font: 'var(--heading-1)',
      letterSpacing: 'var(--tracking-display)',
      textWrap: 'balance'
    }
  }, "Coastal wetlands after the storm"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-8)',
      font: 'var(--body-lg)',
      color: 'var(--text-secondary)'
    }
  }, "Twelve sites re-surveyed, three re-classified. What a single tidal surge did to a decade of careful boundary lines."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 'var(--space-4) 0',
      borderTop: 'var(--rule-strong)',
      borderBottom: 'var(--hairline)',
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/light/avatar-512.png",
    alt: "",
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-medium) var(--text-md)/1.2 var(--font-sans)'
    }
  }, "Splice Works field team"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, "Coastal survey unit")), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Save to library"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "bookmark",
    label: "Save",
    variant: "secondary",
    size: "sm"
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Share"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "share-2",
    label: "Share",
    variant: "secondary",
    size: "sm"
  }))), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "The first thing you notice is not what is missing but what has moved. Reed beds that sat a hundred metres from the road are now pressed against the culvert mouth, and the brackish line \u2014 the one we redraw every spring \u2014 has jumped inland by the length of two football pitches."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "We walked the twelve sites in the same order as last year, with the same tape and the same doubts. Three of them no longer fit their categories. This is not a failure of the categories; it is what categories are for."), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 'var(--space-10) 0',
      padding: '0 0 0 var(--space-6)',
      borderLeft: '3px solid var(--sw-joint)',
      font: 'var(--heading-3)',
      letterSpacing: 'var(--tracking-tight)',
      textWrap: 'balance'
    }
  }, "A boundary is a promise to look again."), /*#__PURE__*/React.createElement("p", {
    style: p
  }, "The satellite pass from the following week agrees with us on eleven sites and disagrees on one. We publish both records side by side and let the splice show."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 'var(--space-10)',
      paddingTop: 'var(--space-6)',
      borderTop: 'var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Wetlands"), /*#__PURE__*/React.createElement(Tag, null, "Coastal"), /*#__PURE__*/React.createElement(Tag, null, "Survey"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: "arrow-right",
    onClick: () => go('home')
  }, "Back to the issue"))));
}
window.Article = Article;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/Article.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/ArticleGrid.jsx
try { (() => {
const {
  Card,
  Tabs,
  Tag
} = window.SpliceWorksDesignSystem_f2e5fb;
const ARTICLES = [{
  e: 'Field notes',
  t: 'Coastal wetlands after the storm',
  m: '6 Sep 2026 · 4 min',
  b: 'Twelve sites re-surveyed, three re-classified.'
}, {
  e: 'Data',
  t: 'How we splice survey and satellite',
  m: '29 Aug 2026 · 9 min',
  b: 'A method note on joining two records that disagree.'
}, {
  e: 'Interview',
  t: 'The culvert keeper',
  m: '21 Aug 2026 · 7 min',
  b: 'Forty years of clearing one pipe by hand.'
}, {
  e: 'Report',
  t: 'Habitat index, Q3',
  m: 'PDF · 2.1 MB',
  b: 'Annual splice of survey and satellite data.',
  inv: true
}, {
  e: 'Field notes',
  t: 'Upland grasses, counted twice',
  m: '14 Aug 2026 · 3 min',
  b: 'Why the second count mattered.'
}, {
  e: 'Letter',
  t: 'On drawing lines around living things',
  m: '7 Aug 2026 · 5 min',
  b: 'From the editor.'
}];
function ArticleGrid({
  go
}) {
  const [tab, setTab] = React.useState('all');
  const [tag, setTag] = React.useState('Wetlands');
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-12) var(--gutter-lg) var(--space-16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: 'var(--heading-2)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "In this issue"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['Wetlands', 'Upland', 'Riparian', 'Urban'].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    selected: tag === t,
    onClick: () => setTag(t)
  }, t)))), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      value: 'all',
      label: 'All',
      count: 24
    }, {
      value: 'notes',
      label: 'Field notes',
      count: 9
    }, {
      value: 'data',
      label: 'Data'
    }, {
      value: 'reports',
      label: 'Reports'
    }],
    value: tab,
    onChange: setTab,
    style: {
      marginBottom: 'var(--space-8)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0,1fr))',
      gap: 'var(--space-6)'
    }
  }, ARTICLES.filter(a => tab === 'all' || tab === 'notes' && a.e === 'Field notes' || tab === 'data' && a.e === 'Data' || tab === 'reports' && a.e === 'Report').map(a => /*#__PURE__*/React.createElement(Card, {
    key: a.t,
    eyebrow: a.e,
    title: a.t,
    meta: a.m,
    inverse: a.inv,
    interactive: true,
    onClick: () => go('article'),
    image: /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        font: 'var(--label-sm)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, "Image slot 16:9")
  }, a.b))));
}
window.ArticleGrid = ArticleGrid;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/ArticleGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/Footer.jsx
try { (() => {
function Footer() {
  const col = (h, items) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--sw-ink-300)',
      marginBottom: 14
    }
  }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      display: 'block',
      color: 'var(--sw-paper)',
      textDecoration: 'none',
      font: 'var(--body-sm)',
      marginBottom: 8
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--sw-ink)',
      color: 'var(--sw-paper)',
      padding: 'var(--space-16) var(--gutter-lg) var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/dark/lockup-endorsed@2x.png",
    alt: "Splice Works \u2014 a Splice Labs company",
    style: {
      height: 64,
      margin: '-14px 0 0 -22px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--body-sm)',
      color: 'var(--sw-ink-200)',
      maxWidth: '36ch',
      margin: '8px 0 0'
    }
  }, "An editorial project about the places where habitats are joined, cut, and joined again.")), col('Read', ['Issues', 'Field notes', 'Data', 'Reports']), col('Splice Works', ['About', 'Method', 'Contributors', 'Contact']), col('Follow', ['Weekly brief', 'RSS', 'Archive'])), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 'var(--space-16)',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid var(--sw-ink-700)',
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--sw-ink-300)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Splice Works \xB7 A Splice Labs company"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--sw-joint)'
    }
  }), "Issue 04 live")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/Hero.jsx
try { (() => {
const {
  Button,
  Badge
} = window.SpliceWorksDesignSystem_f2e5fb;
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '7fr 5fr',
      gap: 'var(--gutter-lg)',
      padding: 'var(--space-16) var(--gutter-lg) var(--space-12)',
      borderBottom: 'var(--hairline)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink"
  }, "Issue 04"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--label-md)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Autumn 2026 \xB7 Habitat")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--display-2)',
      letterSpacing: 'var(--tracking-display)',
      textWrap: 'balance',
      maxWidth: '12ch'
    }
  }, "Where the wetland meets the road", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sw-joint)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--body-lg)',
      color: 'var(--text-secondary)',
      maxWidth: '48ch',
      margin: 'var(--space-6) 0 var(--space-8)'
    }
  }, "Twelve months along a single culvert, spliced from field surveys, satellite passes and the notebooks of the people who drive past it every day."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => go('article')
  }, "Read the issue"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    icon: "download"
  }, "PDF, 14 MB"))), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '4/5',
      background: 'var(--sw-ink)',
      borderRadius: 'var(--radius-md)',
      position: 'relative',
      overflow: 'hidden',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/dark/mark@2x.png",
    alt: "",
    style: {
      width: '46%',
      opacity: .9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      font: 'var(--label-sm)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--sw-blue-soft)'
    }
  }, "Cover image slot \xB7 4:5 \xB7 replace with photography")));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/Nav.jsx
try { (() => {
const {
  IconButton,
  Button
} = window.SpliceWorksDesignSystem_f2e5fb;
function Nav({
  screen,
  go,
  dark
}) {
  const link = (id, l) => /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(id);
    },
    style: {
      font: 'var(--label-md)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: screen === id ? 'var(--text-body)' : 'var(--text-secondary)',
      textDecoration: 'none',
      position: 'relative',
      paddingBottom: 4
    }
  }, l, screen === id && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 2,
      background: 'var(--sw-joint)'
    }
  }));
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      height: 64,
      padding: '0 var(--gutter-lg)',
      borderBottom: 'var(--hairline)',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `../../assets/logo/${dark ? 'dark' : 'light'}/lockup-horizontal@2x.png`,
    alt: "Splice Works",
    style: {
      height: 36,
      margin: '0 -20px'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 24,
      marginLeft: 8
    }
  }, link('home', 'Issues'), link('article', 'Field notes'), link('subscribe', 'Subscribe')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "search",
    label: "Search"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bookmark",
    label: "Library"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "primary",
    onClick: () => go('subscribe')
  }, "Subscribe")));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/Subscribe.jsx
try { (() => {
const {
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  Button,
  Dialog,
  Toast,
  Card
} = window.SpliceWorksDesignSystem_f2e5fb;
function Subscribe() {
  const [plan, setPlan] = React.useState('digital');
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = () => {
    if (!/.+@.+\..+/.test(email)) {
      setErr('Enter a valid email');
      return;
    }
    setErr('');
    setOpen(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: '5fr 7fr',
      gap: 'var(--gutter-lg)',
      padding: 'var(--space-16) var(--gutter-lg)',
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label-md)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--accent)',
      marginBottom: 'var(--space-4)'
    }
  }, "Subscribe"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--heading-1)',
      letterSpacing: 'var(--tracking-display)',
      textWrap: 'balance'
    }
  }, "Four issues a year. One brief a week."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--body-lg)',
      color: 'var(--text-secondary)',
      marginTop: 'var(--space-6)'
    }
  }, "No tracking, no partner emails. Cancel by replying to any message.")), /*#__PURE__*/React.createElement(Card, {
    padding: "var(--space-8)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    hint: "required",
    placeholder: "you@habitat.org",
    icon: "mail",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: err
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Optional"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Region",
    options: ['Coastal', 'Upland', 'Riparian', 'Urban'],
    defaultValue: "Coastal"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--label-md)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      marginBottom: 10
    }
  }, "Edition"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "plan",
    value: "digital",
    label: "Digital",
    description: "Web + PDF, \xA324 / year",
    checked: plan === 'digital',
    onChange: setPlan
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "plan",
    value: "print",
    label: "Print + digital",
    description: "Four issues posted, \xA348 / year",
    checked: plan === 'print',
    onChange: setPlan
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Weekly brief",
    description: "Every Monday, 07:00",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Dark tile in emails"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      paddingTop: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: submit,
    iconRight: "arrow-right"
  }, "Continue"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg"
  }, "Gift a subscription")))), /*#__PURE__*/React.createElement(Dialog, {
    open: open,
    onClose: () => setOpen(false),
    eyebrow: "Confirm",
    title: plan === 'print' ? 'Print + digital, £48 / year' : 'Digital, £24 / year',
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setOpen(false)
    }, "Back"), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      onClick: () => {
        setOpen(false);
        setToast(true);
        setTimeout(() => setToast(false), 4000);
      }
    }, "Confirm"))
  }, "We will send a confirmation to ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, email), ". Payment is collected after the first issue ships."), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "You are on the list",
    onDismiss: () => setToast(false)
  }, "First brief arrives Monday.")));
}
window.Subscribe = Subscribe;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/Subscribe.jsx", error: String((e && e.message) || e) }); }

// ui_kits/editorial-site/app.jsx
try { (() => {
function App() {
  const [screen, setScreen] = React.useState(localStorage.getItem('sw-kit-screen') || 'home');
  const go = s => {
    setScreen(s);
    localStorage.setItem('sw-kit-screen', s);
    window.scrollTo(0, 0);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    screen: screen,
    go: go
  }), screen === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(ArticleGrid, {
    go: go
  })), screen === 'article' && /*#__PURE__*/React.createElement(Article, {
    go: go
  }), screen === 'subscribe' && /*#__PURE__*/React.createElement(Subscribe, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/editorial-site/app.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();

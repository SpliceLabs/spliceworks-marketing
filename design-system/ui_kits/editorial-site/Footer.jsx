function Footer() {
  const col = (h, items) => <div><div style={{ font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--sw-ink-300)', marginBottom: 14 }}>{h}</div>{items.map(i => <a key={i} href="#" style={{ display: 'block', color: 'var(--sw-paper)', textDecoration: 'none', font: 'var(--body-sm)', marginBottom: 8 }}>{i}</a>)}</div>;
  return <footer style={{ background: 'var(--sw-ink)', color: 'var(--sw-paper)', padding: 'var(--space-16) var(--gutter-lg) var(--space-10)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-10)' }}>
      <div><img src="../../assets/logo/dark/lockup-endorsed@2x.png" alt="Splice Works — a Splice Labs company" style={{ height: 64, margin: '-14px 0 0 -22px' }} /><p style={{ font: 'var(--body-sm)', color: 'var(--sw-ink-200)', maxWidth: '36ch', margin: '8px 0 0' }}>An editorial project about the places where habitats are joined, cut, and joined again.</p></div>
      {col('Read', ['Issues', 'Field notes', 'Data', 'Reports'])}{col('Splice Works', ['About', 'Method', 'Contributors', 'Contact'])}{col('Follow', ['Weekly brief', 'RSS', 'Archive'])}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-16)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--sw-ink-700)', font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--sw-ink-300)' }}><span>© 2026 Splice Works · A Splice Labs company</span><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sw-joint)' }} />Issue 04 live</span></div>
  </footer>;
}
window.Footer = Footer;
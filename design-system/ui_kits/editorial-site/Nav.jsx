const { IconButton, Button } = window.SpliceWorksDesignSystem_f2e5fb;
function Nav({ screen, go, dark }) {
  const link = (id, l) => <a href="#" onClick={e => { e.preventDefault(); go(id); }} style={{ font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: screen === id ? 'var(--text-body)' : 'var(--text-secondary)', textDecoration: 'none', position: 'relative', paddingBottom: 4 }}>{l}{screen === id && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'var(--sw-joint)' }} />}</a>;
  return <header style={{ display: 'flex', alignItems: 'center', gap: 32, height: 64, padding: '0 var(--gutter-lg)', borderBottom: 'var(--hairline)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 10 }}>
    <a href="#" onClick={e => { e.preventDefault(); go('home'); }} style={{ display: 'flex', alignItems: 'center' }}><img src={`../../assets/logo/${dark ? 'dark' : 'light'}/lockup-horizontal@2x.png`} alt="Splice Works" style={{ height: 36, margin: '0 -20px' }} /></a>
    <nav style={{ display: 'flex', gap: 24, marginLeft: 8 }}>{link('home', 'Issues')}{link('article', 'Field notes')}{link('subscribe', 'Subscribe')}</nav>
    <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}><IconButton icon="search" label="Search" /><IconButton icon="bookmark" label="Library" /><Button size="sm" variant="primary" onClick={() => go('subscribe')}>Subscribe</Button></div>
  </header>;
}
window.Nav = Nav;
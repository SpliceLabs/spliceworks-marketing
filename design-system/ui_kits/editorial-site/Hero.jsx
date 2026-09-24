const { Button, Badge } = window.SpliceWorksDesignSystem_f2e5fb;
function Hero({ go }) {
  return <section style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 'var(--gutter-lg)', padding: 'var(--space-16) var(--gutter-lg) var(--space-12)', borderBottom: 'var(--hairline)', alignItems: 'end' }}>
    <div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 'var(--space-6)' }}><Badge tone="ink">Issue 04</Badge><span style={{ font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Autumn 2026 · Habitat</span></div>
      <h1 style={{ margin: 0, font: 'var(--display-2)', letterSpacing: 'var(--tracking-display)', textWrap: 'balance', maxWidth: '12ch' }}>Where the wetland meets the road<span style={{ color: 'var(--sw-joint)' }}>.</span></h1>
      <p style={{ font: 'var(--body-lg)', color: 'var(--text-secondary)', maxWidth: '48ch', margin: 'var(--space-6) 0 var(--space-8)' }}>Twelve months along a single culvert, spliced from field surveys, satellite passes and the notebooks of the people who drive past it every day.</p>
      <div style={{ display: 'flex', gap: 10 }}><Button variant="accent" size="lg" iconRight="arrow-right" onClick={() => go('article')}>Read the issue</Button><Button variant="secondary" size="lg" icon="download">PDF, 14 MB</Button></div>
    </div>
    <div style={{ aspectRatio: '4/5', background: 'var(--sw-ink)', borderRadius: 'var(--radius-md)', position: 'relative', overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
      <img src="../../assets/logo/dark/mark@2x.png" alt="" style={{ width: '46%', opacity: .9 }} />
      <span style={{ position: 'absolute', left: 16, bottom: 14, font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--sw-blue-soft)' }}>Cover image slot · 4:5 · replace with photography</span>
    </div>
  </section>;
}
window.Hero = Hero;
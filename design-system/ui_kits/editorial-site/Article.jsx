const { Badge, Tag, IconButton, Tooltip, Button } = window.SpliceWorksDesignSystem_f2e5fb;
function Article({ go }) {
  const p = { margin: '0 0 var(--space-5)', font: 'var(--body-lg)', lineHeight: 'var(--leading-loose)' };
  return <article style={{ padding: 'var(--space-16) var(--gutter-lg)' }}>
    <div style={{ maxWidth: 'var(--container-md)', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><Badge tone="accent">Field notes</Badge><span style={{ font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>6 Sep 2026 · 4 min read</span></div>
      <h1 style={{ margin: 'var(--space-5) 0 var(--space-6)', font: 'var(--heading-1)', letterSpacing: 'var(--tracking-display)', textWrap: 'balance' }}>Coastal wetlands after the storm</h1>
      <p style={{ margin: '0 0 var(--space-8)', font: 'var(--body-lg)', color: 'var(--text-secondary)' }}>Twelve sites re-surveyed, three re-classified. What a single tidal surge did to a decade of careful boundary lines.</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-4) 0', borderTop: 'var(--rule-strong)', borderBottom: 'var(--hairline)', marginBottom: 'var(--space-10)' }}>
        <img src="../../assets/logo/light/avatar-512.png" alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
        <div style={{ flex: 1 }}><div style={{ font: 'var(--weight-medium) var(--text-md)/1.2 var(--font-sans)' }}>Splice Works field team</div><div style={{ font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 3 }}>Coastal survey unit</div></div>
        <Tooltip label="Save to library"><IconButton icon="bookmark" label="Save" variant="secondary" size="sm" /></Tooltip><Tooltip label="Share"><IconButton icon="share-2" label="Share" variant="secondary" size="sm" /></Tooltip>
      </div>
      <p style={p}>The first thing you notice is not what is missing but what has moved. Reed beds that sat a hundred metres from the road are now pressed against the culvert mouth, and the brackish line — the one we redraw every spring — has jumped inland by the length of two football pitches.</p>
      <p style={p}>We walked the twelve sites in the same order as last year, with the same tape and the same doubts. Three of them no longer fit their categories. This is not a failure of the categories; it is what categories are for.</p>
      <blockquote style={{ margin: 'var(--space-10) 0', padding: '0 0 0 var(--space-6)', borderLeft: '3px solid var(--sw-joint)', font: 'var(--heading-3)', letterSpacing: 'var(--tracking-tight)', textWrap: 'balance' }}>A boundary is a promise to look again.</blockquote>
      <p style={p}>The satellite pass from the following week agrees with us on eleven sites and disagrees on one. We publish both records side by side and let the splice show.</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 'var(--space-10)', paddingTop: 'var(--space-6)', borderTop: 'var(--hairline)' }}><Tag>Wetlands</Tag><Tag>Coastal</Tag><Tag>Survey</Tag><span style={{ flex: 1 }} /><Button variant="ghost" size="sm" iconRight="arrow-right" onClick={() => go('home')}>Back to the issue</Button></div>
    </div>
  </article>;
}
window.Article = Article;
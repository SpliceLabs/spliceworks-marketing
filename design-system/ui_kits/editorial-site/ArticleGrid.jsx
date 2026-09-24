const { Card, Tabs, Tag } = window.SpliceWorksDesignSystem_f2e5fb;
const ARTICLES = [
  { e: 'Field notes', t: 'Coastal wetlands after the storm', m: '6 Sep 2026 · 4 min', b: 'Twelve sites re-surveyed, three re-classified.' },
  { e: 'Data', t: 'How we splice survey and satellite', m: '29 Aug 2026 · 9 min', b: 'A method note on joining two records that disagree.' },
  { e: 'Interview', t: 'The culvert keeper', m: '21 Aug 2026 · 7 min', b: 'Forty years of clearing one pipe by hand.' },
  { e: 'Report', t: 'Habitat index, Q3', m: 'PDF · 2.1 MB', b: 'Annual splice of survey and satellite data.', inv: true },
  { e: 'Field notes', t: 'Upland grasses, counted twice', m: '14 Aug 2026 · 3 min', b: 'Why the second count mattered.' },
  { e: 'Letter', t: 'On drawing lines around living things', m: '7 Aug 2026 · 5 min', b: 'From the editor.' },
];
function ArticleGrid({ go }) {
  const [tab, setTab] = React.useState('all');
  const [tag, setTag] = React.useState('Wetlands');
  return <section style={{ padding: 'var(--space-12) var(--gutter-lg) var(--space-16)' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 'var(--space-6)' }}>
      <h2 style={{ margin: 0, font: 'var(--heading-2)', letterSpacing: 'var(--tracking-tight)' }}>In this issue</h2>
      <div style={{ display: 'flex', gap: 8 }}>{['Wetlands', 'Upland', 'Riparian', 'Urban'].map(t => <Tag key={t} selected={tag === t} onClick={() => setTag(t)}>{t}</Tag>)}</div>
    </div>
    <Tabs items={[{ value: 'all', label: 'All', count: 24 }, { value: 'notes', label: 'Field notes', count: 9 }, { value: 'data', label: 'Data' }, { value: 'reports', label: 'Reports' }]} value={tab} onChange={setTab} style={{ marginBottom: 'var(--space-8)' }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 'var(--space-6)' }}>
      {ARTICLES.filter(a => tab === 'all' || (tab === 'notes' && a.e === 'Field notes') || (tab === 'data' && a.e === 'Data') || (tab === 'reports' && a.e === 'Report')).map(a => <Card key={a.t} eyebrow={a.e} title={a.t} meta={a.m} inverse={a.inv} interactive onClick={() => go('article')} image={<div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', font: 'var(--label-sm)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Image slot 16:9</div>}>{a.b}</Card>)}
    </div>
  </section>;
}
window.ArticleGrid = ArticleGrid;
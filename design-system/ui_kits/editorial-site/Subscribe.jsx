const { Input, Select, Checkbox, Radio, Switch, Button, Dialog, Toast, Card } = window.SpliceWorksDesignSystem_f2e5fb;
function Subscribe() {
  const [plan, setPlan] = React.useState('digital');
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = () => { if (!/.+@.+\..+/.test(email)) { setErr('Enter a valid email'); return; } setErr(''); setOpen(true); };
  return <section style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 'var(--gutter-lg)', padding: 'var(--space-16) var(--gutter-lg)', maxWidth: 'var(--container-lg)', margin: '0 auto', boxSizing: 'border-box' }}>
    <div><div style={{ font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>Subscribe</div><h1 style={{ margin: 0, font: 'var(--heading-1)', letterSpacing: 'var(--tracking-display)', textWrap: 'balance' }}>Four issues a year. One brief a week.</h1><p style={{ font: 'var(--body-lg)', color: 'var(--text-secondary)', marginTop: 'var(--space-6)' }}>No tracking, no partner emails. Cancel by replying to any message.</p></div>
    <Card padding="var(--space-8)">
      <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
        <Input label="Email" hint="required" placeholder="you@habitat.org" icon="mail" value={email} onChange={e => setEmail(e.target.value)} error={err} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}><Input label="Name" placeholder="Optional" /><Select label="Region" options={['Coastal', 'Upland', 'Riparian', 'Urban']} defaultValue="Coastal" /></div>
        <div><div style={{ font: 'var(--label-md)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 10 }}>Edition</div><div style={{ display: 'grid', gap: 10 }}><Radio name="plan" value="digital" label="Digital" description="Web + PDF, £24 / year" checked={plan === 'digital'} onChange={setPlan} /><Radio name="plan" value="print" label="Print + digital" description="Four issues posted, £48 / year" checked={plan === 'print'} onChange={setPlan} /></div></div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}><Checkbox label="Weekly brief" description="Every Monday, 07:00" defaultChecked /><Switch label="Dark tile in emails" /></div>
        <div style={{ display: 'flex', gap: 10, paddingTop: 'var(--space-2)' }}><Button variant="accent" size="lg" onClick={submit} iconRight="arrow-right">Continue</Button><Button variant="ghost" size="lg">Gift a subscription</Button></div>
      </div>
    </Card>
    <Dialog open={open} onClose={() => setOpen(false)} eyebrow="Confirm" title={plan === 'print' ? 'Print + digital, £48 / year' : 'Digital, £24 / year'} actions={<><Button variant="secondary" onClick={() => setOpen(false)}>Back</Button><Button variant="accent" onClick={() => { setOpen(false); setToast(true); setTimeout(() => setToast(false), 4000); }}>Confirm</Button></>}>We will send a confirmation to <strong style={{ color: 'var(--text-body)' }}>{email}</strong>. Payment is collected after the first issue ships.</Dialog>
    {toast && <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 50 }}><Toast tone="success" title="You are on the list" onDismiss={() => setToast(false)}>First brief arrives Monday.</Toast></div>}
  </section>;
}
window.Subscribe = Subscribe;
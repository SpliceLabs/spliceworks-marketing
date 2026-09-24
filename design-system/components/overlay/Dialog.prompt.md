Modal panel with a 3px ink top rule, mono eyebrow and right-aligned actions over a dimmed ink overlay.
```jsx
<Dialog open={open} onClose={close} eyebrow="Confirm" title="Retract this report?" actions={<><Button variant="secondary" onClick={close}>Keep</Button><Button variant="danger">Retract</Button></>}>This removes it from the public index.</Dialog>
```
Props: open, title, eyebrow, actions, onClose, width, inline.

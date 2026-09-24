Rectangular 3px-radius button; use `primary` (ink) for defaults, `accent` (blue) once per view, `secondary` outlined for the alternative, `ghost` inside toolbars.
```jsx
<Button variant="accent" iconRight="arrow-right">Read the issue</Button>
<Button variant="secondary" size="sm">Cancel</Button>
```
Props: variant, size (sm/md/lg), icon / iconRight (lucide names), loading, block, disabled. Hover darkens one step; press darkens two; no scale.

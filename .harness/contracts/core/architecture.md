# Architecture contract

- Record framework, rendering, data, trust, package, and deployment boundaries.
- Domain logic does not depend on UI frameworks.
- Vendor SDKs sit behind adapters.
- Untrusted input is validated at runtime.
- Secrets and privileged operations remain server-side.
- Rendering and caching are chosen per route.

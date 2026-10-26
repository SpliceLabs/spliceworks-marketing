This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Site copy (v5)

All page copy comes from the v5 copy package, vendored unchanged in `content/v5/pages/` (one markdown file per URL). Pages parse these files at build time (`src/lib/copy/`), so the copy on the site is the copy in the files. Don't retype copy into components: edit the markdown.

- **Metadata:** each page's `<title>` and description come from its file's front matter. The other front-matter fields (reader, job, sources, open) are not rendered.
- **FAQ:** `content/v5/pages/faq.md` is the one FAQ source. `/faq` and every landing-page FAQ block render from it by id. The build fails if a landing page's copy of an answer stops matching `/faq` word for word.
- **Machine-readable:** `/llms.txt`, `/llms-full.txt` and `/capabilities.json` are generated from the same files.

### Placeholders (`[TBD …]`)

Unconfirmed copy is written `[TBD: …, #3]` in the markdown and renders as a visible `<Tbd>` marker showing the tracker id (`src/components/copy/Tbd.tsx`).

- `pnpm check:tbd` lists every remaining placeholder and exits 1 if there are any.
- `pnpm build` runs the same check first and **refuses to build** while any placeholder remains.
- Preview builds: `ALLOW_TBD=1 pnpm build`. Vercel preview deployments (`VERCEL_ENV=preview`) are allowed automatically. Production deployments refuse placeholders (`ALLOW_IN_PRODUCTION` is `false` in `scripts/check-tbd.mjs`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

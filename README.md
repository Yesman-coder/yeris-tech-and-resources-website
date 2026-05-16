# Yeris Tech & Resources LLC — Portfolio Site

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=yeristech@gmail.com
```

- `RESEND_API_KEY` — get from [resend.com/api-keys](https://resend.com/api-keys)
- `CONTACT_TO_EMAIL` — email address that receives contact form submissions

## Updating the project list

All project data lives in `lib/projects.ts`. Edit the `projects` array to update titles, taglines, URLs, or any other fields. The homepage, work index, and all case study pages read from this file automatically.

## Adding a new case study

1. Add a new entry to the `projects` array in `lib/projects.ts` with a unique `slug`.
2. The case study page at `/work/[slug]` is generated automatically via `generateStaticParams`.
3. To feature it on the homepage, set `featured: true` (remove another project's `featured: true` to keep the count at 4).

## Verifying the Resend domain (required for contact form in production)

The contact form sends email *from* `hello@yeristech.com` via Resend. You must verify `yeristech.com` in Resend before emails will deliver.

1. Go to [resend.com/domains](https://resend.com/domains) → Add Domain → enter `yeristech.com`.
2. Add the DNS records Resend provides to your domain registrar:
   - **SPF**: `TXT` record on `@` — value like `v=spf1 include:amazonses.com ~all`
   - **DKIM**: `TXT` record on `resend._domainkey` — long public key value provided by Resend
   - **DMARC**: `TXT` record on `_dmarc` — value like `v=DMARC1; p=none;`
3. Click "Verify" in Resend. DNS propagation can take up to 48 hours.
4. Once verified, `from: "Yeris Site <hello@yeristech.com>"` in `app/api/contact/route.ts` will work.

> Until verified, the contact form will fail in production with a Resend sender error.

## Deployment

Deployed on Vercel under team `yesman-utreras-projects-1da044ff`.

```bash
vercel link   # select the team and project
vercel --prod # deploy to production
```

After first deploy, add env vars in Vercel dashboard → Settings → Environment Variables:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

## Swapping the logo

Drop `logo.svg` into `/public/` and update the wordmark in `components/site-nav.tsx` and `components/site-footer.tsx`.

## Adding a portrait photo

Place photo at `public/yesman-portrait.jpg` and replace the gradient placeholder in `app/page.tsx` and `app/about/page.tsx` with an `<Image>` component.

## TODO (post-launch)

- [ ] Rewrite `app/about/page.tsx` body paragraphs with your real story
- [ ] Review and tighten taglines/summaries in `lib/projects.ts`
- [ ] Fill in `outcome` field for projects where you have measurable results
- [ ] Add real LinkedIn and GitHub URLs in `components/site-footer.tsx`
- [ ] Add phone number to `app/contact/page.tsx` if desired
- [ ] Add portrait photo at `public/yesman-portrait.jpg`
- [ ] Verify Resend domain for contact form email delivery

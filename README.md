# Himmat Al-Madinah | همة المدينة

منصة عقارية عربية/إنجليزية للتقييم الإرشادي، حاسبة التمويل، المقارنات السوقية، رفع صور العقار، وتوليد العقود الخادمي.

## Current structure

- `client/` — React frontend with RTL/LTR support and the responsive mobile navigation.
- `server/` — Express, tRPC, validation, storage metadata, valuation engine, vision seam, and contract generation.
- `server/contracts/` — Nine-page residential and commercial PDF templates, Arabic font, generators, and tests.
- `shared/` — Shared image validation and upload processing helpers.
- `legacy-contracts/` — Previously uploaded static editors and PDFs retained for reference only.

## Run locally

Install Node.js and pnpm, then run:

```bash
pnpm install
pnpm check
pnpm test
pnpm dev
```

The application needs server-side environment variables for database, authentication, and storage. Do not commit `.env` files or secrets.

## Hosting note

This is a full-stack Node.js application. GitHub Pages only serves static files and cannot run the Express/tRPC server, database, authentication, or S3-compatible storage. The old GitHub Pages URL may therefore show a 404 after the repository is reorganized. Use the Manus project hosting or another Node-compatible host for the complete platform.

المعايرة النهائية لقوالب العقود ما زالت مرتبطة باستلام ملفات PDF الأصلية النظيفة من دون بيانات نموذجية أو علامة مائية مضمّنة.

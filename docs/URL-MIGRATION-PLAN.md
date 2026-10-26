# Plan: move to extensionless URLs with redirects

Status: PLAN ONLY. Nothing has been changed. Needs owner approval before any step runs.

## Why
- Current: https://www.toolkitlab.xyz/tools/merge-pdf.html
- Target: https://www.toolkitlab.xyz/tools/merge-pdf
- Cleaner addresses are easier to read and share, which helps non-technical visitors.

## Risks
- Every indexed page changes address. Search engines must re-crawl and re-index about 120 pages.
- Ranking can dip for a few weeks during the change, even with correct redirects.
- Missed links break. The site has about 544 `.html` links in about 123 source files, plus canonical tags, the sitemap, `llms.txt`, and links from other websites.

## Steps (each one reversible)
1. **Check the redirect setup on a preview.** Turn on `cleanUrls: true` in `vercel.json` on a branch. Vercel then serves `/tools/merge-pdf` and redirects `/tools/merge-pdf.html` to it.
2. **Update the links in source.** Replace `.html` in internal links, canonical tags, the schema `url` fields, `llms.txt`, and the palette data. Use one script and check the result with the link checker.
3. **Keep the sitemap in step.** Generate the sitemap with extensionless URLs. Keep `sitemap-index.xml` as the entry point.
4. **Test the preview.** Check that every old `.html` address redirects (308) to the new address, every new address returns 200, and the link checker finds no broken links.
5. **Deploy to production** in a single release.
6. **Submit the new sitemap** in Search Console and Bing Webmaster Tools, then watch the Pages report.
7. **Keep the old redirects permanently.** Do not remove them, so existing links keep working.

## Rollback
- Revert the single release commit on `main`. Vercel redeploys the previous version within minutes.

## What the owner needs to decide
- Approve the move, with the understanding that rankings may dip for a few weeks.
- Confirm that a short period of monitoring in Search Console is acceptable.

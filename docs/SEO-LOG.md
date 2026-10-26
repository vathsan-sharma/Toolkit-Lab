# Toolkit Lab: SEO and growth log

Single source of truth for what is done, what is in progress, and what is next.
Update this file in every commit that changes SEO, tools or guides.

Status key: [x] done, [~] in progress, [ ] not started, [!] blocked on the owner

## Phase 1: Technical SEO
- [x] sitemap generated at build (@astrojs/sitemap 3.7.4): sitemap-index.xml, 54 URLs
- [x] robots.txt pointing to the sitemap
- [x] JSON-LD: WebSite and Organization on every page, SoftwareApplication on tool pages, Article on guides, FAQPage on the home page. BreadcrumbList on tool and guide pages.
- [x] llms.txt (AI search engines and GEO), lists all tools and policy pages
- [x] Open Graph and Twitter image (public/og-image.png, 1200x630), tagged on every page
- [ ] Google Search Console property verified [!] owner action
- [ ] Bing Webmaster Tools property verified [!] owner action

## Phase 2: Keyword research
- [~] Question and search topics: web search only. Semrush returned "no API units" (owner must allocate units). Answer The Public not connected.
- [x] Topics per guide (from question research on PDF merge, image compression, video to MP3 and image resizing)
- [x] Shortlist of new tools from research: image resizer with target size, image converter, age calculator

## Phase 3: New tools
- [x] Image Resizer (target file size in KB, aspect ratio lock)
- [x] Text Diff Checker (line-by-line comparison)
- [x] Discount Calculator (sale price, saving, tax)
- [x] Image Converter (JPG, PNG, WebP)
- [x] Age Calculator
Total tools: 28 (earlier phase)

## Phase 4: New guides
- [x] How to Resize an Image to a Specific File Size
- [x] How to Convert JPG to WebP (and Back)
- [x] Is It Safe to Merge PDF Files Online?
- [x] How to Convert Video to MP3 (Safely and Legally)
- [x] How to Calculate Your Exact Age in Years, Months and Days
- [x] Lossy vs Lossless Compression: What Changes in Your Images
- [x] How to Compare Two Texts for Differences
- [x] How to Calculate a Discount and Sale Price
Total guides: 25

## Phase 5: Checks and release
- [ ] Build passes, static checks pass, every page loads, no broken links
- [ ] Pushed to main, Vercel deployed, live check done

## Decisions
- Guides and tools must answer a real question accurately. No thin pages: each guide needs its own worked example or steps.
- New tools only where they can run in the browser without a server. Anything that needs a server or an upload is out.
- Ad density stays within the limits agreed with the owner (two in-content slots plus side rails).

## Log
- Created this log.
- Semrush keyword research blocked: account has no API units. Owner must allocate units to continue.
- Built and tested Image Resizer, Image Converter and Age Calculator in the browser (age result checked by hand).
- Added sitemap, robots.txt, llms.txt, structured data, favicon.svg, canonical domain set to www.
- Added six guides and listed them on the guides index and in search.

## Phase 6: More tools and guides
- [x] Tip Calculator (in Calculators)
- [x] Random Number Generator (no-repeat option)
- [x] URL Encoder and Decoder
- [x] Compound Interest Calculator (in Calculators)
- [x] What Is URL Encoding (Percent-Encoding)?
- [x] How Compound Interest Works, With a Worked Example
- [x] How to Split a Bill Fairly, Including the Tip
Total tools: 32. Total guides: 28.

## Phase 7: More tools and guides
- [x] SIP Calculator (in Calculators)
- [x] GST Calculator (in Calculators)
- [x] Unix Timestamp Converter (in Text and developer tools)
- [x] URL Slug Generator (in Text and developer tools)
- [x] How a SIP (Monthly Investment Plan) Works
- [x] How GST Is Calculated: Adding and Removing Tax
- [x] What Is a Unix Timestamp? Epoch Time Explained
Total tools: 36. Total guides: 31.

## Log (continued)
- Added BreadcrumbList data, the og:image, two tools and two guides. Tested both tools in the browser.

## Next (not started)
- More guides, one per tool question, with a worked example each
- Keyword research again when Semrush units are available
- Owner: submit sitemap in Google Search Console and Bing Webmaster Tools; verify both properties
- Owner: ask for AdSense review status once traffic starts

## Phase 8: More tools and guides
- [x] Roman Numeral Converter (in Text and developer tools)
- [x] Image to Base64 (in Images and media)
- [x] Regex Tester (in Text and developer tools)
- [x] Typing Speed Test (in Text and developer tools)
- [x] How Roman Numerals Work
- [x] What Is a Regular Expression? A Beginner Guide
- [x] How to Measure Your Typing Speed and Accuracy
Total tools: 40. Total guides: 34.
Bugs found by browser tests and fixed: regex default pattern had doubled backslashes; typing test allowed pasting.

## Owner actions
- [x] Google Search Console: TXT verification record added in Vercel DNS (checked live via 8.8.8.8 and 1.1.1.1). Sitemap submitted (owner confirmed).
- [~] Bing Webmaster Tools: owner says added. Confirm the property is verified and the sitemap is submitted.
- [ ] Check Search Console Pages report in about a week, and fix any errors listed.

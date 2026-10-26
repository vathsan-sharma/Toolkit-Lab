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

## Phase 9: Category landing pages
- [x] /pdf-tools.html, /image-tools.html, /calculators.html, /text-and-developer-tools.html, each with a unique intro, tool grid and questions
- [x] Linked from the home page section headings, search and llms.txt. Included in the sitemap automatically.
- [ ] Check Search Console in about a week for these pages.

## Phase 10: More tools and guides
- [x] Fraction Calculator, Speed Distance Time Calculator, Salary to Hourly Pay Converter (Calculators)
- [x] How to Add and Subtract Fractions, How Speed Distance and Time Are Related, How to Convert a Salary to an Hourly Rate
- [x] Fixed: three text tools were placed in the Images section on the home page; moved to Text and developer tools
- [x] Fixed: section counts on the home page and the Calculators category page
Total tools: 46. Total guides: 40. Category pages: 4.

## Phase 11: More tools and guides
- [x] Time Duration Calculator, Number Base Converter, Simple Interest Calculator
- [x] How to Calculate the Time Between Two Times, Binary Decimal and Hexadecimal Explained, Simple vs Compound Interest
- [x] Fixed a worked example in the time guide (22:00 to 06:00 is 8 hours)
Total tools: 49. Total guides: 43.

## Phase 12: More tools and guides
- [x] Running Pace Calculator, Remove Duplicate Lines, Dice Roller
- [x] How to Calculate Running Pace, How to Remove Duplicate Lines from a List, Are Dice Rolls Really Random?
Total tools: 52. Total guides: 46.

## Phase 13: More tools and guides
- [x] Mean Median and Mode Calculator, Fuel Economy Converter, Text to Speech
- [x] Mean Median and Mode Explained, How to Convert MPG to Litres per 100 km, How Text to Speech Works in Your Browser
- [x] Fixed a wrong claim in the fuel guide (both 8 to 7 and 12 to 11 save one litre per 100 km)
Total tools: 55. Total guides: 49.

## Phase 14: More tools and guides
- [x] Colour Contrast Checker, Data Size Converter, Download Time Calculator
- [x] What Is Colour Contrast, Bits vs Bytes, How to Estimate How Long a Download Takes
Total tools: 58. Total guides: 52.

## Phase 15: Tool quality pass (client view)
- [x] Audited all 58 tools at phone width: labels, empty results, overflow, JavaScript errors
- [x] BMI updates as you type (was button-only); labels added to unit selects and lorem output
- [x] Shared phone rules: inline form columns stack, result figures fit
- [x] Every tool has a "How to use" line under its introduction
- [x] Re-check: all 58 tools load with no JavaScript errors

## Phase 16: Guide quality pass
- [x] Measured all 52 guides: 333 to 513 words each, none below 300
- [x] Added a Related guides section (up to three guides on the same topic) to all 52 guides, linking them together
- [x] Desktop tool pass: fixed overflow, date fields and result sizing

## Phase 17: Deeper guides
- [x] All 52 guides have a Worked example with numbers checked by hand, and three FAQs
- [x] FAQPage structured data on every guide (validated, 260 blocks across the site)
- [ ] Owner: spot-check the worked examples against your own figures before publishing widely

## Phase 18: Shared tool actions
- [x] Reset button on every tool with inputs (restores starting values; skipped on tools with a file picker)
- [x] Copy results button on every tool with a results panel
- [x] Result areas announce changes to screen readers (aria-live)

## Phase 19: Plain language for non-technical visitors
- [x] Audience: US, UK and European adults who are not confident with technology
- [x] Larger text and controls; money in the visitor's currency
- [x] Sales Tax and VAT Calculator replaces GST (redirect from the old address)
- [x] Plainer names for 16 technical tools and 11 guide titles. Web addresses unchanged for search.
- [x] Rewrote the opening paragraph of 13 technical guides in plainer English
- [x] Rewrote the body of 13 technical guides in plain English, keeping their examples and FAQs
- [ ] Owner: check the plain-English guides read naturally to a non-technical reader
- [ ] Edge-case test of calculators with empty, zero, negative and very large numbers (not finished)

## Phase 20: Plainer worked examples and FAQs
- [x] Worked examples and FAQs rewritten in plain English for the 13 technical guides, with the same numbers
- [x] FAQ structured data regenerated to match the new wording (all blocks validated)

## Phase 21: Plain language across the site
- [x] Scanned visible text for technical terms (counts recorded above)
- [x] Rewrote 11 tool introductions in plain words
- [x] Added a Plain-English Glossary page (22 terms), linked from the footer and search
- [ ] Remaining: label text such as "HEX" and "bits" on the tools themselves, and the guides not yet rewritten (explained in the glossary)

## Phase 22: Plainer labels and remaining guides
- [x] 28 tool labels and options renamed to plainer words (for example "Base 16 (hex)" with the plain word first, "Strength score (bits)")
- [x] Loan guide now says "monthly payment" in place of EMI, and the JSON guide has a plainer title
- [ ] Remaining: many guide bodies still use technical words such as bits, JSON and Base64 (they are the subject, and are explained in each guide)

## Phase 23: SEO checklist (audit and fixes)
- [x] Noindex: none found on any of 120 pages
- [x] Canonical tags: present on every page (www domain)
- [x] Titles: all within about 60 characters; short titles lengthened on 7 pages
- [x] Descriptions: five outside the recommended length rewritten; no empty descriptions
- [x] One H1 per page: all pages pass
- [x] Heading order: no skipped levels on any page (category and guide index pages fixed)
- [x] Image alt text: every image has alt text
- [x] Schema markup: WebSite, Organization, SoftwareApplication, Article, BreadcrumbList and FAQPage in place
- [x] Internal links: 51 tool pages link to their matching guide
- [x] Broken links: none (one false alarm inside script text, checked)
- [x] robots.txt points to the sitemap; /sitemap.xml redirects to /sitemap-index.xml
- [x] HTTPS: HSTS, nosniff and referrer headers added in vercel.json (Vercel already serves HTTPS)
- [x] Social image: 1200 x 630 PNG, 63 KB, tagged on every page
- [x] Backlink plan written in docs/BACKLINKS.md
- [ ] URL slugs: kept as they are (already short, lowercase, hyphenated). Changing to extensionless URLs would move every indexed page, so it is not done. Decide later with the owner.
- [ ] Core Web Vitals: not measured with a speed tool in this session. Page weight is small and scripts are deferred; measure with PageSpeed Insights after deployment.
- [ ] Compress images: only one image (the social image, 63 KB). Nothing else to compress.
- [ ] Owner: verify the Search Console property and submit the sitemap; confirm the site is verified in Bing Webmaster Tools.

## Phase 24: URL migration (planned, not started)
- [~] Running on branch clean-urls (preview only, not merged). Plan in docs/URL-MIGRATION-PLAN.md
- [x] Internal links, canonicals, schema, llms.txt, palette and sitemap use clean addresses
- [x] cleanUrls on; old .html addresses redirect (Vercel) and the old guides and GST addresses have explicit redirects

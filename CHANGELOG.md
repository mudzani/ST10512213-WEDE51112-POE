# Changelog

All notable changes to this project are documented here, in the order they were made.

## Part 1 — Building the Foundation

 Drafted two website project proposals (Paw Haven Animal Rescue; Kelder & Vine) for
  lecturer approval.
- Created low-fidelity wireframes for both proposed organisations (5 pages each).
- Selected Paw Haven Animal Rescue as the organisation for the full POE.
- Created the sitemap for the selected organisation.
- Set up the project folder structure (root HTML files, css/, js/, images/).
- Built the HTML foundation for all 5 required pages (index, about, adopt, enquiry,
  contact) using semantic HTML5 elements and a consistent header/nav/footer.
- Added a logo and  illustrations (main shelter, weekend venue).
- Added real photographs for the four adoptable animals and the homepage hero image.
- Adjusted image dimensions across pages for visual consistency.
- Refactored code structure for readability.
- Added README and CHANGELOG files, and documented content sourcing.
- Added the GitHub repository link to the project documentation.

## Fixes applied after review

- Corrected three broken image references caused by a filename case mismatch
  (`whiskers.jpg`/`nala.jpg`/`max.jpg` → `Whiskers.jpg`/`Nala.jpg`/`Max.jpg`), which
  would have failed to load on case-sensitive hosting such as GitHub Pages.
- Fixed a missing space between HTML attributes (e.g. `alt="..."width="..."`) across
  all five pages, which was invalid HTML.
- Fixed a Windows-style backslash in an image path on the homepage.
- Reformatted the domain-pricing citation back to full Harvard style.

## Part 1 Official Feedback Response

Official Part 1 feedback was received (Formative 1 Part 1, WEDE5020). The following
corrections address every criterion :

- **Website Structure and Planning (Sitemap) .** The sitemap image existed
   **Fix:** added a new,
  properly headed "Website Structure and Planning: Sitemap" section (Heading 2) directly
  after the two proposals, containing the sitemap image and its caption on its own.
- **Comments .** `about.html`  **Fix:** added meaningful comments to `about.html` explaining the
  Our Story, Mission/Vision, and Team sections, matching the density and purpose of the
  comments already present on the other four pages.
- **Budget  a second, deeper fix.**  **Fix:** added both, with real researched South
  African market rates (freelance 5-page site build: R7,000-R25,000; maintenance
  retainer: R2,000-R12,000/month; Sharma, 2026)
- **References and wireframe captions  a second real regression found and fixed.** An
  earlier fix session corrected the domain citation and wireframe attribution, All 10
  wireframe captions read "[Personal drawing]" here, and the reference list still
  credited "Microsoft Word (created the wireframes) & drawio.com" .

- **README .** Expanded with a full Part 2 section, corrected file-structure
  block, and resolved internal 
- **References  .** The domain-pricing citation was reformatted to full
  Harvard style (it had regressed to a bare link), and the wireframe citation was
  corrected .



- Created `css/style.css` and linked it from all 5 HTML pages.
- Added a CSS reset and base site-wide styles (font, colours, box-sizing).
- Styled typography (heading font, body font, sizes, spacing).
- Built the layout using Flexbox: header/nav, home-page highlight cards, and
  adopt-page animal cards.
- Applied the Part 1 proposal's colour palette (terracotta, cream, forest-green)
  as decoration and colour styling.
- Added pseudo-classes: `:hover` on links/buttons, `:active` on buttons, `:focus`
  on form fields.
- Fixed a CSS specificity bug where nav links were incorrectly styled as buttons
  (both `a[href]` and `nav a` matched, and the attribute selector won by default ,
  changed the button rule to a plain `a` selector so `nav a` correctly overrides it).
- Added two media query breakpoints (768px tablet, 480px mobile) adjusting layout
  (cards go 4→2→1 per row), typography (smaller headings/body text), navigation
  (horizontal → vertical stack), and images (`max-width: 100%; height: auto;`).
- Updated README.md with the Part 2 section.


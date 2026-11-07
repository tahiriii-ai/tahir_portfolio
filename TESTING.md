# Testing record (what was actually run)
Automated with Playwright (Chromium) against a local HTTP server, 23 HTML pages.

- [x] No horizontal overflow at 320, 375, 430, 768, 1024, 1440 px (document width and per-element check at 320, 375, 768)
- [x] No JavaScript errors, console errors or failed/4xx requests on any page at any width
- [x] All images load on every page (no broken paths)
- [x] Every local href/src resolves to an existing file; every in-page and cross-page `#anchor` target exists; sitemap URLs all exist
- [x] One H1 per page, unique titles, meta description, canonical, Open Graph, Twitter card and JSON-LD on all indexable pages
- [x] Process section: tab selection, arrow-key navigation, single visible panel (desktop); vertical list (mobile)
- [x] Services dropdown opens on hover; mobile menu opens and closes (Escape)
- [x] Project filters: Power Electronics shows 5 of 12, All shows 12, count text updates
- [x] Lightbox opens from a case-study image and closes with Escape
- [x] Inquiry form: `?type=` preselects the category; empty submit shows inline errors and focuses the first; failed network keeps data and shows email/WhatsApp fallback; mocked success shows confirmation and resets; payload contains the new fields
- [x] Resume PDF rebuilt (2 pages A4) and visually checked
- [x] Visual review of home, a case study, contact and service pages at desktop and phone width

Not verified: live FormSubmit delivery and activation, the live GitHub Pages deployment (this environment cannot reach the site), external profile links (Fiverr, Upwork, Freelancer, LinkedIn, GitHub, Coursera) reachability, Core Web Vitals, screen-reader testing, video playback.

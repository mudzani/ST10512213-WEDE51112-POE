# Changelog

All notable changes to Paw Haven Animal Rescue are recorded below in chronological order.

## Part 1  Building the Foundation

- Drafted two website project proposals for Paw Haven Animal Rescue and Kelder & Vine for lecturer approval.
- Created low-fidelity wireframes for both proposed organisations.
- Selected Paw Haven Animal Rescue as the organisation for the full POE.
- Created the sitemap and established the project folder structure, including the HTML pages and `css/`, `js/` and `images/` folders.
- Built the HTML foundation for the five required pages: `index.html`, `about.html`, `adopt.html`, `enquiry.html` and `contact.html`, using semantic HTML and a consistent header, navigation and footer.
- Added the logo, venue illustrations, animal photographs and homepage hero image.
- Adjusted image dimensions for visual consistency and refactored code for readability.
- Added the README, this changelog and content-sourcing documentation.
- Added the GitHub repository link to the project documentation.

## Fixes Applied After Review

- Corrected animal image filename casing (`whiskers.jpg`, `nala.jpg` and `max.jpg` to `Whiskers.jpg`, `Nala.jpg` and `Max.jpg`) to match the actual files and avoid broken images on case-sensitive hosting.
- Corrected missing spaces between HTML attributes across the five pages.
- Replaced a Windows-style backslash in the homepage image path with a forward slash.
- Reformatted the domain-pricing citation into Harvard-style reference format.

## Part 1 Official Feedback Response

The following updates were recorded in response to the Part 1 feedback:

- **Website structure and planning — sitemap:** Added a clearly headed sitemap section and included the sitemap image with its caption.
- **HTML comments:** Added explanatory comments to `about.html` for the Our Story, Mission/Vision and Team sections.
- **Budget:** Added researched South African pricing estimates for a five-page website and ongoing maintenance. The supporting source must remain in the reference list and the figures should be presented as estimates, not fixed market prices.
- **README and project documentation:** Expanded the README with Part 2 information and corrected the file-structure documentation.
- **References and wireframe attribution:** Reviewed the domain-pricing citation and wireframe attribution. The wireframe captions and reference list should be checked against the actual proposal before submission to ensure they accurately describe the work and sources.

## Part 2  CSS Styling and Responsive Design

- Created `css/style.css` and linked the external stylesheet from all five HTML pages.
- Added reset and base styles, including box sizing, font settings and site-wide colours.
- Styled typography, including heading and body fonts, sizes and spacing.
- Used Flexbox for the navigation, homepage highlight cards and adopt-page animal cards.
- Applied the proposed terracotta, cream and forest-green colour palette.
- Added interactive CSS pseudo-classes, including `:hover` for links and buttons, `:active` for buttons and `:focus` for form fields.
- Corrected a CSS specificity issue that caused navigation links to inherit button styling.
- Added tablet and mobile media queries at 768px and 480px. These adjust card columns, typography, navigation and image sizing.
- Used responsive image rules (`max-width: 100%; height: auto;`) so images can scale within their containers.
- Updated the README with the Part 2 implementation details and responsive screenshot evidence.

## Part 3  Improvements in Response to Part 2 Feedback 

The Part 2 feedback identified responsive navigation and responsive images as areas needing further improvement. The following changes were recorded to address those issues:

- **Responsive navigation:** Updated the small-screen navigation so it can wrap on narrower screens and use a two-column link grid on narrow mobile screens.
- **Responsive images:** Kept images constrained to their containers and corrected the case of animal image paths so the links match the actual filenames. The image layout should still be checked at desktop, tablet and mobile widths.
- **Responsive layout:** Updated content grids to use fewer columns as the available screen width decreases.
- **Keyboard accessibility:** Added a skip-navigation link and visible keyboard-focus indicators. Reduced-motion support was also added.
- **CSS consistency:** Reviewed the responsive rules and interactive styling alongside the navigation and layout changes.
- **README and supporting documentation:** Added Part 3 implementation notes, limitations, deployment steps and technical references.


## Part 3  JavaScript Functionality, Forms, SEO and Deployment Preparation 

- Added page-specific title tags, meta descriptions and relevant keyword phrases to the five pages.
- Added `js/script.js` for animal search, dog/cat filtering, sorting, an image lightbox, enquiry responses and form validation.
- Updated animal-profile enquiry links so they can preselect the adoption enquiry and relevant animal on `enquiry.html`.
- Added validation and on-page guidance for adoption, volunteer and sponsorship enquiries.
- Updated the contact form to collect a name, email address, optional phone number, message type and message.
- Embedded Google Maps area searches for Randburg and Fourways and added links to open those areas in Google Maps. The organisation's addresses and opening hours are fictional project details, not verified premises.
- Added `robots.txt` and `sitemap.xml` using the expected GitHub Pages URL.
- Documented the current form-delivery limitations, map behaviour, deployment steps and additional technical references in the README.
- Recorded static checks: JavaScript syntax passed; local file paths and image alt attributes were checked; no duplicate IDs were found by the checker; and `sitemap.xml` parsed as valid XML.
- Browser interaction testing, pushing the latest changes to GitHub and live GitHub Pages deployment remain to be completed and verified.

## Documentation Correction — Google Apps Script Form Submission

- Corrected the README and this changelog to describe the Google Apps Script web app form handler already referenced by `js/script.js`, rather than the previously documented third-party form service. This is a documentation correction, not a newly implemented feature.
- The existing browser code validates form fields, collects the form data, and sends a URL-encoded POST request to the endpoint configured by `PAW_HAVEN_FORM_ENDPOINT` using `fetch()` with `mode: 'no-cors'`.
- The HTML `data-recipient` value is used by the browser code as a send/no-send check, but is not included in the request payload. The Apps Script server-side recipient or storage configuration and actual email delivery remain to be verified; the browser cannot confirm delivery from the opaque `no-cors` response.
- Updated the image-sourcing notes to distinguish potential source pages from verified source-to-file matches. Image provenance and licensing remain unresolved and must not be described as complete.
- Confirmed in the project notes that the map embeds show general area searches only; no exact premises or pins are claimed because the organisation and street addresses are fictional.

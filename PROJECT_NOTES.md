# Everett Resource Map - Project Notes

## Project purpose

This repository turns a classroom community-resource inventory into a modern, searchable workforce directory for Everett, Massachusetts. The visual reference supplied by the group was the [Community Connections Free Clinic community-resource page](https://ccfcwi.org/patient-services/community-resources/). This implementation keeps the useful directory concept while replacing the long, static link list with search, workforce and eligibility filters, list and map views, saved programs, accessible detail dialogs, a short program matcher, responsive layouts and restrained motion.

The directory remains centered on workforce services: job search, career training, adult education, youth employment, worker support and municipal jobs. A bounded **Support Services** category now includes family navigation, immigration help, accessible transportation, healthcare and food assistance that can remove practical barriers to employment. Broader community-service research remains in `data.js` for a possible later phase but is not displayed on the live site.

## Documents supplied for the project

### `Group Assignment LLI.pdf`

This nine-page working document contains the assignment requirements and detailed research notes. It calls for an inventory of **15-20 community resources** created through participatory asset mapping.

Required categories:

- Health and mental-health services
- Educational institutions and programs
- Employment and vocational services
- Housing resources
- Legal and advocacy services
- Faith-based organizations
- Mutual-aid and grassroots groups
- Recreation and youth programs
- Government agencies and local nonprofits

Required information for each resource:

- Name, location and contact information
- Services provided
- Eligibility and restrictions
- Target population
- Hours and accessibility
- Referral or feeding services
- Bilingual or bicultural providers
- Point of contact

The document includes research notes for MassHire, Bunker Hill Community College, YouthWorks, La Colaborativa, Catholic Charities, La Comunidad, The Neighborhood Developers, Everett municipal services, Everett Community Growers, Everett Adult Education and LUMA.

### `Untitled document.pdf`

This six-page document reorganizes the group research into tables. It includes a resource inventory table and a second table for eligibility, population, hours, accessibility, referrals and points of contact. Several rows are unfinished and some entries duplicate the longer assignment document, so it was treated as a working draft rather than a complete database.

## Editorial decisions

- Duplicate entries were consolidated.
- Blank or unsupported details were not presented as facts; the site tells visitors to contact the provider.
- Duplicate and incomplete entries were consolidated into 19 visible programs.
- Six resources added in the November 2026 group update were reviewed and normalized: Everett Family Resource Center, Centro Comunitario Scalabrini, Operation ABLE, MBTA Mobility Center, CHA Everett Care Center and Bread of Life's Everett Family Care Pantry.
- The linked Wisconsin website was used only as a structural reference. Its Wisconsin-specific resources were not copied into this Everett guide.
- Visitors are reminded that hours, eligibility and enrollment can change.
- The map uses Leaflet with OpenStreetMap tiles. Coordinates are stored in `data.js`, so no Google Maps key or geocoding API is required.
- Online and citywide programs remain in list view because they do not have a single street location.
- Directions links open the selected address in Google Maps without using a paid Maps API or exposing an API key.
- Filters cover youth/adult audiences, free programs, English classes and online/in-person formats. Program metadata is explicit in `data.js` rather than inferred from keywords.
- The program matcher accepts multiple goals, age groups and participation formats. Selections within each section use inclusive matching, so visitors can compare overlapping needs rather than being forced into one answer.
- Each record displays its review date. This means the directory entry was reviewed; it does not guarantee that a provider has not changed its program since that date.
- Share links use stable `#program=` URLs, and print styles turn an open program detail into a clean handout.
- English and Spanish interface text and program descriptions are stored locally. Spanish interface wording was reviewed for natural phrasing rather than literal word-for-word translation. Organization names, phone numbers, addresses and URLs retain their official form.

## Current online sources

These pages were used to confirm or expand information from the group documents:

- [City of Everett Human Services](https://cityofeverett.com/city-hall/departments/human-services/)
- [City of Everett Human Resources](https://cityofeverett.com/city-hall/departments/human-resources/)
- [City of Everett immigration resources](https://cityofeverett.com/immigration-resources/)
- [City of Everett food resources](https://cityofeverett.com/food/)
- [CHA Everett Care Center](https://www.challiance.org/locations/everett/cha-everett-care-center)
- [Eliot Behavioral Health Clinics](https://www.eliotchs.org/behavioral-health-clinics/)
- [Massachusetts local housing-authority directory](https://www.mass.gov/info-details/local-housing-authority-contact-listing)
- [Greater Boston Legal Services locations and intake](https://www.gbls.org/about-us/locations-and-directions)
- [Bread of Life programs](https://www.breadoflifemalden.org/how-we-help)

## Repository structure

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, accessible dialog and resource-card template |
| `styles.css` | Light blue-and-white editorial system, serif typography, responsive layout and reduced-motion support |
| `data.js` | Published-sheet loader plus reviewed local backup records, filter metadata, coordinates and Spanish program copy |
| `app.js` | Search, eligibility filters, matcher, translation, list/map switching, saved resources, sharing, printing and details |
| `netlify.toml` | Build-free Netlify configuration and security headers |

## Updating resources without editing code

The directory uses the **Programs** tab in the shared **Everett Workforce Resource Editor** Google Sheet as its day-to-day content editor. Each program is one row.

- Add a resource by adding a row, creating a unique lowercase `id` and setting `active` to `TRUE`.
- Edit a resource by changing its cells in the existing row.
- Temporarily hide a resource by setting `active` to `FALSE`; this is safer than deleting it.
- Delete a row only when the resource should be permanently removed.
- Separate multiple `categories`, `audiences`, `formats` or tags with a vertical bar (`|`).
- Add Spanish content in the columns ending in `_es`. If a Spanish text cell is blank, the English version is shown.
- Add `latitude` and `longitude` only when a program has a specific map location. Online and citywide programs can leave both blank.
- Use `YYYY-MM-DD` in `last_reviewed`, and confirm changes against the provider's official website or phone number.

The published Programs tab is public read-only data because browsers must be able to load it. Editing remains limited to people explicitly invited through Google Sheets. The **Instructions** tab is for editors and is not read by the site.

`data.js` contains reviewed local backup records. The site uses them if the published sheet is unavailable or invalid. A valid sheet with no program rows, or with every program explicitly set to `FALSE`, shows an empty directory. The `active`, `id` and `name` headers must stay in place. Invalid active rows are skipped if other valid listings remain.

## Deployment

The guide is a static site and does not require a build. To publish manually, use [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) and choose **Drag and drop your files**. Upload a ZIP with these files at its root:

- `index.html`, `styles.css`, `app.js`, and `data.js`
- `assistant.css` and `assistant.js`
- `PROJECT_NOTES.md` and `_headers`
- `_worker.js` and `_routes.json` for optional Workers AI

`_headers` preserves the site's response headers, including permission for the assistant to use on-device speech. Use **Create a new deployment** and select **Production** when uploading a new version. Edits to the published Google Sheet still appear through the existing feed and do not require a new upload.

To enable AI help, keep the account on the Workers Free plan. In the Pages project, select **Settings → Production → Bindings → Add → Workers AI**, name the binding `AI`, then upload the ZIP manually. In **Settings → Runtime**, use **Fail open** so the site remains available if the Functions request allowance is reached. See [binding setup](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) and [routing settings](https://developers.cloudflare.com/pages/functions/routing/#fail-open--closed).

Create the `everett-assistant` AI Gateway on the same account before publishing. Use standard Workers AI billing on Workers Free, set a shared limit of 20 requests per hour, and leave prompt logging, response caching, and retries off. The Worker routes every model call through that gateway and falls back locally if it rejects a request. See [AI Gateway rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/).

Only `/api/assistant` invokes the Worker. When a visitor enables AI help, Cloudflare classifies their current text or voice transcript. Program details and links still come from the current sheet. The assistant uses its local rules if consent is off, the sheet is unavailable, or the AI request fails or exceeds the free quota. The site does not save chats or send audio to the Worker.

`netlify.toml` remains the configuration for the existing Netlify site. The two hosts have separate deploy settings. Once the new URL has been verified, the Netlify project owner can [stop Netlify builds](https://docs.netlify.com/build/configure-builds/stop-or-activate-builds/) to stop Git pushes from triggering future builds there.

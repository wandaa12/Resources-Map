# Everett Resource Map - Project Notes

## Project purpose

This repository turns a classroom community-resource inventory into a modern, searchable workforce directory for Everett, Massachusetts. The visual reference supplied by the group was the [Community Connections Free Clinic community-resource page](https://ccfcwi.org/patient-services/community-resources/). This implementation keeps the useful directory concept while replacing the long, static link list with search, workforce filters, list and map views, saved programs, accessible detail dialogs, responsive layouts and restrained motion.

The current phase is intentionally limited to workforce services: job search, career training, adult education, youth employment, worker support and municipal jobs. Broader health, housing, food and general-service research remains in `data.js` for a possible later phase but is not displayed on the live site.

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
- Duplicate and incomplete workforce entries were consolidated into 13 visible programs.
- The linked Wisconsin website was used only as a structural reference. Its Wisconsin-specific resources were not copied into this Everett guide.
- Visitors are reminded that hours, eligibility and enrollment can change.
- The map uses Leaflet with OpenStreetMap tiles. Coordinates are stored in `data.js`, so no Google Maps key or geocoding API is required.
- Online and citywide programs remain in list view because they do not have a single street location.

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
| `data.js` | Editable research records plus the current workforce-only scope and categories |
| `app.js` | Search, filtering, list/map switching, saved resources, details and reveal animations |
| `netlify.toml` | Build-free Netlify configuration and security headers |

## Updating a resource

Edit the matching object in `data.js`. Keep the existing field names so the card and detail dialog continue working. Confirm changes using the provider's official website or phone number, and update this document if a new source is added.

## Deployment

This is a build-free static site. Netlify publishes the repository root, as configured in `netlify.toml`. Any commit to the connected production branch should trigger a new deployment.

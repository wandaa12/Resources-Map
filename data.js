/*
  Community resource dataset
  --------------------------
  Content is kept in one plain JavaScript file so non-developers can update a
  phone number or program detail without editing the interface code.

  Important: community information changes frequently. Each record includes a
  source URL and the interface reminds visitors to confirm details directly.
*/
const ALL_RESOURCES = [
  {
    id: "masshire-metro-north",
    name: "MassHire Metro North Career Center",
    category: "Employment",
    categories: ["Employment", "Government"],
    summary: "Career counseling, job-search support, training grants, workshops and employer connections for Massachusetts job seekers.",
    address: "75 Federal Street, 3rd Floor, Boston, MA 02110",
    phone: "617-399-3100",
    email: "info@masshiredowntownboston.org",
    website: "https://masshiredowntownboston.org/",
    services: "WIOA career counseling, resume and interview workshops, job placement assistance, hiring events and possible training vouchers.",
    eligibility: "Open to Massachusetts job seekers age 18+. Training funds may prioritize low-income adults, veterans and displaced workers. Employer placement may require work authorization.",
    population: "Unemployed or underemployed adults, career changers, veterans and workers facing employment barriers.",
    hours: "Monday-Friday, 8:30 AM-5:00 PM",
    accessibility: "Wheelchair accessible; remote and telephone support may be available.",
    languages: "Ask about Spanish, Portuguese, Haitian Creole and interpretation support.",
    referrals: "May connect clients to credential programs, YouthWorks and specialized workforce partners.",
    contact: "Customer service intake coordinator",
    tags: ["Career coaching", "Training", "18+"], bilingual: true
  },
  {
    id: "bhcc-workforce",
    name: "Bunker Hill Community College Workforce Development",
    category: "Education",
    categories: ["Education", "Employment"],
    summary: "Short-term credentials, adult education, English classes and workforce training at the Chelsea campus.",
    address: "70 Everett Avenue, Chelsea, MA 02150",
    phone: "617-228-2286",
    email: "abe@bhcc.edu",
    website: "https://www.bhcc.edu/workforce/",
    services: "Career certificates, ESOL, HiSET/GED preparation, technical training and entrepreneurship support.",
    eligibility: "Programs generally serve adults 18+. Requirements and cost vary by course; many grant-funded options may be free.",
    population: "Adult learners, immigrant and multilingual residents, entrepreneurs and workers pursuing new credentials.",
    hours: "Weekday, evening and selected Saturday classes; confirm by program",
    accessibility: "ADA-accessible campus; reachable from Everett by MBTA routes 111 and 112.",
    languages: "Multilingual navigation may be available; ask about Spanish and Portuguese support.",
    referrals: "Connects learners to credit-bearing degrees, apprenticeships and regional employers.",
    contact: "Workforce and Economic Development office",
    tags: ["ESOL", "Certificates", "GED"], bilingual: true
  },
  {
    id: "youthworks-everett",
    name: "YouthWorks Everett",
    category: "Youth",
    categories: ["Youth", "Employment"],
    summary: "Paid summer and year-round work opportunities with job-readiness training for Everett youth.",
    address: "Everett High School, 100 Elm Street, Everett, MA 02149",
    phone: "617-394-2270",
    email: "YouthWorksInfo@masshiremetronorth.org",
    website: "https://masshiremetronorth.org/youth/",
    services: "Subsidized employment, workplace readiness, resume support, financial literacy and career exploration.",
    eligibility: "Typically Everett residents ages 14-21. Priority rules and application dates vary by funding cycle.",
    population: "High-school students, out-of-school youth and young adults seeking an early job experience.",
    hours: "Seasonal; school-year and summer schedules vary",
    accessibility: "Programs are hosted at schools, community locations and participating employers.",
    languages: "Ask about Spanish, Portuguese and Haitian Creole support.",
    referrals: "Connects participants with employers and post-secondary training pathways.",
    contact: "Youth Services team",
    tags: ["Ages 14-21", "Paid work", "Summer"], bilingual: true
  },
  {
    id: "la-colaborativa",
    name: "La Colaborativa",
    category: "Legal & Advocacy",
    categories: ["Legal & Advocacy", "Employment", "Community"],
    summary: "Bilingual worker advocacy, training, community organizing and emergency support for immigrant families.",
    address: "318 Broadway, Chelsea, MA 02150",
    phone: "617-889-6080",
    email: "info@la-colaborativa.org",
    website: "https://la-colaborativa.org/",
    services: "Worker-rights support, wage-theft advocacy, safety training, job pathways, organizing and emergency assistance.",
    eligibility: "Community services are designed to be low-barrier. Contact the organization for current program requirements.",
    population: "Immigrant workers, low-wage workers and Spanish- and Portuguese-speaking families in Chelsea and nearby communities.",
    hours: "Monday-Friday, approximately 9:00 AM-5:00 PM; verify walk-in times",
    accessibility: "Located on Broadway near MBTA bus service; call regarding mobility accommodations.",
    languages: "English, Spanish and Portuguese.",
    referrals: "Connects residents with legal aid, housing support, food distribution and partner organizations.",
    contact: "Worker Center team",
    tags: ["Immigrant support", "Worker rights", "Free"], bilingual: true
  },
  {
    id: "catholic-charities-adult-ed",
    name: "Catholic Charities Adult Education & Workforce",
    category: "Education",
    categories: ["Education", "Faith-based", "Employment"],
    summary: "Industry-focused English, digital literacy and employment preparation for adult immigrants and refugees.",
    address: "275 West Third Street, Boston, MA 02127",
    phone: "617-464-8551",
    email: "adult_education@ccab.org",
    website: "https://www.ccab.org/basic-needs/adult-education/",
    services: "ESOL, digital skills, job-search coaching, interview preparation and case-management support.",
    eligibility: "Adult programs generally serve immigrants and refugees age 18+. Placement assessment and enrollment may be required.",
    population: "Adult immigrants, refugees, English learners and low-income job seekers.",
    hours: "Morning and evening classes; schedule varies by term",
    accessibility: "Virtual options may be available; call for site accessibility and transit guidance.",
    languages: "Ask about Spanish, Portuguese, Haitian Creole and Vietnamese support.",
    referrals: "May connect learners with benefits, health, legal and employer partners.",
    contact: "Adult Education intake team",
    tags: ["English", "Digital skills", "Adults"], bilingual: true
  },
  {
    id: "la-comunidad",
    name: "La Comunidad, Inc.",
    category: "Community",
    categories: ["Community", "Education", "Legal & Advocacy"],
    summary: "Local immigrant-serving organization offering English, citizenship and navigation assistance in Everett.",
    address: "471 Broadway, Everett, MA 02149",
    phone: "617-387-9996",
    email: "info@lacomunidadinc.org",
    website: "https://lacomunidadinc.org/",
    services: "ESL and citizenship classes, immigration assistance, translation, interpretation, notarization, ITIN help and community education.",
    eligibility: "Program requirements vary. Contact the office for registration and document requirements.",
    population: "Latino and Latin American immigrant communities and other Everett residents seeking navigation support.",
    hours: "Monday-Friday, 9:00 AM-5:00 PM; Saturday, 9:00 AM-3:00 PM",
    accessibility: "Central Broadway location; call regarding specific mobility accommodations.",
    languages: "English, Spanish and Portuguese.",
    referrals: "Provides direct navigation and connections to partner agencies.",
    contact: "Community intake staff",
    tags: ["Citizenship", "ESL", "Immigration"], bilingual: true
  },
  {
    id: "neighborhood-developers",
    name: "The Neighborhood Developers",
    category: "Housing",
    categories: ["Housing", "Employment", "Community"],
    summary: "Financial, employment, housing and benefits coaching for eligible Chelsea, Revere and Everett residents.",
    address: "4 Gerrish Avenue, #2, Chelsea, MA 02150",
    phone: "617-889-1375",
    email: "",
    website: "https://theneighborhooddevelopers.org/connect-services-overview/",
    services: "Housing assistance, job search, training, financial coaching, food support, tax preparation and benefits navigation.",
    eligibility: "Availability depends on program and service area. Contact CONNECT for an intake assessment.",
    population: "Low- and moderate-income residents, immigrant households and families in Chelsea, Revere and Everett.",
    hours: "Appointment and program schedules vary",
    accessibility: "Multilingual intake is available; ask about virtual appointments and physical access.",
    languages: "English and Spanish; other language support may be arranged.",
    referrals: "Coordinates multiple partner services through a shared intake process.",
    contact: "CONNECT intake team",
    tags: ["Housing", "Benefits", "Financial coaching"], bilingual: true
  },
  {
    id: "everett-library",
    name: "Everett Public Libraries Community Resources",
    category: "Education",
    categories: ["Education", "Community", "Employment"],
    summary: "Free library-based learning, English programs, digital access and community resource navigation.",
    address: "410 Broadway, Everett, MA 02149",
    phone: "617-394-2300",
    email: "",
    website: "https://www.everettpubliclibraries.org/",
    services: "ESL programs, research databases, computer access, career resources, workshops and referrals to local organizations.",
    eligibility: "Free and open to the public; a library card may be needed for some databases or borrowing.",
    population: "Everett residents, job seekers, students, English learners and families.",
    hours: "Library schedule varies by day; check before visiting",
    accessibility: "Public building in central Everett; contact staff about accommodations.",
    languages: "ESL programming and multilingual community-resource connections.",
    referrals: "Links visitors to immigrant-serving, educational and social-service organizations.",
    contact: "Library reference desk",
    tags: ["Free internet", "ESL", "Job search"], bilingual: true
  },
  {
    id: "everett-human-services",
    name: "Everett Office of Human Services",
    category: "Government",
    categories: ["Government", "Housing", "Food", "Community"],
    summary: "The City’s central information and referral office for benefits, housing, food, utilities and crisis assistance.",
    address: "Connolly Center, 90 Chelsea Street, Everett, MA 02149",
    phone: "617-394-2260",
    email: "",
    website: "https://cityofeverett.com/city-hall/departments/human-services/",
    services: "Information and referrals for SNAP, fuel assistance, eviction, utilities, MassHealth, food pantries, shelters, domestic violence and emergency needs.",
    eligibility: "Primarily serves Everett residents. Individual partner programs set their own eligibility rules.",
    population: "Older adults, low-income residents, people with disabilities, immigrant communities and residents in crisis.",
    hours: "Mon 8 AM-4 PM; Tue-Thu 8 AM-5 PM; Fri 8 AM-noon",
    accessibility: "City service location; call ahead for accommodations or transportation questions.",
    languages: "Ask staff to arrange language assistance.",
    referrals: "Connects residents to city, state and nonprofit services.",
    contact: "Human Services staff",
    tags: ["Benefits", "Referrals", "Crisis help"], bilingual: true
  },
  {
    id: "everett-human-resources",
    name: "City of Everett Human Resources",
    category: "Employment",
    categories: ["Employment", "Government"],
    summary: "Official source for municipal and civil-service job opportunities with the City of Everett.",
    address: "484 Broadway, Room 32, Everett, MA 02149",
    phone: "617-394-2280",
    email: "Human.Resources@ci.everett.ma.us",
    website: "https://cityofeverett.com/city-hall/departments/human-resources/",
    services: "City job listings, hiring information, onboarding and municipal employee services.",
    eligibility: "Each posted job has its own education, experience and work-authorization requirements.",
    population: "People interested in municipal employment in Everett.",
    hours: "Mon & Thu 8 AM-7:30 PM; Tue & Wed 8 AM-5 PM",
    accessibility: "Everett City Hall; contact the department for accommodation requests.",
    languages: "Contact the City for language assistance.",
    referrals: "Directs applicants to active City job postings and relevant departments.",
    contact: "Human Resources Department",
    tags: ["City jobs", "Applications", "Hiring"], bilingual: false
  },
  {
    id: "everett-community-growers",
    name: "Everett Community Growers",
    category: "Youth",
    categories: ["Youth", "Employment", "Community"],
    summary: "Community-based internships, leadership development and hands-on learning connected to food and environmental justice.",
    address: "Everett, MA 02149",
    phone: "978-294-9215",
    email: "admin@everettcommunitygrowers.org",
    website: "https://everettcommunitygrowers.org/",
    services: "Paid internships, leadership programs, community projects and workforce-readiness experience.",
    eligibility: "Varies by seasonal program, funding and available space. Applications may be required.",
    population: "Everett youth and young adults, immigrant families and first-generation students.",
    hours: "Seasonal and program-specific",
    accessibility: "Community-based sites around Everett; ask about transportation and accommodations.",
    languages: "Designed for Everett’s multilingual community; availability varies by program.",
    referrals: "Accepts self-referrals and connections from schools and youth-serving organizations.",
    contact: "Program staff",
    tags: ["Internships", "Leadership", "Youth"], bilingual: true
  },
  {
    id: "everett-adult-learning",
    name: "Everett Adult Learning Center",
    category: "Education",
    categories: ["Education", "Employment"],
    summary: "English, high-school-equivalency and foundational digital skills for adult learners in Everett.",
    address: "548 Broadway, Everett, MA 02149",
    phone: "617-394-2490",
    email: "adulted@everett.k12.ma.us",
    website: "https://cityofeverett.com/city-hall/departments/human-services/programs/",
    services: "Adult ESL, GED/HiSET preparation, reading, writing, math, computer skills and job-readiness support.",
    eligibility: "Generally age 18+. Registration, placement testing and space availability may apply.",
    population: "Adult English learners, workers seeking advancement and adults without a high-school credential.",
    hours: "Class and registration hours vary; call the program",
    accessibility: "Central Broadway location; in-person and limited remote options may vary by term.",
    languages: "Spanish-speaking registration support may be available.",
    referrals: "Accepts self-referrals and referrals from schools, MassHire and community organizations.",
    contact: "Adult Education program coordinator",
    tags: ["ESL", "GED", "Computer skills"], bilingual: true
  },
  {
    id: "luma",
    name: "Latinos Unidos en Massachusetts (LUMA)",
    category: "Legal & Advocacy",
    categories: ["Legal & Advocacy", "Community", "Employment"],
    summary: "Education, advocacy and resource navigation created with and for Latino immigrant communities.",
    address: "198 Ferry Street, Everett, MA 02149",
    phone: "617-381-0015",
    email: "info@latinosunidosma.org",
    website: "https://latinosunidosma.org/",
    services: "Immigration-related assistance, worker-rights education, civic engagement, organizing and resource navigation.",
    eligibility: "Program-specific requirements may apply; contact LUMA for current intake information.",
    population: "Latino and immigrant individuals, families, workers and residents with limited English proficiency.",
    hours: "Monday-Friday, approximately 9:00 AM-5:00 PM; verify first",
    accessibility: "Everett neighborhood office; contact staff regarding accommodations.",
    languages: "English and Spanish.",
    referrals: "Works with community organizations, schools and social-service programs.",
    contact: "LUMA staff",
    tags: ["Spanish", "Advocacy", "Navigation"], bilingual: true
  },
  {
    id: "cha-everett",
    name: "CHA Everett Care Center",
    category: "Health",
    categories: ["Health"],
    summary: "Primary care for all ages with mental health, substance-use, nutrition and reproductive-health services.",
    address: "391 Broadway, Everett, MA 02149",
    phone: "617-394-7702",
    email: "",
    website: "https://www.challiance.org/locations/everett/cha-everett-care-center",
    services: "Family medicine, pediatrics, lab services, mental health and substance-use care, nutrition and sexual and reproductive health.",
    eligibility: "New patients should call 617-665-1305. Insurance coverage varies; financial-assistance support is available at 617-665-1100.",
    population: "Children, adults and families seeking primary or integrated healthcare.",
    hours: "Mon-Thu 8 AM-5 PM; Fri 9 AM-5 PM",
    accessibility: "Free rear parking; MBTA buses 97, 104, 109 and 112. Call about disability accommodations.",
    languages: "Free interpreter services; eCheck-in guides include English, Haitian Creole, Portuguese and Spanish.",
    referrals: "Primary-care teams coordinate specialty and network referrals.",
    contact: "CHA Primary Care, Everett",
    tags: ["Primary care", "Mental health", "Interpreters"], bilingual: true
  },
  {
    id: "eliot-everett",
    name: "The Eliot Center at Everett",
    category: "Health",
    categories: ["Health"],
    summary: "Outpatient behavioral-health therapy, psychiatric evaluation and medication support for individuals and families.",
    address: "173 Chelsea Street, Everett, MA 02149",
    phone: "781-388-6200",
    email: "",
    website: "https://www.eliotchs.org/behavioral-health-clinics/",
    services: "Individual, couples, family and group therapy; medication assessment; psychological and cognitive testing.",
    eligibility: "Call for intake, insurance coverage and service availability. Emergency needs require crisis or emergency services.",
    population: "Children, adults, couples and families seeking outpatient behavioral-health care.",
    hours: "Appointment-based; call to schedule",
    accessibility: "Contact the clinic regarding physical access, telehealth and accommodation needs.",
    languages: "Ask intake about interpreter and multilingual provider availability.",
    referrals: "Accepts referral forms and coordinates individualized behavioral-health treatment.",
    contact: "Everett clinic intake",
    tags: ["Therapy", "Psychiatry", "Families"], bilingual: true
  },
  {
    id: "everett-housing-authority",
    name: "Everett Housing Authority",
    category: "Housing",
    categories: ["Housing", "Government"],
    summary: "Local public-housing authority serving eligible households, older adults and residents with disabilities.",
    address: "393 Ferry Street, Everett, MA 02149",
    phone: "617-387-6389",
    email: "",
    website: "https://www.mass.gov/info-details/local-housing-authority-contact-listing",
    services: "Public-housing administration, applications, waitlist information and resident services.",
    eligibility: "Income, household and program rules apply. Waitlists may be closed or lengthy; contact the authority directly.",
    population: "Eligible low-income households, older adults and people with disabilities.",
    hours: "Office hours vary; call before visiting",
    accessibility: "Contact the authority for disability accommodations and application assistance.",
    languages: "Ask about interpreter access for applications and appointments.",
    referrals: "May direct applicants to state housing portals and related housing programs.",
    contact: "Housing Authority office",
    tags: ["Public housing", "Applications", "Waitlist"], bilingual: true
  },
  {
    id: "gbls",
    name: "Greater Boston Legal Services",
    category: "Legal & Advocacy",
    categories: ["Legal & Advocacy", "Housing"],
    summary: "Free civil legal help for eligible low-income residents facing housing, income, family and other legal problems.",
    address: "197 Friend Street, Boston, MA 02114",
    phone: "617-371-1234",
    email: "",
    website: "https://www.gbls.org/about-us/locations-and-directions",
    services: "Civil legal assistance involving housing, benefits, employment, family safety, immigration and consumer matters.",
    eligibility: "Case type, income and service-area rules apply. Intake does not guarantee representation.",
    population: "Low-income residents of Greater Boston who need civil legal assistance.",
    hours: "Office Mon-Fri 9 AM-5 PM; telephone intake 9:30 AM-12:30 PM",
    accessibility: "Housing intake is primarily by phone. Language and disability accommodations are available.",
    languages: "Cantonese, English, Haitian Creole, Mandarin, Portuguese and Spanish.",
    referrals: "Intake may provide advice, representation or referral to another legal provider.",
    contact: "Legal intake team; housing line 617-603-1807",
    tags: ["Free legal help", "Housing", "Multilingual"], bilingual: true
  },
  {
    id: "bread-of-life-everett",
    name: "Bread of Life - Everett Food Programs",
    category: "Food",
    categories: ["Food", "Faith-based", "Community"],
    summary: "Weekly groceries through an Everett pantry and mobile market, with options for residents with mobility limitations.",
    address: "Family Care Pantry, 1691 Revere Beach Parkway, Everett, MA 02149",
    phone: "781-397-0404",
    email: "info@breadoflifemalden.org",
    website: "https://www.breadoflifemalden.org/how-we-help",
    services: "Family Care Pantry, Everett Mobile Market, food delivery for eligible residents and regional pantry access.",
    eligibility: "Family Care Pantry is open to any community with no application. The Lafayette Mobile Market is for Everett residents and requires initial registration and proof of residency.",
    population: "Individuals and families experiencing food insecurity, including older adults and residents with mobility limitations.",
    hours: "Family Care Pantry Mon 4-7 PM; Lafayette School market Thu 3:30-5 PM",
    accessibility: "Mobile Market offers drive-through or walk-up distribution. Call about delivery eligibility.",
    languages: "Interpreting and translation support may be available through the Food Access Project.",
    referrals: "Works with schools, senior services and community partners; grocery delivery may require a referral.",
    contact: "Bread of Life program staff",
    tags: ["Groceries", "Weekly", "Delivery"], bilingual: true
  },
  {
    id: "everett-family-resource-center",
    name: "Everett Family Resource Center",
    category: "Community",
    categories: ["Community", "Education"],
    summary: "Multilingual family support, parenting programs and referrals that help households connect with childcare, education, employment and community services.",
    address: "548 Broadway, Everett, MA 02149",
    phone: "781-581-4750",
    email: "",
    website: "https://frcma.org/intranet/location/everett-family-resource-center/",
    services: "Family support, parenting programs, support groups, information and referrals for childcare, education, vocational services and other community needs.",
    eligibility: "Open to families and community members seeking support. Individual programs may have additional requirements.",
    population: "Children, parents, caregivers and families who need support or help navigating services.",
    hours: "Mon-Tue 8 AM-4 PM; Wed-Thu 8 AM-6 PM; Fri 8 AM-1 PM; additional hours by appointment",
    accessibility: "Central Broadway location; call about disability accommodations and appointment options.",
    languages: "English, Spanish, Portuguese and Haitian Creole.",
    referrals: "Accepts self-referrals and referrals from schools, healthcare providers and community agencies.",
    contact: "Family Resource Center staff",
    tags: ["Family support", "Childcare referrals", "Multilingual"], bilingual: true
  },
  {
    id: "centro-scalabrini",
    name: "Centro Comunitario Scalabrini",
    category: "Community",
    categories: ["Community", "Education", "Legal & Advocacy"],
    summary: "Free, culturally responsive guidance and referrals for immigrants adjusting to life in the Everett community.",
    address: "63 Oakes Street, Everett, MA 02149",
    phone: "617-387-1393",
    email: "",
    website: "https://www.simn-global.org/centros-scalabrinianos/centro/scalabrini-community-center-everett/",
    services: "Immigration-document guidance, legal and psychological referrals, adult ESL, health-insurance applications, food-benefit support and spiritual care.",
    eligibility: "Free services for immigrants and community members; availability varies by service and appointment capacity.",
    population: "Immigrants, refugees and immigrant families in Everett and nearby communities.",
    hours: "Monday-Friday; call to confirm current appointment and walk-in hours",
    accessibility: "Neighborhood center at Saint Anthony Parish; call about mobility accommodations.",
    languages: "Culturally responsive multilingual support; call to confirm the language needed.",
    referrals: "Connects visitors with qualified legal, healthcare and social-service organizations.",
    contact: "Centro Comunitario Scalabrini staff",
    tags: ["Immigration", "ESL", "Free"], bilingual: true
  },
  {
    id: "operation-able",
    name: "Operation ABLE of Greater Boston",
    category: "Employment",
    categories: ["Employment", "Education"],
    summary: "Career coaching, job-search support, digital-skills training and work-based learning for job seekers, with specialized programs for adults age 55 and older.",
    address: "98 North Washington Street, Suite 200, Boston, MA 02114",
    phone: "617-542-4180",
    email: "",
    website: "https://operationable.net/",
    services: "Computer and occupational-skills training, job-search assistance, career coaching, counseling, internships and paid community-based training through eligible programs.",
    eligibility: "Requirements vary. The SCSEP program generally serves unemployed, low-income adults age 55+ who meet work-authorization and service-area rules; other training has separate eligibility.",
    population: "Adults seeking employment or digital skills, especially mature workers and job seekers facing economic barriers.",
    hours: "Program and information-session schedules vary; contact Operation ABLE before visiting",
    accessibility: "In-person and virtual training options; auxiliary aids and services are available on request.",
    languages: "Contact the organization to request language assistance.",
    referrals: "Accepts self-referrals and referrals from MassHire, libraries and community organizations.",
    contact: "Operation ABLE intake staff",
    tags: ["Job search", "Digital skills", "Age 55+"], bilingual: false
  },
  {
    id: "mbta-mobility-center",
    name: "MBTA Mobility Center",
    category: "Community",
    categories: ["Community"],
    summary: "Free help planning accessible transportation, applying for reduced fares and learning how to use fixed-route transit or The RIDE.",
    address: "1000 Massachusetts Avenue, Suite 201, Boston, MA 02118",
    phone: "617-337-2727",
    email: "mbtamobility@mtm-inc.net",
    website: "https://www.mbta.com/accessibility/mbta-mobility-center",
    services: "Accessible trip planning, travel training, The RIDE eligibility appointments, reduced-fare applications and connections to other transportation options.",
    eligibility: "Open to anyone exploring accessible transportation. The RIDE and reduced-fare programs have their own eligibility requirements.",
    population: "Older adults, people with disabilities, caregivers and anyone who needs accessible transportation guidance.",
    hours: "Monday-Friday, 8:30 AM-5:00 PM; appointments recommended",
    accessibility: "Services are available in person or virtually and are designed around individual mobility needs.",
    languages: "Services are available in multiple languages at no cost; request the language needed.",
    referrals: "Connects visitors to The RIDE, travel training, reduced-fare programs and community transportation options.",
    contact: "Mobility Center staff",
    tags: ["Accessible transit", "The RIDE", "Reduced fares"], bilingual: true
  },
  {
    id: "findhelp",
    name: "Findhelp Resource Search",
    category: "Community",
    categories: ["Community", "Food", "Housing", "Health"],
    summary: "A searchable directory for free and reduced-cost employment, training and education programs by ZIP code.",
    address: "Online service",
    phone: "",
    email: "",
    website: "https://www.findhelp.org/",
    services: "ZIP-code search for employment assistance, skills training, education, transportation and other supports that can reduce barriers to work.",
    eligibility: "Each listed provider sets its own rules. Findhelp itself is free to search and does not determine eligibility.",
    population: "Anyone looking for additional workforce programs or support beyond this guide.",
    hours: "Website available 24/7",
    accessibility: "Online directory; individual provider accessibility varies.",
    languages: "Spanish-language interface available; provider language access varies.",
    referrals: "Links visitors directly to listed community organizations and application information.",
    contact: "Use the online search",
    tags: ["Employment", "ZIP search", "24/7"], bilingual: true
  }
];

/*
  Workforce programs remain the primary scope. A small Support Services group
  covers practical barriers such as childcare, transportation, health and food.
*/
const WORKFORCE_CATEGORIES = {
  "masshire-metro-north": ["Job Search", "Training"],
  "bhcc-workforce": ["Training", "Education"],
  "youthworks-everett": ["Youth Jobs", "Training"],
  "la-colaborativa": ["Worker Support", "Training"],
  "catholic-charities-adult-ed": ["Education", "Training"],
  "la-comunidad": ["Education", "Worker Support"],
  "neighborhood-developers": ["Job Search", "Training"],
  "everett-library": ["Job Search", "Education"],
  "everett-human-resources": ["City Jobs", "Job Search"],
  "everett-community-growers": ["Youth Jobs", "Training"],
  "everett-adult-learning": ["Education", "Training"],
  "luma": ["Worker Support"],
  "everett-family-resource-center": ["Support Services", "Education"],
  "centro-scalabrini": ["Support Services", "Education"],
  "operation-able": ["Job Search", "Training"],
  "mbta-mobility-center": ["Support Services"],
  "cha-everett": ["Support Services"],
  "bread-of-life-everett": ["Support Services"],
  "findhelp": ["Job Search"]
};

// Coordinates are stored locally so the map does not need a geocoding API.
// Citywide and online programs intentionally remain available in list view only.
const WORKFORCE_COORDINATES = {
  "masshire-metro-north": [42.3552444, -71.0569304],
  "bhcc-workforce": [42.3929788, -71.0405689],
  "youthworks-everett": [42.4143146, -71.0443469],
  "la-colaborativa": [42.3913563, -71.0367946],
  "catholic-charities-adult-ed": [42.3379606, -71.0476675],
  "la-comunidad": [42.4077445, -71.0547235],
  "neighborhood-developers": [42.3944915, -71.0307990],
  "everett-library": [42.4060155, -71.0568179],
  "everett-human-resources": [42.4083637, -71.0546941],
  "everett-adult-learning": [42.4106815, -71.0538537],
  "luma": [42.4107176, -71.0458341],
  "everett-family-resource-center": [42.4106815, -71.0538537],
  "centro-scalabrini": [42.4049893, -71.0587295],
  "operation-able": [42.3656240, -71.0587343],
  "mbta-mobility-center": [42.3278598, -71.0675624],
  "cha-everett": [42.4054080, -71.0564942],
  "bread-of-life-everett": [42.4022942, -71.0426804]
};

/*
  Filter metadata is explicit instead of inferred from description text. This
  keeps the audience, cost, class-type and delivery filters predictable.
*/
const PROGRAM_FILTERS = {
  "masshire-metro-north": { audiences: ["adult"], free: true, englishLearning: false, formats: ["inPerson", "online"] },
  "bhcc-workforce": { audiences: ["adult"], free: false, englishLearning: true, formats: ["inPerson"] },
  "youthworks-everett": { audiences: ["youth"], free: true, englishLearning: false, formats: ["inPerson"] },
  "la-colaborativa": { audiences: ["adult"], free: true, englishLearning: false, formats: ["inPerson"] },
  "catholic-charities-adult-ed": { audiences: ["adult"], free: true, englishLearning: true, formats: ["inPerson", "online"] },
  "la-comunidad": { audiences: ["adult"], free: true, englishLearning: true, formats: ["inPerson"] },
  "neighborhood-developers": { audiences: ["adult"], free: true, englishLearning: false, formats: ["inPerson", "online"] },
  "everett-library": { audiences: ["youth", "adult"], free: true, englishLearning: true, formats: ["inPerson"] },
  "everett-human-resources": { audiences: ["adult"], free: true, englishLearning: false, formats: ["inPerson", "online"] },
  "everett-community-growers": { audiences: ["youth"], free: true, englishLearning: false, formats: ["inPerson"] },
  "everett-adult-learning": { audiences: ["adult"], free: true, englishLearning: true, formats: ["inPerson", "online"] },
  "luma": { audiences: ["adult"], free: true, englishLearning: false, formats: ["inPerson"] },
  "everett-family-resource-center": { audiences: ["youth", "adult"], free: true, englishLearning: false, formats: ["inPerson"] },
  "centro-scalabrini": { audiences: ["adult"], free: true, englishLearning: true, formats: ["inPerson"] },
  "operation-able": { audiences: ["adult"], free: false, englishLearning: false, formats: ["inPerson", "online"] },
  "mbta-mobility-center": { audiences: ["youth", "adult"], free: true, englishLearning: false, formats: ["inPerson", "online"] },
  "cha-everett": { audiences: ["youth", "adult"], free: false, englishLearning: false, formats: ["inPerson", "online"] },
  "bread-of-life-everett": { audiences: ["youth", "adult"], free: true, englishLearning: false, formats: ["inPerson"] },
  "findhelp": { audiences: ["youth", "adult"], free: true, englishLearning: false, formats: ["online"] }
};

/*
  Human-reviewed Spanish copy lives beside the program data. Organization
  names, street addresses, phone numbers and URLs intentionally remain as-is.
*/
const SPANISH_TRANSLATIONS = {
  "masshire-metro-north": {
    summary: "Orientación profesional, apoyo para buscar empleo, becas de capacitación, talleres y conexiones con empleadores para quienes buscan trabajo en Massachusetts.",
    services: "Orientación profesional de WIOA, talleres de currículum y entrevistas, ayuda para conseguir empleo, ferias de contratación y posibles vales de capacitación.",
    eligibility: "Abierto a personas de Massachusetts de 18 años o más que buscan empleo. Los fondos de capacitación pueden dar prioridad a adultos de bajos ingresos, veteranos y trabajadores desplazados. Algunos empleos pueden exigir autorización de trabajo.",
    population: "Adultos desempleados o subempleados, personas que cambian de carrera, veteranos y trabajadores que enfrentan barreras laborales.",
    hours: "Lunes a viernes, de 8:30 a. m. a 5:00 p. m.", accessibility: "Accesible para sillas de ruedas; puede haber apoyo remoto y telefónico.",
    languages: "Pregunte por apoyo en español, portugués, criollo haitiano y servicios de interpretación.", referrals: "Puede conectar a los usuarios con programas de credenciales, YouthWorks y socios especializados en empleo.", contact: "Coordinador de admisión de servicio al cliente", tags: ["Orientación laboral", "Capacitación", "18+"]
  },
  "bhcc-workforce": {
    summary: "Credenciales de corta duración, educación para adultos, clases de inglés y capacitación laboral en el campus de Chelsea.",
    services: "Certificados profesionales, ESOL, preparación para HiSET/GED, capacitación técnica y apoyo para emprendedores.",
    eligibility: "Los programas generalmente atienden a adultos de 18 años o más. Los requisitos y costos varían según el curso; algunas opciones financiadas por subvenciones pueden ser gratuitas.",
    population: "Estudiantes adultos, residentes inmigrantes y multilingües, emprendedores y trabajadores que buscan nuevas credenciales.",
    hours: "Clases entre semana, por la noche y algunos sábados; confirme según el programa.", accessibility: "Campus accesible según ADA; se puede llegar desde Everett por las rutas 111 y 112 de MBTA.",
    languages: "Puede haber orientación multilingüe; pregunte por apoyo en español y portugués.", referrals: "Conecta a los estudiantes con carreras universitarias, aprendizajes y empleadores regionales.", contact: "Oficina de Desarrollo Laboral y Económico", tags: ["ESOL", "Certificados", "GED"]
  },
  "youthworks-everett": {
    summary: "Oportunidades de trabajo remunerado durante el verano y todo el año, con capacitación laboral para jóvenes de Everett.", services: "Empleo subsidiado, preparación para el trabajo, apoyo con currículum, educación financiera y exploración de carreras.",
    eligibility: "Generalmente para residentes de Everett de 14 a 21 años. Las prioridades y fechas de solicitud varían según el ciclo de financiación.", population: "Estudiantes de secundaria, jóvenes fuera de la escuela y adultos jóvenes que buscan su primera experiencia laboral.",
    hours: "Programa estacional; los horarios del año escolar y del verano varían.", accessibility: "Los programas se realizan en escuelas, espacios comunitarios y empleadores participantes.", languages: "Pregunte por apoyo en español, portugués y criollo haitiano.", referrals: "Conecta a los participantes con empleadores y rutas de formación postsecundaria.", contact: "Equipo de Servicios Juveniles", tags: ["Edades 14–21", "Trabajo remunerado", "Verano"]
  },
  "la-colaborativa": {
    summary: "Defensa bilingüe de trabajadores, capacitación, organización comunitaria y apoyo de emergencia para familias inmigrantes.", services: "Apoyo sobre derechos laborales, defensa contra el robo de salarios, capacitación de seguridad, rutas de empleo, organización y ayuda de emergencia.",
    eligibility: "Los servicios comunitarios están diseñados con pocas barreras. Comuníquese con la organización para conocer los requisitos actuales.", population: "Trabajadores inmigrantes, trabajadores de bajos salarios y familias de habla hispana y portuguesa de Chelsea y comunidades cercanas.",
    hours: "Lunes a viernes, aproximadamente de 9:00 a. m. a 5:00 p. m.; confirme el horario sin cita.", accessibility: "Ubicada en Broadway cerca del autobús de MBTA; llame para consultar adaptaciones de movilidad.", languages: "Inglés, español y portugués.", referrals: "Conecta a residentes con asistencia legal, vivienda, distribución de alimentos y organizaciones asociadas.", contact: "Equipo del Centro de Trabajadores", tags: ["Apoyo inmigrante", "Derechos laborales", "Gratis"]
  },
  "catholic-charities-adult-ed": {
    summary: "Inglés orientado a industrias, alfabetización digital y preparación laboral para adultos inmigrantes y refugiados.", services: "ESOL, habilidades digitales, orientación para buscar empleo, preparación para entrevistas y apoyo de manejo de casos.",
    eligibility: "Los programas para adultos generalmente atienden a inmigrantes y refugiados de 18 años o más. Puede requerirse una evaluación de nivel e inscripción.", population: "Adultos inmigrantes, refugiados, estudiantes de inglés y personas de bajos ingresos que buscan empleo.",
    hours: "Clases por la mañana y por la noche; el horario varía por período.", accessibility: "Puede haber opciones virtuales; llame para consultar accesibilidad y transporte.", languages: "Pregunte por apoyo en español, portugués, criollo haitiano y vietnamita.", referrals: "Puede conectar a estudiantes con beneficios y servicios de salud, legales y de empleo.", contact: "Equipo de admisión de Educación para Adultos", tags: ["Inglés", "Habilidades digitales", "Adultos"]
  },
  "la-comunidad": {
    summary: "Organización local para inmigrantes que ofrece inglés, ciudadanía y orientación en Everett.", services: "Clases de ESL y ciudadanía, ayuda migratoria, traducción, interpretación, notarización, ayuda con ITIN y educación comunitaria.",
    eligibility: "Los requisitos varían según el programa. Comuníquese con la oficina para conocer la inscripción y los documentos requeridos.", population: "Comunidades inmigrantes latinas y latinoamericanas, y otros residentes de Everett que necesitan orientación.",
    hours: "Lunes a viernes, de 9:00 a. m. a 5:00 p. m.; sábado, de 9:00 a. m. a 3:00 p. m.", accessibility: "Ubicación céntrica en Broadway; llame para consultar adaptaciones específicas de movilidad.", languages: "Inglés, español y portugués.", referrals: "Brinda orientación directa y conexiones con agencias asociadas.", contact: "Personal de admisión comunitaria", tags: ["Ciudadanía", "ESL", "Inmigración"]
  },
  "neighborhood-developers": {
    summary: "Orientación financiera, laboral, de vivienda y beneficios para residentes elegibles de Chelsea, Revere y Everett.", services: "Ayuda de vivienda, búsqueda de empleo, capacitación, orientación financiera, alimentos, preparación de impuestos y navegación de beneficios.",
    eligibility: "La disponibilidad depende del programa y el área de servicio. Comuníquese con CONNECT para una evaluación inicial.", population: "Residentes de ingresos bajos y moderados, hogares inmigrantes y familias de Chelsea, Revere y Everett.",
    hours: "Los horarios de citas y programas varían.", accessibility: "Hay admisión multilingüe; pregunte por citas virtuales y acceso físico.", languages: "Inglés y español; se puede coordinar apoyo en otros idiomas.", referrals: "Coordina varios servicios de socios mediante un proceso de admisión compartido.", contact: "Equipo de admisión de CONNECT", tags: ["Vivienda", "Beneficios", "Orientación financiera"]
  },
  "everett-library": {
    summary: "Aprendizaje gratuito en la biblioteca, programas de inglés, acceso digital y orientación a recursos comunitarios.", services: "Programas de ESL, bases de datos, acceso a computadoras, recursos profesionales, talleres y referencias a organizaciones locales.",
    eligibility: "Gratis y abierto al público; puede necesitar una tarjeta de biblioteca para algunas bases de datos o préstamos.", population: "Residentes de Everett, personas que buscan empleo, estudiantes, estudiantes de inglés y familias.",
    hours: "El horario de la biblioteca varía según el día; confirme antes de visitar.", accessibility: "Edificio público en el centro de Everett; consulte al personal sobre adaptaciones.", languages: "Programas de ESL y conexiones multilingües con recursos comunitarios.", referrals: "Conecta a visitantes con organizaciones de inmigración, educación y servicios sociales.", contact: "Mostrador de referencia de la biblioteca", tags: ["Internet gratis", "ESL", "Búsqueda de empleo"]
  },
  "everett-human-resources": {
    summary: "Fuente oficial de oportunidades de empleo municipal y servicio civil de la Ciudad de Everett.", services: "Ofertas de empleo de la Ciudad, información de contratación, incorporación y servicios para empleados municipales.",
    eligibility: "Cada empleo publicado tiene sus propios requisitos de educación, experiencia y autorización de trabajo.", population: "Personas interesadas en empleo municipal en Everett.",
    hours: "Lun. y jue. de 8:00 a. m. a 7:30 p. m.; mar. y mié. de 8:00 a. m. a 5:00 p. m.", accessibility: "Ayuntamiento de Everett; comuníquese con el departamento para solicitar adaptaciones.", languages: "Comuníquese con la Ciudad para recibir asistencia lingüística.", referrals: "Dirige a los solicitantes a las vacantes activas y los departamentos correspondientes.", contact: "Departamento de Recursos Humanos", tags: ["Empleos municipales", "Solicitudes", "Contratación"]
  },
  "everett-community-growers": {
    summary: "Pasantías comunitarias, desarrollo de liderazgo y aprendizaje práctico relacionado con la justicia alimentaria y ambiental.", services: "Pasantías remuneradas, programas de liderazgo, proyectos comunitarios y experiencia de preparación laboral.",
    eligibility: "Varía según el programa estacional, la financiación y el espacio disponible. Puede ser necesario presentar una solicitud.", population: "Jóvenes y adultos jóvenes de Everett, familias inmigrantes y estudiantes universitarios de primera generación.",
    hours: "Estacional y específico de cada programa.", accessibility: "Espacios comunitarios en Everett; pregunte por transporte y adaptaciones.", languages: "Diseñado para la comunidad multilingüe de Everett; la disponibilidad varía por programa.", referrals: "Acepta solicitudes directas y referencias de escuelas y organizaciones juveniles.", contact: "Personal del programa", tags: ["Pasantías", "Liderazgo", "Jóvenes"]
  },
  "everett-adult-learning": {
    summary: "Inglés, equivalencia de escuela secundaria y habilidades digitales básicas para estudiantes adultos de Everett.", services: "ESL para adultos, preparación para GED/HiSET, lectura, escritura, matemáticas, computación y preparación laboral.",
    eligibility: "Generalmente para mayores de 18 años. Puede requerirse inscripción, prueba de nivel y disponibilidad de cupo.", population: "Adultos que aprenden inglés, trabajadores que buscan avanzar y adultos sin diploma de escuela secundaria.",
    hours: "Los horarios de clases e inscripción varían; llame al programa.", accessibility: "Ubicación céntrica en Broadway; las opciones presenciales y remotas limitadas pueden variar por período.", languages: "Puede haber apoyo de inscripción en español.", referrals: "Acepta solicitudes directas y referencias de escuelas, MassHire y organizaciones comunitarias.", contact: "Coordinador del programa de Educación para Adultos", tags: ["ESL", "GED", "Computación"]
  },
  "luma": {
    summary: "Educación, defensa y orientación de recursos creadas con y para comunidades inmigrantes latinas.", services: "Asistencia relacionada con inmigración, educación sobre derechos laborales, participación cívica, organización y orientación de recursos.",
    eligibility: "Pueden aplicarse requisitos específicos del programa; comuníquese con LUMA para información actual de admisión.", population: "Personas, familias y trabajadores latinos e inmigrantes, y residentes con dominio limitado del inglés.",
    hours: "Lunes a viernes, aproximadamente de 9:00 a. m. a 5:00 p. m.; confirme primero.", accessibility: "Oficina vecinal en Everett; consulte al personal sobre adaptaciones.", languages: "Inglés y español.", referrals: "Trabaja con organizaciones comunitarias, escuelas y programas de servicios sociales.", contact: "Personal de LUMA", tags: ["Español", "Defensa", "Orientación"]
  },
  "findhelp": {
    address: "Servicio en línea",
    summary: "Directorio para buscar programas gratuitos o de costo reducido de empleo, capacitación y educación por código postal.", services: "Búsqueda por código postal de ayuda laboral, capacitación, educación, transporte y otros apoyos que pueden reducir barreras al trabajo.",
    eligibility: "Cada proveedor establece sus propias reglas. Findhelp es gratuito y no determina la elegibilidad.", population: "Cualquier persona que busque programas laborales o apoyo adicional fuera de esta guía.",
    hours: "Sitio web disponible las 24 horas, todos los días.", accessibility: "Directorio en línea; la accesibilidad varía según el proveedor.", languages: "Interfaz en español disponible; el acceso lingüístico varía según el proveedor.", referrals: "Conecta directamente con organizaciones comunitarias e información de solicitud.", contact: "Use la búsqueda en línea", tags: ["Empleo", "Código postal", "24/7"]
  }
};

const PROGRAM_REVIEW_DATE = "2026-11-01";

const BACKUP_RESOURCES = ALL_RESOURCES
  .filter(resource => WORKFORCE_CATEGORIES[resource.id])
  .map(resource => ({
    ...resource,
    category: WORKFORCE_CATEGORIES[resource.id][0],
    categories: WORKFORCE_CATEGORIES[resource.id],
    coordinates: WORKFORCE_COORDINATES[resource.id] || null,
    ...PROGRAM_FILTERS[resource.id],
    verified: PROGRAM_REVIEW_DATE,
    translations: { es: SPANISH_TRANSLATIONS[resource.id] }
  }));

// Category order follows the most common workforce goals.
const CATEGORIES = ["All", "Job Search", "Training", "Education", "Youth Jobs", "Worker Support", "City Jobs", "Support Services"];

/*
  Shared editor
  -------------
  The Programs tab in this Google Sheet is the simple content-management
  system for the directory. Approved editors can change rows in Sheets; the
  public site only reads the published CSV and never receives edit access.

  A valid empty sheet is authoritative. The backup is used when the feed is
  unavailable or invalid.
*/
const RESOURCE_SHEET_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-LRyJjOU7jge1EbSN9_XAwdIUuHUEkW1izOYy49BsbGGjk6OxtlPmF4ReVruF7cn6horIxZ8-mb5w/pub?gid=0&single=true&output=csv";

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  let closedQuote = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    if (quoted) {
      if (character === '"' && csv[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
        closedQuote = true;
      } else value += character;
    } else if (character === '"') {
      if (value || closedQuote) throw new Error("Unexpected quote in the sheet CSV.");
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
      closedQuote = false;
    } else if (character === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
      closedQuote = false;
    } else if (closedQuote) {
      if (character !== "\r" || csv[index + 1] !== "\n") throw new Error("Unexpected text after a quoted CSV cell.");
    } else value += character;
  }

  if (quoted) throw new Error("Unclosed quote in the sheet CSV.");
  if (value || row.length || closedQuote) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

const splitSheetList = value => String(value || "").split("|").map(item => item.trim()).filter(Boolean);
const trueSheetValues = ["true", "yes", "1", "y"];
const falseSheetValues = ["false", "no", "0", "n"];
const sheetBoolean = value => trueSheetValues.includes(value.toLowerCase());

function sheetReviewDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(value + "T00:00:00Z");
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value ? value : null;
}

function sheetWebsite(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function sheetCoordinates({ latitude, longitude }) {
  if (!latitude || !longitude) return null;
  const lat = Number(latitude);
  const lng = Number(longitude);
  return Math.abs(lat) <= 90 && Math.abs(lng) <= 180 ? [lat, lng] : null;
}

function sheetRowToResource(row) {
  const cell = key => row[key] ?? "";
  const categories = splitSheetList(cell("categories"));
  const category = cell("category") || categories[0] || "Job Search";
  const audiences = splitSheetList(cell("audiences"));
  const formats = splitSheetList(cell("formats"));
  const englishTags = splitSheetList(cell("tags_en"));
  const spanishTags = splitSheetList(cell("tags_es"));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cell("id")) || !cell("name") ||
      [category, ...categories].some(item => item === "All" || !CATEGORIES.includes(item)) ||
      audiences.some(item => !["adult", "youth"].includes(item)) ||
      formats.some(item => !["inPerson", "online"].includes(item)) ||
      [cell("free"), cell("english_learning")].some(value => value && !sheetBoolean(value) && !falseSheetValues.includes(value.toLowerCase()))) {
    return null;
  }

  return {
    id: cell("id"),
    name: cell("name"),
    category,
    categories: [...new Set([category, ...categories])],
    summary: cell("summary_en"),
    address: cell("address"),
    phone: cell("phone"),
    email: cell("email"),
    website: sheetWebsite(cell("website")),
    services: cell("services_en"),
    eligibility: cell("eligibility_en"),
    population: cell("population_en"),
    hours: cell("hours_en"),
    accessibility: cell("accessibility_en"),
    languages: cell("languages_en"),
    referrals: cell("referrals_en"),
    contact: cell("contact_en"),
    tags: englishTags,
    audiences,
    free: sheetBoolean(cell("free")),
    englishLearning: sheetBoolean(cell("english_learning")),
    formats,
    coordinates: sheetCoordinates(row),
    verified: sheetReviewDate(cell("last_reviewed")),
    translations: {
      es: {
        summary: cell("summary_es"),
        address: cell("address_es"),
        services: cell("services_es"),
        eligibility: cell("eligibility_es"),
        population: cell("population_es"),
        hours: cell("hours_es"),
        accessibility: cell("accessibility_es"),
        languages: cell("languages_es"),
        referrals: cell("referrals_es"),
        contact: cell("contact_es"),
        tags: spanishTags.length ? spanishTags : null
      }
    }
  };
}

async function loadResourcesFromSheet() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(RESOURCE_SHEET_CSV, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Sheet request failed with ${response.status}`);

    const rows = parseCsv((await response.text()).replace(/^\uFEFF/, ""));
    const headers = (rows.shift() || []).map(header => header.trim());
    const namedHeaders = headers.filter(Boolean);
    if (["active", "id", "name"].some(header => !headers.includes(header)) ||
        new Set(namedHeaders).size !== namedHeaders.length) {
      throw new Error("The sheet needs unique headers including active, id and name.");
    }

    const records = [];
    const ids = new Set();
    let invalidRows = 0;
    rows.forEach(values => {
      if (values.every(value => !value.trim())) return;
      const fields = Object.fromEntries(headers.map((header, index) => [header, (values[index] || "").trim()]));
      if (falseSheetValues.includes(fields.active.toLowerCase())) return;
      if (!sheetBoolean(fields.active) || values.slice(headers.length).some(value => value.trim())) {
        invalidRows++;
        return;
      }
      const resource = sheetRowToResource(fields);
      if (!resource || ids.has(resource.id)) {
        invalidRows++;
        return;
      }
      ids.add(resource.id);
      records.push(resource);
    });

    if (invalidRows && !records.length) throw new Error("The sheet contains invalid program rows and no usable listings.");
    if (invalidRows) console.warn(`Skipped ${invalidRows} invalid or duplicate program row(s).`);
    return records;
  } catch (error) {
    console.warn("Using the local resource backup because the shared editor could not be loaded.", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

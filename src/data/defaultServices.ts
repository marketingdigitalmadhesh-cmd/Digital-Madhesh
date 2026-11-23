import { ServiceItem } from '../types';

const IMG_STRATEGY = '/src/assets/images/digital_campaign_strategy_1795419642719.jpg';
const IMG_STUDIO = '/src/assets/images/hero_agency_studio_1795419642450.jpg';
const IMG_PRESS = '/src/assets/images/printing_press_production_1795419642157.jpg';
const IMG_COLLATERAL = '/src/assets/images/creative_branding_collateral_1795419642606.jpg';

export const DEFAULT_SERVICES: ServiceItem[] = [
  // ======================== DIGITAL MARKETING (7) ========================
  {
    id: 'facebook-and-instagram-ads',
    title: 'Facebook and Instagram Ads',
    slug: 'facebook-and-instagram-ads',
    category: 'Digital Marketing',
    shortDescription:
      'Targeted social ad campaigns built to reach local buyers across Madhesh Province with clear WhatsApp, Messenger, and lead-form inquiries.',
    heroDescription:
      'Reach customers in specific municipalities, highway corridors, and districts with structured Facebook and Instagram campaigns designed around real inquiries rather than empty page likes.',
    overview:
      'Facebook and Instagram remain the primary daily discovery channels for households, students, patients, and retail shoppers across Madhesh Province. Simply clicking "Boost Post" wastes budget on broad, uninterested clicks. Digital Madhesh builds structured Ads Manager campaigns with district-level radius targeting, localized Nepali, Maithili, and Bhojpuri creative variations, and direct WhatsApp or instant-form conversion pathways.',
    benefits: [
      'Precise city and kilometer-radius targeting around your showroom, clinic, or campus.',
      'Separate campaign testing for creatives, headlines, and audiences to reduce wasted ad spend.',
      'Direct routing to WhatsApp Business, phone calls, or instant lead forms.',
      'Clear monthly breakdown showing ad spend, reach, clicks, and actual inquiries received.',
    ],
    deliverables: [
      'Ads Manager campaign structure and audience segmentation',
      'Scroll-stopping static and short video ad creatives',
      'Ad copy tailored to regional buyers in Madhesh Province',
      'Weekly budget pacing and placement optimization',
      'Transparent performance summary report',
    ],
    faqs: [
      {
        question: 'How is this different from boosting posts directly from our Facebook page?',
        answer:
          'Boosting only optimizes for basic engagement. Ads Manager gives full control over conversion objectives, location exclusions, retargeting audiences, placements, and cost-per-lead tracking.',
      },
      {
        question: 'What budget do local businesses typically start with?',
        answer:
          'Budgets depend on your district coverage and competition, but most local businesses start with a modest daily test budget that we scale only once inquiry quality is verified.',
      },
      {
        question: 'Can ads send inquiries directly to our WhatsApp number?',
        answer:
          'Yes. Click-to-WhatsApp campaigns are one of our most effective formats for clinics, schools, real estate, and retail businesses across Sarlahi, Dhanusha, and Parsa.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Digital marketing strategists analyzing Facebook and Instagram ad campaign metrics',
    relatedSlugs: ['meta-ads-management', 'meta-pixel-setup', 'lead-generation-campaigns'],
    seoTitle: 'Facebook & Instagram Ads Agency in Madhesh Province | Digital Madhesh',
    seoDescription:
      'Targeted Facebook and Instagram advertising services in Sarlahi and across Madhesh Province. Turn local social reach into WhatsApp leads and store visits.',
    sortOrder: 1,
    active: true,
  },
  {
    id: 'meta-ads-management',
    title: 'Meta Ads Management',
    slug: 'meta-ads-management',
    category: 'Digital Marketing',
    shortDescription:
      'Full-cycle Meta Ads management covering account health, creative testing, audience retargeting, and conversion optimization.',
    heroDescription:
      'Dedicated ongoing management of your Meta advertising account—combining audience architecture, creative refreshes, and pixel-backed optimization.',
    overview:
      'Sustainable paid social performance requires disciplined ongoing management rather than set-and-forget campaigns. Our Meta Ads Management service oversees your Business Manager structure, ad fatigue rotation, custom and lookalike audiences, and conversion API feedback loops so your cost per inquiry remains steady as your campaigns scale.',
    benefits: [
      'Full Business Manager, Ad Account, and billing governance with client ownership.',
      'Structured funnel separating cold discovery from warm website/video retargeting.',
      'Proactive creative refresh cycles before ad frequency causes rising costs.',
      'Protection against common policy rejections and ad account restrictions.',
    ],
    deliverables: [
      'Account audit and Business Manager security setup',
      'Multi-stage campaign setup (Prospecting + Retargeting)',
      'Ongoing A/B testing of hooks, formats, and CTAs',
      'Monthly creative refresh coordination',
      'Bi-weekly or monthly performance review call',
    ],
    faqs: [
      {
        question: 'Who owns the Meta Ad Account and payment card?',
        answer:
          'You retain full ownership of your Business Manager, page, and ad account. We operate through authorized partner permissions for complete transparency.',
      },
      {
        question: 'Do you manage retargeting for people who visited our website or messaged us?',
        answer:
          'Yes. We build custom audiences from page engagers, video viewers, and Meta Pixel website events to follow up with interested prospects.',
      },
      {
        question: 'How often are campaigns checked and adjusted?',
        answer:
          'Active campaigns are monitored multiple times per week for spend pacing, lead quality, and creative fatigue.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Marketing team reviewing Meta Ads Manager conversion funnel',
    relatedSlugs: ['facebook-and-instagram-ads', 'conversion-api-setup', 'social-media-creative-design'],
    seoTitle: 'Meta Ads Management Services in Nepal | Digital Madhesh',
    seoDescription:
      'Professional Meta Ads management in Madhesh Province, Nepal. Full-funnel campaign optimization, retargeting, and transparent lead reporting.',
    sortOrder: 2,
    active: true,
  },
  {
    id: 'google-ads',
    title: 'Google Ads',
    slug: 'google-ads',
    category: 'Digital Marketing',
    shortDescription:
      'Capture high-intent searchers on Google Search and Google Maps when customers actively look for your products or services.',
    heroDescription:
      'Appear at the exact moment buyers search for hospitals, colleges, hardware suppliers, or commercial services across Madhesh Province and Nepal.',
    overview:
      'Unlike social feeds where people are browsing casually, Google Search Ads connect your business with people actively typing what they need right now. We research real Nepali and English search terms used in your industry, filter out irrelevant clicks with negative keyword lists, write clear search ad extensions, and track every phone call and form submission.',
    benefits: [
      'Capture urgent, high-intent buyers actively searching for your service.',
      'Strict negative keyword filtering to stop budget leaking on unrelated searches.',
      'Call extensions and location targeting synchronized with Google Business Profile.',
      'Verified conversion tracking tied to Google Analytics and landing page actions.',
    ],
    deliverables: [
      'Local and national keyword intent research',
      'Search campaign, ad group, and negative keyword setup',
      'Responsive search ad copywriting with sitelink and call extensions',
      'Conversion action tracking for calls and forms',
      'Search term audit and monthly bid/budget reporting',
    ],
    faqs: [
      {
        question: 'Do I need a website to run Google Search Ads?',
        answer:
          'Yes, a fast, focused website or landing page significantly improves your Quality Score, lowers cost-per-click, and turns search clicks into measurable leads.',
      },
      {
        question: 'Can we target only specific cities like Janakpur, Birgunj, or Harion?',
        answer:
          'Yes. Google Ads allows geographic targeting by city, region, or radius so your budget focuses strictly on areas you serve.',
      },
      {
        question: 'How do you prevent wasted clicks on irrelevant searches?',
        answer:
          'We use exact and phrase match keywords alongside curated negative keyword lists and regular search-term audits.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Strategists planning Google Search Ads keyword campaigns',
    relatedSlugs: ['landing-page-development', 'conversion-tracking', 'marketing-analytics-and-reporting'],
    seoTitle: 'Google Ads Agency in Madhesh Province, Nepal | Digital Madhesh',
    seoDescription:
      'Targeted Google Search and Display advertising managed by Digital Madhesh in Harion, Sarlahi. Capture high-intent customer searches across Nepal.',
    sortOrder: 3,
    active: true,
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    category: 'Digital Marketing',
    shortDescription:
      'Consistent brand storytelling, content calendars, and community management across Facebook, Instagram, TikTok, and LinkedIn.',
    heroDescription:
      'Build credible local brand visibility with structured monthly content calendars, bilingual captions, and timely community engagement.',
    overview:
      'When prospective customers hear about your business—whether from a flex banner on the highway or a word-of-mouth referral—the first thing they check is your Facebook or Instagram page. An inactive or cluttered page weakens trust. We plan and publish consistent, culturally relevant posts, festival greetings, educational carousels, and behind-the-scenes stories that represent your business professionally.',
    benefits: [
      'Consistent visual identity across posts, reels, stories, and profile covers.',
      'Planned monthly content calendar aligned with regional seasons and business offers.',
      'Bilingual captioning that speaks naturally to local communities.',
      'Coordinated alignment between organic posts and paid ad promotions.',
    ],
    deliverables: [
      'Monthly content strategy and publishing calendar',
      'Custom-designed social graphics and short reel edits',
      'Caption writing with relevant local hashtags',
      'Page optimization (bios, CTAs, highlights, contact links)',
      'Monthly engagement and reach summary',
    ],
    faqs: [
      {
        question: 'How many posts per month are included?',
        answer:
          'Posting frequency depends on your selected monthly plan—typically ranging from 12 to 24 scheduled posts and reels per month tailored to your business pace.',
      },
      {
        question: 'Do you handle festival and local occasion creatives?',
        answer:
          'Yes. Major regional and national occasions such as Chhath, Dashain, Tihar, Eid, Maghe Sankranti, and New Year are planned ahead in your calendar.',
      },
      {
        question: 'Can you coordinate with our in-house staff to capture raw photos or videos?',
        answer:
          'Yes. We provide simple shot lists for your team to record quick clips on-site, which we edit and brand professionally.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Social media content calendar and creative review session',
    relatedSlugs: ['social-media-creative-design', 'promotional-video-editing', 'content-writing'],
    seoTitle: 'Social Media Marketing Agency in Sarlahi & Madhesh | Digital Madhesh',
    seoDescription:
      'Consistent social media management, content calendars, and brand growth for businesses and institutions across Madhesh Province, Nepal.',
    sortOrder: 4,
    active: true,
  },
  {
    id: 'lead-generation-campaigns',
    title: 'Lead Generation Campaigns',
    slug: 'lead-generation-campaigns',
    category: 'Digital Marketing',
    shortDescription:
      'Conversion-engineered campaigns designed to deliver qualified inquiries with verified phone numbers and genuine buyer intent.',
    heroDescription:
      'Generate structured customer inquiries—complete with name, phone number, and service need—for schools, hospitals, real estate, and B2B services.',
    overview:
      'Not all leads are equal. Poorly configured lead forms collect accidental taps and unreachable phone numbers. Our Lead Generation Campaigns pair qualifying form questions, dedicated landing pages, and strong offer framing so your sales or admissions desk receives inquiries from people who genuinely want a callback.',
    benefits: [
      'Higher lead quality using intentional qualifying questions on forms.',
      'Fast routing to Google Sheets, CRM, email, or WhatsApp follow-up workflows.',
      'Clear offer positioning that filters out tire-kickers.',
      'Cost-per-qualified-lead tracking so you know real acquisition economics.',
    ],
    deliverables: [
      'Offer and lead magnet framing',
      'High-intent Meta Instant Forms or custom landing page forms',
      'Targeted ad creative and copy variations',
      'Lead capture notification workflow',
      'Lead quality feedback loop and campaign tuning',
    ],
    faqs: [
      {
        question: 'How do you reduce fake or accidental phone numbers in Facebook lead forms?',
        answer:
          'We add intentional qualifying questions, disable auto-fill frictionless traps where appropriate, or route traffic to a dedicated web landing page with phone validation.',
      },
      {
        question: 'Which industries benefit most from lead generation campaigns?',
        answer:
          'Educational admissions, clinics and diagnostics, real estate projects, solar/machinery dealers, coaching centers, and service providers see strong results.',
      },
      {
        question: 'How quickly do we receive each new lead?',
        answer:
          'Leads are captured in real time so your team can call or message prospects within minutes while interest is highest.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Lead generation funnel review at Digital Madhesh',
    relatedSlugs: ['landing-page-development', 'meta-ads-management', 'conversion-tracking'],
    seoTitle: 'Lead Generation Campaigns in Madhesh Province | Digital Madhesh',
    seoDescription:
      'Structured lead generation campaigns in Sarlahi and Madhesh Province designed to capture verified phone inquiries for schools, clinics, and businesses.',
    sortOrder: 5,
    active: true,
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    slug: 'performance-marketing',
    category: 'Digital Marketing',
    shortDescription:
      'Data-backed paid acquisition combining Meta Ads, Google Ads, landing pages, and server-side conversion tracking.',
    heroDescription:
      'An integrated growth system linking creative testing, multi-channel media buying, and verified conversion attribution.',
    overview:
      'Performance marketing treats advertising as a measurable investment rather than a branding expense. We unify ad creative testing, landing page optimization, Meta Pixel + Conversion API, and Google conversion tracking into one feedback loop—allocating budget toward the channels, districts, and creatives that produce real sales and inquiries.',
    benefits: [
      'Cross-channel budget allocation between Meta and Google based on actual cost per inquiry.',
      'Full-funnel tracking from ad impression to form submit or WhatsApp click.',
      'Structured experimentation roadmap rather than random campaign tweaks.',
      'Clear monthly attribution summaries without vanity-metric fluff.',
    ],
    deliverables: [
      'Cross-channel acquisition plan',
      'Pixel, Conversion API, and analytics event architecture',
      'Dedicated conversion landing page recommendations or builds',
      'Continuous creative and audience experimentation',
      'Executive performance dashboard and monthly debrief',
    ],
    faqs: [
      {
        question: 'What makes performance marketing different from basic social media posting?',
        answer:
          'Performance marketing focuses strictly on measurable business actions—leads, bookings, store visits, or online orders—backed by conversion tracking and iterative testing.',
      },
      {
        question: 'Do we need tracking installed before launching performance campaigns?',
        answer:
          'Yes. Proper Pixel, CAPI, and GA4 setup ensures ad algorithms learn from real conversions rather than cheap clicks.',
      },
      {
        question: 'Can we start with one channel and expand later?',
        answer:
          'Yes. Many clients start with Meta Lead/WhatsApp campaigns and add Google Search Ads once their landing page and sales follow-up rhythm are established.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Performance marketing analytics screen in agency studio',
    relatedSlugs: ['conversion-api-setup', 'google-ads', 'marketing-analytics-and-reporting'],
    seoTitle: 'Performance Marketing Agency in Nepal | Digital Madhesh',
    seoDescription:
      'Data-driven performance marketing combining Meta Ads, Google Ads, and verified conversion tracking for growing businesses in Madhesh Province.',
    sortOrder: 6,
    active: true,
  },
  {
    id: 'marketing-strategy-and-consultation',
    title: 'Marketing Strategy and Consultation',
    slug: 'marketing-strategy-and-consultation',
    category: 'Digital Marketing',
    shortDescription:
      'Practical marketing roadmaps uniting digital campaigns, local print visibility, budget planning, and sales follow-up.',
    heroDescription:
      'Get a clear, grounded 90-day marketing and print plan tailored to your district, competition, and realistic budget.',
    overview:
      'Many organizations spend money piecemeal on isolated banners, boosted posts, or disconnected websites without a unified plan. Our consultation service evaluates your current customer journey, local competitors across Madhesh Province, pricing offers, and internal team capacity—delivering a practical execution roadmap you can act on immediately.',
    benefits: [
      'Avoid costly trial-and-error across ad channels and print materials.',
      'Clear budget split across digital ads, creative assets, and outdoor print.',
      'Actionable messaging positioning tailored to Madhesh buyers.',
      'Practical recommendations for your sales or front-desk follow-up process.',
    ],
    deliverables: [
      'Current brand, website, and social channel audit',
      'Target audience and district coverage mapping',
      '90-day integrated digital and print action plan',
      'Recommended budget and KPI benchmarks',
      '1-on-1 strategy walkthrough with leadership',
    ],
    faqs: [
      {
        question: 'Can we book a strategy consultation before committing to a monthly retainer?',
        answer:
          'Yes. Many businesses start with a strategy session to clarify priorities before choosing which campaigns or printing services to run.',
      },
      {
        question: 'Do you include offline printing recommendations in the strategy?',
        answer:
          'Yes. In Madhesh Province, highway flex visibility, brochures, and point-of-sale print often reinforce digital ad recall—we plan both together.',
      },
      {
        question: 'Are consultations available in person in Harion as well as online?',
        answer:
          'Yes. You can visit us in Harion, Sarlahi or schedule a video/phone consultation from anywhere in Nepal.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Marketing strategy consultation meeting around conference table',
    relatedSlugs: ['performance-marketing', 'website-development', 'advertising-design'],
    seoTitle: 'Marketing Strategy & Consultation in Sarlahi | Digital Madhesh',
    seoDescription:
      'Practical digital and offline marketing strategy consultation for businesses, schools, and organizations in Madhesh Province, Nepal.',
    sortOrder: 7,
    active: true,
  },

  // ======================== CREATIVE SERVICES (6) ========================
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    slug: 'graphic-design',
    category: 'Creative Services',
    shortDescription:
      'Clean visual identity systems, logos, brochures, packaging, and print-ready corporate collateral.',
    heroDescription:
      'Structured, memorable graphic design engineered to stay crisp both on mobile screens and on large-format printing presses.',
    overview:
      'Good graphic design is clear communication, not visual clutter. Whether you need a cohesive brand identity for a new enterprise or print-ready brochures, catalogs, and signage layouts, we design with disciplined typography, accurate CMYK/RGB color profiles, and clean visual hierarchy.',
    benefits: [
      'Print-ready CMYK vector files alongside crisp digital RGB exports.',
      'Consistent visual language across stationery, signage, and social channels.',
      'Clean typography and layout hierarchy that stays readable from a distance.',
      'Zero template clones—every layout is built around your brand.',
    ],
    deliverables: [
      'Print-ready PDF/AI/EPS and high-res PNG/SVG exports',
      'Brand color and typography guidelines',
      'Brochures, flyers, catalogs, and packaging artwork',
      'Pre-press bleed and margin verification',
    ],
    faqs: [
      {
        question: 'Do we receive editable source files or print-ready files?',
        answer:
          'Yes. Upon project completion, we provide high-resolution print-ready files as well as digital exports and agreed source formats.',
      },
      {
        question: 'Can you redesign an old logo or clean up a blurry emblem?',
        answer:
          'Yes. We can vectorize existing logos cleanly so they print sharply on everything from small bill pads to 20-foot flex hoardings.',
      },
      {
        question: 'Can Digital Madhesh both design and print the final materials?',
        answer:
          'Yes—having our designers work directly with our printing production ensures zero color surprises or margin errors.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Designed corporate stationery, letterheads, and print collateral',
    relatedSlugs: ['social-media-creative-design', 'advertising-design', 'offset-printing'],
    seoTitle: 'Graphic Design Services in Sarlahi & Madhesh | Digital Madhesh',
    seoDescription:
      'Professional graphic design for logos, brochures, packaging, and print-ready corporate branding by Digital Madhesh in Harion, Sarlahi.',
    sortOrder: 8,
    active: true,
  },
  {
    id: 'social-media-creative-design',
    title: 'Social Media Creative Design',
    slug: 'social-media-creative-design',
    category: 'Creative Services',
    shortDescription:
      'High-contrast social posts, carousel explainers, and paid ad creatives tailored for mobile feeds.',
    heroDescription:
      'Feed-native static graphics and carousels built to stop thumb-scrolling and communicate your offer in under three seconds.',
    overview:
      'Most people see your social posts on 6-inch mobile screens while scrolling quickly. Small text and overcrowded collages get ignored. We design mobile-first social creatives with bold focal hierarchy, clear Nepali or English headlines, and disciplined brand colors that make your business look established and trustworthy.',
    benefits: [
      'Designed specifically for 4:5 portrait, 1:1 square, and 9:16 story/reel aspect ratios.',
      'Clear single-message hierarchy that converts better in paid Meta campaigns.',
      'Consistent branded frames so followers immediately recognize your posts.',
      'Fast turnaround for seasonal offers and timely announcements.',
    ],
    deliverables: [
      'Feed posts, multi-slide carousels, and story graphics',
      'Paid ad creative variants for A/B testing',
      'Cover banners and profile highlight icons',
      'Festival and milestone announcement templates',
    ],
    faqs: [
      {
        question: 'Can you create multiple ad variations for our Meta campaigns?',
        answer:
          'Yes. We routinely design 2 to 4 visual angles for a single offer so we can test which visual drives the lowest cost per lead.',
      },
      {
        question: 'Do you support Devanagari (Nepali) typography cleanly?',
        answer:
          'Yes. We use licensed, legible Devanagari and Latin font pairings designed for crisp readability on mobile screens.',
      },
      {
        question: 'Can we order a one-time pack of festival or admission creatives?',
        answer:
          'Yes, both one-time creative packs and ongoing monthly retainers are available.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Creative team reviewing social media ad designs',
    relatedSlugs: ['facebook-and-instagram-ads', 'social-media-marketing', 'graphic-design'],
    seoTitle: 'Social Media Creative Design in Nepal | Digital Madhesh',
    seoDescription:
      'Mobile-first social media posts, carousels, and high-converting Meta ad creatives designed by Digital Madhesh.',
    sortOrder: 9,
    active: true,
  },
  {
    id: 'advertising-design',
    title: 'Advertising Design',
    slug: 'advertising-design',
    category: 'Creative Services',
    shortDescription:
      'High-impact hoardings, highway flex boards, newspaper ads, standees, and retail campaign visuals.',
    heroDescription:
      'Coordinated campaign artwork built for outdoor hoardings, retail storefronts, print ads, and digital promotions.',
    overview:
      'Outdoor and print advertising lives in fast-moving environments—along the East-West Highway, busy bazaar intersections, and crowded marketplaces. Advertising design demands instant legibility from 50 feet away, unambiguous phone/location callouts, and strong visual contrast. We craft campaign visuals that bridge your highway hoardings and your online ads seamlessly.',
    benefits: [
      'Distance-tested typography and contrast for highway hoardings and shop boards.',
      'Unified campaign look across flex banners, standees, flyers, and Facebook ads.',
      'Accurate scaling for large-format banners without pixelation.',
      'Clear call-to-action placement so passersby remember how to reach you.',
    ],
    deliverables: [
      'Large-format billboard and hoarding artwork',
      'Roll-up standee, backdrop, and shopfront fascia designs',
      'Print newspaper, magazine, and handbill ad layouts',
      'Matched digital resize set for online promotion',
    ],
    faqs: [
      {
        question: 'Can you scale a design for a 20ft x 10ft hoarding without blurriness?',
        answer:
          'Yes. All large-format advertising artwork is built with vector elements and high-DPI photography formatted specifically for large-format plotters.',
      },
      {
        question: 'Should our highway banner match our Facebook ad?',
        answer:
          'Yes. Visual consistency across outdoor print and mobile feeds builds rapid local brand recall in district markets.',
      },
      {
        question: 'Can you print and deliver the banners after designing them?',
        answer:
          'Yes. Our printing unit handles flex, star-flex, vinyl, and standee production right after your final design approval.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Large format advertising banner production and color inspection',
    relatedSlugs: ['flex-printing', 'banner-printing', 'graphic-design'],
    seoTitle: 'Advertising & Hoarding Design Agency in Madhesh | Digital Madhesh',
    seoDescription:
      'Outdoor hoarding, shop board, standee, and print advertising design services in Harion, Sarlahi and across Madhesh Province.',
    sortOrder: 10,
    active: true,
  },
  {
    id: 'video-production',
    title: 'Video Production',
    slug: 'video-production',
    category: 'Creative Services',
    shortDescription:
      'Commercial brand shoots, institutional profiles, product showcases, and testimonial filming.',
    heroDescription:
      'Structured commercial video shoots that showcase your campus, clinic, factory, or showroom with authentic clarity.',
    overview:
      'Authentic video builds trust faster than any static flyer—especially for schools, hospitals, manufacturers, and hospitality venues. We handle pre-production scripting, shot planning, on-site filming across Madhesh Province, clean audio recording, and final delivery formatted for YouTube, websites, and vertical social reels.',
    benefits: [
      'Clear pre-shoot script and shot list so filming stays efficient.',
      'Crisp audio and natural color grading suitable for professional brands.',
      'Multi-format delivery: 16:9 widescreen for YouTube/Web and 9:16 for Reels/TikTok.',
      'On-location production across Sarlahi and neighboring Madhesh districts.',
    ],
    deliverables: [
      'Concept brief, script, and interview prompt sheet',
      'On-site camera, lighting, and wireless audio production',
      'Master widescreen brand film plus vertical social cuts',
      'Bilingual subtitles and branded lower-thirds',
    ],
    faqs: [
      {
        question: 'Do you travel outside Harion for video shoots?',
        answer:
          'Yes. Our production team covers Sarlahi and travels across Madhesh Province districts including Dhanusha, Mahottari, Rautahat, Bara, and Parsa.',
      },
      {
        question: 'Can you film customer or student testimonials on site?',
        answer:
          'Yes. Real, guided interviews with doctors, principals, founders, or satisfied customers are among our highest-performing video assets.',
      },
      {
        question: 'How long does final editing take after shoot day?',
        answer:
          'Standard promotional videos are delivered within 5 to 10 working days depending on length and motion graphics complexity.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Agency production planning for commercial video shoot',
    relatedSlugs: ['promotional-video-editing', 'social-media-marketing', 'facebook-and-instagram-ads'],
    seoTitle: 'Commercial Video Production in Madhesh Province | Digital Madhesh',
    seoDescription:
      'On-location commercial video production, institutional profiles, and brand films across Sarlahi and Madhesh Province, Nepal.',
    sortOrder: 11,
    active: true,
  },
  {
    id: 'promotional-video-editing',
    title: 'Promotional Video Editing',
    slug: 'promotional-video-editing',
    category: 'Creative Services',
    shortDescription:
      'Fast-paced Reels, TikTok ads, product promos, motion captions, and ad-ready video edits from raw footage.',
    heroDescription:
      'Turn raw phone or camera footage into crisp, retention-focused promotional videos and Meta video ads.',
    overview:
      'Short-form vertical video consistently earns the lowest cost-per-reach on Facebook, Instagram, and TikTok—provided the first three seconds hook attention. Send us your raw product demos, showroom tours, or founder clips, and we edit them with tight pacing, animated Nepali/English captions, clean sound design, and clear end-card CTAs.',
    benefits: [
      'Strong 3-second visual hooks engineered for paid ad retention.',
      'Readable animated captions so viewers understand even on mute.',
      'Color correction, audio cleanup, and branded intro/outro framing.',
      'Fast remote turnaround via Google Drive or WhatsApp delivery.',
    ],
    deliverables: [
      'Short-form 9:16 Reels, Shorts, and TikTok edits',
      'Hook variations for paid Meta video ad testing',
      'Dynamic subtitles, callout badges, and brand lower-thirds',
      'Licensed background audio and sound mixing',
    ],
    faqs: [
      {
        question: 'Can we send raw clips recorded on our smartphone?',
        answer:
          'Yes. With simple framing and lighting tips we share beforehand, modern smartphone footage edits into highly effective social ads.',
      },
      {
        question: 'Can you edit multiple hook variations for the same video?',
        answer:
          'Yes. Testing 2–3 different opening hooks on the same body video is a proven way to improve Meta Ads performance.',
      },
      {
        question: 'Do you add Nepali and English subtitles?',
        answer:
          'Yes, clean bilingual or single-language burned-in captions are included.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Promotional video editing and short-form ad review',
    relatedSlugs: ['video-production', 'facebook-and-instagram-ads', 'social-media-creative-design'],
    seoTitle: 'Promotional Video & Reels Editing Agency | Digital Madhesh',
    seoDescription:
      'Conversion-focused Reels, TikTok, and promotional video editing services for businesses in Nepal by Digital Madhesh.',
    sortOrder: 12,
    active: true,
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    slug: 'content-writing',
    category: 'Creative Services',
    shortDescription:
      'Clear website copy, SEO blog articles, ad scripts, and corporate brochures written in natural English and Nepali.',
    heroDescription:
      'Plain, persuasive copywriting for websites, search articles, ad campaigns, and company profiles—free of empty buzzwords.',
    overview:
      'Design brings people in, but clear words convince them to call or visit. We write conversion-focused website pages, locally relevant SEO blog posts, video scripts, and institutional profiles in clean English and Nepali—explaining exactly what your business offers, who it serves, and why customers can trust you.',
    benefits: [
      'Clear, human language tailored to Nepali and Madhesh readers.',
      'SEO-structured headings and topics built around real buyer questions.',
      'Direct alignment between ad headlines and landing page copy.',
      'Zero robotic filler—every paragraph serves a practical point.',
    ],
    deliverables: [
      'Website homepage, about, and service page copy',
      'SEO blog articles and educational guides',
      'Ad copywriting and short video scripts',
      'Print brochure, prospectus, and company profile text',
    ],
    faqs: [
      {
        question: 'Do you write in both English and Nepali?',
        answer:
          'Yes. We craft natural copy in English, Nepali, or bilingual formats depending on your target audience.',
      },
      {
        question: 'Do you interview our team to make sure technical details are accurate?',
        answer:
          'Yes. A brief discovery call ensures every claim, product spec, and institutional detail reflects your actual operations.',
      },
      {
        question: 'Can you write SEO articles to help our website rank locally?',
        answer:
          'Yes. We research real customer questions in your sector and write structured, helpful guides formatted for search engines.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Content writer and strategist drafting agency copy',
    relatedSlugs: ['website-development', 'social-media-marketing', 'marketing-strategy-and-consultation'],
    seoTitle: 'Website & Marketing Content Writing | Digital Madhesh',
    seoDescription:
      'Professional website copywriting, SEO articles, ad scripts, and brochure content in English and Nepali by Digital Madhesh.',
    sortOrder: 13,
    active: true,
  },

  // ======================== WEBSITE AND TRACKING (6) ========================
  {
    id: 'website-development',
    title: 'Website Development',
    slug: 'website-development',
    category: 'Website and Tracking',
    shortDescription:
      'Fast, mobile-first business websites, institutional portals, and service catalogs built for speed, SEO, and lead capture.',
    heroDescription:
      'Custom, responsive websites built for businesses, schools, hospitals, and organizations—engineered for fast mobile loading and clear inquiry capture.',
    overview:
      'Your website is the digital headquarters you own completely—unlike social platforms whose reach changes overnight. We design and engineer modern, mobile-first websites with clean architecture, SEO metadata, schema markup, WhatsApp integration, and conversion tracking built in from day one.',
    benefits: [
      'Fast loading on 4G mobile networks across Nepal.',
      'Technical SEO foundation (clean URLs, metadata, sitemaps, structured data).',
      'Built-in inquiry forms, WhatsApp routing, and Google Maps integration.',
      'Maintainable CMS/admin workflows so your team can update key content easily.',
    ],
    deliverables: [
      'Custom responsive UI design and full-stack development',
      'On-page SEO, OpenGraph, XML sitemap, and schema markup',
      'Contact forms with validation and lead notifications',
      'Meta Pixel and Google Analytics tracking integration',
      'Deployment assistance and post-launch orientation',
    ],
    faqs: [
      {
        question: 'Will the website work smoothly on mobile phones?',
        answer:
          'Yes. Over 80% of local visitors in Madhesh Province browse on smartphones, so every layout is designed mobile-first.',
      },
      {
        question: 'Can you connect our custom domain and hosting later?',
        answer:
          'Yes. We configure clean production builds ready for your domain, SSL certificate, and hosting environment.',
      },
      {
        question: 'Do you include basic SEO setup when building a website?',
        answer:
          'Yes. Clean semantic HTML, page titles, meta descriptions, alt attributes, and structured data are standard on every build.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Modern web development and agency workstation',
    relatedSlugs: ['landing-page-development', 'meta-pixel-setup', 'conversion-tracking'],
    seoTitle: 'Website Development Company in Sarlahi & Madhesh | Digital Madhesh',
    seoDescription:
      'Fast, SEO-ready website development for businesses, schools, and clinics in Madhesh Province, Nepal by Digital Madhesh.',
    sortOrder: 14,
    active: true,
  },
  {
    id: 'landing-page-development',
    title: 'Landing Page Development',
    slug: 'landing-page-development',
    category: 'Website and Tracking',
    shortDescription:
      'Focused, single-objective campaign pages engineered to convert paid Meta and Google Ads traffic into leads.',
    heroDescription:
      'Dedicated high-speed landing pages designed to turn expensive ad clicks into phone calls, WhatsApp chats, and form submissions.',
    overview:
      'Sending paid Meta or Google Ads traffic to a cluttered generic homepage kills conversion rates. A dedicated landing page removes distracting menus and presents one focused offer, local proof, clear FAQs, and a friction-free inquiry form—paired directly with Pixel and Conversion API events.',
    benefits: [
      'Distraction-free layout centered on a single conversion action.',
      'Sub-second mobile load speed to reduce ad bounce rates.',
      'Matched headline messaging between your ad creative and page hero.',
      'Pre-wired form submit, WhatsApp click, and scroll depth tracking.',
    ],
    deliverables: [
      'Conversion copywriting and wireframe layout',
      'Responsive single-page build with fast assets',
      'Validated lead form + instant WhatsApp CTA',
      'Meta Pixel, CAPI, and GA4 conversion event wiring',
    ],
    faqs: [
      {
        question: 'Why use a landing page instead of our main website homepage?',
        answer:
          'A landing page speaks directly to one ad offer (such as "2026 Nursing Admission" or "Solar Pump Subsidy Inquiry") without distracting links, typically producing far higher inquiry rates.',
      },
      {
        question: 'How fast can a campaign landing page be launched?',
        answer:
          'Focused landing pages can typically be designed, built, and wired with tracking within 4 to 7 working days.',
      },
      {
        question: 'Can we test two headline versions?',
        answer:
          'Yes. We structure landing pages cleanly so offer variants can be tested alongside ad creatives.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Strategists evaluating campaign landing page conversion rates',
    relatedSlugs: ['lead-generation-campaigns', 'google-ads', 'conversion-api-setup'],
    seoTitle: 'High-Converting Landing Page Development | Digital Madhesh',
    seoDescription:
      'Dedicated campaign landing pages designed for Meta Ads and Google Ads lead generation in Nepal by Digital Madhesh.',
    sortOrder: 15,
    active: true,
  },
  {
    id: 'meta-pixel-setup',
    title: 'Meta Pixel Setup',
    slug: 'meta-pixel-setup',
    category: 'Website and Tracking',
    shortDescription:
      'Clean installation and verification of Meta Pixel standard and custom events across your website or store.',
    heroDescription:
      'Ensure Meta accurately tracks page views, button clicks, WhatsApp taps, and completed lead forms on your website.',
    overview:
      'Running Facebook or Instagram traffic to a website without a properly verified Meta Pixel means flying blind. Meta cannot optimize for buyers if it cannot see who submits forms or clicks WhatsApp. We install Meta Pixel via Google Tag Manager or direct code, configure domain verification, and verify every event in Meta Events Manager.',
    benefits: [
      'Accurate website visitor retargeting audiences.',
      'Proper event deduplication and domain verification.',
      'Track Leads, CompleteRegistration, Contact, ViewContent, or Purchase events.',
      'Clean diagnostic verification with zero duplicate firing.',
    ],
    deliverables: [
      'Meta Business Manager domain and Pixel audit',
      'Clean Pixel base code + event installation (GTM or direct)',
      'WhatsApp/Phone click and form submission event triggers',
      'Live Event Manager Test Events verification report',
    ],
    faqs: [
      {
        question: 'We already pasted a Pixel ID, why are our leads not showing in Ads Manager?',
        answer:
          'Many sites only install the PageView base code without configuring Lead or Contact triggers—or fire duplicate events. We audit and fix event triggers accurately.',
      },
      {
        question: 'Should we pair Meta Pixel with Conversion API?',
        answer:
          'Yes. Modern browser privacy blocks some client-side cookies, so pairing Pixel with server-side Conversion API gives the cleanest data.',
      },
      {
        question: 'Can you install it through Google Tag Manager?',
        answer:
          'Yes. Using Google Tag Manager keeps your website codebase clean and easy to maintain.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Technical tracking and analytics verification setup',
    relatedSlugs: ['conversion-api-setup', 'conversion-tracking', 'meta-ads-management'],
    seoTitle: 'Meta Pixel Setup & Event Tracking Services | Digital Madhesh',
    seoDescription:
      'Accurate Meta Pixel installation, event verification, and lead tracking setup for Nepali websites by Digital Madhesh.',
    sortOrder: 16,
    active: true,
  },
  {
    id: 'conversion-api-setup',
    title: 'Conversion API Setup',
    slug: 'conversion-api-setup',
    category: 'Website and Tracking',
    shortDescription:
      'Server-side Meta Conversion API (CAPI) implementation with event deduplication for reliable ad attribution.',
    heroDescription:
      'Recover lost browser conversion signals with server-side Meta Conversion API setup and clean Event Match Quality.',
    overview:
      'Ad blockers, iOS privacy limits, and unstable mobile connections often drop browser-only Pixel events—causing Meta Ads to under-report leads and misallocate budget. We configure server-side Meta Conversion API (via cloud server tagging or direct API webhooks) with matching `event_id` deduplication so your ad campaigns receive accurate, privacy-compliant conversion signals.',
    benefits: [
      'Stronger Event Match Quality (EMQ) scores in Meta Events Manager.',
      'Accurate deduplication between browser Pixel and server CAPI events.',
      'Resilient lead tracking even when browsers block third-party scripts.',
      'Improved algorithm optimization for lower cost per acquisition.',
    ],
    deliverables: [
      'Server-side CAPI architecture (sGTM or API endpoint)',
      'Hashed customer parameter matching (email/phone) per Meta spec',
      'Browser + Server event_id deduplication setup',
      'Events Manager diagnostics and match-quality verification',
    ],
    faqs: [
      {
        question: 'Do we still need the browser Meta Pixel if we use Conversion API?',
        answer:
          'Yes. Meta recommends running both browser Pixel and server CAPI together with a shared event_id so Meta deduplicates them and captures maximum signal.',
      },
      {
        question: 'Will duplicate conversions inflate our ad reports?',
        answer:
          'Not when configured properly. We pass synchronized event_id values so Meta counts each conversion exactly once.',
      },
      {
        question: 'What platforms do you support for CAPI?',
        answer:
          'We configure CAPI for custom React/Node apps, WordPress/WooCommerce, Shopify, and Server-Side Google Tag Manager.',
      },
    ],
    image: IMG_STUDIO,
    imageAlt: 'Server-side conversion tracking setup and diagnostics',
    relatedSlugs: ['meta-pixel-setup', 'performance-marketing', 'conversion-tracking'],
    seoTitle: 'Meta Conversion API (CAPI) Setup in Nepal | Digital Madhesh',
    seoDescription:
      'Server-side Meta Conversion API setup with event deduplication and improved Event Match Quality by Digital Madhesh.',
    sortOrder: 17,
    active: true,
  },
  {
    id: 'conversion-tracking',
    title: 'Conversion Tracking',
    slug: 'conversion-tracking',
    category: 'Website and Tracking',
    shortDescription:
      'End-to-end Google Tag Manager, GA4 key events, Google Ads conversions, and WhatsApp/call click tracking.',
    heroDescription:
      'Know exactly which ad, keyword, or page produced every phone tap, WhatsApp message, and contact form submission.',
    overview:
      'Without reliable conversion tracking, marketing decisions rely on gut feeling. We organize all website tracking inside Google Tag Manager (GTM), set up Google Analytics 4 (GA4) key events, configure Google Ads conversion tags, and implement clean UTM naming conventions across your campaigns.',
    benefits: [
      'Track form submissions, WhatsApp clicks, phone link taps, and downloads.',
      'Single clean Google Tag Manager container rather than messy script snippets.',
      'Consistent UTM tagging across Facebook, Google, QR codes, and print flyers.',
      'Verified QA testing across desktop and mobile devices.',
    ],
    deliverables: [
      'Tracking measurement plan mapped to business goals',
      'Google Tag Manager container and dataLayer setup',
      'GA4 key events + Google Ads conversion wiring',
      'UTM link convention guide and live QA checklist',
    ],
    faqs: [
      {
        question: 'Can you track clicks on our WhatsApp button and phone number?',
        answer:
          'Yes. We configure GTM click listeners to fire distinct GA4, Meta, and Google Ads events whenever a visitor taps your WhatsApp or call link.',
      },
      {
        question: 'Can offline print flyers also be tracked digitally?',
        answer:
          'Yes. Using unique UTM-tagged QR codes on brochures, flex banners, and standees, you can measure how many scans and inquiries come from print placements.',
      },
      {
        question: 'Does conversion tracking slow down our website?',
        answer:
          'No. A tidy GTM container consolidates tags and keeps scripts lightweight and non-blocking.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Conversion tracking analytics and GTM container review',
    relatedSlugs: ['marketing-analytics-and-reporting', 'google-ads', 'meta-pixel-setup'],
    seoTitle: 'Conversion Tracking & Google Tag Manager Setup | Digital Madhesh',
    seoDescription:
      'Complete GTM, GA4, Google Ads, and WhatsApp conversion tracking implementation for Nepali businesses by Digital Madhesh.',
    sortOrder: 18,
    active: true,
  },
  {
    id: 'marketing-analytics-and-reporting',
    title: 'Marketing Analytics and Reporting',
    slug: 'marketing-analytics-and-reporting',
    category: 'Website and Tracking',
    shortDescription:
      'Clear monthly dashboards and executive summaries connecting ad spend, website behavior, and lead outcomes.',
    heroDescription:
      'Readable analytics dashboards and honest monthly reporting that turn scattered platform metrics into clear business decisions.',
    overview:
      'Business owners do not have time to decode dozens of confusing columns across Meta Ads Manager, Google Ads, and Google Analytics. We organize your real campaign numbers into clear Looker Studio dashboards and concise monthly reports—highlighting what worked, what cost too much, and what changes next month.',
    benefits: [
      'Unified view of spend, reach, clicks, leads, and cost-per-lead.',
      'Plain-language commentary explaining why numbers shifted.',
      'Zero inflated vanity metrics—real numbers pulled straight from ad accounts.',
      'Clear next-month optimization priorities.',
    ],
    deliverables: [
      'GA4 & Search Console integration check',
      'Custom Looker Studio or executive PDF dashboard',
      'Channel-by-channel ROI and cost-per-inquiry summary',
      'Monthly review briefing with actionable next steps',
    ],
    faqs: [
      {
        question: 'Do we get live access to our analytics dashboard?',
        answer:
          'Yes. We share live read access to your Looker Studio or GA4 property alongside a clean monthly written summary.',
      },
      {
        question: 'Can you connect Google Search Console to track local organic searches?',
        answer:
          'Yes. Google Search Console setup is included so you can monitor which local searches bring organic visitors to your site.',
      },
      {
        question: 'What if we have multiple branches or districts?',
        answer:
          'We break down location performance by district or campaign so you can compare results across service areas.',
      },
    ],
    image: IMG_STRATEGY,
    imageAlt: 'Marketing analytics dashboard and monthly review',
    relatedSlugs: ['conversion-tracking', 'performance-marketing', 'google-ads'],
    seoTitle: 'Marketing Analytics & Reporting Services | Digital Madhesh',
    seoDescription:
      'Transparent marketing analytics, GA4 reporting, and Looker Studio dashboards for businesses across Madhesh Province.',
    sortOrder: 19,
    active: true,
  },

  // ======================== PRINTING AND ADVERTISING (12) ========================
  {
    id: 'flex-printing',
    title: 'Flex Printing',
    slug: 'flex-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Vibrant, weather-resistant standard and star-flex printing for shop boards, highway hoardings, and local promotions.',
    heroDescription:
      'Durable, crisp large-format flex printing in Harion, Sarlahi—engineered for outdoor Madhesh sunlight, monsoon weather, and highway visibility.',
    overview:
      'Outdoor shop boards and roadside flex remain foundational visibility tools across every bazaar and highway town in Madhesh Province. We produce sharp, color-accurate prints on standard, backlit, and heavy-duty star-flex media with optional framing, eyelets, and neat finishing.',
    benefits: [
      'Sharp text and vibrant colors calibrated for outdoor visibility.',
      'Weather-resistant eco-solvent and solvent inks built for Terai sun and rain.',
      'Available in regular flex, heavy star-flex, and backlit board media.',
      'Fast local dispatch from Harion across Sarlahi and neighboring districts.',
    ],
    deliverables: [
      'Pre-press artwork check or custom flex design',
      'High-resolution flex or star-flex print production',
      'Optional edge hemming, brass eyelets, or frame mounting guidance',
      'Protected roll packaging for district transport',
    ],
    faqs: [
      {
        question: 'What is the difference between normal flex and star-flex?',
        answer:
          'Star-flex uses thicker, tighter-woven PVC material with richer ink absorption and tear resistance, making it ideal for long-term shop boards and highway hoardings.',
      },
      {
        question: 'Can you design the flex banner before printing?',
        answer:
          'Yes. Our graphic design team prepares custom layouts sized to your exact frame dimensions before sending to print.',
      },
      {
        question: 'Do you deliver printed flex rolls outside Harion?',
        answer:
          'Yes. We pack and dispatch rolled flex prints across Sarlahi, Mahottari, Rautahat, Dhanusha, Bara, Parsa, Siraha, and Saptari.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Large-format flex printing production at Digital Madhesh',
    relatedSlugs: ['banner-printing', 'advertising-design', 'event-program-and-function-printing'],
    seoTitle: 'Flex Printing Press in Harion, Sarlahi | Digital Madhesh',
    seoDescription:
      'High-quality standard flex, star-flex, and backlit hoarding printing in Harion, Sarlahi with delivery across Madhesh Province.',
    sortOrder: 20,
    active: true,
  },
  {
    id: 'banner-printing',
    title: 'Banner Printing',
    slug: 'banner-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Custom event banners, stage backdrops, roll-up standees, vinyl stickers, and promotional displays.',
    heroDescription:
      'Clean, crisp event banners, vinyl posters, and portable standees built for conferences, school functions, and retail launches.',
    overview:
      'Whether you are hosting an annual school ceremony, launching a new showroom, or setting up a trade stall, clean stage banners and standees frame your brand professionally. We print matte and glossy banners, roll-up standees with aluminum bases, and adhesive vinyl decals sized precisely to your venue.',
    benefits: [
      'Non-glare matte finish options ideal for stage photography and lighting.',
      'Portable roll-up standees ready for quick setup at lobbies and expos.',
      'Precise eyelet spacing and reinforced borders for clean hanging.',
      'Matched typography and branding from invitation to stage backdrop.',
    ],
    deliverables: [
      'Stage backdrops, entrance arches, and directional banners',
      'Roll-up standee prints with sturdy aluminum stands',
      'Adhesive vinyl posters and glass branding decals',
      'Pre-print size and resolution verification',
    ],
    faqs: [
      {
        question: 'Which material is best for indoor stage backdrops under camera flash?',
        answer:
          'Matte star-flex or matte vinyl reduces harsh camera glare so photos and videos from your program stay clear and legible.',
      },
      {
        question: 'Do you supply the standee hardware along with the print?',
        answer:
          'Yes, complete roll-up standees with aluminum base, pole, and carry bag are available as well as replacement print skins.',
      },
      {
        question: 'How fast can urgent event banners be printed?',
        answer:
          'Once artwork is approved, standard banners are typically ready within 24 to 48 hours depending on quantity and finishing.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Commercial banner printing and color proof check',
    relatedSlugs: ['flex-printing', 'event-program-and-function-printing', 'advertising-design'],
    seoTitle: 'Banner & Standee Printing in Sarlahi | Digital Madhesh',
    seoDescription:
      'Event banners, stage backdrops, vinyl stickers, and roll-up standees printed in Harion, Sarlahi for Madhesh Province.',
    sortOrder: 21,
    active: true,
  },
  {
    id: 'offset-printing',
    title: 'Offset Printing',
    slug: 'offset-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'High-volume, sharp four-color offset printing for brochures, pamphlets, books, prospectuses, and catalogs.',
    heroDescription:
      'Cost-effective bulk commercial offset printing with crisp fine-print legibility, consistent ink density, and professional paper stocks.',
    overview:
      'When you need 500 to 50,000+ flyers, school prospectuses, medical booklets, or product catalogs, offset printing delivers unmatched cost-per-copy and razor-sharp micro-text quality. We manage paper selection (art paper, matte card, maplitho), lamination, creasing, folding, and binding cleanly from prepress to packaging.',
    benefits: [
      'Lower unit cost at medium and high print quantities.',
      'Sharp small text and smooth gradients on coated and uncoated paper stocks.',
      'Matte, gloss, and spot finishing options with neat folding or binding.',
      'Strict color proof verification before full press run.',
    ],
    deliverables: [
      'Pamphlets, handbills, and tri-fold brochures',
      'School/college prospectuses, diaries, and annual magazines',
      'Product catalogs, price lists, and wall/desk calendars',
      'Cutting, creasing, center-pinning, or perfect binding',
    ],
    faqs: [
      {
        question: 'What is the minimum quantity for offset printing?',
        answer:
          'Offset printing becomes most economical starting at 500 to 1,000 copies depending on the item size. For very small runs under 100 copies, we recommend digital printing.',
      },
      {
        question: 'What paper weights can we choose from?',
        answer:
          'Common options include 90–130 GSM art paper for flyers, 170–250 GSM for folded brochures, and 300+ GSM card with matte or gloss lamination for covers and folders.',
      },
      {
        question: 'Do you handle both layout design and offset production?',
        answer:
          'Yes. Our designers build multi-page layouts with proper CMYK color separation and bleed margins ready for the press.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Offset printed corporate folders, brochures, and stationery',
    relatedSlugs: ['graphic-design', 'bill-pad-and-letterhead-printing', 'wedding-card-printing'],
    seoTitle: 'Commercial Offset Printing in Madhesh Province | Digital Madhesh',
    seoDescription:
      'Bulk offset printing for brochures, pamphlets, prospectuses, catalogs, and books serving Sarlahi and Madhesh Province.',
    sortOrder: 22,
    active: true,
  },
  {
    id: 'screen-printing',
    title: 'Screen Printing',
    slug: 'screen-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Durable screen printing on t-shirts, aprons, non-woven bags, envelopes, packaging boxes, and promotional merchandise.',
    heroDescription:
      'Long-lasting, opaque screen printing for uniforms, non-woven carry bags, packaging, and bulk promotional items.',
    overview:
      'Screen printing lays down thick, vibrant ink layers that stay crisp after repeated washing and daily handling. Ideal for staff uniforms, school sports jerseys, retail carry bags, courier envelopes, and festival giveaways, our screen printing delivers durable branding at practical batch pricing.',
    benefits: [
      'Wash-resistant, crack-resistant ink durability on fabrics and bags.',
      'Cost-efficient per piece for team uniforms and retail packaging batches.',
      'Clean single-color and multi-color spot registration.',
      'Works across cotton, polyester, non-woven bags, paper envelopes, and boxes.',
    ],
    deliverables: [
      'Custom screen mesh preparation for your logo',
      'Printed staff t-shirts, caps, jackets, or aprons',
      'Branded non-woven and paper shopping bags',
      'Custom printed envelopes and corrugated packaging',
    ],
    faqs: [
      {
        question: 'What items are best suited for screen printing?',
        answer:
          'Staff t-shirts, school uniforms, non-woven shopping bags, wedding/invitation envelopes, and cloth banners are ideal for screen printing.',
      },
      {
        question: 'Is there a minimum batch size for screen printing?',
        answer:
          'Because each color requires preparing a dedicated mesh screen, batches of 25+ pieces offer the best unit pricing.',
      },
      {
        question: 'Will the print peel off t-shirts after washing?',
        answer:
          'When properly cured with quality textile inks, screen printing holds up far longer than cheap heat-transfer stickers.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Screen printing and commercial production workshop',
    relatedSlugs: ['customized-printing', 'batch-printing', 'trophy-medal-and-customized-gift-printing'],
    seoTitle: 'Screen Printing Services in Sarlahi, Nepal | Digital Madhesh',
    seoDescription:
      'Durable screen printing for t-shirts, bags, uniforms, and packaging in Harion, Sarlahi and across Madhesh Province.',
    sortOrder: 23,
    active: true,
  },
  {
    id: 'certificate-printing-with-frame',
    title: 'Certificate Printing with Frame',
    slug: 'certificate-printing-with-frame',
    category: 'Printing and Advertising',
    shortDescription:
      'Crisp heavyweight certificate printing paired with clean glass or acrylic frames for schools, trainings, and awards.',
    heroDescription:
      'Ready-to-present printed and framed certificates for academic honors, training graduations, appreciation awards, and official recognitions.',
    overview:
      'Certificates represent achievement and institutional credibility. Flimsy paper or crooked printing diminishes the moment. We design formal certificate borders, print on textured 300 GSM archival or art card, handle individual variable-name printing so you never have to hand-write names, and assemble them neatly in quality wooden or metallic-finish frames.',
    benefits: [
      'Personalized recipient names printed cleanly directly onto each certificate.',
      'Heavy textured or matte laminated card stocks that stay flat inside frames.',
      'Consistent framing alignment with dust-sealed backing and wall/desk hooks.',
      'Optional gold foil accents or institutional seal placement.',
    ],
    deliverables: [
      'Custom certificate border and typography layout',
      'Variable-data name and date printing from your Excel/CSV list',
      'Heavy card printing (A4, Letter, or custom sizes)',
      'Fitted frames ready for stage presentation',
    ],
    faqs: [
      {
        question: 'Can you print different student or participant names on every certificate automatically?',
        answer:
          'Yes. Just share your Excel or Google Sheet list of names, dates, and courses—we merge and proof every certificate cleanly.',
      },
      {
        question: 'Can we order certificates both with and without frames?',
        answer:
          'Yes. You can order loose printed certificates, protective folders, or complete framed certificates ready to hand out on stage.',
      },
      {
        question: 'How do you pack framed certificates for delivery to other districts?',
        answer:
          'Framed sets are cushioned in protective corrugated sleeves and layered cartons to prevent glass or corner damage during transit.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Embossed and framed certificate of achievement print showcase',
    relatedSlugs: ['trophy-medal-and-customized-gift-printing', 'event-program-and-function-printing', 'batch-printing'],
    seoTitle: 'Certificate Printing with Frame in Sarlahi | Digital Madhesh',
    seoDescription:
      'Custom variable-name certificate printing with quality frames for schools, NGOs, and training centers in Madhesh Province.',
    sortOrder: 24,
    active: true,
  },
  {
    id: 'bill-pad-and-letterhead-printing',
    title: 'Bill Pad and Letterhead Printing',
    slug: 'bill-pad-and-letterhead-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Sequential-numbered carbonless (NCR) or carbon bill books, challans, and branded official letterheads.',
    heroDescription:
      'Dependable business stationery—sequentially numbered invoice pads, VAT/PAN bills, delivery challans, and crisp executive letterheads.',
    overview:
      'Every transaction and official letter carries your company name. We print accurately aligned bill pads, estimate books, credit memos, and official letterheads on smooth 80–100 GSM bond or maplitho paper—complete with sequential numbering, clean perforation, and sturdy binding.',
    benefits: [
      'Sequential red or black numbering with clean tear-off perforation.',
      'Single-ply, 2-ply, or 3-ply carbonless (NCR) and carbon-paper options.',
      'Accurate PAN/VAT registration, QR payment, and bank detail layout.',
      'Smooth laser-printer-friendly paper for official letterheads.',
    ],
    deliverables: [
      'Custom stationery layout aligned with your brand logo',
      '100-sheet or 50-set bound bill/invoice pads',
      'Official A4 letterheads (single or full-color print)',
      'Optional matching window or plain office envelopes',
    ],
    faqs: [
      {
        question: 'Can you include our QR payment code and PAN/VAT details on bill pads?',
        answer:
          'Yes. We verify PAN/VAT numbers, branch addresses, and payment QR placement during proofing before printing.',
      },
      {
        question: 'What is carbonless (NCR) bill paper?',
        answer:
          'NCR paper transfers handwriting cleanly to duplicate/triplicate copies without needing messy loose carbon sheets.',
      },
      {
        question: 'Will your letterheads jam in our office laser or inkjet printer?',
        answer:
          'No. We use smooth 90–100 GSM uncoated bond/maplitho stocks and non-bleeding inks specifically safe for standard office printers.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Printed corporate letterhead and invoice bill pad on neutral desk',
    relatedSlugs: ['receipt-and-record-file-printing', 'offset-printing', 'graphic-design'],
    seoTitle: 'Bill Pad & Letterhead Printing in Sarlahi | Digital Madhesh',
    seoDescription:
      'Numbered invoice bill books, NCR pads, and official company letterheads printed in Harion, Sarlahi for Madhesh businesses.',
    sortOrder: 25,
    active: true,
  },
  {
    id: 'receipt-and-record-file-printing',
    title: 'Receipt and Record File Printing',
    slug: 'receipt-and-record-file-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Fee receipt books, donation vouchers, cooperative passbooks, patient files, and laminated office record folders.',
    heroDescription:
      'Structured fee receipt books, vouchers, medical record files, and institutional folders built for daily administrative durability.',
    overview:
      'Schools, cooperatives, clinics, and local offices rely on sturdy record files and clear receipt books every single day. Cheap thin folders tear within weeks. We manufacture reinforced 300–350 GSM card record files with clip/lace punching alongside numbered receipt books, registers, and admission forms.',
    benefits: [
      'Thick, creased card stock that holds up under frequent filing.',
      'Custom-printed patient history, admission checklists, or account tables inside/outside.',
      'Accurate sequential numbering on cash and fee receipt books.',
      'Available with metal clips, cobra springs, or punched file laces.',
    ],
    deliverables: [
      'Custom-printed office, school, or hospital record files',
      'Fee receipt books, membership passbooks, and cash vouchers',
      'Admission forms, registers, and ledger sheets',
      'Lamination and metal-clip / pocket assembly options',
    ],
    faqs: [
      {
        question: 'Can you print custom medical charts or fee structures inside the record file?',
        answer:
          'Yes. Both outer covers and inside panels can be printed with patient history forms, student indexes, or cooperative schedules.',
      },
      {
        question: 'What binding options are available for record files?',
        answer:
          'We offer traditional punched lace files, cobra clip files, two-ring folders, and pocket folders.',
      },
      {
        question: 'Can we reorder the exact same receipt book numbering sequence later?',
        answer:
          'Yes. We archive your approved template and last serial number so reorders continue seamlessly without duplicating receipt numbers.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Printed corporate record folder and receipt stationery',
    relatedSlugs: ['bill-pad-and-letterhead-printing', 'offset-printing', 'batch-printing'],
    seoTitle: 'Receipt Books & Record File Printing in Madhesh | Digital Madhesh',
    seoDescription:
      'Custom fee receipt books, cooperative passbooks, hospital patient files, and office record folders printed in Sarlahi, Nepal.',
    sortOrder: 26,
    active: true,
  },
  {
    id: 'wedding-card-printing',
    title: 'Wedding Card Printing',
    slug: 'wedding-card-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Traditional, modern minimalist, and foil-accented wedding and Shubha Vivah invitation cards in Nepali, Hindi, Maithili, and English.',
    heroDescription:
      'Thoughtfully crafted wedding invitations—combining cultural warmth, crisp typography, fine card stocks, and matched envelopes.',
    overview:
      'A wedding invitation sets the first impression for your family celebration. Whether you prefer classic red-and-gold Madhesh motifs, clean modern ivory minimalism, or multi-insert boxed suites, we help you select card textures, proof every family name and ceremony schedule carefully, and print matching envelopes and RSVP or reception inserts.',
    benefits: [
      'Careful bilingual proofreading in Nepali, Hindi, Maithili, and English.',
      'Wide selection of textured, metallic, matte, and laser-cut card stocks.',
      'Gold foil stamping, embossing, and wax-seal envelope styling options.',
      'Optional matching digital WhatsApp e-card PDF/image for outstation guests.',
    ],
    deliverables: [
      'Custom typography and cultural motif layout',
      'Printed main invitation cards and ceremony inserts',
      'Matched printed envelopes',
      'Optional digital WhatsApp invitation graphic',
    ],
    faqs: [
      {
        question: 'Can we get a digital WhatsApp wedding invitation matching our printed card?',
        answer:
          'Yes. Many families pair printed cards for local elders and relatives with a matching high-resolution digital invite for WhatsApp guests.',
      },
      {
        question: 'How carefully are family names and ceremony dates checked?',
        answer:
          'We send a clear digital proof for your family to verify every spelling, time, venue, and relative name before any card goes to press.',
      },
      {
        question: 'What is the typical turnaround time for wedding cards?',
        answer:
          'Standard wedding card orders take 4 to 7 working days after final proof approval; foil or custom die-cut cards take slightly longer.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Custom gold-accented wedding invitation card and wax-sealed envelope',
    relatedSlugs: ['graphic-design', 'offset-printing', 'customized-printing'],
    seoTitle: 'Wedding Card Printing in Harion, Sarlahi | Digital Madhesh',
    seoDescription:
      'Custom traditional and modern wedding invitation card printing in Nepali, Hindi, Maithili, and English at Digital Madhesh, Sarlahi.',
    sortOrder: 27,
    active: true,
  },
  {
    id: 'customized-printing',
    title: 'Customized Printing',
    slug: 'customized-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Tailored short-run and custom-spec printing including ID cards, lanyards, stickers, diaries, calendars, and branded packaging.',
    heroDescription:
      'Made-to-order printed items tailored to your exact dimensions, branding, and functional needs—from PVC ID cards to custom labels.',
    overview:
      'Businesses and institutions often need specialized print items that do not fit standard flyer or flex sizes. Our Customized Printing service handles PVC student and staff ID cards with printed lanyards, product packaging labels and stickers, custom diaries, desk calendars, invitation boxes, and bespoke promotional merchandise.',
    benefits: [
      'Flexible quantities without forced massive minimums on specialty items.',
      'Custom sizing, die-cut sticker shapes, and personalized name/photo data.',
      'Consistent brand colors across small accessories and packaging.',
      'One partner to source, design, proof, and finish custom jobs.',
    ],
    deliverables: [
      'PVC ID cards with printed satin lanyards and holders',
      'Product bottle/box labels and die-cut vinyl stickers',
      'Custom branded notebooks, diaries, and table calendars',
      'Personalized invitation sleeves and presentation folders',
    ],
    faqs: [
      {
        question: 'Can you print student or employee PVC ID cards with photos and barcodes?',
        answer:
          'Yes. Share your spreadsheet and photo folder, and we batch-format and print double-sided PVC cards alongside custom-printed lanyards.',
      },
      {
        question: 'Do you print waterproof stickers for bottles, jars, or food packaging?',
        answer:
          'Yes. We offer waterproof matte and gloss vinyl labels cut to custom sizes for local manufacturers and food brands.',
      },
      {
        question: 'Can we request a sample proof before full production?',
        answer:
          'Yes, digital proofs are always shared and physical test proofs can be arranged on custom projects.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Customized printed brand stationery and packaging collateral',
    relatedSlugs: ['screen-printing', 'batch-printing', 'trophy-medal-and-customized-gift-printing'],
    seoTitle: 'Customized Printing Services in Sarlahi, Nepal | Digital Madhesh',
    seoDescription:
      'Custom PVC ID cards, lanyards, product labels, stickers, diaries, and bespoke print solutions in Madhesh Province.',
    sortOrder: 28,
    active: true,
  },
  {
    id: 'batch-printing',
    title: 'Batch Printing',
    slug: 'batch-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'High-volume variable-data and bulk batch printing for exam papers, admit cards, barcodes, labels, and institutional mailers.',
    heroDescription:
      'Accurate, organized batch production for variable-data cards, numbered tags, labels, institutional forms, and bulk mailers.',
    overview:
      'When your organization needs hundreds or thousands of items that share a layout while changing unique serial numbers, student roll numbers, QR codes, or batch codes—manual formatting causes costly mistakes. We automate variable-data batch printing with strict sequence verification and sorted packaging.',
    benefits: [
      'Automated merge from Excel/CSV datasets to eliminate manual typing errors.',
      'Clean serial numbering, QR/barcode generation, and batch coding.',
      'Sorted and bundled packaging by class, branch, or district.',
      'Reliable turnaround for scheduled school, clinic, or factory cycles.',
    ],
    deliverables: [
      'Variable-data admit cards, hall tickets, and ID batches',
      'Numbered tokens, coupons, and event passes',
      'Product batch labels and serialized packaging stickers',
      'Bulk institutional forms and numbered booklets',
    ],
    faqs: [
      {
        question: 'What data format do we need to provide for variable batch printing?',
        answer:
          'A clean Excel (.xlsx) or CSV spreadsheet with column headers—plus a folder of named photos if portraits are needed—is all we need.',
      },
      {
        question: 'Can you sort printed batches by department, school grade, or branch?',
        answer:
          'Yes. We keep sequences in exact order and bundle them according to your distribution list.',
      },
      {
        question: 'Do you generate unique QR codes or serial numbers per copy?',
        answer:
          'Yes. Every ticket, pass, card, or label can carry its own unique serialized number or scannable QR code.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Organized bulk batch printing stacks on inspection table',
    relatedSlugs: ['customized-printing', 'certificate-printing-with-frame', 'receipt-and-record-file-printing'],
    seoTitle: 'Batch & Variable Data Printing Services | Digital Madhesh',
    seoDescription:
      'Automated batch printing for admit cards, numbered passes, serialized labels, and bulk institutional documents in Sarlahi, Nepal.',
    sortOrder: 29,
    active: true,
  },
  {
    id: 'event-program-and-function-printing',
    title: 'Event, Program, and Function Printing',
    slug: 'event-program-and-function-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Complete event print kits: stage backdrops, invitation cards, delegate badges, agendas, certificates, and directional signage.',
    heroDescription:
      'Everything your conference, school annual day, seminar, or community function needs printed under one coordinated schedule.',
    overview:
      'Organizing a formal program, annual day, inauguration, or seminar involves dozens of interdependent print pieces—and missing one item delays the event. We bundle your entire event print kit under one cohesive design language and unified delivery deadline.',
    benefits: [
      'Unified visual theme from VIP invitation card to main stage backdrop.',
      'Single timeline and point of contact instead of chasing five separate print shops.',
      'Buffer proofing to catch spelling, guest title, or schedule errors early.',
      'Complete delivery before event setup day.',
    ],
    deliverables: [
      'Main stage backdrop banner & entrance welcome arch',
      'VIP invitation cards, schedules, and program booklets',
      'Delegate/staff ID badges, lanyards, and table name tents',
      'Framed appreciation certificates and directional standees',
    ],
    faqs: [
      {
        question: 'How far in advance should we book printing for an event or annual function?',
        answer:
          'Ideally 7 to 14 days before the event so all designs, guest lists, trophies, and stage banners are finalized calmly without last-minute rush.',
      },
      {
        question: 'Can you match our event print kit with digital social media invitations?',
        answer:
          'Yes. We create matched digital countdown posts and WhatsApp invites using the exact same artwork.',
      },
      {
        question: 'Do you serve NGOs, municipalities, and schools across all Madhesh districts?',
        answer:
          'Yes. We supply complete event kits for conferences, trainings, school functions, and community events throughout Madhesh Province.',
      },
    ],
    image: IMG_PRESS,
    imageAlt: 'Event backdrop banners and printed booklets ready for delivery',
    relatedSlugs: ['banner-printing', 'certificate-printing-with-frame', 'trophy-medal-and-customized-gift-printing'],
    seoTitle: 'Event & Function Printing Packages in Madhesh | Digital Madhesh',
    seoDescription:
      'Complete printing packages for conferences, school functions, and corporate events across Sarlahi and Madhesh Province.',
    sortOrder: 30,
    active: true,
  },
  {
    id: 'trophy-medal-and-customized-gift-printing',
    title: 'Trophy, Medal, and Customized Gift Printing',
    slug: 'trophy-medal-and-customized-gift-printing',
    category: 'Printing and Advertising',
    shortDescription:
      'Engraved trophies, custom-ribbon medals, tokens of love, printed mugs, diaries, pens, and corporate gift sets.',
    heroDescription:
      'Memorable trophies, sports medals, wooden plaques, and customized gift printing for awards, sports meets, and corporate milestones.',
    overview:
      'Recognition ceremonies and corporate milestones deserve keepsakes people are proud to display. We supply and customize crystal, acrylic, metal, and wooden trophies, engraved tokens of love, custom-ribbon medals, and branded corporate gift items including mugs, water bottles, diaries, pens, and gift boxes.',
    benefits: [
      'Accurate plate engraving and UV/sublimation logo printing.',
      'Wide range of styles suitable for academic honors, sports tournaments, and corporate guests.',
      'Paired neatly with framed certificates for complete award presentations.',
      'Careful individual wrapping for safe transport.',
    ],
    deliverables: [
      'Custom engraved crystal, metal, or wooden trophies & tokens of love',
      'Die-cast and custom-printed sports/academic medals with branded ribbons',
      'Printed ceramic mugs, insulated flasks, pens, and gift hampers',
      'Nameplate proofreading for every award recipient',
    ],
    faqs: [
      {
        question: 'Can you customize the medal ribbons with our school or tournament name?',
        answer:
          'Yes. Both the medal centerpiece sticker/engraving and the neck ribbon can carry your institution name and event colors.',
      },
      {
        question: 'Can we order a single custom token of love for a chief guest, or only bulk?',
        answer:
          'Both single chief-guest tokens of love and bulk tournament medal/trophy sets are available.',
      },
      {
        question: 'Do you print company logos on gift sets for festivals or client appreciation?',
        answer:
          'Yes. Customized diaries, pens, mugs, bottles, and boxed gift hampers are popular for Dashain, Tihar, New Year, and annual meetings.',
      },
    ],
    image: IMG_COLLATERAL,
    imageAlt: 'Custom engraved awards, certificates, and corporate gift stationery',
    relatedSlugs: ['certificate-printing-with-frame', 'event-program-and-function-printing', 'customized-printing'],
    seoTitle: 'Trophy, Medal & Custom Gift Printing in Sarlahi | Digital Madhesh',
    seoDescription:
      'Custom trophies, tokens of love, sports medals, and branded corporate gift printing in Harion, Sarlahi for Madhesh Province.',
    sortOrder: 31,
    active: true,
  },
];

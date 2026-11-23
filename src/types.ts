export type InquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Follow-up'
  | 'Qualified'
  | 'Converted'
  | 'Closed';

export type ServiceCategory =
  | 'Digital Marketing'
  | 'Creative Services'
  | 'Website and Tracking'
  | 'Printing and Advertising';

export interface Inquiry {
  id: string;
  referenceCode: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  businessName?: string;
  interestedService: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  notes?: string;
  followUpDate?: string;
  history?: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags?: string[];
  author: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type ProjectType = 'digital' | 'printing' | 'web' | 'creative';

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  projectType: ProjectType;
  clientName?: string;
  location?: string;
  servicesProvided?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  galleryImages?: string[];
  summary: string;
  overview?: string;
  clientBackground?: string;
  challenge?: string;
  objective?: string;
  strategy?: string;
  execution?: string;
  results?: string;
  conclusion?: string;
  printSpecs?: string;
  metrics?: string[];
  featured?: boolean;
  status: 'draft' | 'published';
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  heroDescription?: string;
  overview?: string;
  benefits?: string[];
  deliverables?: string[];
  faqs?: FAQItem[];
  image?: string;
  imageAlt?: string;
  relatedSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  sortOrder?: number;
  active: boolean;
  updatedAt?: unknown;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  organization: string;
  quote: string;
  outcome?: string;
}

export interface ServiceAreaItem {
  district: string;
  hubs: string;
  description: string;
  focusServices: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface SiteSettings {
  heroHeadline: string;
  heroDescription?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  heroImage?: string;
  aboutImage?: string;
  printingImage?: string;
  aboutIntro?: string;
  aboutMission?: string;
  aboutVision?: string;
  aboutApproach?: string;
  aboutValues?: { title: string; description: string }[];
  aboutDifferentiators?: string[];
  teamMembers?: TeamMember[];
  testimonials?: Testimonial[];
  faqs?: FAQItem[];
  serviceAreas?: ServiceAreaItem[];
  phone: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  businessHours?: string;
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;
  footerDescription?: string;
  socialLinks?: SocialLinks;
  seoSiteTitle?: string;
  seoMetaDescription?: string;
  seoOgImage?: string;
  updatedAt?: unknown;
}

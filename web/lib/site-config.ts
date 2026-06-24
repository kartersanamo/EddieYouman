import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  HardHat,
  Landmark,
  Truck,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
  category: "residential" | "commercial" | "both";
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  before?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
}

export interface TrustBadge {
  label: string;
}

export const site = {
  name: "Eddie Youman Services",
  shortName: "Eddie Youman",
  legalName: "Eddie Youman Services",
  tagline:
    "Professional construction clean up solutions tailored to your project in Jacksonville",
  description:
    "Fully insured, locally owned construction clean up for residential, commercial, and government projects in Jacksonville and surrounding areas. Precision, compliance, and results you can count on.",
  phone: "(904) 520-3177",
  phoneHref: "tel:+19045203177",
  email: "eddie@eddieyouman.com",
  address: "Jacksonville, Florida 32210",
  serviceArea: "Jacksonville & surrounding Northeast Florida communities",
  quotePromise: "Free, no-obligation quotes within 24 hours",
  socialProof: "Trusted by builders, contractors & property owners",
  slotDurationMinutes: 240,
  bookingLeadDays: 1,
  bookingHorizonDays: 60,
} as const;

export const businessHours = [
  { day: "Sunday", hours: "Closed" },
  { day: "Monday", hours: "9:00 AM – 5:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 5:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 5:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 5:00 PM" },
  { day: "Friday", hours: "9:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "Closed" },
] as const;

export const trustBadges: TrustBadge[] = [
  { label: "Fully Insured" },
  { label: "Government-Ready" },
  { label: "Locally Owned" },
  { label: "Jacksonville-Based" },
];

export const services: Service[] = [
  {
    id: "construction-cleaning",
    title: "Construction Cleaning Services",
    shortDescription:
      "Professional, meticulous construction clean up tailored to your project timeline and scope.",
    description:
      "With Eddie Youman Services, Jacksonville residents and contractors receive professional and meticulous construction clean up solutions tailored to every phase of your build. From rough clean to final punch-list detail, I remove debris, dust, and construction residue so your project is ready for inspection, walkthrough, or occupancy.",
    icon: HardHat,
    category: "both",
  },
  {
    id: "emergency-disaster-cleanup",
    title: "Emergency Disaster Cleanup",
    shortDescription:
      "Swift, effective cleanup when storms, flooding, or disasters strike Jacksonville.",
    description:
      "When disaster strikes in Jacksonville, trust Eddie Youman Services to provide swift and effective cleanup solutions. I understand the urgency of emergency situations and respond quickly to restore your property. Whether it's storm damage, water intrusion, or post-disaster debris removal, I bring the experience and equipment to get you back on track.",
    icon: AlertTriangle,
    category: "both",
  },
  {
    id: "government-state-cleanup",
    title: "Government & State Agency Clean Up",
    shortDescription:
      "Precision and compliance for government facilities and state-owned properties.",
    description:
      "I ensure every project, whether for government facilities or state-owned properties, is executed with precision and compliance. Eddie Youman Services meets the standards required for public-sector work — documentation, safety protocols, and thorough results that pass inspection every time.",
    icon: Landmark,
    category: "commercial",
  },
  {
    id: "premium-equipment",
    title: "Premium Equipment Solutions",
    shortDescription:
      "Heavy-duty machinery and specialized tools for efficient, effective cleanup.",
    description:
      "From heavy-duty machinery to specialized tools, I provide everything necessary to get the job done efficiently and effectively. Premium equipment means faster turnaround, safer handling of large debris, and a cleaner finish — whether you're managing a residential renovation or a commercial build-out.",
    icon: Truck,
    category: "both",
  },
];

export const differentiators = [
  "Meticulous attention to detail on every job",
  "Government & commercial compliance expertise",
  "Premium equipment for any project scale",
  "Rapid emergency disaster response",
] as const;

export const capabilityHighlights = [
  "Experienced in government and state agency requirements",
  "Fully insured for residential and commercial projects",
  "Flexible scheduling around your construction timeline",
  "Emergency response available for disaster situations",
] as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "Eddie's team left our jobsite spotless before the final walkthrough. Professional and thorough.",
    name: "Marcus T., General Contractor",
  },
  {
    quote:
      "After the storm, Eddie responded fast and handled the cleanup so we could focus on repairs.",
    name: "Jennifer L., Property Manager",
  },
  {
    quote:
      "Reliable, compliant, and detail-oriented — exactly what we need for our government contracts.",
    name: "David R., Facilities Director",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    alt: "Construction site cleanup in progress",
    category: "Construction Cleaning Services",
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    alt: "Commercial building construction site",
    category: "Construction Cleaning Services",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-cd2a8a4d5c8e?w=800&q=80",
    alt: "Heavy equipment on construction site",
    category: "Premium Equipment Solutions",
  },
  {
    src: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    alt: "Post-construction interior cleanup",
    category: "Construction Cleaning Services",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    alt: "Commercial property exterior",
    category: "Government & State Agency Clean Up",
  },
  {
    src: "https://images.unsplash.com/photo-1598013276336-c9d3c5c0c8e8?w=800&q=80",
    alt: "Disaster cleanup and debris removal",
    category: "Emergency Disaster Cleanup",
  },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(galleryImages.map((img) => img.category))),
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function formatCategory(category: Service["category"]): string {
  switch (category) {
    case "residential":
      return "Residential";
    case "commercial":
      return "Commercial";
    case "both":
      return "Residential & Commercial";
  }
}

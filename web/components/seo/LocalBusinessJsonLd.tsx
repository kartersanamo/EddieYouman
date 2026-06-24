import { businessHours, site } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const openingHours = businessHours
    .filter((row) => row.hours !== "Closed")
    .map((row) => {
      const dayMap: Record<string, string> = {
        Sunday: "Su",
        Monday: "Mo",
        Tuesday: "Tu",
        Wednesday: "We",
        Thursday: "Th",
        Friday: "Fr",
        Saturday: "Sa",
      };
      const [open, close] = row.hours.split(" – ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[row.day],
        opens: open,
        closes: close,
      };
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eddie.kartersanamo.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jacksonville",
      addressRegion: "FL",
      postalCode: "32210",
      addressCountry: "US",
    },
    areaServed: site.serviceArea,
    openingHoursSpecification: openingHours,
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

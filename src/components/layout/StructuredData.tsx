export default function StructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastfremontdistrict.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: "F.E.E.D. — Fremont East Entertainment District",
    description:
      "The Fremont East Entertainment District is a vibrant 6-block, pedestrian-friendly downtown Las Vegas hub located between Las Vegas Blvd and 8th Street. 16 premium venues, one unified operating platform.",
    url: siteUrl,
    logo: `${siteUrl}/images/og/og-default.jpg`,
    image: `${siteUrl}/images/og/og-default.jpg`,
    email: "events@cornerbarmgmt.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "East Fremont Street",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89101",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1692,
      longitude: -115.1402,
    },
    areaServed: {
      "@type": "City",
      name: "Las Vegas",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Corner Bar Management",
      url: "https://www.cornerbarmgmt.com",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 16,
      unitText: "venues",
    },
    sameAs: [
      "https://www.instagram.com/cornerbarmgmt",
      "https://www.linkedin.com/company/corner-bar-management",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "F.E.E.D. — Fremont East Entertainment District",
    url: siteUrl,
    description:
      "16 premium venues on one city block in Downtown Las Vegas. A unified operating platform for large-scale corporate activations.",
    publisher: {
      "@type": "Organization",
      name: "Corner Bar Management",
      url: "https://www.cornerbarmgmt.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

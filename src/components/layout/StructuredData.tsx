export default function StructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://eastfremontdistrict.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: "East Fremont District",
    description:
      "A fully privatized, multi-venue urban event district designed for large-scale corporate activations and convention programming in Downtown Las Vegas.",
    url: siteUrl,
    logo: `${siteUrl}/images/og/og-default.jpg`,
    image: `${siteUrl}/images/og/og-default.jpg`,
    telephone: "+1-702-844-0032",
    email: "events@eastfremontdistrict.com",
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
    name: "East Fremont District",
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

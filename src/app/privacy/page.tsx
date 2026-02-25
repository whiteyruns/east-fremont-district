import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

// ============================================================================
// PAGE HEADER SECTION
// ============================================================================
function PageHeader() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 bg-[#0F1115]">
      <Container>
        <SectionHeading
          label="Legal"
          title="Privacy Policy"
          description="Your privacy matters to us. This policy explains how East Fremont District collects, uses, and protects your information."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// PRIVACY CONTENT SECTION
// ============================================================================
function PrivacyContent() {
  return (
    <section className="py-16 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="max-w-3xl space-y-12">

          {/* Information We Collect */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                East Fremont District, operated by Corner Bar Management, collects limited
                information to respond to inquiries and improve our website experience. We
                do not operate user accounts or process payments through this website.
              </p>
              <p>
                <span className="text-[#F0EDE8] font-semibold">Inquiry Form Data:</span>{" "}
                When you submit an inquiry through our website, we collect the information
                you provide, including your name, email address, company name, and event
                details. This information is submitted voluntarily and used solely to
                respond to your inquiry.
              </p>
              <p>
                <span className="text-[#F0EDE8] font-semibold">Analytics Data:</span>{" "}
                We automatically collect certain technical information when you visit our
                website, including your IP address, browser type, device type, pages
                visited, time spent on pages, and referring URLs. This data is collected
                in aggregate and is not used to personally identify individual visitors.
              </p>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>To respond to your inquiry submissions and facilitate communication regarding potential events and activations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>To understand how visitors interact with our website and improve site performance and content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>To maintain the security and functionality of our website</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>To comply with legal obligations and enforce our terms</span>
                </li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to third parties
                for marketing purposes.
              </p>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Cookies &amp; Tracking
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                Our website uses cookies and similar tracking technologies to enhance your
                browsing experience and gather analytics data. Cookies are small text files
                stored on your device when you visit our website.
              </p>
              <p>
                <span className="text-[#F0EDE8] font-semibold">Session Cookies:</span>{" "}
                These temporary cookies are essential for website functionality and are
                deleted when you close your browser.
              </p>
              <p>
                <span className="text-[#F0EDE8] font-semibold">Analytics Cookies:</span>{" "}
                We use analytics cookies to understand how visitors use our website,
                including which pages are most visited and how users navigate between
                pages. This helps us improve the website experience.
              </p>
              <p>
                You can control cookie settings through your browser preferences. Disabling
                cookies may affect certain website functionality.
              </p>
            </div>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Third-Party Services
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                We may use third-party services for website analytics, hosting, and form
                processing. These service providers may have access to certain information
                as necessary to perform their functions, but they are obligated not to use
                it for other purposes.
              </p>
              <p>
                Our website may contain links to external websites operated by third
                parties. We are not responsible for the privacy practices or content of
                those websites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </div>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Data Retention
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                Inquiry form submissions are retained for as long as necessary to fulfill
                the purpose for which they were collected, including to respond to your
                inquiry and maintain records of communications for potential future
                engagement.
              </p>
              <p>
                Analytics data is retained in aggregate form and does not contain
                personally identifiable information. Session cookies expire when you close
                your browser, and analytics cookies are subject to the retention policies
                of the respective analytics platforms.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Your Rights
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                Depending on your jurisdiction, you may have the following rights regarding
                your personal information:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>The right to access the personal information we hold about you</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>The right to request correction of inaccurate information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>The right to request deletion of your personal information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>The right to opt out of analytics tracking by adjusting your browser or cookie settings</span>
                </li>
              </ul>
              <p>
                To exercise any of these rights, please contact us using the information
                provided below. We will respond to your request within a reasonable
                timeframe.
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="bg-[#1A1D23] border border-[#2A2D33] rounded-lg p-6 space-y-2">
                <p className="text-[#F0EDE8] font-semibold">East Fremont District</p>
                <p>Operated by Corner Bar Management</p>
                <p>Las Vegas, NV</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@eastfremontdistrict.com"
                    className="text-[#C49A6C] hover:underline"
                  >
                    info@eastfremontdistrict.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="pt-8 border-t border-[#2A2D33]">
            <p className="text-[#6B6760] text-xs">
              Last Updated: February 2026
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}

// ============================================================================
// PAGE EXPORT
// ============================================================================
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader />
      <PrivacyContent />
    </>
  );
}

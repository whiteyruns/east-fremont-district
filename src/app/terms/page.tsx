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
          title="Terms &amp; Conditions"
          description="Please read these terms carefully before using the East Fremont District website. By accessing or using this site, you agree to be bound by these terms."
        />
      </Container>
    </section>
  );
}

// ============================================================================
// TERMS CONTENT SECTION
// ============================================================================
function TermsContent() {
  return (
    <section className="py-16 lg:py-24 bg-[#0F1115]">
      <Container>
        <div className="max-w-3xl space-y-12">

          {/* Agreement to Terms */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Agreement to Terms
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                By accessing and using the East Fremont District website
                (&ldquo;Site&rdquo;), operated by Corner Bar Management, you accept and
                agree to be bound by these Terms &amp; Conditions
                (&ldquo;Terms&rdquo;). If you do not agree to these Terms, you should
                not access or use the Site.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use
                the Site. By using the Site, you represent that you are at least 18 years
                of age and have the legal capacity to enter into these Terms.
              </p>
            </div>
          </div>

          {/* Use of Website */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Use of Website
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                The Site is provided for informational purposes and to facilitate
                inquiries related to events, activations, and venue services at East
                Fremont District in Las Vegas, NV. You agree to use the Site only for
                lawful purposes and in accordance with these Terms.
              </p>
              <p>You agree not to:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Use the Site in any way that violates applicable federal, state, local, or international laws or regulations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Attempt to gain unauthorized access to any portion of the Site, its servers, or any connected systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Use any automated system, including bots, scrapers, or data mining tools, to access the Site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Transmit any material that is defamatory, obscene, fraudulent, or otherwise objectionable</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Interfere with or disrupt the Site or the servers and networks connected to the Site</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Intellectual Property
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                All content on the Site, including but not limited to text, graphics,
                logos, images, photographs, videos, design elements, and software, is the
                property of East Fremont District, Corner Bar Management, or their
                respective licensors and is protected by United States and international
                copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works from,
                publicly display, publicly perform, republish, download, store, or
                transmit any content from the Site without the prior written consent of
                East Fremont District, except as permitted by applicable law.
              </p>
              <p>
                The East Fremont District name, logo, and all related names, logos,
                product and service names, designs, and slogans are trademarks of Corner
                Bar Management or its affiliates. You may not use such marks without prior
                written permission.
              </p>
            </div>
          </div>

          {/* Inquiry Submissions */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Inquiry Submissions
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                The Site provides an inquiry form for you to submit information regarding
                potential events, activations, and venue inquiries. By submitting an
                inquiry, you acknowledge and agree to the following:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>All information you provide in your inquiry is accurate and truthful</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Submission of an inquiry does not create any binding agreement, contract, or obligation on the part of East Fremont District or Corner Bar Management</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>East Fremont District reserves the right to respond to or decline any inquiry at its sole discretion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Any event or activation arrangements will be subject to separate written agreements between the parties</span>
                </li>
              </ul>
              <p>
                Your inquiry data will be handled in accordance with our{" "}
                <a href="/privacy" className="text-[#C49A6C] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                To the fullest extent permitted by applicable law, East Fremont District,
                Corner Bar Management, and their respective officers, directors,
                employees, agents, and affiliates shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including but not
                limited to loss of profits, data, use, goodwill, or other intangible
                losses, resulting from:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Your access to or use of, or inability to access or use, the Site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Any conduct or content of any third party on the Site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Any content obtained from the Site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Unauthorized access, use, or alteration of your transmissions or content</span>
                </li>
              </ul>
              <p>
                The Site and all content are provided on an &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; basis without warranties of any kind, either
                express or implied, including but not limited to implied warranties of
                merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Indemnification
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                You agree to defend, indemnify, and hold harmless East Fremont District,
                Corner Bar Management, and their respective officers, directors,
                employees, agents, and affiliates from and against any and all claims,
                damages, obligations, losses, liabilities, costs, or expenses (including
                reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Your use of and access to the Site</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Your violation of any provision of these Terms</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C49A6C] flex-shrink-0">•</span>
                  <span>Your violation of any third-party right, including any intellectual property or privacy right</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Governing Law
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                These Terms shall be governed by and construed in accordance with the laws
                of the State of Nevada, without regard to its conflict of law provisions.
                Any legal action or proceeding arising under these Terms shall be brought
                exclusively in the federal or state courts located in Clark County,
                Nevada, and the parties hereby consent to personal jurisdiction and venue
                therein.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Changes to Terms
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                East Fremont District reserves the right to modify or replace these Terms
                at any time at our sole discretion. If a revision is material, we will
                make reasonable efforts to provide notice prior to any new terms taking
                effect, such as updating the &ldquo;Last Updated&rdquo; date at the
                bottom of this page.
              </p>
              <p>
                Your continued use of the Site after any changes to these Terms
                constitutes your acceptance of the revised Terms. We encourage you to
                review these Terms periodically for any updates.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[#F0EDE8] font-bold text-xl mb-4">
              Contact
            </h2>
            <div className="space-y-4 text-[#9B978F] text-sm leading-relaxed">
              <p>
                If you have any questions about these Terms &amp; Conditions, please
                contact us at:
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
export default function TermsConditionsPage() {
  return (
    <>
      <PageHeader />
      <TermsContent />
    </>
  );
}

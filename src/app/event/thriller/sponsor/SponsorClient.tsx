"use client";

import { useEffect, useState } from "react";
import styles from "../thriller.module.css";

function classes(...c: Array<string | false | null | undefined>): string {
  return c.filter(Boolean).join(" ");
}

const INQUIRE = "/inquire?type=event-sponsorship";

const WHY = [
  {
    n: "01",
    label: "The Moment",
    value: "A guaranteed headline",
    text: "A Guinness World Records attempt is inherently newsworthy — national and local coverage is built into the story, not bolted on.",
  },
  {
    n: "02",
    label: "The Audience",
    value: "15,000 live, plus a city",
    text: "Dancers in costume, their families, tourists, and the Halloween-weekend Downtown crowd — all on one block, all night.",
  },
  {
    n: "03",
    label: "The Exclusivity",
    value: "Own your category",
    text: "Lock category exclusivity for the event. No competitor activates on the floor, in the content, or on the stage.",
  },
  {
    n: "04",
    label: "The Crossover",
    value: "All ages, all culture",
    text: "Gen Z to grandparents, costumes and community — a genuinely broad, feel-good moment brands rarely get to own.",
  },
];

const GETS = [
  {
    n: "i",
    t: "Stage & projection branding",
    d: "Your brand across the main stage and building-scale projection mapping on Fremont East.",
  },
  {
    n: "ii",
    t: "15,000 wristbands & the grid",
    d: "Logo placement on every dancer's wristband and across the official record grid.",
  },
  {
    n: "iii",
    t: "Content, social & the film",
    d: "Co-branded social, creator content, and inclusion in the post-event highlight film.",
  },
  {
    n: "iv",
    t: "On-site activation footprint",
    d: "A physical footprint on the block — sampling, product, and photo moments in the crowd.",
  },
  {
    n: "v",
    t: "VIP hospitality",
    d: "A hosted vantage point on the record for your team, clients, and guests.",
  },
  {
    n: "vi",
    t: "Post-event impact report",
    d: "A full recap — attendance, reach, and earned-media value — for your stakeholders.",
  },
];

const LEVELS = [
  {
    n: "I",
    label: "Presenting Partner",
    value: "Title billing",
    text: '"[Your Brand] presents" naming, top billing across every asset, main-stage and broadcast presence, category exclusivity, full activation footprint, and premium hospitality.',
  },
  {
    n: "II",
    label: "Category Partner",
    value: "Own a lane",
    text: "Category exclusivity — beverage, apparel, auto, tech, or CPG — with a branded moment on the floor, content integration, and dedicated activation space.",
  },
  {
    n: "III",
    label: "Supporting Partner",
    value: "Get in the picture",
    text: "Logo presence across event assets, wristband and merch inclusion, social features, and a footprint on the block the night the record falls.",
  },
];

export default function SponsorClient() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.revealIn);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Stat counter
  useEffect(() => {
    const fmt = (n: number) => n.toLocaleString("en-US");
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count ?? "0", 10);
      const dur = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const els = document.querySelectorAll<HTMLElement>("[data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={classes(styles.nav, navScrolled && styles.navScrolled)}>
        <a href="/event/thriller" className={styles.navBrand}>
          <div className={styles.navMark}>F</div>
          <div className={styles.navWordmark}>
            F.E.E.D.
            <small>Fremont East</small>
          </div>
        </a>
        <div className={styles.navLinks}>
          <a href="/event/thriller">The Event</a>
          <a href="#opportunity">Why Sponsor</a>
          <a href="#levels">Levels</a>
          <a href={INQUIRE} className={styles.navCta}>
            Become a Partner
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero} id="top">
        <div
          className={styles.heroBg}
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(196,154,108,0.16), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(120,80,160,0.14), transparent 55%)",
          }}
        />
        <div className={styles.heroCrowd} />
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            Partnership · Guinness World Records&trade; Attempt
          </div>
          <h1 className={styles.heroTitle}>
            Put your brand at the{" "}
            <span className="brush">center</span>
            <br />
            of a <span className="stroke">world record</span>.
          </h1>
          <p className={styles.heroSub}>
            On October 25, 2026, Fremont East shuts down and{" "}
            <strong>15,000 dancers</strong> attempt the official Guinness World
            Record for the largest simultaneous Thriller performance. It&apos;s a
            made-for-media moment in Downtown Las Vegas — and a rare chance to
            own it end to end.
          </p>
          <div className={styles.heroCtas}>
            <a href={INQUIRE} className={classes(styles.btn, styles.btnGold)}>
              Become a partner <span className="arrow" />
            </a>
            <a
              href="/event/thriller"
              className={classes(styles.btn, styles.btnGhost)}
            >
              See the event <span className="arrow" />
            </a>
          </div>
        </div>
        <div className={styles.heroMeta}>
          <div>
            When · <strong>Oct 25, 2026</strong>
          </div>
          <div>
            Where · <strong>Fremont East</strong>
          </div>
          <div>
            Verified by · <strong>Guinness World Records</strong>
          </div>
        </div>
      </section>

      {/* REACH STATS */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={classes(styles.stat, styles.reveal)}>
              <div className={styles.statLabel}>On the Floor</div>
              <div className={styles.statValue} data-count="15000">
                15,000
              </div>
              <div className={styles.statDetail}>
                Dancers, in costume, in unison — the largest Thriller crowd ever
                assembled.
              </div>
            </div>
            <div
              className={classes(styles.stat, styles.statTarget, styles.reveal)}
            >
              <div className={styles.statLabel}>Earned Media</div>
              <div className={styles.statValue}>296.6M</div>
              <div className={styles.statDetail}>
                F.E.E.D. impressions in Year One — the platform your brand steps
                onto.
              </div>
              <div className={styles.statDelta}>national press built in</div>
            </div>
            <div className={classes(styles.stat, styles.reveal)}>
              <div className={styles.statLabel}>Media Footprint</div>
              <div className={styles.statValue}>Regional TV · National press</div>
              <div className={styles.statDetail}>
                Prior F.E.E.D. events drew regional broadcast, national press
                pickup, and viral creator content.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section className={styles.details} id="opportunity">
        <div className={styles.container}>
          <div className={styles.detailsHead}>
            <div className={styles.reveal}>
              <div className={styles.sectionEyebrow}>Why sponsor</div>
              <h2 className={styles.sectionTitle}>
                A record is <em>a headline</em>
                <br />
                waiting to happen.
              </h2>
            </div>
            <p className={styles.reveal}>
              Most sponsorships buy a logo on a banner. This one puts your brand
              inside a genuine cultural event — a world-record attempt that
              press, creators, and 15,000 people show up for on their own.
            </p>
          </div>

          <div className={styles.detailsGrid}>
            {WHY.map((c) => (
              <div
                key={c.n}
                className={classes(styles.detailCard, styles.reveal)}
              >
                <div className={styles.detailNum}>{c.n}</div>
                <div className={styles.detailLabel}>{c.label}</div>
                <div className={styles.detailValue}>{c.value}</div>
                <div className={styles.detailSub}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT PARTNERS GET */}
      <section className={styles.how}>
        <div className={styles.container}>
          <div className={classes(styles.howHead, styles.reveal)}>
            <div className={styles.sectionEyebrow}>What partners get</div>
            <h2 className={styles.sectionTitle}>
              Your brand, <em>everywhere.</em>
            </h2>
          </div>

          <div className={styles.howSteps}>
            {GETS.map((s) => (
              <div key={s.n} className={classes(styles.step, styles.reveal)}>
                <div className={styles.stepCircle}>{s.n}</div>
                <div className={styles.stepTitle}>{s.t}</div>
                <div className={styles.stepText}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP LEVELS */}
      <section className={styles.details} id="levels">
        <div className={styles.container}>
          <div className={styles.detailsHead}>
            <div className={styles.reveal}>
              <div className={styles.sectionEyebrow}>Partnership levels</div>
              <h2 className={styles.sectionTitle}>
                Three ways in. <em>Built around you.</em>
              </h2>
            </div>
            <p className={styles.reveal}>
              No fixed packages and no off-the-shelf pricing — we scope every
              partnership to your category, goals, and budget. Here&apos;s the
              shape of it.
            </p>
          </div>

          <div className={styles.detailsGrid}>
            {LEVELS.map((c) => (
              <div
                key={c.n}
                className={classes(styles.detailCard, styles.reveal)}
              >
                <div className={styles.detailNum}>{c.n}</div>
                <div className={styles.detailLabel}>{c.label}</div>
                <div className={styles.detailValue}>{c.value}</div>
                <div className={styles.detailSub}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.register} id="partner">
        <div className={styles.registerInner}>
          <div className={styles.reveal}>
            <div className={styles.sectionEyebrow}>Let&apos;s build it</div>
            <h2 className={styles.registerTitle}>
              Align your brand with <em>a world record.</em>
            </h2>
            <p className={styles.registerSub}>
              Tell us your category and what you want out of it — we&apos;ll come
              back with a partnership built around your goals, typically within
              five business days.
            </p>
          </div>
          <div className={classes(styles.heroCtas, styles.reveal)}>
            <a href={INQUIRE} className={classes(styles.btn, styles.btnGold)}>
              Become a partner <span className="arrow" />
            </a>
          </div>
          <div className={styles.formFoot}>
            Produced by Corner Bar · Backed by the City of Las Vegas &amp; the
            LVCVA · Officially adjudicated by Guinness World Records&trade;
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footBot}>
            <div>© 2026 F.E.E.D. · Fremont East Entertainment District</div>
            <div>
              <a
                href="/event/thriller"
                style={{ color: "var(--gold)", textDecoration: "none" }}
              >
                ← Back to the event
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

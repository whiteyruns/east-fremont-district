"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import styles from "./thriller.module.css";

const Moon = dynamic(() => import("./Moon"), { ssr: false });

const SUN_PRESETS: Record<string, [number, number, number]> = {
  // bright limb on the headline-facing side (default)
  left: [-4.5, 1, 2.5],
  // ~70% lit waxing gibbous, reads more like "the moon" at small sizes
  gibbous: [3, 1, 4],
  // very thin cinematic crescent from the right
  thin: [8, 0, 0.5],
  // original from the design / Moon.tsx default — bright limb on the right
  right: [4.5, 1, 2.5],
};

function HeroMoon() {
  const params = useSearchParams();
  const sun = params.get("sun");
  const sunPosition = SUN_PRESETS[sun ?? "left"] ?? SUN_PRESETS.left;

  const [colorFile, setColorFile] = useState<string>("color_4k.jpg");
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setColorFile(mq.matches ? "color_2k.jpg" : "color_4k.jpg");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Moon
      textureBase="/moon"
      size="100%"
      framed={false}
      ambient={false}
      showCredit={false}
      sunPosition={sunPosition}
      colorFile={colorFile}
    />
  );
}

const FAQS = [
  {
    q: "Do I need to know how to dance?",
    a: "Not at all. The official choreography is built for beginners — most steps are walks, claps, and the famous arm-sway. We'll share a full video tutorial you can practice with at home in the weeks leading up to the event.",
  },
  {
    q: "Is there a cost to participate?",
    a: "Registration is completely free. You'll just need to show up on October 25 with a costume of your choosing — full Thriller-zombie attire is encouraged but not required. We recommend arriving by 4:00 PM to avoid the check-in rush.",
  },
  {
    q: "What counts toward the official Guinness count?",
    a: "Every registered dancer with a wristband, in their assigned grid square, dancing the official choreography from start to finish (06:14) is counted by an on-site Guinness adjudicator. You must remain in your square for the duration of the song to qualify.",
  },
  {
    q: "Can kids and families participate?",
    a: "Yes — dancers of all ages are welcome. Anyone under 13 must be accompanied by a registered adult in the same grid square. We have a designated family zone with extra space and a slightly slower-paced rehearsal track.",
  },
  {
    q: "What happens if it rains, or we don't break the record?",
    a: "Las Vegas in late October averages under an inch of rain all month, but we have a contingency reschedule date of October 31 if needed. If we fall short of 13,597, we still throw the largest Thriller block party in history — and we try again in 2027.",
  },
];

// Alternate full tutorials (different teachers / styles). Chips link out to
// YouTube — all verified live + embeddable Jul 2026.
const LESSONS = [
  { name: "Gustavo Krystal — step-by-step", id: "_cxhWEp_DRI" },
  { name: "BeBox — Show Me The Moves", id: "u55ZB2D0Ox0" },
  { name: "pug4pres — mirrored follow-along", id: "cNkCiL5DgRY" },
];

const SHOW_TIME = new Date("2026-10-25T19:00:00-07:00").getTime();

function classes(...c: Array<string | false | null | undefined>): string {
  return c.filter(Boolean).join(" ");
}

export default function ThrillerClient() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState("— days · — hours · — min · — sec");

  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const faqBodyRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal-on-scroll observer
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

  // Stat counter animation
  useEffect(() => {
    const formatNum = (n: number) => n.toLocaleString("en-US");
    const animate = (el: HTMLElement) => {
      const target = parseInt(el.dataset.count ?? "0", 10);
      const isYear = target < 9999 && target > 1900;
      const dur = 1800;
      const start = performance.now();
      const from = isYear ? target - 30 : 0;
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(from + (target - from) * eased);
        el.textContent = isYear ? String(v) : formatNum(v);
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

  // Countdown
  useEffect(() => {
    const tick = () => {
      const diff = SHOW_TIME - Date.now();
      if (diff <= 0) {
        setCountdown("It's happening — go!");
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown(`${d}d · ${h}h · ${m}m · ${s}s until showtime`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Star particle field
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let stars: Array<{
      x: number;
      y: number;
      r: number;
      a: number;
      tw: number;
      ph: number;
      c: string;
    }> = [];
    const shooters: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.floor((W * H) / 2400);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.85,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        ph: Math.random() * Math.PI * 2,
        c:
          Math.random() < 0.08
            ? "#C49A6C"
            : Math.random() < 0.06
              ? "#E63946"
              : "#F0EDE8",
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnShooter = () => {
      const fromLeft = Math.random() < 0.5;
      shooters.push({
        x: fromLeft ? -20 : W + 20,
        y: Math.random() * H * 0.5,
        vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 3),
        vy: 1.5 + Math.random() * 1.5,
        life: 1,
      });
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        s.ph += s.tw * dt;
        const tw = 0.5 + 0.5 * Math.sin(s.ph);
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 0.9) {
          ctx.globalAlpha = s.a * tw * 0.25;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (Math.random() < 0.0025) spawnShooter();
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx * dt;
        sh.y += sh.vy * dt;
        sh.life -= 0.008 * dt;
        if (sh.life <= 0 || sh.x < -50 || sh.x > W + 50 || sh.y > H) {
          shooters.splice(i, 1);
          continue;
        }
        const grd = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x - sh.vx * 8,
          sh.y - sh.vy * 8,
        );
        grd.addColorStop(0, `rgba(240,237,232,${sh.life})`);
        grd.addColorStop(1, "rgba(240,237,232,0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 8, sh.y - sh.vy * 8);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // FAQ open transition (set max-height from measured scrollHeight)
  const toggleFaq = useCallback((i: number) => {
    setOpenFaq((cur) => (cur === i ? null : i));
  }, []);

  useEffect(() => {
    faqBodyRefs.current.forEach((body, i) => {
      if (!body) return;
      body.style.maxHeight = openFaq === i ? `${body.scrollHeight}px` : "0px";
    });
  }, [openFaq]);

  return (
    <>
      <div className={styles.page}>
        {/* NAV */}
        <nav className={classes(styles.nav, navScrolled && styles.navScrolled)}>
          <a href="#top" className={styles.navBrand}>
            <div className={styles.navMark}>F</div>
            <div className={styles.navWordmark}>
              F.E.E.D.
              <small>Fremont East</small>
            </div>
          </a>
          <div className={styles.navLinks}>
            <a href="#about">The Attempt</a>
            <a href="#details">Event</a>
            <a href="#how">How it works</a>
            <a href="#learn">Learn the Dance</a>
            <a href="#faq">FAQ</a>
            <a href="#register" className={styles.navCta}>
              Register Free
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section className={styles.hero} id="top">
          <div className={styles.heroBg}>
            <div className={styles.heroStars}>
              <canvas ref={starCanvasRef} />
            </div>
            <div className={styles.heroMoon}>
              <Suspense fallback={null}>
                <HeroMoon />
              </Suspense>
            </div>
          </div>
          <div className={styles.heroCrowd} />

          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              Oct 25, 2026 · Downtown Las Vegas
            </div>
            <h1 className={styles.heroTitle}>
              World&apos;s <span className="stroke">Largest</span>
              <br />
              <span className="brush">Thriller</span> Dance
            </h1>
            <p className={styles.heroSub}>
              One night. One dance. <strong>15,000 dancers</strong> on Fremont
              East. Hosted by F.E.E.D., we&apos;re attempting the official
              Guinness World Record for the largest simultaneous Thriller
              performance — and we need you on the floor.
            </p>
            <div className={styles.heroCtas}>
              <a
                href="#register"
                className={classes(styles.btn, styles.btnGold)}
              >
                Register now <span className="arrow" />
              </a>
              <a href="#how" className={classes(styles.btn, styles.btnGhost)}>
                Learn more <span className="arrow" />
              </a>
            </div>
          </div>

          <div className={styles.heroMeta}>
            <div>
              Latitude · <strong>36.1699° N</strong>
            </div>
            <div>
              Longitude · <strong>115.1398° W</strong>
            </div>
            <div>
              Curfew · <strong>Sundown</strong>
            </div>
          </div>

          <div className={styles.heroScroll}>Scroll</div>
        </section>

        {/* STATS */}
        <section className={styles.stats} id="about">
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={classes(styles.stat, styles.reveal)}>
                <div className={styles.statLabel}>Current World Record</div>
                <div className={styles.statValue} data-count="13597">
                  13,597
                </div>
                <div className={styles.statDetail}>
                  Set in Mexico City, 2009. The standing benchmark for the
                  largest Thriller dance in history.
                </div>
              </div>
              <div
                className={classes(
                  styles.stat,
                  styles.statTarget,
                  styles.reveal,
                )}
              >
                <div className={styles.statLabel}>Our Target</div>
                <div className={styles.statValue} data-count="15000">
                  15,000
                </div>
                <div className={styles.statDetail}>
                  Fifteen thousand dancers, in costume, in unison, on a single
                  Las Vegas city block.
                </div>
                <div className={styles.statDelta}>
                  +1,403 to break the record
                </div>
              </div>
              <div className={classes(styles.stat, styles.reveal)}>
                <div className={styles.statLabel}>The Year to Beat</div>
                <div className={styles.statValue} data-count="2009">
                  2009
                </div>
                <div className={styles.statDetail}>
                  Seventeen years, untouched. October 25, 2026 — the night the
                  record changes hands.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENT DETAILS */}
        <section className={styles.details} id="details">
          <div className={styles.container}>
            <div className={styles.detailsHead}>
              <div className={styles.reveal}>
                <div className={styles.sectionEyebrow}>The Event</div>
                <h2 className={styles.sectionTitle}>
                  One block. <em>One night.</em>
                  <br />
                  One impossible dance.
                </h2>
              </div>
              <p className={styles.reveal}>
                Fremont East shuts down. Stages, lighting, fog, and a city&apos;s
                worth of choreography sync to a single track. Show up early,
                learn the moves with our crew, and step onto the floor when the
                lights drop.
              </p>
            </div>

            <div className={styles.detailsGrid}>
              <div className={classes(styles.detailCard, styles.reveal)}>
                <div className={styles.detailNum}>01</div>
                <div className={styles.detailIcon}>
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="16" rx="1" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                  </svg>
                </div>
                <div className={styles.detailLabel}>Date</div>
                <div className={styles.detailValue}>Sunday, October 25</div>
                <div className={styles.detailSub}>
                  2026 · The Sunday before Halloween
                </div>
              </div>
              <div className={classes(styles.detailCard, styles.reveal)}>
                <div className={styles.detailNum}>02</div>
                <div className={styles.detailIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 21s-7-7-7-12a7 7 0 0114 0c0 5-7 12-7 12z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div className={styles.detailLabel}>Location</div>
                <div className={styles.detailValue}>Fremont East District</div>
                <div className={styles.detailSub}>Downtown Las Vegas, NV</div>
              </div>
              <div className={classes(styles.detailCard, styles.reveal)}>
                <div className={styles.detailNum}>03</div>
                <div className={styles.detailIcon}>
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <div className={styles.detailLabel}>Check-In Opens</div>
                <div className={styles.detailValue}>4:00 PM</div>
                <div className={styles.detailSub}>
                  Wristband pickup · Costume contest
                </div>
              </div>
              <div className={classes(styles.detailCard, styles.reveal)}>
                <div className={styles.detailNum}>04</div>
                <div className={styles.detailIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className={styles.detailLabel}>Record Attempt</div>
                <div className={styles.detailValue}>7:00 PM Sharp</div>
                <div className={styles.detailSub}>
                  Six minutes. One take. No retries.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className={styles.how} id="how">
          <div className={styles.container}>
            <div className={classes(styles.howHead, styles.reveal)}>
              <div className={styles.sectionEyebrow}>How it works</div>
              <h2 className={styles.sectionTitle}>
                Four steps to <em>history</em>.
              </h2>
            </div>

            <div className={styles.howSteps}>
              {[
                {
                  n: "i",
                  t: "Register & get your wristband",
                  d: "Free sign-up. Pick up your wristband, lyric sheet, and rehearsal map at check-in.",
                },
                {
                  n: "ii",
                  t: "Learn the choreography",
                  d: "Stream the official tutorial at home and practice with your crew before the big night.",
                },
                {
                  n: "iii",
                  t: "Dance together",
                  d: "Find your block on the grid, costume up, and lock in with 14,999 of your closest neighbors.",
                },
                {
                  n: "iv",
                  t: "Make history",
                  d: "A Guinness adjudicator certifies the count. The record falls. You were there.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className={classes(styles.step, styles.reveal)}
                >
                  <div className={styles.stepCircle}>{s.n}</div>
                  <div className={styles.stepTitle}>{s.t}</div>
                  <div className={styles.stepText}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHOREOGRAPHY / LEARN THE DANCE */}
        <section className={styles.videoSection} id="learn">
          <div className={styles.container}>
            <div className={classes(styles.videoHead, styles.reveal)}>
              <div className={styles.sectionEyebrow}>Learn the Dance</div>
              <h2 className={styles.sectionTitle}>
                Six minutes. <em>Learn it cold.</em>
              </h2>
              <p>
                We&apos;re all learning the{" "}
                <strong style={{ color: "var(--cream)" }}>
                  original &ldquo;Thriller&rdquo; choreography
                </strong>{" "}
                — the moves everyone knows, taught step by step for total
                beginners. Watch the full breakdown below, then drill it until
                it&apos;s muscle memory. We&apos;ll confirm the official F.E.E.D.
                run-through and cue sheet closer to the date.
              </p>
            </div>

            <div className={classes(styles.videoEmbed, styles.reveal)}>
              <iframe
                src="https://www.youtube.com/embed/yBYXKrBlveU?rel=0"
                title="Michael Jackson 'Thriller' — step-by-step beginner tutorial with section breakdown (2024)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <div className={classes(styles.lessonBar, styles.reveal)}>
              <span className={styles.lessonBarLabel}>Prefer a different teacher? More full tutorials</span>
              <div className={styles.lessonGrid}>
                {LESSONS.map((l, i) => (
                  <a
                    key={l.id}
                    className={styles.lessonChip}
                    href={`https://www.youtube.com/watch?v=${l.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.lessonNum}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.lessonName}>{l.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <p className={styles.videoCredit}>
              Tutorials by their respective YouTube creators. Original
              &ldquo;Thriller&rdquo; choreography (1983) by Michael Peters and
              Michael Jackson.
            </p>
          </div>
        </section>

        {/* REGISTRATION */}
        <RegisterSection />

        {/* FAQ */}
        <section className={styles.faq} id="faq">
          <div className={styles.container}>
            <div className={styles.faqGrid}>
              <div className={classes(styles.faqSide, styles.reveal)}>
                <div className={styles.sectionEyebrow}>Questions</div>
                <h2 className={styles.sectionTitle}>
                  Things people <em>keep asking.</em>
                </h2>
                <p>
                  Can&apos;t find what you need? Email{" "}
                  <a
                    href="mailto:thriller@feed-vegas.org"
                    style={{ color: "var(--gold)", textDecoration: "none" }}
                  >
                    thriller@feed-vegas.org
                  </a>{" "}
                  and a real human will answer within a day.
                </p>
              </div>

              <div className={classes(styles.faqList, styles.reveal)}>
                {FAQS.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={i}
                      className={classes(
                        styles.faqItem,
                        open && styles.faqItemOpen,
                      )}
                    >
                      <button
                        className={styles.faqTrigger}
                        aria-expanded={open}
                        onClick={() => toggleFaq(i)}
                        type="button"
                      >
                        <span className="num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="q">{f.q}</span>
                        <span className={styles.faqIcon} aria-hidden="true" />
                      </button>
                      <div
                        className={styles.faqBody}
                        ref={(el) => {
                          faqBodyRefs.current[i] = el;
                        }}
                      >
                        <div className={styles.faqBodyInner}>{f.a}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SPONSORS */}
        <section className={styles.sponsors}>
          <div className={styles.container}>
            <div className={styles.sponsorsLabel}>
              Officially Adjudicated &amp; Presented With
            </div>
            <div className={styles.sponsorsRow}>
              <div className={classes(styles.sponsor, styles.sponsorGwr)}>
                Guinness World Records
                <sup
                  style={{
                    fontSize: "10px",
                    color: "var(--gold)",
                    marginLeft: "4px",
                  }}
                >
                  ™
                </sup>
              </div>
              <div className={styles.sponsor}>Sponsor Logo · 01</div>
              <div className={styles.sponsor}>Sponsor Logo · 02</div>
              <div className={styles.sponsor}>Sponsor Logo · 03</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footGrid}>
              <div className={styles.footBrand}>
                <a href="#top" className={styles.navBrand}>
                  <div className={styles.navMark}>F</div>
                  <div className={styles.navWordmark}>
                    F.E.E.D.
                    <small>Fremont East</small>
                  </div>
                </a>
                <p>
                  Fremont East Entertainment District — championing live,
                  communal experiences in Downtown Las Vegas since 2007.
                </p>
              </div>
              <div className={styles.footCol}>
                <h4>Event</h4>
                <ul>
                  <li>
                    <a href="#details">Date &amp; Location</a>
                  </li>
                  <li>
                    <a href="#how">How it works</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className={styles.footCol}>
                <h4>Get Involved</h4>
                <ul>
                  <li>
                    <a href="#register">Register</a>
                  </li>
                  <li>
                    <a href="#">Volunteer</a>
                  </li>
                  <li>
                    <a href="#">Sponsor</a>
                  </li>
                  <li>
                    <a href="#">Press kit</a>
                  </li>
                </ul>
              </div>
              <div className={styles.footCol}>
                <h4>Connect</h4>
                <ul>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">TikTok</a>
                  </li>
                  <li>
                    <a href="#">YouTube</a>
                  </li>
                  <li>
                    <a href="mailto:thriller@feed-vegas.org">Email us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footBot}>
              <div>
                © 2026 F.E.E.D. · Fremont East Entertainment District
              </div>
              <div className="countdown">{countdown}</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function RegisterSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    name: string;
    email: string;
    conf: string;
    alreadyRegistered: boolean;
  } | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  const shake = () => {
    submitRef.current?.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 300 },
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    if (!fn || !ln || !/^\S+@\S+\.\S+$/.test(em)) {
      shake();
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/thriller-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: fn, lastName: ln, email: em }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Registration failed. Please try again.");
      }
      setSuccess({
        name: fn,
        email: em,
        conf: data.confirmationCode,
        alreadyRegistered: !!data.alreadyRegistered,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
      shake();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.register} id="register">
      <div className={styles.registerInner}>
        <div className={styles.reveal}>
          <div className={styles.sectionEyebrow}>Step One</div>
          <h2 className={styles.registerTitle}>
            Claim your <em>spot on the grid.</em>
          </h2>
          <p className={styles.registerSub}>
            Free registration. No fee, no fine print — just your name on the
            dance floor and a wristband waiting at check-in.
          </p>
        </div>

        <div className={styles.reveal}>
          {success ? (
            <div className={styles.formSuccess}>
              <div className={styles.formSuccessMark}>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3>
                {success.alreadyRegistered
                  ? `You're already on the grid, ${success.name}.`
                  : `You're on the grid, ${success.name}.`}
              </h3>
              <p>
                {success.alreadyRegistered ? (
                  <>
                    This email was already registered — you&apos;re all set. We
                    re-sent your confirmation to{" "}
                    <strong style={{ color: "var(--cream)" }}>
                      {success.email}
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Confirmation sent to{" "}
                    <strong style={{ color: "var(--cream)" }}>
                      {success.email}
                    </strong>
                    . Watch your inbox for rehearsal locations and your assigned
                    grid square.
                  </>
                )}
              </p>
              <div className="conf">Confirmation · {success.conf}</div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <NamedField
                  id="fn"
                  label="First Name"
                  value={firstName}
                  onChange={setFirstName}
                  autoComplete="given-name"
                />
                <NamedField
                  id="ln"
                  label="Last Name"
                  value={lastName}
                  onChange={setLastName}
                  autoComplete="family-name"
                />
              </div>
              <NamedField
                id="em"
                type="email"
                label="Email Address"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              {error && (
                <p
                  role="alert"
                  style={{
                    color: "#F26D7D",
                    fontSize: "13px",
                    margin: "-4px 0 0",
                  }}
                >
                  {error}
                </p>
              )}
              <button
                ref={submitRef}
                type="submit"
                className={styles.formSubmit}
                disabled={submitting}
              >
                {submitting ? "Securing your spot…" : "Register for free"}
                {!submitting && <span className="arrow" />}
              </button>
            </form>
          )}
        </div>

        <div className={styles.formFoot}>
          Free registration · <strong>15,000 spots on the grid</strong>
        </div>
      </div>
    </section>
  );
}

function NamedField({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const filled = value.length > 0;
  return (
    <div className={classes(styles.field, filled && styles.fieldFilled)}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

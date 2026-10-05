"use client";

import { useEffect } from "react";
import { ATTRIBUTION_COOKIE, ATTRIBUTION_MAX_AGE, type Attribution } from "@/lib/attribution";

const MAX_LEN = 100;

function param(params: URLSearchParams, key: string): string | undefined {
  const v = params.get(key)?.trim().slice(0, MAX_LEN);
  return v || undefined;
}

/**
 * Stores first-touch campaign attribution in a cookie. Renders nothing.
 * Reads `utm_source` (or `ref` as a short form) plus utm_medium / utm_campaign /
 * utm_content from the landing URL. An existing cookie is left alone so the
 * first touch is what gets credited.
 */
export default function AttributionCapture() {
  useEffect(() => {
    try {
      const already = document.cookie
        .split("; ")
        .some((c) => c.startsWith(`${ATTRIBUTION_COOKIE}=`));
      if (already) return;

      const params = new URLSearchParams(window.location.search);
      const source = param(params, "utm_source") ?? param(params, "ref");
      if (!source) return;

      const attr: Attribution = {
        source,
        medium: param(params, "utm_medium"),
        campaign: param(params, "utm_campaign"),
        content: param(params, "utm_content"),
        landingPath: window.location.pathname,
        firstTouchAt: new Date().toISOString(),
      };

      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie =
        `${ATTRIBUTION_COOKIE}=${encodeURIComponent(JSON.stringify(attr))}` +
        `; Max-Age=${ATTRIBUTION_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    } catch {
      // Cookies blocked or unavailable — attribution is best-effort.
    }
  }, []);

  return null;
}

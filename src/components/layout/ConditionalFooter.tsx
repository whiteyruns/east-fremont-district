"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

/** Hide the full site footer on the landing page and login page (they have their own). */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/login") return null;
  return <SiteFooter />;
}

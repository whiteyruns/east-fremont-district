"use client";

import { usePathname } from "next/navigation";
import SiteFooter from "./SiteFooter";

/** Renders the site footer on all pages except routes that supply their own. */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/event/")) return null;
  return <SiteFooter />;
}

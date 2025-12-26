"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollFix() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);

    if (!el) return;

    // Wait for layout + motion to fully settle
    const timeout = setTimeout(() => {
      el.scrollIntoView({ behavior: "auto", block: "start" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

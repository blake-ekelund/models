"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/app/components/Navbar";

export default function NavbarGate() {
  const pathname = usePathname();

  // Only render navbar on home page
  if (pathname !== "/") return null;

  return <NavBar />;
}

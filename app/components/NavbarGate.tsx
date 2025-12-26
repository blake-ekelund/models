"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/app/components/Navbar";

export default function NavbarGate() {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/models") ||
    pathname.startsWith("/auth");

  return (
    <div className={hideNavbar ? "hidden" : ""}>
      <NavBar />
    </div>
  );
}

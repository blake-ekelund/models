"use client";

import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  topLeft?: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  topLeft,
}: AuthCardProps) {
  return (
    <div className="relative rounded-2xl border border-[#E3E3E3] bg-white p-6 shadow-sm">
      {/* TOP-LEFT SLOT (breadcrumb) */}
      {topLeft && (
        <div className="absolute top-4 left-4">
          {topLeft}
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6 pt-8 text-left">
        <h1 className="text-2xl font-semibold text-[#1B3C53]">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[#456882]">
          {subtitle}
        </p>
      </div>

      {/* CONTENT */}
      {children}
    </div>
  );
}

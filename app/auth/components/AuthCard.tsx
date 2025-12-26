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
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-[#E3E3E3] bg-white p-6 shadow-sm">
        {/* TOP-LEFT SLOT (breadcrumb) */}
        {topLeft && (
          <div className="absolute top-4 left-4">
            {topLeft}
          </div>
        )}

        {/* HEADER */}
        <div className="pt-10 mb-6 text-left">
          <h1 className="text-2xl font-semibold text-[#1B3C53]">
            {title}
          </h1>
          <p className="text-sm text-[#456882] mt-1">
            {subtitle}
          </p>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </div>
  );
}

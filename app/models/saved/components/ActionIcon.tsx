"use client";

import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
  danger?: boolean;
}

export default function ActionIcon({
  children,
  onClick,
  title,
  danger = false,
}: Props) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx(
        "p-2 rounded-md transition-colors",
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-[#456882] hover:bg-[#F7F9FB]"
      )}
    >
      {children}
    </button>
  );
}

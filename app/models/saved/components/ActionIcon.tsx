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
        "p-2 rounded-md transition",
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-500 hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
}

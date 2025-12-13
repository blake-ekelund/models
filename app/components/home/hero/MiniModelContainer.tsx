"use client";

import { forwardRef } from "react";

interface MiniModelContainerProps {
  children: React.ReactNode;
}

const MiniModelContainer = forwardRef<HTMLDivElement, MiniModelContainerProps>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="
          w-full max-w-xl
          h-[625px]
          p-5
          rounded-3xl
          flex flex-col
          bg-[#E3E3E3]
          border border-[#456882]/40
          shadow-[0_20px_40px_-20px_rgba(27,60,83,0.35)]
        "
      >
        <div className="flex-1 flex flex-col text-[#1B3C53]">
          {children}
        </div>
      </div>
    );
  }
);

MiniModelContainer.displayName = "MiniModelContainer";
export default MiniModelContainer;

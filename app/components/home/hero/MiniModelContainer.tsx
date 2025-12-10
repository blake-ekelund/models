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
          p-5 
          rounded-3xl 
          shadow-xl 
          flex flex-col 
          bg-[#234C6A]
          border border-[#456882]
          h-[625px]
        "
      >
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);

MiniModelContainer.displayName = "MiniModelContainer";
export default MiniModelContainer;

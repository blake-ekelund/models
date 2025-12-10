"use client";

interface Props {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export default function PaginationControls({ page, totalPages, setPage }: Props) {
  return (
    <div className="flex items-center gap-3">

      {/* Previous */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          border border-[#D0D4DA] bg-white
          hover:bg-gray-100 disabled:opacity-40
        "
      >
        Previous
      </button>

      {/* Label */}
      <span className="text-sm font-medium text-[#1B3C53]">
        Page {page} of {totalPages}
      </span>

      {/* Next */}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="
          px-4 py-2 rounded-lg text-sm font-medium
          border border-[#D0D4DA] bg-white
          hover:bg-gray-100 disabled:opacity-40
        "
      >
        Next
      </button>

    </div>
  );
}

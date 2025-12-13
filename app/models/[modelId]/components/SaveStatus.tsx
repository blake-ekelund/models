"use client";

import { useModelInstanceStore } from "./useModelInstanceStore";

export default function SaveStatus() {
  const dirty = useModelInstanceStore((s) => s.dirty);
  const lastSavedAt = useModelInstanceStore((s) => s.lastSavedAt);

  if (dirty) {
    return (
      <span className="text-xs text-yellow-600">
        Unsaved changes
      </span>
    );
  }

  if (!lastSavedAt) {
    return (
      <span className="text-xs text-gray-400">
        Not saved yet
      </span>
    );
  }

  const secondsAgo = Math.floor(
    (Date.now() - lastSavedAt.getTime()) / 1000
  );

  return (
    <span className="text-xs text-gray-500">
      Saved {secondsAgo < 60 ? "just now" : `${Math.floor(secondsAgo / 60)}m ago`}
    </span>
  );
}

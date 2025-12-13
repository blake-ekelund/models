"use client";

import { useState } from "react";

interface Props {
  name: string;
  onSave: (n: string) => void;
  onOpen: () => void;
}

export default function EditableName({
  name,
  onSave,
  onOpen,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  if (!editing) {
    return (
      <span
        className="cursor-text hover:underline"
        onClick={() => setEditing(true)}
        onDoubleClick={onOpen}
      >
        {name}
      </span>
    );
  }

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        onSave(value.trim() || name);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave(value.trim() || name);
          setEditing(false);
        }
        if (e.key === "Escape") {
          setEditing(false);
          setValue(name);
        }
      }}
      className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#00338d]"
    />
  );
}

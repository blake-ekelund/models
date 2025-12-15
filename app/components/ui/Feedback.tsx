"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { supabase } from "@/lib/supabaseClient";

export default function Feedback() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Bug");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const pathname = usePathname();

  // ---------------------------------------------------
  // AUTH
  // ---------------------------------------------------
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  // ---------------------------------------------------
  // FOOTER-AWARE OFFSET
  // ---------------------------------------------------
  useEffect(() => {
    function updateOffset() {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const distanceFromBottom =
        documentHeight - (scrollY + viewportHeight);

      const footerSafeSpace = 20;

      if (distanceFromBottom < 120) {
        // push the button up as we approach the bottom
        setBottomOffset(footerSafeSpace + (120 - distanceFromBottom));
      } else {
        setBottomOffset(footerSafeSpace);
      }
    }

    updateOffset();
    window.addEventListener("scroll", updateOffset);
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  // ---------------------------------------------------
  // AUTO-FOCUS + ESC CLOSE
  // ---------------------------------------------------
  useEffect(() => {
    if (!open || submitted) return;

    textareaRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, submitted]);

  function closeModal() {
    setOpen(false);
    setSubmitted(false);
    setMessage("");
    setCategory("Bug");
  }

  if (!user) return null;

  // ---------------------------------------------------
  // SUBMIT
  // ---------------------------------------------------
  async function submit() {
    if (!message.trim()) return;

    setSubmitting(true);

    await supabase.from("support_feedback").insert({
      user_id: user.id,
      email: user.email,
      category,
      message,
      route: pathname,
      context: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
      },
    });

    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        style={{ bottom: bottomOffset }}
        className="
          fixed right-6 z-[9999]
          flex items-center gap-2
          rounded-full
          bg-[#1B3C53] text-white
          px-4 py-3
          shadow-lg
          hover:bg-[#234C6A]
          transition-[bottom,background-color]
        "
      >
        <MessageSquare size={18} />
        Feedback
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              /* SUCCESS STATE */
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#1B3C53]">
                  Feedback received
                </h3>
                <p className="text-sm text-[#456882] max-w-sm">
                  We’ll review this and follow up by email if needed.
                </p>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="
                      px-4 py-2 text-sm rounded-md
                      border border-[#E3E3E3]
                      text-[#456882]
                      hover:bg-[#F7F9FB]
                      transition
                    "
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* FORM STATE */
              <div className="space-y-6">
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B3C53]">
                      Send feedback
                    </h3>
                    <p className="text-sm text-[#456882] mt-1">
                      We read everything. Responses aren’t guaranteed.
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="text-[#456882] hover:text-[#1B3C53] text-lg leading-none"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                {/* FORM */}
                <div className="space-y-5">
                  <Field label="Category">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="
                        w-full rounded-lg bg-[#F7F9FB] border border-[#E3E3E3]
                        px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/30
                      "
                    >
                      <option>Bug</option>
                      <option>Confusing / UX</option>
                      <option>Feature request</option>
                      <option>Other</option>
                    </select>
                  </Field>

                  <Field label="Message">
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Describe what you experienced…"
                      className="
                        w-full rounded-lg bg-[#F7F9FB] border border-[#E3E3E3]
                        px-3 py-2 text-sm resize-none
                        focus:outline-none focus:ring-2 focus:ring-[#1B3C53]/30
                      "
                    />
                  </Field>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="
                      px-4 py-2 text-sm rounded-md
                      border border-[#E3E3E3]
                      text-[#456882]
                      hover:bg-[#F7F9FB]
                      transition
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={submit}
                    disabled={submitting}
                    className={clsx(
                      "px-4 py-2 text-sm rounded-md text-white transition",
                      "bg-[#1B3C53] hover:bg-[#234C6A]",
                      submitting && "opacity-50"
                    )}
                  >
                    {submitting ? "Sending…" : "Send feedback"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------------------------------------
   Field wrapper
--------------------------------------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-[#1B3C53]">
        {label}
      </label>
      {children}
    </div>
  );
}

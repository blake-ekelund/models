"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative z-10 min-h-screen bg-white text-[#1B3C53] px-6 py-20 flex flex-col items-center">

      {/* HEADER */}
      <div className="max-w-6xl w-full text-left mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl font-bold mb-4"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-gray-600 leading-relaxed max-w-6xl"
        >
          Have questions about Synario, financial modeling, pricing, or something you're building?
          Please reach out and we will respond within 24 hours.
        </motion.p>
      </div>

      {/* SUCCESS MESSAGE */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl border border-emerald-300 rounded-2xl p-10 max-w-3xl w-full text-center"
        >
          <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
            Message Sent!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Thanks for reaching out — I'll get back to you soon.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="text-blue-600 hover:underline font-medium"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        /* CONTACT FORM */
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-white rounded-2xl border border-gray-200 shadow-xl p-10 max-w-3xl w-full space-y-8"
        >
          {/* NAME */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none 
                         focus:border-blue-600 text-[#1B3C53]"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none 
                         focus:border-blue-600 text-[#1B3C53]"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Tell me what you're working on and how I can help."
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none 
                         focus:border-blue-600 text-[#1B3C53] resize-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="
              bg-blue-600 text-white font-semibold px-8 py-4 rounded-full 
              hover:bg-blue-700 transition inline-flex items-center justify-center gap-2
            "
          >
            Send Message
            <ArrowRight size={18} />
          </motion.button>
        </motion.form>
      )}
    </div>
  );
}

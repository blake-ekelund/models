"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import MiniModelNav from "./MiniModelNav";
import MiniModelContainer from "./MiniModelContainer";
import CashFlowMini from "./CashFlowMini";
import RevenueModel from "./RevenueModel";
import ExploreMoreModels from "./ExploreMoreModels";
import { supabase } from "@/lib/supabaseClient";

type ModelKey = "Revenue Model" | "Cash Flow Model" | "Explore More";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  const models: ModelKey[] = [
    "Revenue Model",
    "Cash Flow Model",
    "Explore More",
  ];

  const [activeModel, setActiveModel] = useState<ModelKey>("Revenue Model");

  // Export handlers
  const [revenueExportFn, setRevenueExportFn] =
    useState<null | (() => void)>(null);
  const [revenueIsExporting, setRevenueIsExporting] = useState(false);

  const [cashFlowExportFn, setCashFlowExportFn] =
    useState<null | (() => void)>(null);
  const [cashFlowIsExporting, setCashFlowIsExporting] = useState(false);

  /* -------------------------------------
     Resolve auth state once
  -------------------------------------- */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(!!data.session);
    });
  }, []);

  /* -------------------------------------
     MODEL CAPABILITIES
  -------------------------------------- */
  const MODEL_CAPABILITIES: Record<
    ModelKey,
    { export: boolean; settings: boolean }
  > = {
    "Revenue Model": { export: true, settings: true },
    "Cash Flow Model": { export: true, settings: true },
    "Explore More": { export: false, settings: false },
  };

  const { export: canExport, settings: canSettings } =
    MODEL_CAPABILITIES[activeModel];

  /* -------------------------------------
     EXPORT ROUTING
  -------------------------------------- */
  const exportHandler =
    activeModel === "Revenue Model"
      ? revenueExportFn
      : activeModel === "Cash Flow Model"
      ? cashFlowExportFn
      : null;

  const isExporting =
    activeModel === "Revenue Model"
      ? revenueIsExporting
      : activeModel === "Cash Flow Model"
      ? cashFlowIsExporting
      : false;

  /* -------------------------------------
     BACKGROUND PARTICLES
  -------------------------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const POINTS = 60;
    const SPEED = 0.35;

    const particles = Array.from({ length: POINTS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(227,227,227,0.35)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(69,104,130,0.35)";
      ctx.lineWidth = 1;

      for (let i = 0; i < POINTS; i++) {
        for (let j = i + 1; j < POINTS; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.globalAlpha = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* -------------------------------------
     PAGE
  -------------------------------------- */
  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#1B3C53" }}
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 w-full min-h-screen flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl px-4 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-20"
        >
          {/* LEFT — HERO */}
          <div className="flex-1 max-w-lg text-center lg:text-left text-[#E3E3E3]">
            <h1 className="text-6xl font-bold leading-tight mb-6">
              Financial Clarity
              <br />
              for Every Founder.
            </h1>

            <p className="text-[#E3E3E3]/80 text-lg leading-relaxed mb-10">
              Because guessing isn’t a strategy. Understand your numbers, your runway,
              and your next move in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              {isAuthed !== null && (
                <Link
                  href={isAuthed ? "/models/catalog" : "/auth/sign-up"}
                  className="
                    px-6 py-3 rounded-full text-lg font-semibold
                    bg-[#E3E3E3] text-[#1B3C53]
                    shadow hover:scale-[1.03] transition
                    w-full sm:w-auto
                  "
                >
                  Build a Financial Model
                </Link>
              )}

              <Link
                href="/#library"
                className="
                  px-6 py-3 rounded-full text-lg
                  border border-[#456882]
                  text-[#E3E3E3]
                  bg-[#234C6A]/40
                  hover:bg-[#234C6A]/70
                  hover:border-[#E3E3E3]
                  transition
                  w-full sm:w-auto
                "
              >
                Explore Our Models
              </Link>
            </div>
          </div>

          {/* RIGHT — MINI MODEL */}
          <MiniModelContainer ref={modelRef}>
            <MiniModelNav
              models={models}
              activeModel={activeModel}
              onChange={setActiveModel}
              onExport={canExport ? exportHandler : null}
              isExporting={isExporting}
            />

            {/* MODELS (LAYERED) */}
            <div className="relative h-full">
              <div
                className={
                  activeModel === "Revenue Model"
                    ? "relative opacity-100 pointer-events-auto"
                    : "absolute inset-0 opacity-0 pointer-events-none"
                }
              >
                <RevenueModel
                  onExportReady={setRevenueExportFn}
                  onExportStateChange={setRevenueIsExporting}
                />
              </div>

              <div
                className={
                  activeModel === "Cash Flow Model"
                    ? "relative opacity-100 pointer-events-auto"
                    : "absolute inset-0 opacity-0 pointer-events-none"
                }
              >
                <CashFlowMini
                  onExportReady={setCashFlowExportFn}
                  onExportStateChange={setCashFlowIsExporting}
                />
              </div>

              <div
                className={
                  activeModel === "Explore More"
                    ? "relative opacity-100 pointer-events-auto"
                    : "absolute inset-0 opacity-0 pointer-events-none"
                }
              >
                <ExploreMoreModels />
              </div>
            </div>
          </MiniModelContainer>
        </motion.div>
      </div>
    </div>
  );
}
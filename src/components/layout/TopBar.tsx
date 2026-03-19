"use client";

import { Bell, Search, Clock } from "lucide-react";
import { useState, useEffect } from "react";

export default function TopBar({ title }: { title: string }) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Santo_Domingo",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          timeZone: "America/Santo_Domingo",
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-8 h-16"
      style={{
        background: "rgba(11, 15, 26, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Title */}
      <h1
        className="text-xl font-bold tracking-tight"
        style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}
      >
        {title}
      </h1>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Search size={14} style={{ color: "#64748B" }} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-40"
            style={{ color: "#94A3B8", fontFamily: "DM Sans, sans-serif" }}
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#64748B",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            /
          </kbd>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2" style={{ color: "#64748B" }}>
          <Clock size={14} />
          <span className="text-xs font-medium" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {time}
          </span>
          <span className="text-xs" style={{ color: "#475569" }}>
            {date}
          </span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-white/[0.05]"
          style={{ color: "#94A3B8" }}
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#EF4444" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          KG
        </div>
      </div>
    </header>
  );
}

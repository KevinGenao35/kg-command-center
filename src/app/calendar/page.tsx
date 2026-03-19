"use client";

import TopBar from "@/components/layout/TopBar";
import { weeklyCalendar } from "@/lib/data";

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  uf: { bg: "rgba(59,130,246,0.15)", border: "#3B82F6", text: "#93C5FD" },
  university: { bg: "rgba(16,185,129,0.15)", border: "#10B981", text: "#6EE7B7" },
  work: { bg: "rgba(245,158,11,0.15)", border: "#F59E0B", text: "#FCD34D" },
  training: { bg: "rgba(239,68,68,0.15)", border: "#EF4444", text: "#FCA5A5" },
  personal: { bg: "rgba(139,92,246,0.15)", border: "#8B5CF6", text: "#C4B5FD" },
  church: { bg: "rgba(6,182,212,0.15)", border: "#06B6D4", text: "#67E8F9" },
  ooda: { bg: "rgba(236,72,153,0.15)", border: "#EC4899", text: "#F9A8D4" },
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 19 }, (_, i) => i + 4); // 4 AM to 10 PM

function formatHour(h: number): string {
  const hour = Math.floor(h);
  const min = h % 1 === 0.5 ? "30" : h % 1 === 0.25 ? "15" : "00";
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${min} ${ampm}`;
}

export default function CalendarPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Calendar" />

      <div className="px-8 py-6">
        {/* Legend */}
        <div className="flex items-center gap-5 mb-6">
          {Object.entries(categoryColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded" style={{ background: val.border }} />
              <span className="text-xs capitalize" style={{ color: "#94A3B8" }}>{key === "uf" ? "UF (Investor)" : key}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="grid" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
            {/* Header */}
            <div className="p-3" style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
            {days.map((day) => (
              <div key={day} className="p-3 text-center" style={{ background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-xs font-semibold" style={{ color: day === today.slice(0, 3) ? "#3B82F6" : "#94A3B8", fontFamily: "Outfit, sans-serif" }}>
                  {day}
                </p>
              </div>
            ))}

            {/* Time rows */}
            {hours.map((hour) => (
              <div key={hour} className="contents">
                {/* Time label */}
                <div className="flex items-start justify-end pr-2 py-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", height: "48px" }}>
                  <span className="text-[10px]" style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569" }}>
                    {formatHour(hour)}
                  </span>
                </div>

                {/* Day cells */}
                {days.map((day) => {
                  const blocks = weeklyCalendar.filter(
                    (b) => b.day === day && b.startHour <= hour && b.endHour > hour
                  );
                  const block = blocks[0];
                  const isStart = block && Math.floor(block.startHour) === hour;
                  const colors = block ? categoryColors[block.category] : null;

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="relative"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        borderLeft: "1px solid rgba(255,255,255,0.04)",
                        height: "48px",
                      }}
                    >
                      {block && isStart && (
                        <div
                          className="absolute inset-x-1 rounded-md px-2 py-1 overflow-hidden z-10"
                          style={{
                            top: `${(block.startHour - hour) * 48}px`,
                            height: `${(block.endHour - block.startHour) * 48 - 2}px`,
                            background: colors!.bg,
                            borderLeft: `3px solid ${colors!.border}`,
                          }}
                        >
                          <p className="text-[10px] font-semibold truncate" style={{ color: colors!.text }}>
                            {block.label}
                          </p>
                          <p className="text-[9px]" style={{ color: `${colors!.text}80` }}>
                            {formatHour(block.startHour)} - {formatHour(block.endHour)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

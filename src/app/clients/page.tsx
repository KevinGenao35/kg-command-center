"use client";

import TopBar from "@/components/layout/TopBar";
import { clients, missions } from "@/lib/data";
import { Calendar, DollarSign, Target, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "rgba(16,185,129,0.15)", text: "#10B981", label: "ACTIVE" },
  clarity: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", label: "CLARITY" },
  planning: { bg: "rgba(139,92,246,0.15)", text: "#8B5CF6", label: "PLANNING" },
  paused: { bg: "rgba(100,116,139,0.15)", text: "#64748B", label: "PAUSED" },
};

const missionStatusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(100,116,139,0.15)", text: "#94A3B8" },
  in_progress: { bg: "rgba(59,130,246,0.15)", text: "#3B82F6" },
  completed: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
  blocked: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const clientMissions = selectedClient
    ? missions.filter((m) => m.clientCode === selectedClient)
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Clients" />

      <div className="px-8 py-6">
        {/* Client Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {clients.map((client, i) => {
            const pct = client.totalMissions > 0 ? Math.round((client.completedMissions / client.totalMissions) * 100) : 0;
            const status = statusColors[client.status];
            const isSelected = selectedClient === client.code;

            return (
              <div
                key={client.id}
                className="rounded-xl p-5 cursor-pointer transition-all duration-200 animate-fade-in"
                style={{
                  background: "#151C2C",
                  border: isSelected ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: isSelected ? "0 0 16px rgba(59,130,246,0.15)" : "0 1px 3px rgba(0,0,0,0.3)",
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0,
                }}
                onClick={() => setSelectedClient(isSelected ? null : client.code)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>
                        {client.code}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: status.bg, color: status.text }}>
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>
                      {client.name}
                    </h3>
                  </div>
                  <ChevronRight size={16} style={{ color: isSelected ? "#3B82F6" : "#475569", transform: isSelected ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                </div>

                <p className="text-xs mb-4 leading-relaxed" style={{ color: "#94A3B8" }}>
                  {client.scope}
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-medium" style={{ color: "#64748B" }}>Missions</span>
                    <span className="text-[10px] font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: "#94A3B8" }}>
                      {client.completedMissions}/{client.totalMissions}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: pct >= 75 ? "linear-gradient(90deg, #10B981, #34D399)" : pct >= 40 ? "linear-gradient(90deg, #3B82F6, #06B6D4)" : "linear-gradient(90deg, #F59E0B, #F97316)" }} />
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="flex items-center gap-1">
                    <Calendar size={11} style={{ color: "#64748B" }} />
                    <span className="text-[10px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>
                      {client.deadline}
                    </span>
                  </div>
                  {client.contractValue > 0 && (
                    <div className="flex items-center gap-1">
                      <DollarSign size={11} style={{ color: "#10B981" }} />
                      <span className="text-[10px]" style={{ color: "#10B981", fontFamily: "JetBrains Mono, monospace" }}>
                        ${client.amountPaid.toLocaleString()} / ${client.contractValue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mission Detail Table */}
        {selectedClient && (
          <div className="rounded-xl animate-fade-in" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <Target size={16} style={{ color: "#3B82F6" }} />
                <h3 className="text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>
                  Missions: {clients.find(c => c.code === selectedClient)?.name}
                </h3>
              </div>
              <span className="text-xs" style={{ color: "#64748B" }}>{clientMissions.length} missions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    {["#", "Checkpoint", "Mission", "Attack Date", "Deadline", "Type", "Status"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#64748B", background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientMissions.map((m) => {
                    const ms = missionStatusColors[m.status];
                    return (
                      <tr key={m.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td className="px-4 py-3 text-xs" style={{ color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>{m.id}</td>
                        <td className="px-4 py-3 text-xs font-medium" style={{ color: "#94A3B8" }}>{m.checkpoint}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "#F1F5F9" }}>{m.mission}</td>
                        <td className="px-4 py-3 text-[11px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>{m.attackDate}</td>
                        <td className="px-4 py-3 text-[11px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>{m.deadline}</td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B" }}>{m.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: ms.bg, color: ms.text }}>{m.status.replace("_", " ")}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

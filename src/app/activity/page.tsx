"use client";

import TopBar from "@/components/layout/TopBar";
import { missions, clients } from "@/lib/data";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

const statusConfig: Record<string, { bg: string; text: string }> = {
  pending: { bg: "rgba(100,116,139,0.15)", text: "#94A3B8" },
  in_progress: { bg: "rgba(59,130,246,0.15)", text: "#3B82F6" },
  completed: { bg: "rgba(16,185,129,0.15)", text: "#10B981" },
  blocked: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

const typeConfig: Record<string, string> = {
  build: "#3B82F6",
  config: "#06B6D4",
  design: "#8B5CF6",
  copy: "#EC4899",
  strategy: "#F59E0B",
  call: "#10B981",
  admin: "#64748B",
};

export default function ActivityPage() {
  const [clientFilter, setClientFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = missions.filter((m) => {
    if (clientFilter !== "all" && m.clientCode !== clientFilter) return false;
    if (statusFilter !== "all" && m.status !== statusFilter) return false;
    if (searchTerm && !m.mission.toLowerCase().includes(searchTerm.toLowerCase()) && !m.checkpoint.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: missions.length,
    completed: missions.filter(m => m.status === "completed").length,
    inProgress: missions.filter(m => m.status === "in_progress").length,
    pending: missions.filter(m => m.status === "pending").length,
    blocked: missions.filter(m => m.status === "blocked").length,
  };

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Activity Log" />

      <div className="px-8 py-6">
        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-6">
          {[
            { label: "Total", value: stats.total, color: "#F1F5F9" },
            { label: "Completed", value: stats.completed, color: "#10B981" },
            { label: "In Progress", value: stats.inProgress, color: "#3B82F6" },
            { label: "Pending", value: stats.pending, color: "#94A3B8" },
            { label: "Blocked", value: stats.blocked, color: "#EF4444" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: s.color }}>{s.value}</span>
              <span className="text-xs" style={{ color: "#64748B" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <Search size={14} style={{ color: "#64748B" }} />
            <input
              type="text"
              placeholder="Search missions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm outline-none w-48"
              style={{ color: "#94A3B8" }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "#64748B" }} />
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg outline-none cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#94A3B8" }}
            >
              <option value="all">All Clients</option>
              {clients.map(c => (
                <option key={c.code} value={c.code}>{c.code}: {c.name}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg outline-none cursor-pointer"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#94A3B8" }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <span className="text-xs ml-auto" style={{ color: "#64748B" }}>{filtered.length} missions</span>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
              <thead>
                <tr>
                  {["#", "Client", "Checkpoint", "Mission", "Attack", "Deadline", "Type", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider sticky top-0 z-10" style={{ color: "#64748B", background: "#111827", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => {
                  const ms = statusConfig[m.status];
                  return (
                    <tr key={m.id} className="transition-colors" onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td className="px-4 py-3 text-xs" style={{ color: "#475569", fontFamily: "JetBrains Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.id}</td>
                      <td className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>{m.clientCode}</span>
                          <span className="text-xs" style={{ color: "#94A3B8" }}>{m.clientName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: "#94A3B8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.checkpoint}</td>
                      <td className="px-4 py-3 text-xs max-w-[300px]" style={{ color: "#F1F5F9", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.mission}</td>
                      <td className="px-4 py-3 text-[11px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.attackDate.slice(5)}</td>
                      <td className="px-4 py-3 text-[11px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{m.deadline.slice(5)}</td>
                      <td className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: `${typeConfig[m.type]}15`, color: typeConfig[m.type] }}>{m.type}</span>
                      </td>
                      <td className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded" style={{ background: ms.bg, color: ms.text }}>{m.status.replace("_", " ")}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import TopBar from "@/components/layout/TopBar";
import { pipelineLeads } from "@/lib/data";
import { Phone, Mail, Calendar, DollarSign, MoreHorizontal } from "lucide-react";

const stages = [
  { key: "new", label: "New Lead", color: "#64748B", count: 0 },
  { key: "qualified", label: "Qualified", color: "#3B82F6", count: 0 },
  { key: "call_scheduled", label: "Call Scheduled", color: "#06B6D4", count: 0 },
  { key: "proposal_sent", label: "Proposal Sent", color: "#8B5CF6", count: 0 },
  { key: "negotiation", label: "Negotiation", color: "#F59E0B", count: 0 },
  { key: "closed_won", label: "Closed Won", color: "#10B981", count: 0 },
  { key: "closed_lost", label: "Closed Lost", color: "#EF4444", count: 0 },
];

export default function PipelinePage() {
  const stageData = stages.map((s) => ({
    ...s,
    leads: pipelineLeads.filter((l) => l.stage === s.key),
    count: pipelineLeads.filter((l) => l.stage === s.key).length,
    value: pipelineLeads.filter((l) => l.stage === s.key).reduce((sum, l) => sum + l.value, 0),
  }));

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Pipeline" />

      <div className="px-8 py-6">
        {/* Summary bar */}
        <div className="flex items-center gap-6 mb-6">
          {stageData.filter(s => s.count > 0).map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>{s.label}</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: `${s.color}15`, color: s.color, fontFamily: "JetBrains Mono, monospace" }}>
                {s.count}
              </span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <DollarSign size={14} style={{ color: "#10B981" }} />
            <span className="text-sm font-bold" style={{ color: "#10B981", fontFamily: "JetBrains Mono, monospace" }}>
              ${pipelineLeads.reduce((s, l) => s + l.value, 0).toLocaleString()}
            </span>
            <span className="text-xs" style={{ color: "#64748B" }}>total pipeline</span>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "thin" }}>
          {stageData.map((stage) => (
            <div key={stage.key} className="flex-shrink-0" style={{ width: "280px" }}>
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>
                    {stage.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${stage.color}15`, color: stage.color, fontFamily: "JetBrains Mono, monospace" }}>
                    {stage.count}
                  </span>
                  {stage.value > 0 && (
                    <span className="text-[10px]" style={{ color: "#64748B", fontFamily: "JetBrains Mono, monospace" }}>
                      ${stage.value.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Column body */}
              <div className="space-y-3 min-h-[200px] p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                {stage.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-xl p-4 cursor-pointer transition-all duration-200 group"
                    style={{
                      background: "#151C2C",
                      border: "1px solid rgba(255,255,255,0.06)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${stage.color}40`;
                      e.currentTarget.style.boxShadow = `0 0 12px ${stage.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>{lead.name}</p>
                        <p className="text-[11px]" style={{ color: "#64748B" }}>{lead.business}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/5" style={{ color: "#64748B" }}>
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold" style={{ fontFamily: "Outfit, sans-serif", color: stage.color }}>
                        ${lead.value.toLocaleString()}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: "#475569" }}>
                        {lead.currency}
                      </span>
                    </div>

                    <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "#94A3B8" }}>
                      {lead.nextAction}
                    </p>

                    <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.04)", color: "#64748B" }}>
                          {lead.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {lead.phone && <Phone size={12} className="cursor-pointer transition-colors" style={{ color: "#475569" }} onMouseEnter={(e) => e.currentTarget.style.color = "#3B82F6"} onMouseLeave={(e) => e.currentTarget.style.color = "#475569"} />}
                        {lead.email && <Mail size={12} style={{ color: "#475569" }} />}
                        <Calendar size={12} style={{ color: "#475569" }} />
                      </div>
                    </div>
                  </div>
                ))}

                {stage.leads.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <p className="text-xs" style={{ color: "#475569" }}>No leads</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

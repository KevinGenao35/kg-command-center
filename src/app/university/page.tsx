"use client";

import TopBar from "@/components/layout/TopBar";
import { universityClasses, assignments, academicDates } from "@/lib/data";
import { GraduationCap, BookOpen, AlertTriangle, Calendar, Clock, Award } from "lucide-react";

export default function UniversityPage() {
  const activeClasses = universityClasses.filter(c => c.status === "active");
  const totalCredits = activeClasses.reduce((s, c) => s + c.credits, 0);
  const avgGrade = Math.round(activeClasses.reduce((s, c) => s + c.currentGrade, 0) / activeClasses.length);
  const overdueCount = assignments.filter(a => a.status === "overdue").length;

  const daysToFinals = 25;

  const gradeColor = (grade: number) => {
    if (grade >= 80) return "#10B981";
    if (grade >= 60) return "#F59E0B";
    if (grade > 0) return "#EF4444";
    return "#64748B";
  };

  const assignmentStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    overdue: { bg: "rgba(239,68,68,0.15)", text: "#EF4444", label: "OVERDUE" },
    due_soon: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", label: "DUE SOON" },
    upcoming: { bg: "rgba(59,130,246,0.1)", text: "#3B82F6", label: "UPCOMING" },
    completed: { bg: "rgba(16,185,129,0.15)", text: "#10B981", label: "DONE" },
  };

  const dateTypeColors: Record<string, string> = {
    exam: "#EF4444",
    deadline: "#F59E0B",
    holiday: "#10B981",
    admin: "#3B82F6",
  };

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="University" />

      <div className="px-8 py-6 space-y-6">
        {/* Academic KPIs */}
        <div className="grid grid-cols-6 gap-4">
          {[
            { label: "Cumulative GPA", value: "2.68", sub: "/ 4.0", icon: <Award size={18} />, color: "#F59E0B" },
            { label: "Semestral GPA", value: "3.00", sub: "/ 4.0", icon: <GraduationCap size={18} />, color: "#3B82F6" },
            { label: "Credits", value: "28", sub: "/ 172", icon: <BookOpen size={18} />, color: "#8B5CF6" },
            { label: "Active Credits", value: String(totalCredits), sub: "this term", icon: <BookOpen size={18} />, color: "#06B6D4" },
            { label: "Overdue", value: String(overdueCount), sub: "assignments", icon: <AlertTriangle size={18} />, color: "#EF4444" },
            { label: "Finals In", value: `${daysToFinals}d`, sub: "Apr 13-18", icon: <Clock size={18} />, color: "#F43F5E" },
          ].map((kpi, i) => (
            <div key={kpi.label} className="relative overflow-hidden rounded-xl p-4 animate-fade-in" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)", animationDelay: `${i * 0.05}s`, opacity: 0 }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: kpi.color }} />
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                {kpi.icon}
              </div>
              <p className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>{kpi.value}</p>
              <p className="text-xs" style={{ color: "#64748B" }}>{kpi.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#475569" }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Credits progress */}
        <div className="rounded-xl p-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: "#94A3B8" }}>Degree Progress</span>
            <span className="text-xs font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: "#3B82F6" }}>16.28%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: "16.28%", background: "linear-gradient(90deg, #3B82F6, #06B6D4)" }} />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px]" style={{ color: "#475569" }}>28 credits completed</span>
            <span className="text-[10px]" style={{ color: "#475569" }}>144 remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Class Cards */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Current Classes</h3>
            <div className="grid grid-cols-2 gap-3">
              {universityClasses.map((cls) => {
                const gc = gradeColor(cls.currentGrade);
                const isWithdrawn = cls.status === "withdrawn";
                return (
                  <div key={cls.code} className="rounded-xl p-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)", opacity: isWithdrawn ? 0.5 : 1 }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-[10px] font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: "#64748B" }}>{cls.code}</span>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: "#F1F5F9" }}>{cls.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: gc }}>{cls.currentGrade}</p>
                        <p className="text-[10px]" style={{ color: "#475569" }}>/{cls.maxGrade}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: "#64748B" }}>{cls.credits} credits | Sec {cls.section}</span>
                      {isWithdrawn && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>WITHDRAWN</span>
                      )}
                    </div>
                    {!isWithdrawn && (
                      <div className="h-1 rounded-full mt-2" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div className="h-full rounded-full" style={{ width: `${cls.currentGrade}%`, background: gc }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Assignments */}
            <div className="rounded-xl p-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Assignments</h3>
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {assignments.sort((a, b) => {
                  const order = { overdue: 0, due_soon: 1, upcoming: 2, completed: 3 };
                  return order[a.status] - order[b.status];
                }).map((a) => {
                  const sc = assignmentStatusConfig[a.status];
                  return (
                    <div key={a.id} className="flex items-start gap-3 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: sc.text }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color: a.status === "completed" ? "#64748B" : "#F1F5F9", textDecoration: a.status === "completed" ? "line-through" : "none" }}>{a.title}</p>
                        <p className="text-[10px]" style={{ color: "#475569" }}>{a.className}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px]" style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569" }}>{a.dueDate.slice(5)}</span>
                        <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Calendar */}
            <div className="rounded-xl p-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Academic Calendar</h3>
              <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                {academicDates.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dateTypeColors[d.type] }} />
                    <p className="text-xs flex-1 truncate" style={{ color: "#F1F5F9" }}>{d.event}</p>
                    <span className="text-[10px] flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace", color: "#64748B" }}>{d.date.slice(5)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import TopBar from "@/components/layout/TopBar";
import {
  DollarSign,
  Users,
  TrendingUp,
  GraduationCap,
  Target,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  GitBranch,
  BookOpen,
  Banknote,
  Settings,
} from "lucide-react";
import {
  dashboardKPIs,
  todayChecklist,
  recentActivity,
  funnelData,
  revenueData,
} from "@/lib/data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const iconMap: Record<string, React.ReactNode> = {
  "dollar-sign": <DollarSign size={18} />,
  users: <Users size={18} />,
  "trending-up": <TrendingUp size={18} />,
  "graduation-cap": <GraduationCap size={18} />,
  target: <Target size={18} />,
  "check-circle": <CheckCircle size={18} />,
};

const gradients = [
  { start: "#3B82F6", end: "#06B6D4" },
  { start: "#10B981", end: "#34D399" },
  { start: "#8B5CF6", end: "#EC4899" },
  { start: "#F59E0B", end: "#F97316" },
  { start: "#3B82F6", end: "#8B5CF6" },
  { start: "#10B981", end: "#06B6D4" },
];

const activityIcons: Record<string, React.ReactNode> = {
  lead: <GitBranch size={14} />,
  client: <Users size={14} />,
  mission: <Target size={14} />,
  university: <BookOpen size={14} />,
  finance: <Banknote size={14} />,
  system: <Settings size={14} />,
};

const activityColors: Record<string, string> = {
  lead: "#3B82F6",
  client: "#10B981",
  mission: "#8B5CF6",
  university: "#F59E0B",
  finance: "#06B6D4",
  system: "#64748B",
};

const checklistCategoryColors: Record<string, string> = {
  routine: "#64748B",
  work: "#3B82F6",
  university: "#F59E0B",
  training: "#EF4444",
  personal: "#10B981",
};

export default function CommandCenter() {
  const completedTasks = todayChecklist.filter((t) => t.completed).length;
  const accuracy = Math.round((completedTasks / todayChecklist.length) * 100);

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Command Center" />

      <div className="px-8 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-6 gap-4">
          {dashboardKPIs.map((kpi, i) => (
            <div
              key={kpi.label}
              className="relative overflow-hidden rounded-xl p-4 animate-fade-in"
              style={{
                background: "#151C2C",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${gradients[i].start}, ${gradients[i].end})`,
                }}
              />
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${gradients[i].start}20, ${gradients[i].end}20)`,
                    color: gradients[i].start,
                  }}
                >
                  {iconMap[kpi.icon]}
                </div>
                {kpi.change && (
                  <div
                    className="flex items-center gap-0.5 text-xs font-semibold"
                    style={{
                      color:
                        kpi.changeType === "up" ? "#10B981" : kpi.changeType === "down" ? "#EF4444" : "#64748B",
                    }}
                  >
                    {kpi.changeType === "up" ? <ArrowUpRight size={12} /> : kpi.changeType === "down" ? <ArrowDownRight size={12} /> : <Minus size={12} />}
                    {kpi.change}
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>
                {kpi.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{kpi.label}</p>
              {kpi.subvalue && <p className="text-[10px] mt-1" style={{ color: "#475569" }}>{kpi.subvalue}</p>}
            </div>
          ))}
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-5 gap-4">
          {/* Revenue Chart */}
          <div className="col-span-3 rounded-xl p-5 animate-fade-in stagger-2" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Revenue Overview</h3>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>Last 6 months (USD)</p>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#3B82F6" }} />Income</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />Expenses</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: "#1E2740", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#F1F5F9", fontSize: "12px" }} />
                <Area type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} fill="url(#incomeGrad)" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={1.5} fill="url(#expenseGrad)" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pipeline Funnel */}
          <div className="col-span-2 rounded-xl p-5 animate-fade-in stagger-3" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Pipeline Funnel</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Lead to Close</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={funnelData} layout="vertical" barSize={18}>
                <defs>
                  <linearGradient id="funnelGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
                <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="stage" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip contentStyle={{ background: "#1E2740", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#F1F5F9", fontSize: "12px" }} />
                <Bar dataKey="count" fill="url(#funnelGrad)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Checklist */}
          <div className="rounded-xl p-5 animate-fade-in stagger-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Today&apos;s Checklist</h3>
                <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{completedTasks}/{todayChecklist.length} completed</p>
              </div>
              <div className="text-lg font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: accuracy >= 80 ? "#10B981" : accuracy >= 50 ? "#F59E0B" : "#EF4444" }}>
                {accuracy}%
              </div>
            </div>
            <div className="h-1.5 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${accuracy}%`, background: accuracy >= 80 ? "linear-gradient(90deg, #10B981, #34D399)" : accuracy >= 50 ? "linear-gradient(90deg, #F59E0B, #F97316)" : "linear-gradient(90deg, #EF4444, #F43F5E)" }} />
            </div>
            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {todayChecklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-lg" style={{ background: item.completed ? "rgba(16,185,129,0.05)" : "transparent" }}>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: item.completed ? "#10B981" : "rgba(255,255,255,0.15)", background: item.completed ? "#10B981" : "transparent" }}>
                    {item.completed && <CheckCircle size={10} style={{ color: "#fff" }} />}
                  </div>
                  <p className="text-xs truncate flex-1" style={{ color: item.completed ? "#64748B" : "#F1F5F9", textDecoration: item.completed ? "line-through" : "none" }}>{item.task}</p>
                  <span className="text-[10px] font-medium flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace", color: checklistCategoryColors[item.category] }}>{item.time}</span>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: checklistCategoryColors[item.category] }} />
                </div>
              ))}
            </div>
          </div>

          {/* Deadlines */}
          <div className="rounded-xl p-5 animate-fade-in stagger-5" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Upcoming Deadlines</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Clients + University</p>
            <div className="space-y-3">
              {[
                { label: "Morganna RD: E-commerce Live", date: "Mar 30", daysLeft: 11, type: "client" },
                { label: "Gestion Empresarial: Caso Liderazgo", date: "Mar 20", daysLeft: 1, type: "university" },
                { label: "Analisis Realidad: Investigacion", date: "Mar 21", daysLeft: 2, type: "university" },
                { label: "WMC: Website Target", date: "Mar 28", daysLeft: 9, type: "client" },
                { label: "Etica: Debate Empresarial", date: "Mar 22", daysLeft: 3, type: "university" },
                { label: "FINAL EXAMS Start", date: "Apr 13", daysLeft: 25, type: "university" },
                { label: "WMC: Funnel Target", date: "Apr 15", daysLeft: 27, type: "client" },
                { label: "Rice: Tier 1 Launch", date: "Apr 01", daysLeft: 13, type: "client" },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.type === "client" ? "#3B82F6" : "#F59E0B" }} />
                  <p className="text-xs truncate flex-1" style={{ color: "#F1F5F9" }}>{d.label}</p>
                  <span className="text-[10px] flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace", color: "#64748B" }}>{d.date}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: d.daysLeft <= 2 ? "rgba(239,68,68,0.15)" : d.daysLeft <= 7 ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.1)", color: d.daysLeft <= 2 ? "#EF4444" : d.daysLeft <= 7 ? "#F59E0B" : "#3B82F6" }}>
                    {d.daysLeft}d
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-xl p-5 animate-fade-in stagger-6" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Recent Activity</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Last 10 actions</p>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${activityColors[item.type]}15`, color: activityColors[item.type] }}>
                    {activityIcons[item.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: "#F1F5F9" }}>{item.action}</p>
                    <p className="text-[11px] truncate" style={{ color: "#64748B" }}>{item.detail}</p>
                  </div>
                  <span className="text-[10px] flex-shrink-0 mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace", color: "#475569" }}>
                    {item.timestamp.split(" ")[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

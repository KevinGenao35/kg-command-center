"use client";

import TopBar from "@/components/layout/TopBar";
import { financeKPIs, revenueData, transactions } from "@/lib/data";
import { DollarSign, TrendingUp, TrendingDown, Wallet, Bitcoin, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function FinancePage() {
  const netMonthly = financeKPIs.monthlyIncome.usd - financeKPIs.monthlyExpenses.usd;

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <TopBar title="Finance" />

      <div className="px-8 py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Monthly Income", value: `$${financeKPIs.monthlyIncome.usd.toLocaleString()}`, sub: `RD$${financeKPIs.monthlyIncome.dop.toLocaleString()}`, icon: <TrendingUp size={18} />, color: "#10B981", gradient: { start: "#10B981", end: "#34D399" } },
            { label: "Monthly Expenses", value: `$${financeKPIs.monthlyExpenses.usd.toLocaleString()}`, sub: `RD$${financeKPIs.monthlyExpenses.dop.toLocaleString()}`, icon: <TrendingDown size={18} />, color: "#EF4444", gradient: { start: "#EF4444", end: "#F43F5E" } },
            { label: "Net This Month", value: `$${netMonthly.toLocaleString()}`, sub: `RD$${(netMonthly * 60).toLocaleString()}`, icon: <DollarSign size={18} />, color: netMonthly >= 0 ? "#10B981" : "#EF4444", gradient: { start: "#3B82F6", end: "#06B6D4" } },
            { label: "Net Worth", value: `$${financeKPIs.netWorth.usd.toLocaleString()}`, sub: `RD$${financeKPIs.netWorth.dop.toLocaleString()}`, icon: <Wallet size={18} />, color: "#8B5CF6", gradient: { start: "#8B5CF6", end: "#EC4899" } },
            { label: "Crypto Portfolio", value: `$${financeKPIs.cryptoValue.usd.toLocaleString()}`, sub: "BTC + altcoins", icon: <Bitcoin size={18} />, color: "#F59E0B", gradient: { start: "#F59E0B", end: "#F97316" } },
          ].map((kpi, i) => (
            <div key={kpi.label} className="relative overflow-hidden rounded-xl p-4 animate-fade-in" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)", animationDelay: `${i * 0.05}s`, opacity: 0 }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${kpi.gradient.start}, ${kpi.gradient.end})` }} />
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                {kpi.icon}
              </div>
              <p className="text-xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>{kpi.value}</p>
              <p className="text-xs" style={{ color: "#64748B" }}>{kpi.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Wealth Target Progress */}
        <div className="rounded-xl p-4" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={14} style={{ color: "#3B82F6" }} />
              <span className="text-xs font-semibold" style={{ color: "#94A3B8" }}>Wealth Target: $2,714,974</span>
            </div>
            <span className="text-xs font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: "#3B82F6" }}>
              {((financeKPIs.netWorth.usd / financeKPIs.capitalTarget) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full rounded-full" style={{ width: `${(financeKPIs.netWorth.usd / financeKPIs.capitalTarget) * 100}%`, background: "linear-gradient(90deg, #3B82F6, #8B5CF6)", minWidth: "4px" }} />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px]" style={{ color: "#475569" }}>Current: ${financeKPIs.netWorth.usd.toLocaleString()}</span>
            <span className="text-[10px]" style={{ color: "#475569" }}>Monthly lifestyle target: ${financeKPIs.targetMonthly.toLocaleString()}/mo</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {/* Income vs Expenses Chart */}
          <div className="col-span-3 rounded-xl p-5" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Income vs Expenses</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Last 6 months (USD)</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ background: "#1E2740", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#F1F5F9", fontSize: "12px" }} />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={20} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="col-span-2 rounded-xl p-5" style={{ background: "#151C2C", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}>Recent Transactions</h3>
            <p className="text-xs mb-4" style={{ color: "#64748B" }}>Latest activity</p>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: t.type === "income" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)" }}>
                    {t.type === "income" ? <ArrowUpRight size={14} style={{ color: "#10B981" }} /> : <ArrowDownRight size={14} style={{ color: "#EF4444" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: "#F1F5F9" }}>{t.description}</p>
                    <p className="text-[10px]" style={{ color: "#475569" }}>{t.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold" style={{ fontFamily: "JetBrains Mono, monospace", color: t.type === "income" ? "#10B981" : "#EF4444" }}>
                      {t.type === "income" ? "+" : "-"}{t.currency === "DOP" ? "RD$" : "$"}{t.amount.toLocaleString()}
                    </p>
                    <p className="text-[10px]" style={{ color: "#475569", fontFamily: "JetBrains Mono, monospace" }}>{t.date.slice(5)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

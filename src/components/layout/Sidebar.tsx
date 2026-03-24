"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitBranch,
  Users,
  ListChecks,
  GraduationCap,
  Wallet,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Zap,
  Receipt,
  FolderOpen,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Command Center", icon: LayoutDashboard },
  { href: "/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/activity", label: "Activity Log", icon: ListChecks },
  { href: "/university", label: "University", icon: GraduationCap },
  { href: "/finance", label: "Finance", icon: Wallet },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/cotizaciones", label: "Cotizaciones", icon: Receipt },
  { href: "/documentos", label: "Documentos", icon: FolderOpen },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? "72px" : "260px",
        background: "linear-gradient(180deg, #0D1321 0%, #0B0F1A 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06]">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Zap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p
              className="text-sm font-bold tracking-wide"
              style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}
            >
              KG Command
            </p>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "#64748B" }}>
              Center
            </p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative"
              style={{
                background: isActive ? "rgba(59, 130, 246, 0.12)" : "transparent",
                color: isActive ? "#3B82F6" : "#94A3B8",
              }}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                  style={{ background: "#3B82F6" }}
                />
              )}
              <Icon
                size={20}
                className="flex-shrink-0 transition-colors duration-200"
                style={{ color: isActive ? "#3B82F6" : undefined }}
              />
              {!collapsed && (
                <span
                  className="text-sm font-medium truncate transition-colors duration-200"
                  style={{
                    color: isActive ? "#F1F5F9" : undefined,
                    fontFamily: "DM Sans, sans-serif",
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg transition-colors duration-200 hover:bg-white/[0.05]"
          style={{ color: "#64748B" }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

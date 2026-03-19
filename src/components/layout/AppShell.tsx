"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: "260px" }}
      >
        {/* Noise overlay for texture */}
        <div
          className="fixed inset-0 pointer-events-none z-[9999]"
          style={{
            opacity: 0.012,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {children}
      </main>
    </div>
  );
}

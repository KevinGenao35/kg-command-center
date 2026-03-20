"use client";

import { useRef } from "react";
import { Download, FileText } from "lucide-react";

/* ─── DATA: Edit this section to generate new cotizaciones ─── */

const cotizaciones = [
  {
    id: "COT-0002",
    title: "Marketing Digital",
    date: "19 de marzo, 2026",
    client: {
      name: "Iliana Olivero",
      address: "Calle Abraham No. 200",
      phone: "+1 (809) 969-4607",
      email: "iolivero@morganna.net",
      rnc: "Pendiente",
    },
    items: [
      { product: "Contratacion de empresa de marketing digital", qty: 1, price: 1000 },
      { product: "Diseno de campana de marketing", qty: 1, price: 1500 },
      { product: "Pago de publicidad, Ads Meta, Google y TikTok", qty: 1, price: 1000 },
    ],
    conditions: [
      "Forma de pago: Transferencia bancaria / Deposito",
      "Vigencia de la cotizacion: 7 dias naturales",
      "Tiempo estimado de entrega: 14 dias habiles a partir del pago",
      "Incluye: Gestion completa de campanas publicitarias en Meta, Google y TikTok",
    ],
    taxRate: 0.18,
  },
  {
    id: "COT-0001",
    title: "Servicios de Tecnologia",
    date: "19 de marzo, 2026",
    client: {
      name: "Iliana Olivero",
      address: "Calle Abraham No. 200",
      phone: "+1 (809) 969-4607",
      email: "iolivero@morganna.net",
      rnc: "Pendiente",
    },
    items: [
      { product: "Construccion de pagina web", qty: 1, price: 997 },
      { product: "Integracion de agente de Inteligencia Artificial", qty: 1, price: 797 },
      { product: "Desarrollo de auto diagnostico capilar", qty: 1, price: 497 },
      { product: "Integracion de pasarela de pago", qty: 1, price: 297 },
      { product: "Centralizacion de redes sociales", qty: 1, price: 247 },
      { product: "Automatizacion de script para contenido", qty: 1, price: 165 },
    ],
    conditions: [
      "Forma de pago: Transferencia bancaria / Deposito",
      "Vigencia de la cotizacion: 7 dias naturales",
      "Tiempo estimado de entrega: 21 dias habiles a partir del pago",
      "Incluye: Desarrollo completo, integracion, pruebas y entrega funcional",
    ],
    taxRate: 0.18,
  },
];

const emisor = {
  name: "Rice Intelligence, S.R.L.",
  address: "Calle Teatro Nacional No. 150, El Millon, Santo Domingo",
  phone: "+1 (829) 598-9200",
  email: "info@riceintelligence.com",
  website: "www.riceintelligence.com",
  rnc: "1-33-60315-2",
};

/* ─── HELPERS ─── */

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

/* ─── COTIZACION CARD (print-ready) ─── */

function CotizacionDoc({ cot }: { cot: (typeof cotizaciones)[0] }) {
  const printRef = useRef<HTMLDivElement>(null);
  const subtotal = cot.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = Math.round(subtotal * cot.taxRate);
  const total = subtotal + tax;

  const handlePrint = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>${cot.id} - ${cot.client.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'DM Sans', sans-serif; background: white; color: #1a1a2e; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { size: A4; margin: 0; }
          }
        </style>
      </head>
      <body>${content}</body>
      </html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  return (
    <div className="mb-12">
      {/* Download button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText size={20} style={{ color: "#3B82F6" }} />
          <span className="text-lg font-semibold" style={{ color: "#F1F5F9" }}>
            {cot.id} &mdash; {cot.title}
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: "white",
            boxShadow: "0 0 16px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Download size={16} />
          Descargar PDF
        </button>
      </div>

      {/* Printable document */}
      <div
        ref={printRef}
        style={{ background: "white", borderRadius: "12px", overflow: "hidden" }}
      >
        <div style={{ width: "794px", minHeight: "1123px", margin: "0 auto", position: "relative", background: "white" }}>

          {/* Blue wave header */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: "120px", height: "100%",
            background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 30%, #3b82f6 60%, #1e3a8a 100%)",
            borderRadius: "0 0 0 40px",
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 30% 85%, 10% 70%, 25% 55%, 15% 40%, 30% 25%, 20% 12%)",
          }} />

          {/* Content */}
          <div style={{ padding: "48px 56px", position: "relative", zIndex: 1 }}>

            {/* Logo + company */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px",
                background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "22px",
              }}>
                R
              </div>
              <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "18px", color: "#1e3a8a" }}>
                Rice Intelligence
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "36px",
              color: "#1e3a8a", margin: "16px 0 4px", lineHeight: 1.15,
            }}>
              Cotizacion de<br />Servicios
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "28px" }}>
              {cot.id} &bull; {cot.date}
            </p>

            {/* Client + Emisor */}
            <div style={{ display: "flex", gap: "40px", marginBottom: "32px" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e3a8a", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Datos del Cliente
                </p>
                <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: 1.8 }}>
                  {cot.client.name}<br />
                  {cot.client.address}<br />
                  {cot.client.phone}<br />
                  {cot.client.email}<br />
                  RNC: {cot.client.rnc}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e3a8a", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Datos del Emisor
                </p>
                <p style={{ fontSize: "14px", color: "#1a1a2e", lineHeight: 1.8 }}>
                  {emisor.name}<br />
                  {emisor.address}<br />
                  {emisor.phone}<br />
                  {emisor.email}<br />
                  RNC: {emisor.rnc}
                </p>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
              <thead>
                <tr style={{ background: "#1e3a8a" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", color: "white", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", borderRadius: "8px 0 0 0" }}>Producto</th>
                  <th style={{ padding: "12px 16px", textAlign: "center", color: "white", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", width: "80px" }}>Cant.</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "white", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", width: "120px" }}>Precio</th>
                  <th style={{ padding: "12px 16px", textAlign: "right", color: "white", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", width: "120px", borderRadius: "0 8px 0 0" }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cot.items.map((item, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "white", borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1a1a2e" }}>{item.product}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#64748b", textAlign: "center" }}>{item.qty}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1a1a2e", textAlign: "right" }}>{fmt(item.price)}</td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", color: "#1e3a8a", fontWeight: 600, textAlign: "right" }}>{fmt(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
              <div style={{ width: "280px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "14px", color: "#64748b" }}>Subtotal</span>
                  <span style={{ fontSize: "14px", color: "#1a1a2e", fontWeight: 500 }}>{fmt(subtotal)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "14px", color: "#64748b" }}>ITBIS ({cot.taxRate * 100}%)</span>
                  <span style={{ fontSize: "14px", color: "#1a1a2e", fontWeight: 500 }}>{fmt(tax)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", marginTop: "4px" }}>
                  <span style={{ fontSize: "18px", color: "#1e3a8a", fontWeight: 700 }}>TOTAL</span>
                  <span style={{ fontSize: "18px", color: "#1e3a8a", fontWeight: 800 }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "20px 24px", marginBottom: "32px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                Condiciones
              </p>
              {cot.conditions.map((c, i) => (
                <p key={i} style={{ fontSize: "13px", color: "#475569", lineHeight: 1.7 }}>{c}</p>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: "2px solid #1e3a8a", paddingTop: "16px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>{emisor.email}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>{emisor.website}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>{emisor.phone}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>{emisor.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */

export default function CotizacionesPage() {
  return (
    <div style={{ padding: "32px" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "Outfit, sans-serif", color: "#F1F5F9" }}
          >
            Cotizaciones
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {cotizaciones.length} cotizaciones generadas
          </p>
        </div>
      </div>

      {cotizaciones.map((cot) => (
        <CotizacionDoc key={cot.id} cot={cot} />
      ))}
    </div>
  );
}

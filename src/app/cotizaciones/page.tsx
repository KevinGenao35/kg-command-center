"use client";

import { useRef, useState } from "react";
import { Download, Printer, FileText } from "lucide-react";

/* ─── DATA ─── */

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
  address: "Calle Teatro Nacional No. 150",
  city: "El Millon, Santo Domingo, D.N.",
  phone: "+1 (829) 598-9200",
  email: "info@riceintelligence.com",
  website: "www.riceintelligence.com",
  rnc: "1-33-60315-2",
};

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

/* ─── COTIZACION DOCUMENT ─── */

function CotizacionDoc({ cot }: { cot: (typeof cotizaciones)[0] }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const subtotal = cot.items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = Math.round(subtotal * cot.taxRate);
  const total = subtotal + tax;

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cot.id}-${cot.client.name.replace(/\s+/g, "-")}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setDownloading(false);
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>${cot.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:white}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}}</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 600);
  };

  return (
    <div style={{ marginBottom: "48px" }}>
      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "16px", padding: "0 4px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FileText size={18} color="#3B82F6" />
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9" }}>
            {cot.id} &mdash; {cot.title}
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handlePrint}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
              background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            <Printer size={14} />
            Imprimir
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
              background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "white",
              border: "none", cursor: downloading ? "wait" : "pointer",
              boxShadow: "0 0 16px rgba(59,130,246,0.25)", transition: "all 0.2s",
              opacity: downloading ? 0.7 : 1,
            }}
          >
            <Download size={14} />
            {downloading ? "Generando..." : "Descargar PDF"}
          </button>
        </div>
      </div>

      {/* A4 Paper container */}
      <div style={{
        display: "flex", justifyContent: "center",
        filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))",
      }}>
        <div
          ref={printRef}
          style={{
            width: "595px",  /* A4 at 72dpi */
            minHeight: "842px",
            background: "white",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Top accent bar */}
          <div style={{
            height: "6px", width: "100%",
            background: "linear-gradient(90deg, #1e3a8a, #3b82f6, #1e3a8a)",
          }} />

          {/* Right side accent stripe */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "48px", height: "100%",
            background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 50%, #1e3a8a 100%)",
            opacity: 0.9,
          }} />

          {/* Content area */}
          <div style={{ padding: "36px 80px 36px 40px", position: "relative", zIndex: 1 }}>

            {/* Logo + Company */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "8px",
                background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "18px",
              }}>R</div>
              <span style={{
                fontFamily: "Outfit, sans-serif", fontWeight: 700,
                fontSize: "15px", color: "#1e3a8a",
              }}>Rice Intelligence</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "Outfit, sans-serif", fontWeight: 800,
              fontSize: "28px", color: "#1e3a8a", lineHeight: 1.2, marginBottom: "2px",
            }}>
              Cotizacion de Servicios
            </h1>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "24px" }}>
              {cot.id} &bull; {cot.date}
            </p>

            {/* Client + Emisor side by side */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: "10px", fontWeight: 700, color: "#1e3a8a",
                  textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
                  borderBottom: "2px solid #3b82f6", paddingBottom: "4px", display: "inline-block",
                }}>Datos del Cliente</p>
                <div style={{ fontSize: "11.5px", color: "#334155", lineHeight: 1.7, marginTop: "6px" }}>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>{cot.client.name}</p>
                  <p>{cot.client.address}</p>
                  <p>{cot.client.phone}</p>
                  <p>{cot.client.email}</p>
                  <p>RNC: {cot.client.rnc}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: "10px", fontWeight: 700, color: "#1e3a8a",
                  textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px",
                  borderBottom: "2px solid #3b82f6", paddingBottom: "4px", display: "inline-block",
                }}>Datos del Emisor</p>
                <div style={{ fontSize: "11.5px", color: "#334155", lineHeight: 1.7, marginTop: "6px" }}>
                  <p style={{ fontWeight: 600, color: "#0f172a" }}>{emisor.name}</p>
                  <p>{emisor.address}</p>
                  <p>{emisor.city}</p>
                  <p>{emisor.phone}</p>
                  <p>{emisor.email}</p>
                  <p>RNC: {emisor.rnc}</p>
                </div>
              </div>
            </div>

            {/* Products table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px", fontSize: "11px" }}>
              <thead>
                <tr>
                  <th style={{
                    padding: "10px 12px", textAlign: "left", color: "white",
                    fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
                    background: "#1e3a8a", borderRadius: "6px 0 0 0",
                  }}>Producto</th>
                  <th style={{
                    padding: "10px 8px", textAlign: "center", color: "white",
                    fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
                    background: "#1e3a8a", width: "55px",
                  }}>Cant.</th>
                  <th style={{
                    padding: "10px 12px", textAlign: "right", color: "white",
                    fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
                    background: "#1e3a8a", width: "80px",
                  }}>Precio</th>
                  <th style={{
                    padding: "10px 12px", textAlign: "right", color: "white",
                    fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px",
                    background: "#1e3a8a", width: "80px", borderRadius: "0 6px 0 0",
                  }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cot.items.map((item, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#f8fafc" : "#ffffff" }}>
                    <td style={{
                      padding: "10px 12px", color: "#1e293b", fontSize: "11.5px",
                      borderBottom: "1px solid #e2e8f0",
                    }}>{item.product}</td>
                    <td style={{
                      padding: "10px 8px", color: "#64748b", fontSize: "11.5px",
                      textAlign: "center", borderBottom: "1px solid #e2e8f0",
                    }}>{item.qty}</td>
                    <td style={{
                      padding: "10px 12px", color: "#1e293b", fontSize: "11.5px",
                      textAlign: "right", borderBottom: "1px solid #e2e8f0",
                    }}>{fmt(item.price)}</td>
                    <td style={{
                      padding: "10px 12px", color: "#1e3a8a", fontSize: "11.5px",
                      fontWeight: 700, textAlign: "right", borderBottom: "1px solid #e2e8f0",
                    }}>{fmt(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <div style={{ width: "200px" }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", padding: "6px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Subtotal</span>
                  <span style={{ fontSize: "11px", color: "#1e293b", fontWeight: 500 }}>{fmt(subtotal)}</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", padding: "6px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>ITBIS ({cot.taxRate * 100}%)</span>
                  <span style={{ fontSize: "11px", color: "#1e293b", fontWeight: 500 }}>{fmt(tax)}</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between", padding: "10px 0 4px",
                  borderTop: "2px solid #1e3a8a", marginTop: "4px",
                }}>
                  <span style={{ fontSize: "15px", color: "#1e3a8a", fontWeight: 800 }}>TOTAL</span>
                  <span style={{ fontSize: "15px", color: "#1e3a8a", fontWeight: 800 }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div style={{
              background: "#f1f5f9", borderRadius: "8px",
              padding: "14px 18px", marginBottom: "24px",
              borderLeft: "3px solid #3b82f6",
            }}>
              <p style={{
                fontSize: "9.5px", fontWeight: 700, color: "#1e3a8a",
                textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px",
              }}>Condiciones</p>
              {cot.conditions.map((c, i) => (
                <p key={i} style={{ fontSize: "10.5px", color: "#475569", lineHeight: 1.6 }}>{c}</p>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              borderTop: "1px solid #cbd5e1", paddingTop: "12px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px",
            }}>
              {[emisor.email, emisor.website, emisor.phone, emisor.address].map((val, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "#3b82f6", flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "9.5px", color: "#64748b" }}>{val}</span>
                </div>
              ))}
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
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontFamily: "Outfit, sans-serif", fontWeight: 700,
          fontSize: "22px", color: "#F1F5F9",
        }}>Cotizaciones</h1>
        <p style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
          {cotizaciones.length} cotizaciones generadas
        </p>
      </div>
      {cotizaciones.map((cot) => (
        <CotizacionDoc key={cot.id} cot={cot} />
      ))}
    </div>
  );
}

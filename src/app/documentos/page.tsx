"use client";

import { useRef, useState } from "react";
import { Download, Printer, FileText, ClipboardList, CheckSquare } from "lucide-react";

/* ─── EMISOR ─── */

const emisor = {
  name: "Rice Intelligence, SRL",
  address: "Calle Teatro Nacional No. 150",
  city: "El Millon, Santo Domingo, D.N.",
  phone: "+1 (829) 598-9200",
  email: "info@riceintelligence.com",
  website: "www.riceintelligence.com",
  rnc: "133603152",
};

/* ─── NDA DATA ─── */

const ndas = [
  {
    id: "NDA-0001",
    title: "Agente IA WhatsApp con Clonacion de Voz",
    date: "24 de marzo de 2026",
    status: "Pendiente de firma",
    client: {
      name: "Robert Santana",
      company: "Goldman Capital",
      phone: "+1 (829) 490-7117",
      email: "rsantana@goldmancapital.do",
      role: "Representante Legal",
    },
    duration: "2 anos a partir de la firma",
    clauses: [
      {
        num: "01",
        title: "Definicion de Informacion Confidencial",
        body: `Se entiende por "Informacion Confidencial" toda informacion de naturaleza tecnica, comercial, financiera, estrategica u operativa que cualquiera de las Partes divulgue a la otra en el contexto de la relacion de servicios. Incluye sin caracter limitativo: estrategias de negocio, modelos de precios, datos de clientes, bases de contactos, historiales de conversaciones de WhatsApp utilizadas para entrenamiento del agente, detalles de propiedades, terrenos, solares, precios por m2, planos y condiciones de pago de Goldman Capital, metodos de inteligencia artificial, prompts, configuraciones y arquitectura de sistemas desarrollados por Rice Intelligence.`,
      },
      {
        num: "02",
        title: "Obligaciones de Confidencialidad",
        body: `Cada Parte se compromete a: (a) mantener la Informacion Confidencial bajo estricta reserva con el mismo nivel de cuidado que aplica a su propia informacion sensible; (b) no divulgar ni compartir con terceros sin consentimiento previo y por escrito; (c) utilizar la informacion exclusivamente para los fines del proyecto; (d) notificar de inmediato en caso de divulgacion accidental; (e) garantizar que empleados y colaboradores esten sujetos a obligaciones equivalentes.`,
      },
      {
        num: "03",
        title: "Exclusiones",
        body: `Las obligaciones no aplicaran a informacion que: sea de dominio publico sin atribuirse a incumplimiento de alguna Parte; fuera conocida por la Parte receptora con anterioridad sin obligacion de confidencialidad; sea recibida legitimamente de un tercero sin restricciones; sea desarrollada de forma independiente; o deba divulgarse por mandato legal, previo aviso a la otra Parte en la medida posible.`,
      },
      {
        num: "04",
        title: "Propiedad Intelectual",
        body: `Toda metodologia, arquitectura, configuracion tecnica, prompt de inteligencia artificial, flujo de automatizacion y sistema desarrollado por Rice Intelligence constituye propiedad intelectual exclusiva de RICE INTELLIGENCE, S.R.L. Goldman Capital retendra la propiedad exclusiva de sus datos de negocio, informacion de clientes, bases de contactos y cualquier contenido propio compartido para la ejecucion del proyecto.`,
      },
      {
        num: "05",
        title: "Duracion y Terminacion",
        body: `El presente Acuerdo entrara en vigor en la fecha de firma y tendra una vigencia de dos (2) anos. Las obligaciones de confidencialidad se mantendran vigentes durante dicho periodo, incluso si la relacion de servicios concluye antes. Cualquiera de las Partes puede dar por terminado el Acuerdo con treinta (30) dias de aviso escrito, sin que ello afecte las obligaciones ya generadas.`,
      },
      {
        num: "06",
        title: "Consecuencias del Incumplimiento",
        body: `El incumplimiento dara derecho a la Parte afectada a exigir la cesacion de la conducta infractora, reparacion de danos y perjuicios, y cualquier otro remedio disponible conforme a la legislacion de la Republica Dominicana. Las Partes reconocen que el incumplimiento podria causar danos irreparables, por lo que la Parte afectada podra solicitar medidas cautelares ante los tribunales competentes.`,
      },
      {
        num: "07",
        title: "Ley Aplicable y Jurisdiccion",
        body: `El presente Acuerdo se rige por las leyes de la Republica Dominicana. Para cualquier controversia, las Partes se someten a la jurisdiccion de los tribunales de Santo Domingo, D.N., con renuncia expresa a cualquier otro fuero que pudiera corresponderles.`,
      },
    ],
  },
];

/* ─── ONBOARDING CHECKLIST DATA ─── */

const onboardings = [
  {
    id: "OBC-0001",
    title: "Agente IA WhatsApp con Clonacion de Voz",
    date: "24 de marzo de 2026",
    status: "Pendiente",
    client: {
      name: "Robert Santana",
      company: "Goldman Capital",
      phone: "+1 (829) 490-7117",
      email: "rsantana@goldmancapital.do",
      sector: "Bienes Raices — Tierras y Solares",
    },
    stack: "Voiceflow + ElevenLabs + WhatsApp Cloud API (Meta Business Suite)",
    sections: [
      {
        num: "01",
        title: "Datos del Negocio y Base de Conocimiento",
        items: [
          { label: "Catalogo de propiedades", desc: "Listado completo de solares/terrenos disponibles: sector, m2, precio por m2 o total, estado (disponible/reservado/vendido), y caracteristicas especiales.", required: true },
          { label: "Preguntas frecuentes (10-20 FAQs)", desc: "Las preguntas que los clientes hacen con mas frecuencia por WhatsApp, con sus respuestas correctas. Base del entrenamiento del agente.", required: true },
          { label: "Proceso de venta paso a paso", desc: "Flujo desde que un prospecto muestra interes hasta el cierre: pasos, tiempos, quienes intervienen, documentos requeridos.", required: true },
          { label: "Tono del agente (formal / casual)", desc: "Definir si el agente usa 'usted' o 'tu'. Incluir frases o estilo caracteristico de Goldman Capital que el agente debe incorporar.", required: true },
          { label: "Planos o imagenes de propiedades", desc: "Imagenes, planos o renders que el agente pueda enviar automaticamente cuando un cliente pregunte por una propiedad especifica.", required: false },
        ],
      },
      {
        num: "02",
        title: "Accesos Tecnicos",
        items: [
          { label: "Acceso a Meta Business Suite", desc: "Acceso de administrador para configurar el WhatsApp Business API y conectarlo con el sistema del agente. Sesion de 15 minutos juntos.", required: true },
          { label: "Numero de telefono dedicado (nuevo)", desc: "Un numero de telefono nuevo, exclusivo para el agente IA. No puede ser un numero en uso activo — al activarlo con la API pierde la app regular de WhatsApp.", required: true },
          { label: "Correo electronico dedicado", desc: "Cuenta de correo nueva para asociar al numero de WhatsApp Business. Puede ser Gmail. La creamos juntos si es necesario.", required: true },
        ],
      },
      {
        num: "03",
        title: "Voz y Conversaciones (Clonacion de Voz)",
        items: [
          { label: "Grabacion de voz para clonacion (2-3 min)", desc: "Audio de la voz que usara el agente. Minimo 2 minutos continuos, tono natural y claro, sin musica ni ruido de fondo. Usada para clonacion con ElevenLabs.", required: true },
          { label: "Conversaciones de WhatsApp (minimo 10)", desc: "Capturas o exportaciones de conversaciones reales con clientes: preguntas sobre precios, disponibilidad, procesos de compra, objeciones y cierres. Material de entrenamiento.", required: true },
        ],
      },
      {
        num: "04",
        title: "Gestion de Pagos",
        items: [
          { label: "Link de pago AZUL (o equivalente)", desc: "Link activo de AZUL u otra plataforma de cobro. El agente lo envia automaticamente cuando un cliente esta listo para reservar o pagar.", required: true },
          { label: "Datos de cuenta bancaria", desc: "Numero de cuenta, banco y nombre del titular para clientes que prefieran transferencia bancaria directa.", required: true },
          { label: "Politica de reservas y separaciones", desc: "Monto minimo de separacion, condiciones del contrato de promesa de venta y proceso de cierre formal.", required: false },
        ],
      },
    ],
    nextStep: "Llamada de onboarding de 60 minutos. En esa sesion recopilamos todo este checklist juntos y arrancamos la implementacion de inmediato.",
  },
];

/* ─── NDA DOCUMENT ─── */

function NDADoc({ doc }: { doc: (typeof ndas)[0] }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(printRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const pdfH = pageW / ratio;
      if (pdfH <= pageH) {
        pdf.addImage(imgData, "PNG", 0, 0, pageW, pdfH);
      } else {
        // Multi-page for long documents
        let yOffset = 0;
        while (yOffset < canvas.height) {
          if (yOffset > 0) pdf.addPage();
          const sliceH = Math.min(canvas.height - yOffset, Math.round(canvas.width * pageH / pageW));
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceH;
          const ctx = sliceCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(canvas, 0, -yOffset);
            pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, pageW, pageH);
          }
          yOffset += sliceH;
        }
      }
      pdf.save(`${doc.id}-${doc.client.company.replace(/\s+/g, "-")}.pdf`);
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
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>${doc.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:white}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}}</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 600);
  };

  const sectionLabel = (s: string) => ({
    fontSize: "9px", fontWeight: 700, color: "#1e3a8a",
    textTransform: "uppercase" as const, letterSpacing: "1px",
    marginBottom: "6px", borderBottom: "2px solid #3b82f6",
    paddingBottom: "4px", display: "inline-block",
  });

  return (
    <div style={{ marginBottom: "48px" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FileText size={18} color="#3B82F6" />
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9" }}>
            {doc.id} &mdash; {doc.title}
          </span>
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "12px",
            background: "rgba(251,191,36,0.12)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.2)",
          }}>
            {doc.status}
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handlePrint} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "rgba(255,255,255,0.06)", color: "#94A3B8",
            border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
          }}>
            <Printer size={14} /> Imprimir
          </button>
          <button onClick={handleDownloadPDF} disabled={downloading} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "white",
            border: "none", cursor: downloading ? "wait" : "pointer",
            boxShadow: "0 0 16px rgba(59,130,246,0.25)", opacity: downloading ? 0.7 : 1,
          }}>
            <Download size={14} />
            {downloading ? "Generando..." : "Descargar PDF"}
          </button>
        </div>
      </div>

      {/* A4 Paper */}
      <div style={{ display: "flex", justifyContent: "center", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}>
        <div ref={printRef} style={{ width: "595px", minHeight: "842px", background: "white", position: "relative", overflow: "hidden" }}>

          {/* Top accent bar */}
          <div style={{ height: "5px", width: "100%", background: "linear-gradient(90deg, #1e3a8a, #3b82f6, #1e3a8a)" }} />

          {/* Left accent stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(180deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)" }} />

          {/* Content */}
          <div style={{ padding: "16px 40px 40px 40px", position: "relative", zIndex: 1 }}>

            {/* Logo */}
            <div style={{ marginBottom: "8px" }}>
              <img src="/rice-logo.png" alt="Rice Intelligence" style={{ height: "128px", width: "auto" }} />
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "26px", color: "#1e3a8a", lineHeight: 1.2, marginBottom: "2px" }}>
              Acuerdo de Confidencialidad
            </h1>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "20px" }}>
              {doc.id} &bull; {doc.date} &bull; Non-Disclosure Agreement (NDA) Mutuo
            </p>

            {/* Parties */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <p style={sectionLabel("c")}>Datos del Cliente</p>
                <div style={{ fontSize: "11px", color: "#334155", lineHeight: 1.75, marginTop: "6px" }}>
                  <p style={{ fontWeight: 700, color: "#0f172a" }}>{doc.client.company}</p>
                  <p>{doc.client.name} &mdash; {doc.client.role}</p>
                  <p>{doc.client.phone}</p>
                  <p>{doc.client.email}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={sectionLabel("e")}>Datos del Emisor</p>
                <div style={{ fontSize: "11px", color: "#334155", lineHeight: 1.75, marginTop: "6px" }}>
                  <p style={{ fontWeight: 700, color: "#0f172a" }}>{emisor.name}</p>
                  <p>RNC: {emisor.rnc}</p>
                  <p>{emisor.phone}</p>
                  <p>{emisor.email}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={sectionLabel("v")}>Vigencia</p>
                <div style={{ fontSize: "11px", color: "#334155", lineHeight: 1.75, marginTop: "6px" }}>
                  <p>{doc.duration}</p>
                  <p style={{ marginTop: "8px", fontSize: "10px", color: "#64748b" }}>Servicio cubierto:</p>
                  <p style={{ fontSize: "10px", color: "#334155" }}>{doc.title}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#e2e8f0", marginBottom: "18px" }} />

            {/* Clauses */}
            {doc.clauses.map((clause) => (
              <div key={clause.num} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
                  <div style={{
                    background: "#1e3a8a", color: "white", fontSize: "8px", fontWeight: 700,
                    padding: "2px 7px", borderRadius: "2px", letterSpacing: "0.5px", flexShrink: 0,
                  }}>
                    {clause.num}
                  </div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#1e3a8a", letterSpacing: "0.3px" }}>
                    {clause.title}
                  </p>
                </div>
                <p style={{ fontSize: "10.5px", color: "#475569", lineHeight: 1.65, textAlign: "justify" }}>
                  {clause.body}
                </p>
              </div>
            ))}

            {/* Divider */}
            <div style={{ height: "1px", background: "#e2e8f0", margin: "20px 0 18px" }} />

            {/* Signatures */}
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, color: "#1e3a8a", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "20px" }}>
                Firmas y Aceptacion
              </p>
              <div style={{ display: "flex", gap: "40px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#1e3a8a" }}>RICE INTELLIGENCE, S.R.L.</p>
                  <p style={{ fontSize: "9px", color: "#94a3b8", marginBottom: "32px" }}>RNC 1-33-60315-2 &mdash; Proveedor de Servicios</p>
                  <div style={{ borderBottom: "1px solid #334155", marginBottom: "6px" }} />
                  <p style={{ fontSize: "9.5px", color: "#334155" }}>Kevin Alejandro Genao Guzman &mdash; Gerente</p>
                  <p style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px" }}>Fecha: _______________________</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#1e3a8a" }}>{doc.client.company}</p>
                  <p style={{ fontSize: "9px", color: "#94a3b8", marginBottom: "32px" }}>Cliente &mdash; Empresa Contratante</p>
                  <div style={{ borderBottom: "1px solid #334155", marginBottom: "6px" }} />
                  <p style={{ fontSize: "9.5px", color: "#334155" }}>{doc.client.name} &mdash; {doc.client.role}</p>
                  <p style={{ fontSize: "9px", color: "#94a3b8", marginTop: "2px" }}>Fecha: _______________________</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
              {[emisor.email, emisor.website, emisor.phone, `RNC ${emisor.rnc}`].map((val, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", color: "#64748b" }}>{val}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ONBOARDING CHECKLIST DOCUMENT ─── */

function OnboardingDoc({ doc }: { doc: (typeof onboardings)[0] }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(printRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const pdfH = pageW / ratio;
      if (pdfH <= pageH) {
        pdf.addImage(imgData, "PNG", 0, 0, pageW, pdfH);
      } else {
        let yOffset = 0;
        while (yOffset < canvas.height) {
          if (yOffset > 0) pdf.addPage();
          const sliceH = Math.min(canvas.height - yOffset, Math.round(canvas.width * pageH / pageW));
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceH;
          const ctx = sliceCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(canvas, 0, -yOffset);
            pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, pageW, pageH);
          }
          yOffset += sliceH;
        }
      }
      pdf.save(`${doc.id}-${doc.client.company.replace(/\s+/g, "-")}.pdf`);
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
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8" /><title>${doc.id}</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
      <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'DM Sans',sans-serif;background:white}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}}</style>
      </head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 600);
  };

  const sectionLabel = {
    fontSize: "9px", fontWeight: 700, color: "#1e3a8a",
    textTransform: "uppercase" as const, letterSpacing: "1px",
    marginBottom: "6px", borderBottom: "2px solid #3b82f6",
    paddingBottom: "4px", display: "inline-block",
  };

  return (
    <div style={{ marginBottom: "48px" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", padding: "0 4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ClipboardList size={18} color="#10B981" />
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#F1F5F9" }}>
            {doc.id} &mdash; {doc.title}
          </span>
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "2px 10px", borderRadius: "12px",
            background: "rgba(251,191,36,0.12)", color: "#FBBF24", border: "1px solid rgba(251,191,36,0.2)",
          }}>
            {doc.status}
          </span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={handlePrint} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 500,
            background: "rgba(255,255,255,0.06)", color: "#94A3B8",
            border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
          }}>
            <Printer size={14} /> Imprimir
          </button>
          <button onClick={handleDownloadPDF} disabled={downloading} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            background: "linear-gradient(135deg, #3B82F6, #2563EB)", color: "white",
            border: "none", cursor: downloading ? "wait" : "pointer",
            boxShadow: "0 0 16px rgba(59,130,246,0.25)", opacity: downloading ? 0.7 : 1,
          }}>
            <Download size={14} />
            {downloading ? "Generando..." : "Descargar PDF"}
          </button>
        </div>
      </div>

      {/* A4 Paper */}
      <div style={{ display: "flex", justifyContent: "center", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.4))" }}>
        <div ref={printRef} style={{ width: "595px", minHeight: "842px", background: "white", position: "relative", overflow: "hidden" }}>

          {/* Top accent bar */}
          <div style={{ height: "5px", width: "100%", background: "linear-gradient(90deg, #1e3a8a, #3b82f6, #1e3a8a)" }} />

          {/* Left accent stripe */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(180deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)" }} />

          {/* Content */}
          <div style={{ padding: "16px 40px 40px 40px", position: "relative", zIndex: 1 }}>

            {/* Logo */}
            <div style={{ marginBottom: "8px" }}>
              <img src="/rice-logo.png" alt="Rice Intelligence" style={{ height: "128px", width: "auto" }} />
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "26px", color: "#1e3a8a", lineHeight: 1.2, marginBottom: "2px" }}>
              Onboarding Checklist
            </h1>
            <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "20px" }}>
              {doc.id} &bull; {doc.date} &bull; Checklist de Inicio de Proyecto
            </p>

            {/* Client info */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "18px" }}>
              <div style={{ flex: 1 }}>
                <p style={sectionLabel}>Datos del Cliente</p>
                <div style={{ fontSize: "11px", color: "#334155", lineHeight: 1.75, marginTop: "6px" }}>
                  <p style={{ fontWeight: 700, color: "#0f172a" }}>{doc.client.company}</p>
                  <p>{doc.client.name}</p>
                  <p>{doc.client.phone}</p>
                  <p>{doc.client.email}</p>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={sectionLabel}>Servicio</p>
                <div style={{ fontSize: "11px", color: "#334155", lineHeight: 1.75, marginTop: "6px" }}>
                  <p style={{ fontWeight: 700, color: "#0f172a" }}>{doc.title}</p>
                  <p style={{ fontSize: "10px", color: "#64748b" }}>{doc.stack}</p>
                  <p style={{ fontSize: "10px", color: "#64748b", marginTop: "4px" }}>{doc.client.sector}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#e2e8f0", marginBottom: "16px" }} />

            {/* Sections */}
            {doc.sections.map((section) => (
              <div key={section.num} style={{ marginBottom: "16px" }}>

                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px", paddingBottom: "6px", borderBottom: "1px solid #e2e8f0" }}>
                  <div style={{ background: "#1e3a8a", color: "white", fontSize: "7.5px", fontWeight: 700, padding: "2px 7px", borderRadius: "2px", letterSpacing: "0.5px" }}>
                    {section.num}
                  </div>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: "#1e3a8a" }}>{section.title}</p>
                </div>

                {/* Items */}
                {section.items.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    padding: "9px 12px", marginBottom: "5px",
                    border: `1px solid ${item.required ? "#dde4f5" : "#eef0f5"}`,
                    borderLeft: `3px solid ${item.required ? "#1e3a8a" : "#cbd5e1"}`,
                    borderRadius: "0 4px 4px 0", background: "#fafbff",
                  }}>
                    {/* Checkbox */}
                    <div style={{
                      width: "14px", height: "14px", flexShrink: 0, marginTop: "1px",
                      border: `2px solid ${item.required ? "#1e3a8a" : "#94a3b8"}`,
                      borderRadius: "2px",
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                        <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#0f172a" }}>{item.label}</p>
                        <span style={{
                          fontSize: "6.5px", fontWeight: 700, padding: "1px 6px", borderRadius: "2px",
                          letterSpacing: "0.8px", textTransform: "uppercase",
                          background: item.required ? "#1e3a8a" : "#e2e8f0",
                          color: item.required ? "white" : "#64748b",
                        }}>
                          {item.required ? "Requerido" : "Opcional"}
                        </span>
                      </div>
                      <p style={{ fontSize: "9.5px", color: "#64748b", lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Next step CTA */}
            <div style={{ background: "#1e3a8a", borderRadius: "6px", padding: "14px 18px", marginTop: "8px", marginBottom: "20px" }}>
              <p style={{ fontSize: "9.5px", fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                Proximo Paso: Llamada de Onboarding
              </p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", lineHeight: 1.55 }}>{doc.nextStep}</p>
            </div>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #cbd5e1", paddingTop: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px" }}>
              {[emisor.email, emisor.website, emisor.phone, `RNC ${emisor.rnc}`].map((val, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", color: "#64748b" }}>{val}</span>
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

export default function DocumentosPage() {
  const totalDocs = ndas.length + onboardings.length;

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 700, fontSize: "22px", color: "#F1F5F9" }}>
          Documentos
        </h1>
        <p style={{ fontSize: "13px", color: "#64748B", marginTop: "4px" }}>
          {totalDocs} documentos &mdash; {ndas.length} NDAs &bull; {onboardings.length} Onboarding Checklists
        </p>
      </div>

      {/* NDAs */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <FileText size={16} color="#3B82F6" />
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "16px", color: "#94A3B8" }}>
            Acuerdos de Confidencialidad (NDA)
          </h2>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "6px",
            background: "rgba(59,130,246,0.12)", color: "#3B82F6",
          }}>
            {ndas.length}
          </span>
        </div>
        {ndas.map((doc) => (
          <NDADoc key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Onboarding Checklists */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <CheckSquare size={16} color="#10B981" />
          <h2 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "16px", color: "#94A3B8" }}>
            Onboarding Checklists
          </h2>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "6px",
            background: "rgba(16,185,129,0.12)", color: "#10B981",
          }}>
            {onboardings.length}
          </span>
        </div>
        {onboardings.map((doc) => (
          <OnboardingDoc key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}

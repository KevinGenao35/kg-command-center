// KG Command Center -- Mock Data Layer
// Mirrors real Google Sheets + Supabase structure from KG Workspace

// ============================================================
// TYPES
// ============================================================

export interface KPICard {
  label: string;
  value: string;
  subvalue?: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon: string;
}

export interface PipelineLead {
  id: string;
  name: string;
  business: string;
  value: number;
  currency: "USD" | "DOP";
  stage: "new" | "qualified" | "call_scheduled" | "proposal_sent" | "negotiation" | "closed_won" | "closed_lost";
  source: string;
  date: string;
  nextAction: string;
  phone?: string;
  email?: string;
}

export interface Client {
  id: string;
  code: string;
  name: string;
  scope: string;
  status: "active" | "clarity" | "planning" | "paused";
  totalMissions: number;
  completedMissions: number;
  deadline: string;
  contractValue: number;
  amountPaid: number;
  currency: "USD" | "DOP";
}

export interface Mission {
  id: number;
  clientCode: string;
  clientName: string;
  checkpoint: string;
  mission: string;
  attackDate: string;
  deadline: string;
  type: "build" | "config" | "design" | "copy" | "strategy" | "call" | "admin";
  status: "pending" | "in_progress" | "completed" | "blocked";
}

export interface UniversityClass {
  code: string;
  name: string;
  credits: number;
  section: string;
  currentGrade: number;
  maxGrade: number;
  status: "active" | "withdrawn";
  professor?: string;
}

export interface Assignment {
  id: string;
  classCode: string;
  className: string;
  title: string;
  dueDate: string;
  status: "overdue" | "due_soon" | "upcoming" | "completed";
}

export interface AcademicDate {
  date: string;
  event: string;
  type: "exam" | "deadline" | "holiday" | "admin";
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: "DOP" | "USD";
  category: string;
  type: "income" | "expense";
}

export interface CalendarBlock {
  day: string;
  startHour: number;
  endHour: number;
  label: string;
  category: "uf" | "university" | "work" | "training" | "personal" | "church" | "ooda";
}

// ============================================================
// KPI DATA
// ============================================================

export const dashboardKPIs: KPICard[] = [
  {
    label: "MRR",
    value: "$1,200",
    subvalue: "Target: $3,000",
    change: "+$500",
    changeType: "up",
    icon: "dollar-sign",
  },
  {
    label: "Active Clients",
    value: "4",
    subvalue: "3 paid, 1 new",
    change: "+1",
    changeType: "up",
    icon: "users",
  },
  {
    label: "Pipeline Value",
    value: "$13,000",
    subvalue: "4 warm leads",
    change: "+$6,000",
    changeType: "up",
    icon: "trending-up",
  },
  {
    label: "Cumulative GPA",
    value: "2.68",
    subvalue: "Target: 3.5+",
    change: "0.00",
    changeType: "neutral",
    icon: "graduation-cap",
  },
  {
    label: "Missions Done",
    value: "23",
    subvalue: "This week",
    change: "+8",
    changeType: "up",
    icon: "target",
  },
  {
    label: "Checklist Accuracy",
    value: "72%",
    subvalue: "Today",
    change: "-3%",
    changeType: "down",
    icon: "check-circle",
  },
];

// ============================================================
// PIPELINE DATA
// ============================================================

export const pipelineLeads: PipelineLead[] = [
  {
    id: "L001",
    name: "Maria Gonzalez",
    business: "Clinica Dental Sonrisa",
    value: 5500,
    currency: "USD",
    stage: "new",
    source: "Meta Ads",
    date: "2026-03-18",
    nextAction: "Sofia follow-up sequence",
    phone: "+1-809-555-0101",
  },
  {
    id: "L002",
    name: "Roberto Mendez",
    business: "AutoParts RD",
    value: 3500,
    currency: "USD",
    stage: "new",
    source: "WhatsApp Warm List",
    date: "2026-03-17",
    nextAction: "Qualify via application form",
  },
  {
    id: "L003",
    name: "Luis Fonder",
    business: "Fonder Industries",
    value: 3500,
    currency: "USD",
    stage: "proposal_sent",
    source: "Referral",
    date: "2026-03-16",
    nextAction: "Send AI Agent + Odoo proposal",
    phone: "+1-809-555-0203",
  },
  {
    id: "L004",
    name: "Caliche Constructora",
    business: "Caliche Constructora",
    value: 2500,
    currency: "USD",
    stage: "closed_won",
    source: "Direct",
    date: "2026-03-15",
    nextAction: "Ads + GHL CRM + NemoClaw install",
    phone: "+1-809-555-0304",
  },
  {
    id: "L005",
    name: "Kingsport Casino",
    business: "Kingsport Casino",
    value: 6000,
    currency: "USD",
    stage: "negotiation",
    source: "Via Martin",
    date: "2026-03-14",
    nextAction: "Awaiting payment ($3K upfront)",
    phone: "+1-809-555-0405",
  },
  {
    id: "L006",
    name: "Ana Ramirez",
    business: "Boutique Elegance",
    value: 997,
    currency: "USD",
    stage: "qualified",
    source: "Meta Ads",
    date: "2026-03-19",
    nextAction: "Schedule diagnostic call",
  },
  {
    id: "L007",
    name: "Javier Guzman",
    business: "Guzman Consulting",
    value: 4997,
    currency: "USD",
    stage: "call_scheduled",
    source: "WhatsApp",
    date: "2026-03-19",
    nextAction: "Diagnostic call Mar 20, 10:00 AM",
  },
  {
    id: "L008",
    name: "Pedro Santos",
    business: "Santos Gym",
    value: 2497,
    currency: "USD",
    stage: "closed_lost",
    source: "Meta Ads",
    date: "2026-03-10",
    nextAction: "Budget too low, offered SaaS trial",
  },
];

// ============================================================
// CLIENTS DATA
// ============================================================

export const clients: Client[] = [
  {
    id: "C002",
    code: "C002",
    name: "Morganna RD",
    scope: "E-commerce + AI Agent (Morganna) + Diagnostico Capilar",
    status: "active",
    totalMissions: 57,
    completedMissions: 18,
    deadline: "2026-03-30",
    contractValue: 2000,
    amountPaid: 1500,
    currency: "USD",
  },
  {
    id: "C001",
    code: "C001",
    name: "BabysitterPRO",
    scope: "Candidate Filter AI + EngineHire Sync (Phase 1)",
    status: "clarity",
    totalMissions: 7,
    completedMissions: 2,
    deadline: "2026-04-15",
    contractValue: 500,
    amountPaid: 250,
    currency: "USD",
  },
  {
    id: "C003",
    code: "C003",
    name: "Women's Medical Center",
    scope: "Website + Meta Ads + AI Agent + HIPAA Backend",
    status: "planning",
    totalMissions: 59,
    completedMissions: 0,
    deadline: "2026-04-15",
    contractValue: 5500,
    amountPaid: 0,
    currency: "USD",
  },
  {
    id: "C000",
    code: "C000",
    name: "Rice Intelligence",
    scope: "Internal: $30K/month by Jun 30",
    status: "active",
    totalMissions: 68,
    completedMissions: 31,
    deadline: "2026-06-30",
    contractValue: 0,
    amountPaid: 0,
    currency: "USD",
  },
  {
    id: "C004",
    code: "C004",
    name: "Caliche Constructora",
    scope: "Ads + GoHighLevel CRM + NemoClaw Install (testimonial)",
    status: "active",
    totalMissions: 12,
    completedMissions: 1,
    deadline: "2026-04-30",
    contractValue: 2500,
    amountPaid: 500,
    currency: "USD",
  },
];

// ============================================================
// ACTIVITY LOG (MISSIONS)
// ============================================================

export const missions: Mission[] = [
  // Morganna RD (C002)
  { id: 1, clientCode: "C002", clientName: "Morganna RD", checkpoint: "E-commerce Build", mission: "Set up Shopify store structure", attackDate: "2026-03-15", deadline: "2026-03-18", type: "build", status: "completed" },
  { id: 2, clientCode: "C002", clientName: "Morganna RD", checkpoint: "E-commerce Build", mission: "Design product page templates", attackDate: "2026-03-16", deadline: "2026-03-19", type: "design", status: "completed" },
  { id: 3, clientCode: "C002", clientName: "Morganna RD", checkpoint: "E-commerce Build", mission: "Import product catalog (50+ items)", attackDate: "2026-03-17", deadline: "2026-03-20", type: "admin", status: "in_progress" },
  { id: 4, clientCode: "C002", clientName: "Morganna RD", checkpoint: "AI Agent", mission: "Build Morganna agent prompt", attackDate: "2026-03-19", deadline: "2026-03-22", type: "build", status: "pending" },
  { id: 5, clientCode: "C002", clientName: "Morganna RD", checkpoint: "AI Agent", mission: "Connect Morganna to WhatsApp", attackDate: "2026-03-20", deadline: "2026-03-23", type: "config", status: "pending" },
  { id: 6, clientCode: "C002", clientName: "Morganna RD", checkpoint: "Diagnostico Capilar", mission: "Build quiz flow for hair diagnostic", attackDate: "2026-03-22", deadline: "2026-03-25", type: "build", status: "pending" },
  { id: 7, clientCode: "C002", clientName: "Morganna RD", checkpoint: "Diagnostico Capilar", mission: "Connect quiz results to product recommendations", attackDate: "2026-03-24", deadline: "2026-03-27", type: "build", status: "pending" },
  { id: 8, clientCode: "C002", clientName: "Morganna RD", checkpoint: "Launch", mission: "QA full e-commerce + agent flow", attackDate: "2026-03-28", deadline: "2026-03-30", type: "admin", status: "pending" },

  // BabysitterPRO (C001)
  { id: 9, clientCode: "C001", clientName: "BabysitterPRO", checkpoint: "Clarity Phase", mission: "Process EngineHire API docs", attackDate: "2026-03-16", deadline: "2026-03-18", type: "strategy", status: "completed" },
  { id: 10, clientCode: "C001", clientName: "BabysitterPRO", checkpoint: "Clarity Phase", mission: "Define candidate filter criteria with Jhulian", attackDate: "2026-03-18", deadline: "2026-03-20", type: "call", status: "completed" },
  { id: 11, clientCode: "C001", clientName: "BabysitterPRO", checkpoint: "Build Phase", mission: "Build candidate filter AI logic", attackDate: "2026-03-20", deadline: "2026-03-25", type: "build", status: "pending" },
  { id: 12, clientCode: "C001", clientName: "BabysitterPRO", checkpoint: "Build Phase", mission: "Connect EngineHire API sync", attackDate: "2026-03-23", deadline: "2026-03-28", type: "config", status: "pending" },

  // Women's Medical Center (C003)
  { id: 13, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "Website", mission: "Design homepage wireframe", attackDate: "2026-03-20", deadline: "2026-03-23", type: "design", status: "pending" },
  { id: 14, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "Website", mission: "Build service pages (8 services)", attackDate: "2026-03-22", deadline: "2026-03-26", type: "build", status: "pending" },
  { id: 15, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "Website", mission: "HIPAA compliance backend setup", attackDate: "2026-03-24", deadline: "2026-03-28", type: "config", status: "pending" },
  { id: 16, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "AI Agent", mission: "Build medical intake AI agent", attackDate: "2026-03-28", deadline: "2026-04-03", type: "build", status: "pending" },
  { id: 17, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "Funnel", mission: "Design quiz lead magnet flow", attackDate: "2026-04-01", deadline: "2026-04-05", type: "design", status: "pending" },
  { id: 18, clientCode: "C003", clientName: "Women's Medical Center", checkpoint: "Funnel", mission: "Set up Meta Ads per service", attackDate: "2026-04-05", deadline: "2026-04-10", type: "config", status: "pending" },

  // Rice Intelligence (C000)
  { id: 19, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Follow-up Sequence", mission: "Finalize WhatsApp templates for Meta approval", attackDate: "2026-03-18", deadline: "2026-03-19", type: "copy", status: "in_progress" },
  { id: 20, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Follow-up Sequence", mission: "Build n8n qualified nurture workflow", attackDate: "2026-03-19", deadline: "2026-03-20", type: "build", status: "pending" },
  { id: 21, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Follow-up Sequence", mission: "Build n8n disqualified offer workflow", attackDate: "2026-03-19", deadline: "2026-03-20", type: "build", status: "pending" },
  { id: 22, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Content Machine", mission: "Create 5 ad creatives (nano-banana-2)", attackDate: "2026-03-21", deadline: "2026-03-24", type: "design", status: "pending" },
  { id: 23, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Content Machine", mission: "Generate Higgsfield video ads", attackDate: "2026-03-24", deadline: "2026-03-26", type: "design", status: "pending" },
  { id: 24, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Sofia Update", mission: "Rewrite Sofia prompt with opt-out detection", attackDate: "2026-03-26", deadline: "2026-03-28", type: "build", status: "pending" },
  { id: 25, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Backend", mission: "Configure Meta Pixel API", attackDate: "2026-03-28", deadline: "2026-03-30", type: "config", status: "pending" },
  { id: 26, clientCode: "C000", clientName: "Rice Intelligence", checkpoint: "Launch", mission: "Launch Meta Tier 1 campaign ($20/day)", attackDate: "2026-04-01", deadline: "2026-04-03", type: "strategy", status: "pending" },

  // Caliche Constructora (C004)
  { id: 27, clientCode: "C004", clientName: "Caliche Constructora", checkpoint: "Setup", mission: "Configure GoHighLevel CRM", attackDate: "2026-03-19", deadline: "2026-03-22", type: "config", status: "in_progress" },
  { id: 28, clientCode: "C004", clientName: "Caliche Constructora", checkpoint: "Ads", mission: "Design ad creatives for construction", attackDate: "2026-03-22", deadline: "2026-03-25", type: "design", status: "pending" },
  { id: 29, clientCode: "C004", clientName: "Caliche Constructora", checkpoint: "NemoClaw", mission: "Install NemoClaw sandbox (free/testimonial)", attackDate: "2026-03-25", deadline: "2026-03-30", type: "build", status: "pending" },
];

// ============================================================
// UNIVERSITY DATA
// ============================================================

export const universityClasses: UniversityClass[] = [
  { code: "ADB110", name: "Gestion Empresarial", credits: 3, section: "01", currentGrade: 30, maxGrade: 100, status: "active" },
  { code: "ADB111", name: "Macroeconomia", credits: 3, section: "03", currentGrade: 38, maxGrade: 100, status: "active" },
  { code: "ADB130", name: "Contabilidad Financiera I", credits: 3, section: "04", currentGrade: 32, maxGrade: 100, status: "active" },
  { code: "EGS111", name: "Analisis de la Realidad Dominicana", credits: 2, section: "34", currentGrade: 30, maxGrade: 100, status: "active" },
  { code: "TLL100", name: "Comunicacion Intercultural", credits: 1, section: "01", currentGrade: 0, maxGrade: 100, status: "active" },
  { code: "UNB201", name: "Etica", credits: 2, section: "03", currentGrade: 30, maxGrade: 100, status: "active" },
  { code: "UNB306", name: "Educacion Constitucional", credits: 3, section: "02", currentGrade: 18, maxGrade: 100, status: "active" },
  { code: "EGV133", name: "Cambio Climatico", credits: 4, section: "02", currentGrade: 0, maxGrade: 100, status: "withdrawn" },
];

export const assignments: Assignment[] = [
  { id: "A001", classCode: "ADB130", className: "Contabilidad Financiera I", title: "Ejercicio practico: Balance General", dueDate: "2026-03-14", status: "overdue" },
  { id: "A002", classCode: "UNB306", className: "Educacion Constitucional", title: "Ensayo: Derechos Fundamentales", dueDate: "2026-03-15", status: "overdue" },
  { id: "A003", classCode: "ADB111", className: "Macroeconomia", title: "Analisis: Politica Monetaria RD", dueDate: "2026-03-13", status: "overdue" },
  { id: "A004", classCode: "ADB110", className: "Gestion Empresarial", title: "Caso de estudio: Liderazgo", dueDate: "2026-03-20", status: "due_soon" },
  { id: "A005", classCode: "EGS111", className: "Analisis Realidad Dominicana", title: "Investigacion: Economia Informal", dueDate: "2026-03-21", status: "due_soon" },
  { id: "A006", classCode: "UNB201", className: "Etica", title: "Debate: Etica Empresarial", dueDate: "2026-03-22", status: "upcoming" },
  { id: "A007", classCode: "ADB130", className: "Contabilidad Financiera I", title: "Probing Teorico + Practico", dueDate: "2026-03-18", status: "completed" },
  { id: "A008", classCode: "TLL100", className: "Comunicacion Intercultural", title: "Presentacion: Culturas Caribenas", dueDate: "2026-03-25", status: "upcoming" },
];

export const academicDates: AcademicDate[] = [
  { date: "2026-03-26", event: "Ultima semana clases practicas (inicio)", type: "deadline" },
  { date: "2026-04-01", event: "Ultima semana clases practicas (fin)", type: "deadline" },
  { date: "2026-04-02", event: "Semana Santa (inicio)", type: "holiday" },
  { date: "2026-04-05", event: "Semana Santa (fin)", type: "holiday" },
  { date: "2026-04-06", event: "Ultimas evaluaciones practicas (inicio)", type: "exam" },
  { date: "2026-04-10", event: "Solicitud tutorias proximo semestre", type: "admin" },
  { date: "2026-04-11", event: "Ultima semana docencia (fin)", type: "deadline" },
  { date: "2026-04-12", event: "Seleccion/matriculacion cierre", type: "admin" },
  { date: "2026-04-13", event: "EXAMENES FINALES (inicio)", type: "exam" },
  { date: "2026-04-18", event: "EXAMENES FINALES (fin)", type: "exam" },
  { date: "2026-04-27", event: "Publicacion calificaciones finales", type: "admin" },
];

// ============================================================
// FINANCE DATA
// ============================================================

export const financeKPIs = {
  monthlyIncome: { dop: 185000, usd: 3083 },
  monthlyExpenses: { dop: 142000, usd: 2367 },
  netWorth: { dop: 520000, usd: 8667 },
  debtRemaining: { dop: 0, usd: 0, label: "Ivan Chanlatte (Investor)" },
  cryptoValue: { usd: 4200 },
  targetMonthly: 22687,
  capitalTarget: 2714974,
};

export const revenueData = [
  { month: "Oct", income: 1200, expenses: 2100 },
  { month: "Nov", income: 1800, expenses: 1900 },
  { month: "Dec", income: 2400, expenses: 2200 },
  { month: "Jan", income: 1500, expenses: 2000 },
  { month: "Feb", income: 2100, expenses: 1800 },
  { month: "Mar", income: 3083, expenses: 2367 },
];

export const transactions: Transaction[] = [
  { id: "T001", date: "2026-03-19", description: "Caliche Constructora - Deposit", amount: 30000, currency: "DOP", category: "Client Payment", type: "income" },
  { id: "T002", date: "2026-03-18", description: "Morganna RD - 2nd Payment", amount: 30000, currency: "DOP", category: "Client Payment", type: "income" },
  { id: "T003", date: "2026-03-17", description: "Render (n8n hosting)", amount: 450, currency: "DOP", category: "Tools", type: "expense" },
  { id: "T004", date: "2026-03-16", description: "Vercel Pro", amount: 1200, currency: "DOP", category: "Tools", type: "expense" },
  { id: "T005", date: "2026-03-15", description: "University Payment", amount: 45000, currency: "DOP", category: "Education", type: "expense" },
  { id: "T006", date: "2026-03-14", description: "BJJ Gym Monthly", amount: 3500, currency: "DOP", category: "Health", type: "expense" },
  { id: "T007", date: "2026-03-13", description: "Gas/Transportation", amount: 4200, currency: "DOP", category: "Transport", type: "expense" },
  { id: "T008", date: "2026-03-12", description: "Food/Groceries", amount: 8500, currency: "DOP", category: "Food", type: "expense" },
];

// ============================================================
// CALENDAR DATA
// ============================================================

export const weeklyCalendar: CalendarBlock[] = [
  // Monday
  { day: "Mon", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Mon", startHour: 7, endHour: 8, label: "RICE Work", category: "work" },
  { day: "Mon", startHour: 8.5, endHour: 13.5, label: "UF (Investor Office)", category: "uf" },
  { day: "Mon", startHour: 14, endHour: 17, label: "University", category: "university" },
  { day: "Mon", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
  { day: "Mon", startHour: 20, endHour: 21, label: "BJJ", category: "training" },

  // Tuesday
  { day: "Tue", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Tue", startHour: 7, endHour: 9.25, label: "RICE Work", category: "work" },
  { day: "Tue", startHour: 10, endHour: 17, label: "University", category: "university" },
  { day: "Tue", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
  { day: "Tue", startHour: 20, endHour: 21, label: "BJJ", category: "training" },

  // Wednesday
  { day: "Wed", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Wed", startHour: 7, endHour: 8, label: "RICE Work", category: "work" },
  { day: "Wed", startHour: 8.5, endHour: 13.5, label: "UF (Investor Office)", category: "uf" },
  { day: "Wed", startHour: 14, endHour: 17, label: "University", category: "university" },
  { day: "Wed", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
  { day: "Wed", startHour: 20, endHour: 21, label: "BJJ", category: "training" },

  // Thursday
  { day: "Thu", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Thu", startHour: 7, endHour: 9.25, label: "RICE Work", category: "work" },
  { day: "Thu", startHour: 10, endHour: 17, label: "University", category: "university" },
  { day: "Thu", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
  { day: "Thu", startHour: 20, endHour: 21, label: "BJJ", category: "training" },

  // Friday
  { day: "Fri", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Fri", startHour: 7, endHour: 8, label: "RICE Work", category: "work" },
  { day: "Fri", startHour: 8.5, endHour: 17, label: "UF (Investor Office)", category: "uf" },
  { day: "Fri", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
  { day: "Fri", startHour: 18.5, endHour: 20, label: "BJJ", category: "training" },

  // Saturday
  { day: "Sat", startHour: 5, endHour: 6.5, label: "Gym", category: "training" },
  { day: "Sat", startHour: 8, endHour: 14, label: "RICE Work", category: "work" },
  { day: "Sat", startHour: 15, endHour: 19, label: "Personal / Flex", category: "personal" },

  // Sunday
  { day: "Sun", startHour: 5, endHour: 7, label: "OODA Review", category: "ooda" },
  { day: "Sun", startHour: 9, endHour: 10, label: "Church", category: "church" },
  { day: "Sun", startHour: 13, endHour: 16, label: "Family", category: "personal" },
  { day: "Sun", startHour: 16, endHour: 17.5, label: "Gym", category: "training" },
  { day: "Sun", startHour: 17.5, endHour: 19, label: "RICE Work", category: "work" },
];

// ============================================================
// CHECKLIST DATA (Today)
// ============================================================

export interface ChecklistItem {
  time: string;
  task: string;
  category: "routine" | "work" | "university" | "training" | "personal";
  completed: boolean;
}

export const todayChecklist: ChecklistItem[] = [
  { time: "4:30", task: "Wake up + Water + Bible + Prayer", category: "routine", completed: true },
  { time: "5:00", task: "Gym (Push day)", category: "training", completed: true },
  { time: "7:00", task: "Shower + Breakfast + RICE review", category: "routine", completed: true },
  { time: "8:00", task: "WS1: Finalize WhatsApp templates", category: "work", completed: false },
  { time: "9:30", task: "WS2: Build n8n nurture workflow", category: "work", completed: false },
  { time: "11:00", task: "WS3: Caliche GHL CRM setup", category: "work", completed: false },
  { time: "12:30", task: "Lunch break", category: "personal", completed: false },
  { time: "14:00", task: "University: Gestion Empresarial class", category: "university", completed: false },
  { time: "16:00", task: "University: Homework catch-up", category: "university", completed: false },
  { time: "17:30", task: "WS4: Luis Fonder proposal draft", category: "work", completed: false },
  { time: "19:00", task: "Dinner + Family time", category: "personal", completed: false },
  { time: "20:00", task: "BJJ training", category: "training", completed: false },
  { time: "21:00", task: "Night Recap + Tomorrow's checklist", category: "routine", completed: false },
];

// ============================================================
// PIPELINE FUNNEL DATA
// ============================================================

export const funnelData = [
  { stage: "New Leads", count: 15, value: 45000 },
  { stage: "Qualified", count: 8, value: 32000 },
  { stage: "Call Scheduled", count: 5, value: 22000 },
  { stage: "Proposal Sent", count: 3, value: 15000 },
  { stage: "Negotiation", count: 2, value: 11000 },
  { stage: "Closed Won", count: 4, value: 10500 },
];

// ============================================================
// RECENT ACTIVITY FEED
// ============================================================

export interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "lead" | "client" | "mission" | "university" | "finance" | "system";
}

export const recentActivity: ActivityItem[] = [
  { id: "ACT001", action: "New lead qualified", detail: "Ana Ramirez - Boutique Elegance ($997)", timestamp: "2026-03-19 08:30", type: "lead" },
  { id: "ACT002", action: "Payment received", detail: "Caliche Constructora - RD$30,000", timestamp: "2026-03-19 07:15", type: "finance" },
  { id: "ACT003", action: "Mission completed", detail: "C002: Design product page templates", timestamp: "2026-03-18 18:00", type: "mission" },
  { id: "ACT004", action: "Assignment submitted", detail: "Contabilidad Financiera: Probing Teorico + Practico", timestamp: "2026-03-18 15:30", type: "university" },
  { id: "ACT005", action: "Call scheduled", detail: "Javier Guzman - Mar 20, 10:00 AM", timestamp: "2026-03-18 14:00", type: "lead" },
  { id: "ACT006", action: "Proposal sent", detail: "Luis Fonder - AI Agent + Odoo ($3,500)", timestamp: "2026-03-18 11:00", type: "client" },
  { id: "ACT007", action: "n8n workflow updated", detail: "RICE 360 Nurture - skeleton built", timestamp: "2026-03-17 19:00", type: "system" },
  { id: "ACT008", action: "Mission started", detail: "C002: Import product catalog", timestamp: "2026-03-17 09:00", type: "mission" },
  { id: "ACT009", action: "Payment received", detail: "Morganna RD - 2nd payment ($500)", timestamp: "2026-03-16 16:00", type: "finance" },
  { id: "ACT010", action: "NDA signed", detail: "Kingsport Casino via Martin", timestamp: "2026-03-16 10:00", type: "client" },
];

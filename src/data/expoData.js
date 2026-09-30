export const EXPO_DATA = {
  brand: {
    name: "PTHREE",
    tagline: "Print Automation Simplified",
    vision: "Every Print Job. Every Process. One Platform.",
    website: "pthree.press",
    colors: {
      cyan: "#00aeef",
      yellow: "#fff200",
      magenta: "#ec008c",
      black: "#000000",
      white: "#FFFFFF"
    }
  },
  challenges: [
    {
      id: "manual",
      title: "Manual Job Cards",
      desc: "Details scattered across paper and calls"
    },
    {
      id: "followups",
      title: "Production Follow-ups",
      desc: "Status depends on phone calls"
    },
    {
      id: "material",
      title: "Material Uncertainty",
      desc: "Stock usage is hard to track"
    },
    {
      id: "billing",
      title: "Delayed Billing",
      desc: "Completed jobs wait for closure"
    }
  ],
  job: {
    id: "JC-2026-0847",
    customer: "Apex Packaging Pvt. Ltd.",
    name: "Premium Product Labels",
    quantity: "50,000 Sheets",
    machine: "KOMORI 4 Colour",
    paper: "80 GSM Chromo",
    colours: "CMYK + Pantone 286 C",
    finishing: "Matte Lamination",
    status: "In Progress"
  },
  workflowStages: [
    { id: "job-card", label: "Job Card", duration: 5 },
    { id: "reel-cutting", label: "Reel Cutting", duration: 5 },
    { id: "press", label: "Press", duration: 6 },
    { id: "post-press", label: "Post Press", duration: 5 },
    { id: "review", label: "Manager Review", duration: 4 },
    { id: "accounts", label: "Accounts", duration: 5 }
  ],
  metrics: [
    { value: "18", label: "Jobs in Progress" },
    { value: "4", label: "Presses Running" },
    { value: "3", label: "Pending Approvals" },
    { value: "2", label: "Low Stock Alerts" },
    { value: "₹1.86L", label: "Today’s Billing" }
  ],
  modules: [
    "Digital Job Cards",
    "Production Control",
    "Inventory & Material",
    "Purchase & Approvals",
    "Accounts & Finance",
    "HRMS & Payroll",
    "CRM",
    "Reports & Analytics",
    "Mobile App",
    "Integrations"
  ],
  timings: {
    intro: 8,
    challenge: 12,
    connect: 10,
    dashboard: 15,
    closing: 15
  }
};

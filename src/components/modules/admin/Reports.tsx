import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClinicStore } from "@/lib/demo/store";
import {
  FileBarChart,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Stethoscope,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Reports() {
  const { appointments, patients, doctors, invoices } = useClinicStore();
  const [dateRange, setDateRange] = useState("month");

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report for ${dateRange}`);
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const completedAppointments = appointments.filter((a) => a.status === "completed").length;
  const cancelledAppointments = appointments.filter((a) => a.status === "cancelled" || a.status === "no-show").length;

  const reportTypes = [
    {
      id: "financial",
      title: "Financial Report",
      description: "Revenue, expenses, and payment analysis",
      icon: DollarSign,
      metrics: [
        { label: "Total Revenue", value: `KSh ${totalRevenue.toLocaleString()}` },
        { label: "Collected", value: `KSh ${paidRevenue.toLocaleString()}` },
        { label: "Outstanding", value: `KSh ${(totalRevenue - paidRevenue).toLocaleString()}` },
        { label: "Collection Rate", value: `${Math.round((paidRevenue / totalRevenue) * 100)}%` },
      ],
    },
    {
      id: "appointments",
      title: "Appointment Analytics",
      description: "Appointment statistics and trends",
      icon: Calendar,
      metrics: [
        { label: "Total Appointments", value: appointments.length },
        { label: "Completed", value: completedAppointments },
        { label: "Cancelled/No-Show", value: cancelledAppointments },
        { label: "Completion Rate", value: `${Math.round((completedAppointments / appointments.length) * 100)}%` },
      ],
    },
    {
      id: "patients",
      title: "Patient Demographics",
      description: "Patient statistics and trends",
      icon: Users,
      metrics: [
        { label: "Total Patients", value: patients.length },
        { label: "Active", value: patients.filter((p) => p.status === "active").length },
        { label: "New This Month", value: patients.filter((p) => new Date(p.registeredDate).getMonth() === new Date().getMonth()).length },
        { label: "With Allergies", value: patients.filter((p) => p.allergies && p.allergies.length > 0).length },
      ],
    },
    {
      id: "doctors",
      title: "Doctor Performance",
      description: "Doctor workload and performance metrics",
      icon: Stethoscope,
      metrics: [
        { label: "Total Doctors", value: doctors.length },
        { label: "Active", value: doctors.filter((d) => d.status === "active").length },
        { label: "Avg Patients/Doctor", value: Math.round(appointments.length / doctors.length) },
        { label: "Specialists", value: doctors.filter((d) => d.specialization).length },
      ],
    },
    {
      id: "operations",
      title: "Operational Metrics",
      description: "Clinic efficiency and utilization",
      icon: Activity,
      metrics: [
        { label: "Avg Wait Time", value: "25 min" },
        { label: "Avg Appointment Duration", value: "45 min" },
        { label: "Daily Capacity", value: "32 patients" },
        { label: "Utilization Rate", value: "78%" },
      ],
    },
    {
      id: "growth",
      title: "Growth Analysis",
      description: "Month-over-month growth trends",
      icon: TrendingUp,
      metrics: [
        { label: "Revenue Growth", value: "+12.5%" },
        { label: "Patient Growth", value: "+8.3%" },
        { label: "Appointment Growth", value: "+15.2%" },
        { label: "Retention Rate", value: "92%" },
      ],
    },
  ];

  return (
    <PanelCard
      title="Reports & Analytics"
      subtitle="Comprehensive system reports and insights"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Date Range Selector */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Report Period</h3>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Report Cards */}
          <div className="grid grid-cols-2 gap-6">
            {reportTypes.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <report.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => generateReport(report.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {report.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">{metric.label}</div>
                      <div className="text-xl font-bold mt-1">{metric.value}</div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4" variant="outline">
                  <FileBarChart className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Detailed Reports</h3>
            
            {[
              { name: "Financial Statement", desc: "Complete financial report with P&L", format: "PDF, Excel" },
              { name: "Patient Register", desc: "Complete list of all patients with details", format: "Excel, CSV" },
              { name: "Appointment History", desc: "Comprehensive appointment records", format: "PDF, Excel" },
              { name: "Doctor Performance", desc: "Individual doctor statistics and metrics", format: "PDF" },
              { name: "Service Utilization", desc: "Service-wise revenue and usage analysis", format: "Excel" },
              { name: "Payment Collection", desc: "Payment history and outstanding balances", format: "PDF, Excel" },
              { name: "Inventory Status", desc: "Current stock levels and valuation", format: "Excel" },
              { name: "Audit Trail", desc: "Complete system activity log", format: "PDF, CSV" },
            ].map((report, idx) => (
              <div key={idx} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">Available formats: {report.format}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileBarChart className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Create Custom Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Report Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter report name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Data Source</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patients">Patients</SelectItem>
                    <SelectItem value="appointments">Appointments</SelectItem>
                    <SelectItem value="invoices">Invoices</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="doctors">Doctors</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="border rounded-lg px-3 py-2" />
                  <input type="date" className="border rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <FileBarChart className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </PanelCard>
  );
}

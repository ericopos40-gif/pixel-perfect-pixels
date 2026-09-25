import { useState } from "react";
import { format } from "date-fns";
import { 
  FileBarChart2, 
  Download, 
  Calendar as CalendarIcon,
  FileSpreadsheet,
  FileText,
  Users,
  Stethoscope,
  DollarSign,
  Pill,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useClinicStore } from "@/lib/demo/store";
import { cn } from "@/lib/utils";
import {
  exportAppointmentsReport,
  exportPatientsReport,
  exportFinancialReport,
  exportPrescriptionsReport,
} from "@/lib/utils/export";

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ReportType = "appointments" | "patients" | "financial" | "prescriptions";
type ExportFormat = "pdf" | "excel";

const reportTypes = [
  {
    id: "appointments" as ReportType,
    name: "Appointments Report",
    description: "View all appointments with patient and doctor details",
    icon: Stethoscope,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: "patients" as ReportType,
    name: "Patients Report",
    description: "Complete patient registry with demographics",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: "financial" as ReportType,
    name: "Financial Report",
    description: "Revenue, invoices, and payment summaries",
    icon: DollarSign,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    id: "prescriptions" as ReportType,
    name: "Prescriptions Report",
    description: "All prescriptions with medication details",
    icon: Pill,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

export function GenerateReportDialog({ open, onOpenChange }: GenerateReportDialogProps) {
  const { appointments, patients, invoices, payments, prescriptions, doctors } = useClinicStore();
  const [reportType, setReportType] = useState<ReportType>("appointments");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("pdf");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Simulate generation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Enrich data with related information
      const enrichedAppointments = appointments.map((apt) => {
        const patient = patients.find((p) => p.id === apt.patientId);
        const doctor = doctors.find((d) => d.id === apt.dentistId);
        return {
          ...apt,
          patientName: patient?.name || "Unknown",
          doctorName: doctor?.name || "Unknown",
        };
      });

      const enrichedInvoices = invoices.map((inv) => {
        const patient = patients.find((p) => p.id === inv.patientId);
        return {
          ...inv,
          patientName: patient?.name || "Unknown",
        };
      });

      const enrichedPrescriptions = prescriptions.map((rx) => {
        const patient = patients.find((p) => p.id === rx.patientId);
        const doctor = doctors.find((d) => d.id === rx.doctorId);
        return {
          ...rx,
          patientName: patient?.name || "Unknown",
          doctorName: doctor?.name || "Unknown",
        };
      });

      // Filter by date range if specified
      const filterByDate = (items: any[], dateField = "date") => {
        if (!dateFrom && !dateTo) return items;
        return items.filter((item) => {
          const itemDate = new Date(item[dateField]);
          if (dateFrom && itemDate < dateFrom) return false;
          if (dateTo && itemDate > dateTo) return false;
          return true;
        });
      };

      // Generate report based on type
      const filename = `${reportType}-${format(new Date(), "yyyy-MM-dd-HHmmss")}`;

      switch (reportType) {
        case "appointments":
          exportAppointmentsReport(
            filterByDate(enrichedAppointments),
            exportFormat,
            filename
          );
          break;
        case "patients":
          exportPatientsReport(
            filterByDate(patients, "registrationDate"),
            exportFormat,
            filename
          );
          break;
        case "financial":
          exportFinancialReport(
            filterByDate(enrichedInvoices),
            payments,
            exportFormat,
            filename
          );
          break;
        case "prescriptions":
          exportPrescriptionsReport(
            filterByDate(enrichedPrescriptions),
            exportFormat,
            filename
          );
          break;
      }

      toast.success("Report generated successfully!", {
        description: `${reportTypes.find((r) => r.id === reportType)?.name} has been downloaded.`,
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Report generation error:", error);
      toast.error("Failed to generate report", {
        description: "Please try again later.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedReport = reportTypes.find((r) => r.id === reportType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileBarChart2 className="h-5 w-5 text-purple-600" />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            Select report type, date range, and export format to generate comprehensive reports.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Report Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reportTypes.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all hover:shadow-md",
                    reportType === type.id
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                      : "hover:border-gray-400"
                  )}
                  onClick={() => setReportType(type.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", type.bg)}>
                      <type.icon className={cn("h-5 w-5", type.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{type.name}</h4>
                        {reportType === type.id && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Date Range (Optional)</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">From Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">To Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      disabled={(date) => (dateFrom ? date < dateFrom : false)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={(v) => setExportFormat(v as ExportFormat)}>
              <div className="grid grid-cols-2 gap-3">
                <Label
                  htmlFor="format-pdf"
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    exportFormat === "pdf"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <RadioGroupItem value="pdf" id="format-pdf" />
                  <FileText className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">PDF Document</div>
                    <div className="text-xs text-muted-foreground">
                      Professional formatted document
                    </div>
                  </div>
                </Label>

                <Label
                  htmlFor="format-excel"
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all",
                    exportFormat === "excel"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <RadioGroupItem value="excel" id="format-excel" />
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">Excel Spreadsheet</div>
                    <div className="text-xs text-muted-foreground">
                      Data-rich workbook for analysis
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Preview Info */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <FileBarChart2 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-semibold text-blue-900 mb-1">Report Preview</p>
                <p className="text-blue-700">
                  <strong>{selectedReport?.name}</strong> will be generated as{" "}
                  <strong>{exportFormat.toUpperCase()}</strong>
                  {(dateFrom || dateTo) && (
                    <>
                      {" "}from{" "}
                      <strong>{dateFrom ? format(dateFrom, "PP") : "beginning"}</strong> to{" "}
                      <strong>{dateTo ? format(dateTo, "PP") : "today"}</strong>
                    </>
                  )}
                  .
                </p>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

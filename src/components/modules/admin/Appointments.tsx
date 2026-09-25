import { useState, useMemo } from "react";
import { useClinicStore } from "@/lib/demo/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdvancedSearch, type SearchFilters } from "@/components/shared/AdvancedSearch";
import { toast } from "sonner";
import { exportAppointmentsReport } from "@/lib/utils/export";
import {
  Calendar,
  Clock,
  Plus,
  MoreVertical,
  User,
  Stethoscope,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function Appointments() {
  const { appointments, patients, doctors } = useClinicStore();
  const [filters, setFilters] = useState<SearchFilters>({ query: "" });

  // Get patient and doctor names for appointments
  const enrichedAppointments = useMemo(
    () =>
      appointments.map((apt) => {
        const patient = patients.find((p) => p.id === apt.patientId);
        const doctor = doctors.find((d) => d.id === apt.dentistId);
        return {
          ...apt,
          patientName: patient?.name || "Unknown Patient",
          doctorName: doctor?.name || "Unknown Doctor",
          patientInitials:
            patient?.name
              .split(" ")
              .map((n) => n[0])
              .join("") || "??",
        };
      }),
    [appointments, patients, doctors]
  );

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return enrichedAppointments.filter((apt) => {
      const matchesSearch =
        apt.patientName.toLowerCase().includes(filters.query.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(filters.query.toLowerCase()) ||
        apt.type.toLowerCase().includes(filters.query.toLowerCase());

      const matchesStatus = !filters.status || filters.status === "all" || apt.status === filters.status;

      const matchesDate = (() => {
        if (!filters.dateFrom && !filters.dateTo) return true;
        const aptDate = new Date(apt.date);

        if (filters.dateFrom && aptDate < filters.dateFrom) return false;
        if (filters.dateTo && aptDate > filters.dateTo) return false;
        return true;
      })();

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [enrichedAppointments, filters]);

  // Sort by date
  const sortedAppointments = useMemo(
    () => [...filteredAppointments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [filteredAppointments]
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-orange-100 text-orange-700">
            <AlertCircle className="w-3 h-3 mr-1" />
            No Show
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-purple-100 text-purple-700">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700">
            {status}
          </Badge>
        );
    }
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let dateLabel = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (date.toDateString() === today.toDateString()) {
      dateLabel = "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      dateLabel = "Tomorrow";
    }

    return `${dateLabel}, ${timeStr}`;
  };

  // Stats
  const stats = {
    total: appointments.length,
    today: enrichedAppointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      const today = new Date();
      return (
        aptDate.getFullYear() === today.getFullYear() &&
        aptDate.getMonth() === today.getMonth() &&
        aptDate.getDate() === today.getDate()
      );
    }).length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    pending: appointments.filter((a) => a.status === "scheduled").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today</p>
              <p className="text-3xl font-bold">{stats.today}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Confirmed</p>
              <p className="text-3xl font-bold">{stats.confirmed}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <AdvancedSearch
              placeholder="Search by patient, doctor, or service..."
              onSearch={setFilters}
              showDateFilter={true}
              filterOptions={[
                {
                  label: "Status",
                  key: "status",
                  options: [
                    { value: "SCHEDULED", label: "Scheduled" },
                    { value: "CONFIRMED", label: "Confirmed" },
                    { value: "CHECKED_IN", label: "Checked In" },
                    { value: "IN_PROGRESS", label: "In Progress" },
                    { value: "COMPLETED", label: "Completed" },
                    { value: "CANCELLED", label: "Cancelled" },
                    { value: "NO_SHOW", label: "No Show" },
                  ],
                },
              ]}
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  exportAppointmentsReport(sortedAppointments, "pdf");
                  toast.success("PDF report downloaded");
                }}
              >
                <FileText className="w-4 h-4 mr-2 text-red-600" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  exportAppointmentsReport(sortedAppointments, "excel");
                  toast.success("Excel report downloaded");
                }}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Appointments Table */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            All Appointments ({sortedAppointments.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Date & Time</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No appointments found matching your filters.
                  </td>
                </tr>
              ) : (
                sortedAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {apt.patientInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{apt.patientName}</div>
                          <div className="text-xs text-gray-500">
                            ID: {apt.patientId.slice(0, 12)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="font-medium">{apt.service}</div>
                      {apt.notes && (
                        <div className="text-xs text-gray-500 mt-1">
                          {apt.notes.slice(0, 30)}...
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span>{apt.doctorName}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{formatDateTime(apt.date, apt.time)}</span>
                      </div>
                    </td>
                    <td className="py-4">{getStatusBadge(apt.status)}</td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="w-4 h-4 mr-2" />
                            View Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="w-4 h-4 mr-2" />
                            Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

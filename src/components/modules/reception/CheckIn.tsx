import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useClinicStore } from "@/lib/demo/store";
import { Search, UserCheck, UserX, Clock, Phone, Mail, AlertCircle } from "lucide-react";
import { DEMO_TODAY } from "@/lib/demo/data";
import { format } from "date-fns";

export function CheckIn() {
  const { appointments, patients } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Get today's appointments
  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.getFullYear() === DEMO_TODAY.getFullYear() &&
      aptDate.getMonth() === DEMO_TODAY.getMonth() &&
      aptDate.getDate() === DEMO_TODAY.getDate()
    );
  });

  const filteredAppointments = todayAppointments.filter((apt) => {
    const patient = patients.find((p) => p.id === apt.patientId);
    if (!patient) return false;
    
    return (
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.time.includes(searchQuery)
    );
  });

  const checkedInCount = filteredAppointments.filter((apt) => apt.status === "in-progress" || apt.status === "completed").length;
  const waitingCount = filteredAppointments.filter((apt) => apt.status === "confirmed" || apt.status === "scheduled").length;

  const handleCheckIn = (appointmentId: string) => {
    console.log("Checking in appointment:", appointmentId);
    // In production: update appointment status to "in-progress"
  };

  const handleCheckOut = (appointmentId: string) => {
    console.log("Checking out appointment:", appointmentId);
    // In production: update appointment status to "completed"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PanelCard
      title="Check In / Check Out"
      subtitle="Manage patient arrivals and departures"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by patient name, code, or appointment time..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
            <div className="text-sm text-gray-600">Total Today</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{waitingCount}</div>
            <div className="text-sm text-gray-600">Waiting</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{checkedInCount}</div>
            <div className="text-sm text-gray-600">Checked In</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {todayAppointments.filter((apt) => apt.status === "no-show").length}
            </div>
            <div className="text-sm text-gray-600">No Shows</div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? "No appointments match your search" : "No appointments scheduled for today"}
            </div>
          ) : (
            filteredAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((apt) => {
                const patient = patients.find((p) => p.id === apt.patientId);
                if (!patient) return null;

                const canCheckIn = apt.status === "confirmed" || apt.status === "scheduled";
                const canCheckOut = apt.status === "in-progress";
                const isCompleted = apt.status === "completed";

                return (
                  <div
                    key={apt.id}
                    className={`border rounded-lg p-4 ${
                      canCheckIn ? "bg-blue-50 border-blue-200" : ""
                    } ${canCheckOut ? "bg-purple-50 border-purple-200" : ""} ${
                      isCompleted ? "bg-gray-50 border-gray-200" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-lg">{apt.time}</span>
                          </div>
                          <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="font-medium text-lg">{patient.name}</div>
                            <div className="text-sm text-gray-600">
                              {patient.code} • {patient.age} years, {patient.gender}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {patient.email}
                            </div>
                          </div>

                          <div className="text-sm">
                            <span className="text-gray-600">Service: </span>
                            <span className="font-medium">{apt.service}</span>
                            <span className="text-gray-600"> • Duration: </span>
                            <span>{apt.duration}</span>
                          </div>

                          {patient.allergies && patient.allergies.length > 0 && (
                            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded p-2">
                              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                              <div className="text-sm">
                                <span className="font-medium text-red-800">Allergies: </span>
                                <span className="text-red-700">{patient.allergies.join(", ")}</span>
                              </div>
                            </div>
                          )}

                          {apt.notes && (
                            <div className="text-sm text-gray-600 bg-gray-100 rounded p-2">
                              <span className="font-medium">Notes: </span>
                              {apt.notes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        {canCheckIn && (
                          <Button
                            size="sm"
                            onClick={() => handleCheckIn(apt.id)}
                            className="whitespace-nowrap"
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Check In
                          </Button>
                        )}
                        {canCheckOut && (
                          <Button
                            size="sm"
                            onClick={() => handleCheckOut(apt.id)}
                            className="whitespace-nowrap"
                          >
                            <UserX className="w-4 h-4 mr-2" />
                            Check Out
                          </Button>
                        )}
                        {apt.status === "scheduled" && (
                          <Button size="sm" variant="outline" className="whitespace-nowrap">
                            Send Reminder
                          </Button>
                        )}
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </PanelCard>
  );
}

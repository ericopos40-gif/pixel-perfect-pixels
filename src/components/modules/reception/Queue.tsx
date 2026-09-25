import { PanelCard } from "@/components/shared/PanelCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useClinicStore } from "@/lib/demo/store";
import { Clock, User, Stethoscope, AlertCircle, ArrowRight } from "lucide-react";
import { DEMO_TODAY } from "@/lib/demo/data";

export function Queue() {
  const { appointments, patients, doctors } = useClinicStore();

  // Get today's in-progress and waiting appointments
  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.getFullYear() === DEMO_TODAY.getFullYear() &&
      aptDate.getMonth() === DEMO_TODAY.getMonth() &&
      aptDate.getDate() === DEMO_TODAY.getDate() &&
      (apt.status === "in-progress" || apt.status === "confirmed" || apt.status === "scheduled")
    );
  });

  const inProgressAppointments = todayAppointments.filter((apt) => apt.status === "in-progress");
  const waitingAppointments = todayAppointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "scheduled"
  );

  const QueueItem = ({ apt, position }: { apt: any; position: number }) => {
    const patient = patients.find((p) => p.id === apt.patientId);
    const doctor = doctors.find((d) => d.id === apt.doctorId);
    if (!patient || !doctor) return null;

    const isInProgress = apt.status === "in-progress";

    return (
      <div
        className={`border rounded-lg p-4 ${
          isInProgress ? "bg-purple-50 border-purple-200" : "bg-white"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-4 flex-1">
            {/* Position Number */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                isInProgress
                  ? "bg-purple-600 text-white"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {position}
            </div>

            <div className="flex-1 space-y-2">
              {/* Patient Info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{patient.name}</span>
                  {isInProgress && (
                    <Badge className="bg-purple-600 text-white">In Progress</Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {patient.code} • {patient.age} years, {patient.gender}
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Scheduled: {apt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-gray-400" />
                  <span>{doctor.name}</span>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-gray-600">Service: </span>
                <span className="font-medium">{apt.service}</span>
                <span className="text-gray-500"> • {apt.duration}</span>
              </div>

              {/* Allergies Warning */}
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded px-3 py-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    Allergies: {patient.allergies.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {!isInProgress && (
              <>
                <Button size="sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Move Up
                </Button>
                <Button size="sm" variant="outline">
                  Notify
                </Button>
              </>
            )}
            {isInProgress && (
              <Button size="sm" variant="outline">
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <PanelCard
      title="Patient Queue"
      subtitle="Real-time view of patient flow and waiting times"
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {inProgressAppointments.length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {waitingAppointments.length}
            </div>
            <div className="text-sm text-gray-600">Waiting</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {waitingAppointments.length > 0 ? Math.ceil(waitingAppointments.length * 30) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Wait (min)</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {todayAppointments.length}
            </div>
            <div className="text-sm text-gray-600">Total Active</div>
          </div>
        </div>

        {/* In Progress Section */}
        {inProgressAppointments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
              Currently Being Treated
            </h3>
            <div className="space-y-3">
              {inProgressAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((apt, index) => (
                  <QueueItem key={apt.id} apt={apt} position={index + 1} />
                ))}
            </div>
          </div>
        )}

        {/* Waiting Queue */}
        {waitingAppointments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
              Waiting Queue
            </h3>
            <div className="space-y-3">
              {waitingAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((apt, index) => (
                  <QueueItem
                    key={apt.id}
                    apt={apt}
                    position={inProgressAppointments.length + index + 1}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {todayAppointments.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No patients in queue</p>
            <p className="text-sm">All appointments for today have been completed</p>
          </div>
        )}
      </div>
    </PanelCard>
  );
}

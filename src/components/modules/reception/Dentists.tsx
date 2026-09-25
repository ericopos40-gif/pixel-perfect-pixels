import { PanelCard } from "@/components/shared/PanelCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useClinicStore } from "@/lib/demo/store";
import { Mail, Phone, Calendar, Award, Clock, User } from "lucide-react";

export function Dentists() {
  const { doctors, appointments } = useClinicStore();

  // Calculate stats for each doctor
  const getDoctorStats = (doctorId: string) => {
    const doctorAppointments = appointments.filter((apt) => apt.doctorId === doctorId);
    const todayAppointments = doctorAppointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      const today = new Date();
      return (
        aptDate.getFullYear() === today.getFullYear() &&
        aptDate.getMonth() === today.getMonth() &&
        aptDate.getDate() === today.getDate()
      );
    });

    return {
      totalPatients: doctorAppointments.length,
      todayAppointments: todayAppointments.length,
      availableToday: todayAppointments.filter(
        (apt) => apt.status === "scheduled" || apt.status === "confirmed"
      ).length,
    };
  };

  return (
    <PanelCard
      title="Our Dentists"
      subtitle="View dentist profiles and availability"
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{doctors.length}</div>
            <div className="text-sm text-gray-600">Total Dentists</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {doctors.filter((d) => d.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Today</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {doctors.reduce((sum, d) => sum + getDoctorStats(d.id).todayAppointments, 0)}
            </div>
            <div className="text-sm text-gray-600">Today's Appointments</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {doctors.filter((d) => d.specialization).length}
            </div>
            <div className="text-sm text-gray-600">Specialists</div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {doctors.map((doctor) => {
            const stats = getDoctorStats(doctor.id);
            const isAvailable = doctor.status === "active";

            return (
              <div
                key={doctor.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Doctor Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center mt-2">
                      {isAvailable ? (
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Off Duty</Badge>
                      )}
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialization || "General Dentist"}</p>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{doctor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Joined {doctor.joinedDate}</span>
                      </div>
                      {doctor.licenseNumber && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span>License: {doctor.licenseNumber}</span>
                        </div>
                      )}
                    </div>

                    {/* Schedule & Availability */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-sm">Today's Schedule</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total: </span>
                          <span className="font-semibold">{stats.todayAppointments}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Remaining: </span>
                          <span className="font-semibold text-blue-600">{stats.availableToday}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Completed: </span>
                          <span className="font-semibold text-green-600">
                            {stats.todayAppointments - stats.availableToday}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Specializations */}
                    {doctor.specialization && (
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-600">Specializations: </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {doctor.specialization.split(",").map((spec, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50">
                              {spec.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Schedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <Button size="sm">Book Appointment</Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PanelCard>
  );
}

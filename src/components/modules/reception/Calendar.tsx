import { useState } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClinicStore } from "@/lib/demo/store";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { DEMO_TODAY } from "@/lib/demo/data";

export function Calendar() {
  const { appointments, patients, doctors } = useClinicStore();
  const [currentDate, setCurrentDate] = useState(DEMO_TODAY);
  const [selectedDate, setSelectedDate] = useState(DEMO_TODAY);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return isSameDay(aptDate, date);
    });
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
      case "confirmed":
        return "bg-blue-500";
      case "in-progress":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "no-show":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <PanelCard
      title="Appointment Calendar"
      subtitle="Visual calendar view of all appointments"
    >
      <div className="grid grid-cols-[1fr_400px] gap-6">
        {/* Calendar Grid */}
        <div>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentDate(DEMO_TODAY);
                  setSelectedDate(DEMO_TODAY);
                }}
              >
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day, idx) => {
              const dayAppointments = getAppointmentsForDate(day);
              const isToday = isSameDay(day, DEMO_TODAY);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentDate);

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    min-h-[100px] p-2 border rounded-lg text-left
                    transition-all hover:border-blue-300 hover:shadow-sm
                    ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : "bg-white"}
                    ${isSelected ? "border-blue-500 border-2 bg-blue-50" : ""}
                    ${isToday && !isSelected ? "border-blue-300 bg-blue-50/50" : ""}
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${isToday ? "text-blue-600" : ""}`}>
                      {format(day, "d")}
                    </span>
                    {dayAppointments.length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        {dayAppointments.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 3).map((apt) => (
                      <div
                        key={apt.id}
                        className={`text-xs px-1.5 py-1 rounded text-white truncate ${getStatusColor(apt.status)}`}
                      >
                        {apt.time}
                      </div>
                    ))}
                    {dayAppointments.length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayAppointments.length - 3} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Scheduled/Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Cancelled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">No Show</span>
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="border-l pl-6">
          <div className="sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h3>
            </div>

            {selectedDateAppointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No appointments</p>
                <p className="text-sm">for this date</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((apt) => {
                    const patient = patients.find((p) => p.id === apt.patientId);
                    const doctor = doctors.find((d) => d.id === apt.doctorId);

                    return (
                      <div key={apt.id} className="border rounded-lg p-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">{apt.time}</span>
                          </div>
                          <Badge className={`${getStatusColor(apt.status)} text-white`}>
                            {apt.status}
                          </Badge>
                        </div>

                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="font-medium">{patient?.name}</span>
                          </div>
                          <div className="text-gray-600">
                            Dr. {doctor?.name}
                          </div>
                          <div className="text-gray-600">
                            {apt.service}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {apt.duration}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1">
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Edit
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Stats for Selected Date */}
            {selectedDateAppointments.length > 0 && (
              <div className="mt-6 pt-6 border-t space-y-2">
                <h4 className="font-semibold mb-3">Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium">{selectedDateAppointments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-green-600">
                      {selectedDateAppointments.filter((a) => a.status === "completed").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Upcoming:</span>
                    <span className="font-medium text-blue-600">
                      {selectedDateAppointments.filter((a) => 
                        a.status === "scheduled" || a.status === "confirmed"
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancelled:</span>
                    <span className="font-medium text-red-600">
                      {selectedDateAppointments.filter((a) => 
                        a.status === "cancelled" || a.status === "no-show"
                      ).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PanelCard>
  );
}

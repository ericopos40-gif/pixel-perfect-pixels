import { useState } from "react";
import { format, addDays } from "date-fns";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useClinicStore } from "@/lib/demo/store";
import { CalendarDays, Clock, Plus, User, Phone, Mail } from "lucide-react";
import { DEMO_TODAY } from "@/lib/demo/data";

export function Appointments() {
  const { appointments, patients, doctors, addAppointment } = useClinicStore();
  const [selectedDate, setSelectedDate] = useState<Date>(DEMO_TODAY);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter appointments by selected date
  const dayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.getFullYear() === selectedDate.getFullYear() &&
      aptDate.getMonth() === selectedDate.getMonth() &&
      aptDate.getDate() === selectedDate.getDate()
    );
  });

  const todayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return (
      aptDate.getFullYear() === DEMO_TODAY.getFullYear() &&
      aptDate.getMonth() === DEMO_TODAY.getMonth() &&
      aptDate.getDate() === DEMO_TODAY.getDate()
    );
  });

  const upcomingAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    return aptDate > DEMO_TODAY;
  });

  const handleCreateAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // In production, this would create a real appointment
    console.log("Creating appointment:", Object.fromEntries(formData));
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "no-show":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const AppointmentCard = ({ apt }: { apt: any }) => {
    const patient = patients.find((p) => p.id === apt.patientId);
    const doctor = doctors.find((d) => d.id === apt.doctorId);

    return (
      <div className="border rounded-lg p-4 hover:bg-gray-50">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{apt.time}</span>
            <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
          </div>
          <span className="text-sm text-gray-500">{apt.duration}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{patient?.name || "Unknown Patient"}</span>
            <span className="text-sm text-gray-500">({patient?.code})</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            {patient?.phone}
          </div>

          <div className="text-sm">
            <span className="text-gray-600">Doctor: </span>
            <span className="font-medium">{doctor?.name}</span>
          </div>

          <div className="text-sm">
            <span className="text-gray-600">Service: </span>
            <span>{apt.service}</span>
          </div>

          {apt.notes && (
            <div className="text-sm text-gray-600 mt-2 pt-2 border-t">
              {apt.notes}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline">Confirm</Button>
          <Button size="sm" variant="outline">Reschedule</Button>
          <Button size="sm" variant="outline" className="text-red-600">Cancel</Button>
        </div>
      </div>
    );
  };

  return (
    <PanelCard
      title="Appointment Management"
      subtitle="Schedule and manage patient appointments"
      action={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <Select name="patientId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Doctor</Label>
                  <Select name="doctorId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date</Label>
                  <Input type="date" name="date" required />
                </div>

                <div>
                  <Label>Time</Label>
                  <Input type="time" name="time" required />
                </div>

                <div>
                  <Label>Service</Label>
                  <Select name="service" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Checkup">General Checkup</SelectItem>
                      <SelectItem value="Teeth Cleaning">Teeth Cleaning</SelectItem>
                      <SelectItem value="Filling">Filling</SelectItem>
                      <SelectItem value="Root Canal">Root Canal</SelectItem>
                      <SelectItem value="Extraction">Extraction</SelectItem>
                      <SelectItem value="Orthodontics">Orthodontics</SelectItem>
                      <SelectItem value="Cosmetic">Cosmetic Dentistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Duration</Label>
                  <Select name="duration" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 min">30 minutes</SelectItem>
                      <SelectItem value="45 min">45 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                      <SelectItem value="2 hours">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Notes (Optional)</Label>
                <Input name="notes" placeholder="Any special requirements or notes" />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Appointment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4">
            {todayAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No appointments scheduled for today
              </div>
            ) : (
              todayAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No upcoming appointments
              </div>
            ) : (
              upcomingAppointments
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((apt) => (
                  <div key={apt.id}>
                    <div className="text-sm font-medium text-gray-600 mb-2">
                      {format(new Date(apt.date), "EEEE, MMMM d, yyyy")}
                    </div>
                    <AppointmentCard apt={apt} />
                  </div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <div className="grid grid-cols-[300px_1fr] gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h3>
              <div className="grid gap-4">
                {dayAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No appointments for this date
                  </div>
                ) : (
                  dayAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PanelCard>
  );
}

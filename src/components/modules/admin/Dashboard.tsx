import { useClinicStore } from "@/lib/demo/store";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Calendar,
  DollarSign,
  Stethoscope,
  TrendingUp,
  ArrowRight,
  CalendarCheck,
  UserPlus,
  FileEdit,
  FileBarChart2,
  Clock,
  CheckCircle2,
  Heart,
  Wrench,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import heroImage from "@/assets/hero-clinic.jpg";
import { useState } from "react";
import { BookAppointmentDialog } from "./BookAppointmentDialog";
import { AddPatientDialog } from "./AddPatientDialog";
import { GenerateReportDialog } from "./GenerateReportDialog";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AdminDashboard() {
  const { patients, appointments, doctors, isLoading } = useClinicStore();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showAddPatientDialog, setShowAddPatientDialog] = useState(false);
  const [showUpdateRecordsDialog, setShowUpdateRecordsDialog] = useState(false);
  const [showGenerateReportDialog, setShowGenerateReportDialog] = useState(false);

  // Demo data matching the image exactly
  const appointmentsChartData = [
    { day: "Mon 15", completed: 28, scheduled: 32, cancelled: 3 },
    { day: "Tue 16", completed: 32, scheduled: 35, cancelled: 2 },
    { day: "Wed 17", completed: 35, scheduled: 38, cancelled: 4 },
    { day: "Thu 18", completed: 30, scheduled: 33, cancelled: 2 },
    { day: "Fri 19", completed: 38, scheduled: 40, cancelled: 3 },
    { day: "Sat 20", completed: 32, scheduled: 38, cancelled: 4 },
    { day: "Sun 21", completed: 25, scheduled: 30, cancelled: 2 },
  ];

  const revenueData = [
    { month: "Oct", amount: 180000 },
    { month: "Nov", amount: 195000 },
    { month: "Dec", amount: 210000 },
    { month: "Jan", amount: 205000 },
    { month: "Feb", amount: 220000 },
    { month: "Mar", amount: 235000 },
    { month: "Apr", amount: 240000 },
    { month: "May", amount: 225000 },
    { month: "Jun", amount: 238000 },
    { month: "Jul", amount: 242000 },
    { month: "Aug", amount: 245000 },
    { month: "Sep", amount: 245680 },
  ];

  const serviceDistribution = [
    { name: "General Dentistry", value: 32, color: "#3B82F6" },
    { name: "Cosmetic Dentistry", value: 24, color: "#10B981" },
    { name: "Orthodontics", value: 16, color: "#F59E0B" },
    { name: "Pediatric Dentistry", value: 15, color: "#8B5CF6" },
    { name: "Oral Surgery", value: 7, color: "#EC4899" },
    { name: "Others", value: 4, color: "#6B7280" },
  ];

  const nextAppointments = [
    {
      name: "Mary Wanjiku",
      initials: "MW",
      service: "General Checkup",
      time: "09:30 AM - 10:00 AM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      name: "John K. Mutiso",
      initials: "JM",
      service: "Teeth Cleaning",
      time: "11:00 AM - 1:36 AM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      name: "Grace Njeri",
      initials: "GN",
      service: "Orthodontic Consultation",
      time: "02:00 PM - 02:45 PM",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
  ];

  const recentAppointmentsData = [
    {
      patient: "Mary Wanjiku",
      initials: "MW",
      service: "General Checkup",
      doctor: "Dr. Sarah Kimani",
      time: "Today, 09:30 AM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      patient: "John K. Mutiso",
      initials: "JM",
      service: "Teeth Cleaning",
      doctor: "Dr. James Mwangi",
      time: "Today, 11:00 AM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      patient: "Grace Njeri",
      initials: "GN",
      service: "Orthodontic Consultation",
      doctor: "Dr. Amina Hassan",
      time: "Today, 02:00 PM",
      status: "Pending",
      statusColor: "bg-orange-100 text-orange-700",
    },
    {
      patient: "David Ochieng",
      initials: "DO",
      service: "Root Canal Treatment",
      doctor: "Dr. Peter Okello",
      time: "Today, 04:30 PM",
      status: "Confirmed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      patient: "Amina Wanjiku",
      initials: "AW",
      service: "Cosmetic Consultation",
      doctor: "Dr. Sarah Kimani",
      time: "Tomorrow, 10:00 AM",
      status: "Scheduled",
      statusColor: "bg-blue-100 text-blue-700",
    },
  ];

  const recentActivity = [
    {
      icon: UserPlus,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "New patient registered",
      subtitle: "Mary Wanjiku",
      time: "2 mins ago",
      link: "/workspace/admin/patients",
    },
    {
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Payment received",
      subtitle: "KSh 3,500",
      time: "12 mins ago",
      link: "/workspace/admin/billing",
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Appointment confirmed",
      subtitle: "John K. Mutiso",
      time: "18 mins ago",
      link: "/workspace/admin/appointments",
    },
    {
      icon: FileEdit,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Medical record updated",
      subtitle: "Grace Njeri",
      time: "25 mins ago",
      link: "/workspace/admin/records",
    },
    {
      icon: FileBarChart2,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      title: "Prescription issued",
      subtitle: "David Ochieng",
      time: "52 mins ago",
      link: "/workspace/admin/records",
    },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content - 9 columns */}
        <div className="col-span-9 space-y-6">
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-4 gap-6">
            {/* Total Patients */}
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span>Total Patients</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">12,480</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">12%</span>
                    <span className="text-gray-500">vs. last month</span>
                  </div>
                </div>
                <div className="w-16 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[{ v: 20 }, { v: 35 }, { v: 25 }, { v: 45 }, { v: 35 }, { v: 50 }]}>
                      <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Today's Appointments */}
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Today's Appointments</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">28</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">8%</span>
                    <span className="text-gray-500">vs. yesterday</span>
                  </div>
                </div>
                <div className="w-16 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[{ v: 25 }, { v: 30 }, { v: 28 }, { v: 35 }, { v: 32 }, { v: 28 }]}>
                      <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Total Revenue */}
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Total Revenue</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">KSh 245,680</div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">15%</span>
                    <span className="text-gray-500">vs. last month</span>
                  </div>
                </div>
                <div className="w-16 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[{ v: 180 }, { v: 195 }, { v: 210 }, { v: 225 }, { v: 238 }, { v: 245 }]}>
                      <Line type="monotone" dataKey="v" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Active Doctors */}
            <Card className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Stethoscope className="w-4 h-4" />
                    <span>Active Doctors</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                  <div className="text-sm text-gray-500">all specialists</div>
                </div>
                <div className="w-16 h-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[{ v: 4 }, { v: 5 }, { v: 5 }, { v: 5 }, { v: 5 }, { v: 5 }]}>
                      <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Appointments Overview Chart */}
            <Card className="col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Appointments Overview</h3>
                </div>
                <select className="text-sm border rounded px-3 py-1.5">
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold">32</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Scheduled</span>
                  <span className="font-semibold">38</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Cancelled</span>
                  <span className="font-semibold">4</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={appointmentsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="scheduled" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="cancelled" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Patients by Service - Donut Chart */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Patients by Service</h3>
              </div>
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={serviceDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {serviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                  <div className="text-2xl font-bold">12,480</div>
                  <div className="text-sm text-gray-500">Total Patients</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {serviceDistribution.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }}></div>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                    <span className="font-semibold">{service.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Appointments & Monthly Revenue */}
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Appointments Table */}
            <Card className="col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Recent Appointments</h3>
                </div>
                <Link to="/workspace/$role/$module" params={{ role: "admin", module: "appointments" }}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-gray-600">
                      <th className="pb-3 font-medium">Patient</th>
                      <th className="pb-3 font-medium">Service</th>
                      <th className="pb-3 font-medium">Doctor</th>
                      <th className="pb-3 font-medium">Date & Time</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentAppointmentsData.map((apt, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                {apt.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{apt.patient}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-700">{apt.service}</td>
                        <td className="py-3 text-gray-700">{apt.doctor}</td>
                        <td className="py-3 text-gray-700">{apt.time}</td>
                        <td className="py-3">
                          <Badge className={apt.statusColor}>{apt.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Monthly Revenue Chart */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Monthly Revenue</h3>
              </div>
              <div className="mb-4">
                <div className="text-2xl font-bold">KSh 245,680</div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600 font-medium">15%</span>
                  <span className="text-gray-500">vs. last month</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3B82F6" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
              <Button
                onClick={() => setShowBookingDialog(true)}
                className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex-col gap-2"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Book Appointment</span>
              </Button>
              <Button
                onClick={() => setShowAddPatientDialog(true)}
                variant="outline"
                className="h-auto py-4 flex-col gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add Patient</span>
              </Button>
              <Button
                onClick={() => setShowUpdateRecordsDialog(true)}
                variant="outline"
                className="h-auto py-4 flex-col gap-2 border-green-200 text-green-700 hover:bg-green-50"
              >
                <FileEdit className="w-5 h-5" />
                <span>Update Records</span>
              </Button>
              <Button
                onClick={() => setShowGenerateReportDialog(true)}
                variant="outline"
                className="h-auto py-4 flex-col gap-2 border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <FileBarChart2 className="w-5 h-5" />
                <span>Generate Report</span>
              </Button>
            </div>
          </Card>

          {/* Bottom Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">Trusted by 12,000+ Patients</h4>
              <p className="text-sm text-gray-600">Quality care, Happy smiles</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">5 Expert Doctors</h4>
              <p className="text-sm text-gray-600">Specialists of India</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">Modern Equipment</h4>
              <p className="text-sm text-gray-600">Advanced & safe</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h4 className="font-semibold text-lg mb-1">24/7 Emergency Care</h4>
              <p className="text-sm text-gray-600">Always here for you</p>
            </Card>
          </div>

          {/* Footer Branding */}
          <div className="text-center py-8">
            <p className="text-2xl font-semibold text-gray-700">
              Your Smile Our Priority <Heart className="inline w-6 h-6 text-blue-600 fill-blue-600" />
            </p>
          </div>
        </div>

        {/* Right Sidebar - 3 columns */}
        <div className="col-span-3 space-y-6">
          {/* Hero Banner */}
          <Card className="overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <div className="relative h-48">
              <img src={heroImage} alt="Patient" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-2">Healthy Smiles Brighter Futures</h3>
                <p className="text-blue-100 text-sm mb-4">Experience dental care with a personal touch</p>
                <Link to="/workspace/$role/$module" params={{ role: "admin", module: "records" }}>
                  <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                    View Patient Records <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Next Appointment */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Next Appointment</h3>
              <Link to="/workspace/$role/$module" params={{ role: "admin", module: "appointments" }}>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {nextAppointments.map((apt, idx) => (
                <Link
                  key={idx}
                  to="/workspace/$role/$module"
                  params={{ role: "admin", module: "appointments" }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {apt.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{apt.name}</p>
                        <p className="text-xs text-gray-600">{apt.service}</p>
                      </div>
                      <Badge className={apt.statusColor}>{apt.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{apt.time}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Link to="/workspace/$role/$module" params={{ role: "admin", module: "patients" }}>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <Link
                  key={idx}
                  to={activity.link}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Dialogs for Quick Actions */}

      {/* Book Appointment Dialog */}
      <BookAppointmentDialog open={showBookingDialog} onOpenChange={setShowBookingDialog} />

      {/* Add Patient Dialog */}
      <AddPatientDialog open={showAddPatientDialog} onOpenChange={setShowAddPatientDialog} />

      {/* Update Records Dialog */}
      <Dialog open={showUpdateRecordsDialog} onOpenChange={setShowUpdateRecordsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-green-600" />
              Update Medical Records
            </DialogTitle>
            <DialogDescription>
              Update patient medical records, treatment plans, and clinical notes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm text-gray-600">
              You can update:
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Treatment history & progress notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Dental charts & X-rays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Prescriptions & lab results</span>
              </li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowUpdateRecordsDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Link to="/workspace/$role/$module" params={{ role: "admin", module: "records" }} className="flex-1">
              <Button
                onClick={() => setShowUpdateRecordsDialog(false)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Go to Records
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <GenerateReportDialog open={showGenerateReportDialog} onOpenChange={setShowGenerateReportDialog} />
    </div>
  );
}

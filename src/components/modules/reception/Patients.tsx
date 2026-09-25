import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useClinicStore } from "@/lib/demo/store";
import { Search, Plus, Phone, Mail, Calendar, User, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Patients() {
  const { patients } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Creating patient:", Object.fromEntries(formData));
    setIsDialogOpen(false);
  };

  return (
    <PanelCard
      title="Patient Management"
      subtitle="View and manage all registered patients"
      action={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePatient} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input name="firstName" required />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input name="lastName" required />
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input type="date" name="dob" required />
                </div>
                <div>
                  <Label>Gender *</Label>
                  <Select name="gender" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input name="phone" type="tel" required />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="email" type="email" />
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <Input name="address" />
                </div>
                <div>
                  <Label>Emergency Contact Name</Label>
                  <Input name="emergencyContactName" />
                </div>
                <div>
                  <Label>Emergency Contact Phone</Label>
                  <Input name="emergencyContactPhone" type="tel" />
                </div>
                <div className="col-span-2">
                  <Label>Medical History / Allergies</Label>
                  <Input name="medicalHistory" placeholder="Any known allergies or medical conditions" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Register Patient</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name, code, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{patients.length}</div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter((p) => p.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {patients.filter((p) => new Date(p.registeredDate).getMonth() === new Date().getMonth()).length}
            </div>
            <div className="text-sm text-gray-600">This Month</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {patients.filter((p) => p.allergies && p.allergies.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">With Allergies</div>
          </div>
        </div>

        {/* Patient List */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Patient</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Code</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Contact</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Registered</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left p-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-sm">{patient.code}</span>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {patient.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {patient.registeredDate}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge
                      className={
                        patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Link
                      to="/workspace/$role/$module"
                      params={{ role: "clinical", module: "patients" }}
                      search={{ patientId: patient.id }}
                    >
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No patients found matching your search
          </div>
        )}
      </div>
    </PanelCard>
  );
}

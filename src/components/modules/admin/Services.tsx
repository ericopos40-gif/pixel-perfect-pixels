import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash, DollarSign, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  status: "active" | "inactive";
}

export function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Demo services
  const services: Service[] = [
    {
      id: "SRV-001",
      name: "General Checkup",
      category: "Preventive",
      description: "Comprehensive oral examination and cleaning",
      price: 2000,
      duration: "30 min",
      status: "active",
    },
    {
      id: "SRV-002",
      name: "Teeth Cleaning",
      category: "Preventive",
      description: "Professional teeth cleaning and polishing",
      price: 3000,
      duration: "45 min",
      status: "active",
    },
    {
      id: "SRV-003",
      name: "Tooth Filling",
      category: "Restorative",
      description: "Composite or amalgam filling",
      price: 4500,
      duration: "1 hour",
      status: "active",
    },
    {
      id: "SRV-004",
      name: "Root Canal Therapy",
      category: "Endodontics",
      description: "Complete root canal treatment",
      price: 15000,
      duration: "2 hours",
      status: "active",
    },
    {
      id: "SRV-005",
      name: "Tooth Extraction",
      category: "Surgery",
      description: "Simple or surgical tooth extraction",
      price: 5000,
      duration: "1 hour",
      status: "active",
    },
    {
      id: "SRV-006",
      name: "Teeth Whitening",
      category: "Cosmetic",
      description: "Professional teeth whitening treatment",
      price: 8000,
      duration: "1.5 hours",
      status: "active",
    },
    {
      id: "SRV-007",
      name: "Dental Crown",
      category: "Restorative",
      description: "Porcelain or metal crown placement",
      price: 12000,
      duration: "2 hours",
      status: "active",
    },
    {
      id: "SRV-008",
      name: "Braces Consultation",
      category: "Orthodontics",
      description: "Initial orthodontic consultation and planning",
      price: 2500,
      duration: "45 min",
      status: "active",
    },
    {
      id: "SRV-009",
      name: "Dental Implant",
      category: "Surgery",
      description: "Single tooth implant procedure",
      price: 35000,
      duration: "3 hours",
      status: "active",
    },
    {
      id: "SRV-010",
      name: "X-Ray (Full Mouth)",
      category: "Diagnostic",
      description: "Complete oral radiographic examination",
      price: 3500,
      duration: "15 min",
      status: "active",
    },
  ];

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(services.map((s) => s.category)));
  const totalRevenue = services.reduce((sum, s) => sum + s.price, 0);

  const handleCreateService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Creating service:", Object.fromEntries(formData));
    setIsDialogOpen(false);
  };

  return (
    <PanelCard
      title="Service Catalog"
      subtitle="Manage dental services and pricing"
      action={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Service Name *</Label>
                  <Input name="name" required placeholder="e.g., Root Canal Therapy" />
                </div>
                <div>
                  <Label>Category *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preventive">Preventive</SelectItem>
                      <SelectItem value="restorative">Restorative</SelectItem>
                      <SelectItem value="cosmetic">Cosmetic</SelectItem>
                      <SelectItem value="orthodontics">Orthodontics</SelectItem>
                      <SelectItem value="endodontics">Endodontics</SelectItem>
                      <SelectItem value="surgery">Surgery</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price (KSh) *</Label>
                  <Input name="price" type="number" required placeholder="5000" />
                </div>
                <div>
                  <Label>Duration *</Label>
                  <Input name="duration" required placeholder="e.g., 1 hour" />
                </div>
                <div>
                  <Label>Status *</Label>
                  <Select name="status" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Detailed description of the service"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Service</Button>
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
            placeholder="Search services by name, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-sm text-gray-600">Total Services</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {services.filter((s) => s.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              KSh {Math.round(totalRevenue / services.length).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Avg Price</div>
          </div>
        </div>

        {/* Services by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryServices = filteredServices.filter((s) => s.category === category);
            if (categoryServices.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {category}
                  <Badge variant="outline">{categoryServices.length}</Badge>
                </h3>
                <div className="grid gap-3">
                  {categoryServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <Badge
                              className={
                                service.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {service.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                          <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <span className="font-semibold">KSh {service.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No services found matching your search
          </div>
        )}
      </div>
    </PanelCard>
  );
}

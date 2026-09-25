import { useState } from "react";
import { PanelCard } from "@/components/shared/PanelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useClinicStore } from "@/lib/demo/store";
import { Send, Search, Mail, Phone, MessageSquare, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  patientId: string;
  subject: string;
  content: string;
  type: "email" | "sms" | "internal";
  status: "sent" | "pending" | "failed";
  timestamp: string;
  read: boolean;
}

export function Messages() {
  const { patients } = useClinicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Demo messages
  const messages: Message[] = [
    {
      id: "MSG-001",
      patientId: "PAT-005",
      subject: "Appointment Reminder",
      content: "Your appointment is scheduled for tomorrow at 10:00 AM with Dr. James Mwangi.",
      type: "sms",
      status: "sent",
      timestamp: "2025-09-19 14:30",
      read: true,
    },
    {
      id: "MSG-002",
      patientId: "PAT-003",
      subject: "Lab Results Ready",
      content: "Your lab results are ready. Please contact us to schedule a follow-up appointment.",
      type: "email",
      status: "sent",
      timestamp: "2025-09-19 11:15",
      read: false,
    },
    {
      id: "MSG-003",
      patientId: "PAT-002",
      subject: "Payment Receipt",
      content: "Thank you for your payment of KSh 5,000. Your receipt number is REC-2025-0045.",
      type: "email",
      status: "sent",
      timestamp: "2025-09-18 16:45",
      read: true,
    },
    {
      id: "MSG-004",
      patientId: "PAT-005",
      subject: "Appointment Confirmation",
      content: "Your appointment has been confirmed for September 20, 2025 at 10:00 AM.",
      type: "sms",
      status: "pending",
      timestamp: "2025-09-18 10:00",
      read: false,
    },
  ];

  const filteredMessages = messages.filter((msg) => {
    const patient = patients.find((p) => p.id === msg.patientId);
    if (!patient) return false;
    return (
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("Sending message:", Object.fromEntries(formData));
    setIsDialogOpen(false);
  };

  const MessageCard = ({ message }: { message: Message }) => {
    const patient = patients.find((p) => p.id === message.patientId);
    if (!patient) return null;

    const getTypeIcon = () => {
      switch (message.type) {
        case "email":
          return <Mail className="w-4 h-4" />;
        case "sms":
          return <Phone className="w-4 h-4" />;
        case "internal":
          return <MessageSquare className="w-4 h-4" />;
      }
    };

    const getStatusColor = () => {
      switch (message.status) {
        case "sent":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-orange-100 text-orange-800";
        case "failed":
          return "bg-red-100 text-red-800";
      }
    };

    return (
      <div className={`border rounded-lg p-4 hover:bg-gray-50 ${!message.read ? "bg-blue-50" : ""}`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              {getTypeIcon()}
            </div>
            <div>
              <div className="font-semibold">{patient.name}</div>
              <div className="text-sm text-gray-600">{patient.phone}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={getStatusColor()}>{message.status}</Badge>
            {!message.read && <Badge className="bg-blue-600 text-white">New</Badge>}
          </div>
        </div>

        <div className="mb-2">
          <div className="font-medium text-sm">{message.subject}</div>
          <div className="text-sm text-gray-600 line-clamp-2">{message.content}</div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {message.timestamp}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">View</Button>
            <Button size="sm" variant="outline">Reply</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <PanelCard
      title="Patient Communications"
      subtitle="Send and manage messages to patients"
      action={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Message to Patient</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <Label>Patient *</Label>
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
                <Label>Message Type *</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="internal">Internal Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Subject *</Label>
                <Input name="subject" required placeholder="Message subject" />
              </div>

              <div>
                <Label>Message *</Label>
                <Textarea
                  name="content"
                  required
                  placeholder="Type your message here..."
                  rows={6}
                />
                <div className="text-xs text-gray-500 mt-1">
                  SMS messages are limited to 160 characters
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
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
            placeholder="Search messages by patient, subject, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter((m) => m.status === "sent").length}
            </div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {messages.filter((m) => m.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {messages.filter((m) => !m.read).length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
        </div>

        {/* Message Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({messages.length})</TabsTrigger>
            <TabsTrigger value="email">
              Email ({messages.filter((m) => m.type === "email").length})
            </TabsTrigger>
            <TabsTrigger value="sms">
              SMS ({messages.filter((m) => m.type === "sms").length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({messages.filter((m) => !m.read).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {filteredMessages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </TabsContent>

          <TabsContent value="email" className="space-y-3 mt-4">
            {filteredMessages
              .filter((m) => m.type === "email")
              .map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
          </TabsContent>

          <TabsContent value="sms" className="space-y-3 mt-4">
            {filteredMessages
              .filter((m) => m.type === "sms")
              .map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3 mt-4">
            {filteredMessages
              .filter((m) => !m.read)
              .map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
          </TabsContent>
        </Tabs>

        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No messages found matching your search
          </div>
        )}
      </div>
    </PanelCard>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CalendarCheck, Clock, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { dentists, services } from "@/lib/demo/data";
import { ksh } from "@/lib/demo/format";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Dental Appointment — BrightSmile Kerugoya" },
      {
        name: "description",
        content:
          "Request an appointment at BrightSmile Dental Care Centre in Kerugoya. Choose your treatment, preferred dentist, date and time.",
      },
      { property: "og:title", content: "Book an appointment at BrightSmile" },
      { property: "og:description", content: "Pick a treatment, dentist and time — we confirm by phone." },
    ],
  }),
  component: BookingPage,
});

const TIME_SLOTS = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  serviceId: z.string().min(1, "Please choose a treatment"),
  dentistId: z.string().min(1, "Please choose a dentist"),
  date: z.string().min(1, "Please choose a date"),
  time: z.string().min(1, "Please choose a time"),
  notes: z.string().optional(),
});

type BookingValues = z.infer<typeof schema>;

function BookingPage() {
  const form = useForm<BookingValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceId: "",
      dentistId: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const selectedService = services.find((service) => service.id === form.watch("serviceId"));

  function onSubmit(values: BookingValues) {
    const dentist = dentists.find((item) => item.id === values.dentistId);
    toast.success("Appointment request received", {
      description: `${values.date} at ${values.time} with ${dentist?.name}. Reception will call ${values.phone} to confirm.`,
    });
    form.reset();
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Book Appointment"
        title="Request your visit"
        intro="Tell us what you need and when suits you. Our reception team confirms every request by phone."
      />

      <Section title="Appointment details">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Mary Wanjiku" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number *</FormLabel>
                        <FormControl>
                          <Input placeholder="0712 345 678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.co.ke" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treatment *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a treatment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dentistId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred dentist *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a dentist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {dentists.map((dentist) => (
                              <SelectItem key={dentist.id} value={dentist.id} disabled={dentist.status === "ON_LEAVE"}>
                                {dentist.name} — {dentist.specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred time *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIME_SLOTS.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anything we should know?</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Pain, allergies, previous treatment…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg">
                  <CalendarCheck className="size-4" /> Request appointment
                </Button>
              </form>
            </Form>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-heading">Your selection</h3>
              {selectedService ? (
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Treatment</dt>
                    <dd className="font-medium text-heading">{selectedService.name}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="font-medium text-heading">{selectedService.durationMinutes} min</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Estimated fee</dt>
                    <dd className="font-bold text-brand">{ksh(selectedService.price)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Choose a treatment to see its duration and estimated fee.
                </p>
              )}
            </div>

            <div className="rounded-xl border border-border bg-brand-soft p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-heading">
                <Clock className="size-4 text-brand" /> Clinic hours
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Monday – Saturday, 8:00 AM – 5:00 PM</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-heading">
                <Info className="size-4 text-brand" /> Emergencies
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                For urgent dental pain outside opening hours, call +254 712 345 678 at any time.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}

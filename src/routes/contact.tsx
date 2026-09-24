import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BrightSmile Dental Care Centre — Kerugoya" },
      {
        name: "description",
        content:
          "Call +254 712 345 678, email info@brightsmile.co.ke or send us a message. We are in Kerugoya Town, Kirinyaga County.",
      },
      { property: "og:title", content: "Contact BrightSmile Dental Care Centre" },
      { property: "og:description", content: "Phone, email, location and opening hours for our Kerugoya clinic." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Please tell us a little more"),
});

type ContactValues = z.infer<typeof schema>;

const DETAILS = [
  { icon: MapPin, label: "Visit us", value: "Kerugoya Town, Kirinyaga County" },
  { icon: Phone, label: "Call us", value: "+254 712 345 678" },
  { icon: Mail, label: "Email us", value: "info@brightsmile.co.ke" },
  { icon: Clock, label: "Opening hours", value: "Monday – Saturday, 8:00 AM – 5:00 PM" },
];

function ContactPage() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  function onSubmit(values: ContactValues) {
    toast.success("Message sent", {
      description: `Thank you ${values.name.split(" ")[0]}, our reception team will reply within one working day.`,
    });
    form.reset();
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about a treatment, a bill or an appointment? Our reception team is happy to help."
      />

      <Section title="Send us a message">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
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
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="How can we help you?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Send message
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-4">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="flex gap-3 rounded-xl border border-border bg-card p-5 shadow-card">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <detail.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    {detail.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-heading">{detail.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

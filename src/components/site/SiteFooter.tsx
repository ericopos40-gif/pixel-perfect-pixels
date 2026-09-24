import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Team", to: "/team" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20">
      <div className="brand-gradient px-4 py-14 text-center text-white sm:px-6">
        <h2 className="font-display text-3xl font-bold text-white">Your Smile Matters</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
          Book your visit at BrightSmile Dental Care Centre in Kerugoya and let our team take care of the rest.
        </p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/booking">Book Appointment</Link>
        </Button>
      </div>

      <div className="bg-navy-deep px-4 py-12 text-white/70 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-bold text-white">BrightSmile</span>
                <span className="block text-[11px] text-white/60">Dental Care Centre</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm">
              Modern, community-focused dental care for families across Kerugoya and Kirinyaga County.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Quick Links</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">Get In Touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 text-primary" /> Kerugoya Town, Kirinyaga County
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 text-primary" /> +254 712 345 678
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 text-primary" /> info@brightsmile.co.ke
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 size-4 text-primary" /> Mon – Sat, 8:00 AM – 5:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
          © 2025 BrightSmile Dental Care Centre. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

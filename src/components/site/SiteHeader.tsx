import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Menu, Phone, Sparkles, Twitter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Team", to: "/team" },
  { label: "Blog", to: "/blog" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy-deep text-white/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs sm:px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5" /> +254 712 345 678
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="size-3.5" /> info@brightsmile.co.ke
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin className="size-3.5" /> Kerugoya, Kirinyaga
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-white">
              <Facebook className="size-3.5" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
              <Twitter className="size-3.5" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-white">
              <Instagram className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-heading">BrightSmile</span>
              <span className="block text-[11px] text-muted-foreground">Dental Care Centre</span>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-brand-soft text-brand" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/booking">Book Appointment</Link>
            </Button>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/workspace/$role" params={{ role: "admin" }}>
                Staff Login
              </Link>
            </Button>
            <button
              type="button"
              aria-label="Toggle menu"
              className="rounded-lg border border-border p-2 text-muted-foreground lg:hidden"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-border bg-card px-4 py-3 lg:hidden">
            <div className="grid gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-brand-soft hover:text-brand"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link to="/booking" onClick={() => setOpen(false)}>
                  Book Appointment
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/workspace/$role" params={{ role: "admin" }} onClick={() => setOpen(false)}>
                  Staff Login
                </Link>
              </Button>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

import { useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CLINIC_HOURS, DEMO_TODAY_LABEL } from "@/lib/demo/data";
import { workspaceRoleList, type WorkspaceRole } from "@/lib/workspace/roles";

interface AppShellProps {
  role: WorkspaceRole;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({ role, title, subtitle, actions, children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeModule = location.pathname.replace(`/workspace/${role.slug}`, "").replace(/^\//, "");

  return (
    <div className="flex min-h-screen bg-background">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-navy-deep/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "sidebar-gradient scrollbar-slim fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4.5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold text-white">BrightSmile</span>
              <span className="block text-[11px] text-white/60">Dental Care Centre</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="text-white/70 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 px-3 pb-6">
          {role.nav.map((group, index) => (
            <div key={group.label ?? index} className="space-y-1">
              {group.label ? (
                <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                  {group.label}
                </p>
              ) : null}
              {group.items.map((item) => {
                const isActive = activeModule === item.module;
                const shared = {
                  onClick: () => setMobileOpen(false),
                  className: cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/10 hover:text-white",
                  ),
                };
                const content = (
                  <>
                    <item.icon className="size-4.5 shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </>
                );
                return item.module === "" ? (
                  <Link key={item.label} to="/workspace/$role" params={{ role: role.slug }} {...shared}>
                    {content}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to="/workspace/$role/$module"
                    params={{ role: role.slug, module: item.module }}
                    {...shared}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-[11px] text-white/50">
          <p className="font-semibold text-white/70">{DEMO_TODAY_LABEL}</p>
          <p>Clinic hours {CLINIC_HOURS}</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-lg border border-border p-2 text-muted-foreground lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4.5" />
            </button>

            <div className="relative hidden max-w-sm flex-1 md:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search patients, appointments…"
                className="h-10 rounded-lg border-border bg-secondary pl-9"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
                    {role.roleLabel}
                    <ChevronDown className="size-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Demo — switch role view</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {workspaceRoleList.map((option) => (
                    <DropdownMenuItem key={option.slug} asChild>
                      <Link to="/workspace/$role" params={{ role: option.slug }}>
                        <span className="flex-1">{option.roleLabel}</span>
                        <span className="text-xs text-muted-foreground">{option.personName}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/workspace/$role/$module"
                params={{ role: role.slug, module: "messages" }}
                className="relative rounded-lg border border-border p-2 text-muted-foreground hover:text-brand"
                aria-label="Notifications"
              >
                <Bell className="size-4.5" />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border py-1.5 pr-2 pl-1.5 text-left">
                  <span className="flex size-8 items-center justify-center rounded-md bg-navy text-xs font-semibold text-white">
                    {role.initials}
                  </span>
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-xs font-semibold text-heading">{role.personName}</span>
                    <span className="block text-[11px] text-muted-foreground">{role.personTitle}</span>
                  </span>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>{role.personName}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/workspace/$role/$module" params={{ role: role.slug, module: "settings" }}>
                      <UserRound className="size-4" /> My profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/workspace/$role/$module" params={{ role: role.slug, module: "settings" }}>
                      <Settings className="size-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <LogOut className="size-4" /> Back to website
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-heading">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

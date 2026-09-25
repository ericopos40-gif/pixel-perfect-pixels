import { createFileRoute, notFound, Outlet, useLocation } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { findNavItem, getWorkspaceRole } from "@/lib/workspace/roles";

export const Route = createFileRoute("/workspace/$role")({
  loader: ({ params }) => {
    const role = getWorkspaceRole(params.role);
    if (!role) throw notFound();
    return { roleSlug: role.slug };
  },
  component: WorkspaceLayout,
});

function WorkspaceLayout() {
  const { role: roleSlug } = Route.useParams();
  const location = useLocation();
  const role = getWorkspaceRole(roleSlug);
  if (!role) return null;

  const moduleSlug = location.pathname.replace(`/workspace/${role.slug}`, "").replace(/^\//, "");
  const navItem = moduleSlug ? findNavItem(role, moduleSlug) : undefined;

  const title = navItem?.label ?? role.dashboardTitle;
  const subtitle = navItem
    ? `${role.roleLabel} workspace — ${navItem.label.toLowerCase()}`
    : role.dashboardSubtitle;

  return (
    <AppShell role={role} title={title} subtitle={subtitle}>
      <Outlet />
    </AppShell>
  );
}

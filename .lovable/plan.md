# BrightSmile Dental Clinic System — Phased Build

## Goal
Build one connected, clickable dental clinic demonstration using shared realistic Kenyan data. The supplied screenshots remain the visual source of truth; this phase establishes the reusable foundation without inventing a different design.

## Phase 1 — Foundation and first usable experience
- Replace the blank page with the BrightSmile public website experience based on the supplied public-site screenshot.
- Establish the navy/blue BrightSmile design system, Playfair Display headings, Inter interface text, compact cards, borders, badges, and responsive rules.
- Add a shared demo-data layer for patients, staff, appointments, services, payments, notifications, and the fully populated Amina Wanjiku lifecycle record.
- Create the reusable internal application shell: collapsible role-aware sidebar, search header, notifications, messages, current-user menu, and mobile drawer.
- Add a demo role switcher so every major role can enter its own workspace without a real account or database yet.
- Build the first dashboard views from the references: administrator, receptionist, dentist, accountant, dentists directory, and website administrator.
- Make visible controls useful: navigation, search, filters, status changes, dialogs/forms, and feedback. Data changes will update the shared in-memory demo state.

## Later phases
1. Patient, appointment, reception, nursing, dental-chart, treatment, prescription, and laboratory workflows.
2. Nurse, lab, pharmacy, inventory, HR, management, reporting, and patient workspaces.
3. Billing, receipts, notifications, settings, audit history, and the complete Reception → Nurse → Dentist → Lab → Payment demonstration.
4. Responsive/accessibility verification, demo-data reset tools, data consistency audit, and Laravel API-ready service contracts.

## Technical details
- Keep TanStack Start’s existing routing and add a dedicated route for every shareable page.
- Use typed domain models and a central demo repository so all roles operate on the same records.
- Use Recharts for charts, React Hook Form + Zod for forms, and reusable dashboard/table/status components.
- Keep server persistence and real authentication out of this demo-first phase; the repository interface will be replaceable by the future Laravel REST API.
- Give every content route unique page and social metadata.

## Verification
- Check desktop and mobile layouts against the supplied references.
- Verify navigation, role switching, forms, filters, status updates, dialogs, and shared-data updates in the running preview.
- Confirm no empty screens, dead controls, console failures, or build errors remain in each completed phase.

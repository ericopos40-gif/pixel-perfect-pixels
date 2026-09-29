# Convert the system to Abancool Hospital

## Outcome
Rename the complete experience to **Abancool Hospital** and reposition it as a general hospital. Dental care remains available as one full department rather than the entire organization.

## Changes
1. **Hospital-wide identity**
   - Replace BrightSmile and Dental Care Centre branding across the public website, staff workspace, login, metadata, messages, and saved demo-data label.
   - Use hospital-focused language while preserving the current visual direction and layout.

2. **Public hospital website**
   - Update Home, About, Services, Team, Blog, Events, Gallery, Contact, and Booking content for a general hospital.
   - Present core departments such as Outpatient, Emergency, Dental, Pediatrics, Maternity, Surgery, Laboratory, Pharmacy, and Radiology.
   - Change provider selection from dentist-only to doctor/specialist selection and keep Dental clearly represented.

3. **Hospital departments and staff workspaces**
   - Generalize clinical and nursing labels from dental-only language.
   - Add discoverable department views for Emergency, Outpatient, Inpatient/Wards, Pediatrics, Maternity, Theatre/Surgery, Radiology, Dental, Laboratory, Pharmacy, Finance, HR, and Inventory.
   - Keep existing working role dashboards and workflows, adapting shared language rather than discarding completed features.

4. **Shared records and demo information**
   - Preserve the common patient, appointment, vitals, diagnosis, prescription, laboratory, billing, and audit workflow.
   - Expand service and staff examples beyond dentistry while retaining dental charts and dental treatments inside the Dental department.

5. **Quality check**
   - Fix current compilation issues, verify the main public pages and staff workspace, and check desktop and mobile layouts.

## Technical details
- Continue using the existing shared in-memory demo store so all departments see the same patient journey.
- Keep dental-specific record types and screens scoped to Dental; use neutral naming in shared navigation and patient records.
- Preserve TanStack routes and existing component patterns; add only the routes needed for department access.

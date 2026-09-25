import { PanelCard } from "@/components/shared/PanelCard";
import { useDentalChartForPatient, useClinic } from "@/lib/demo/store";

export function DentalChart() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const { patients } = useClinic();
  const patient = patients.find((p) => p.id === patientId);
  const dentalChart = useDentalChartForPatient(patientId);

  if (!patient || !dentalChart) {
    return <PanelCard title="Dental Chart">Chart not available.</PanelCard>;
  }

  const ADULT_TEETH = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]; // Upper quadrants (teeth 18-11, 21-28)
  const LOWER_TEETH = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8]; // Lower quadrants (teeth 48-41, 31-38)

  const getToothColor = (condition: string | undefined) => {
    switch (condition) {
      case "HEALTHY":
        return "bg-success-soft text-success border-success";
      case "CARIES":
        return "bg-warning-soft text-warning-foreground border-warning";
      case "FILLED":
        return "bg-info-soft text-info border-info";
      case "MISSING":
        return "bg-destructive/20 text-destructive border-destructive";
      default:
        return "bg-secondary text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      <PanelCard title="Interactive Dental Chart" subtitle="Click teeth to view or update conditions">
        <div className="space-y-8">
          {/* Upper Teeth */}
          <div>
            <h3 className="mb-4 font-semibold text-heading">Upper Teeth</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {/* Upper right quadrant (teeth 18-11) */}
              {[18, 17, 16, 15, 14, 13, 12, 11].map((toothNum) => {
                const tooth = dentalChart.teeth[toothNum.toString()];
                return (
                  <button
                    key={toothNum}
                    className={`flex size-12 items-center justify-center rounded-lg border-2 font-bold text-sm transition-all hover:shadow-md ${getToothColor(tooth?.condition)}`}
                  >
                    {toothNum}
                  </button>
                );
              })}
              {/* Upper left quadrant (teeth 21-28) */}
              {[21, 22, 23, 24, 25, 26, 27, 28].map((toothNum) => {
                const tooth = dentalChart.teeth[toothNum.toString()];
                return (
                  <button
                    key={toothNum}
                    className={`flex size-12 items-center justify-center rounded-lg border-2 font-bold text-sm transition-all hover:shadow-md ${getToothColor(tooth?.condition)}`}
                  >
                    {toothNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lower Teeth */}
          <div>
            <h3 className="mb-4 font-semibold text-heading">Lower Teeth</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {/* Lower left quadrant (teeth 48-41) */}
              {[48, 47, 46, 45, 44, 43, 42, 41].map((toothNum) => {
                const tooth = dentalChart.teeth[toothNum.toString()];
                return (
                  <button
                    key={toothNum}
                    className={`flex size-12 items-center justify-center rounded-lg border-2 font-bold text-sm transition-all hover:shadow-md ${getToothColor(tooth?.condition)}`}
                  >
                    {toothNum}
                  </button>
                );
              })}
              {/* Lower right quadrant (teeth 31-38) */}
              {[31, 32, 33, 34, 35, 36, 37, 38].map((toothNum) => {
                const tooth = dentalChart.teeth[toothNum.toString()];
                return (
                  <button
                    key={toothNum}
                    className={`flex size-12 items-center justify-center rounded-lg border-2 font-bold text-sm transition-all hover:shadow-md ${getToothColor(tooth?.condition)}`}
                  >
                    {toothNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PanelCard>

      {/* Legend */}
      <PanelCard title="Chart Legend" subtitle="Tooth condition indicators">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-success-soft text-success font-bold text-xs">✓</div>
            <span className="text-sm">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-warning-soft text-warning-foreground font-bold text-xs">!</div>
            <span className="text-sm">Caries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-info-soft text-info font-bold text-xs">R</div>
            <span className="text-sm">Filled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-destructive/20 text-destructive font-bold text-xs">-</div>
            <span className="text-sm">Missing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded bg-secondary text-muted-foreground font-bold text-xs">?</div>
            <span className="text-sm">Other</span>
          </div>
        </div>
      </PanelCard>

      {/* Tooth Details */}
      <PanelCard title="Tooth Details" subtitle="Detailed information">
        <div className="space-y-3">
          {Object.entries(dentalChart.teeth).map(([, tooth]) => (
            <div key={tooth.toothNumber} className="flex items-start justify-between rounded-lg border border-border p-3">
              <div>
                <h4 className="font-semibold">Tooth {tooth.toothNumber}</h4>
                {tooth.notes && <p className="mt-1 text-sm text-muted-foreground">{tooth.notes}</p>}
              </div>
              <span className="rounded-full bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground">{tooth.condition}</span>
            </div>
          ))}
        </div>
      </PanelCard>
    </div>
  );
}

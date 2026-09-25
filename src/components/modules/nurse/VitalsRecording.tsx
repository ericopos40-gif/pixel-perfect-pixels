import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelCard } from "@/components/shared/PanelCard";
import { useState } from "react";
import { toast } from "sonner";
import { useClinic } from "@/lib/demo/store";

export function VitalsRecording() {
  // For demo, using the golden patient (Amina - PAT-005)
  const patientId = "PAT-005";
  const { patients, addVitals } = useClinic();
  const patient = patients.find((p) => p.id === patientId);

  const [formData, setFormData] = useState({
    bloodPressure: "118/76",
    heartRate: "72",
    temperature: "36.8",
    respiratoryRate: "16",
    oxygenSaturation: "98",
    weight: "62",
    height: "168",
    painScore: "3",
    notes: "Patient vital signs stable. Ready for treatment.",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVitals = {
      id: `VIT-${Date.now()}`,
      appointmentId: "APT-1005",
      patientId,
      recordedBy: "STF-011",
      date: "2025-09-20",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
      bloodPressure: formData.bloodPressure,
      heartRate: parseInt(formData.heartRate),
      temperature: parseFloat(formData.temperature),
      respiratoryRate: parseInt(formData.respiratoryRate),
      oxygenSaturation: parseInt(formData.oxygenSaturation),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      painScore: parseInt(formData.painScore),
      notes: formData.notes,
    };

    addVitals(newVitals);
    toast.success("Vitals recorded successfully", {
      description: "Patient is now ready for the dentist.",
    });

    // Reset form
    setFormData({
      bloodPressure: "118/76",
      heartRate: "72",
      temperature: "36.8",
      respiratoryRate: "16",
      oxygenSaturation: "98",
      weight: "62",
      height: "168",
      painScore: "3",
      notes: "Patient vital signs stable. Ready for treatment.",
    });
  };

  if (!patient) {
    return <PanelCard title="Patient Not Found">Patient record not available.</PanelCard>;
  }

  return (
    <div className="space-y-6">
      <PanelCard>
        <div className="flex items-center gap-4">
          <div className={`flex size-14 items-center justify-center rounded-lg text-xl font-bold ${patient.avatarTone}`}>
            {patient.initials}
          </div>
          <div>
            <h2 className="text-lg font-bold text-heading">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">{patient.code}</p>
          </div>
        </div>
      </PanelCard>

      <PanelCard title="Record Vitals" subtitle="Enter patient vital signs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blood Pressure */}
          <div>
            <label className="block text-sm font-medium text-heading">Blood Pressure (mmHg)</label>
            <Input
              type="text"
              name="bloodPressure"
              placeholder="120/80"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Heart Rate */}
          <div>
            <label className="block text-sm font-medium text-heading">Heart Rate (bpm)</label>
            <Input
              type="number"
              name="heartRate"
              min="40"
              max="200"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-heading">Temperature (°C)</label>
            <Input
              type="number"
              name="temperature"
              step="0.1"
              min="35"
              max="42"
              value={formData.temperature}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Respiratory Rate */}
          <div>
            <label className="block text-sm font-medium text-heading">Respiratory Rate (breaths/min)</label>
            <Input
              type="number"
              name="respiratoryRate"
              min="8"
              max="60"
              value={formData.respiratoryRate}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Oxygen Saturation */}
          <div>
            <label className="block text-sm font-medium text-heading">Oxygen Saturation (%)</label>
            <Input
              type="number"
              name="oxygenSaturation"
              min="80"
              max="100"
              value={formData.oxygenSaturation}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-heading">Weight (kg)</label>
            <Input type="number" name="weight" step="0.1" value={formData.weight} onChange={handleInputChange} className="mt-2" />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-heading">Height (cm)</label>
            <Input type="number" name="height" step="0.1" value={formData.height} onChange={handleInputChange} className="mt-2" />
          </div>

          {/* Pain Score */}
          <div>
            <label className="block text-sm font-medium text-heading">Pain Score (0-10)</label>
            <Input
              type="number"
              name="painScore"
              min="0"
              max="10"
              value={formData.painScore}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-heading">Nursing Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder-muted-foreground focus:border-brand focus:outline-none"
              rows={4}
              placeholder="Any observations or concerns..."
            />
          </div>

          <Button type="submit" className="w-full">
            Record Vitals & Mark Ready for Dentist
          </Button>
        </form>
      </PanelCard>
    </div>
  );
}

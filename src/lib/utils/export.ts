import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { format as formatDate } from "date-fns";

/**
 * Export data to Excel file
 */
export function exportToExcel(data: any[], filename: string, sheetName = "Data") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // Auto-size columns
  const maxWidth = 50;
  const colWidths = Object.keys(data[0] || {}).map((key) => {
    const values = data.map((row) => String(row[key] || ""));
    const maxLength = Math.max(key.length, ...values.map((v) => v.length));
    return { wch: Math.min(maxLength + 2, maxWidth) };
  });
  worksheet["!cols"] = colWidths;
  
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}

/**
 * Export data to PDF file with table
 */
export function exportToPDF(
  data: any[],
  filename: string,
  title: string,
  columns: { header: string; dataKey: string }[]
) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 20);
  
  // Add metadata
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${formatDate(new Date(), "PPP 'at' p")}`, 14, 28);
  doc.text(`BrightSmile Dental Care Centre`, 14, 34);
  
  // Add table
  autoTable(doc, {
    startY: 42,
    head: [columns.map((col) => col.header)],
    body: data.map((row) => columns.map((col) => row[col.dataKey] || "")),
    theme: "grid",
    headStyles: {
      fillColor: [59, 130, 246], // Blue-600
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 10,
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251], // Gray-50
    },
    margin: { top: 42, left: 14, right: 14 },
  });
  
  // Add page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - 30,
      doc.internal.pageSize.getHeight() - 10
    );
  }
  
  doc.save(`${filename}.pdf`);
}

/**
 * Export appointments report
 */
export function exportAppointmentsReport(
  appointments: any[],
  format: "pdf" | "excel",
  filename = `appointments-report-${formatDate(new Date(), "yyyy-MM-dd")}`
) {
  const data = appointments.map((apt) => ({
    "Appointment ID": apt.id,
    "Patient Name": apt.patientName,
    "Doctor": apt.doctorName,
    "Service": apt.type,
    "Date": apt.date,
    "Time": apt.time,
    "Status": apt.status,
    "Notes": apt.notes || "N/A",
  }));
  
  if (format === "excel") {
    exportToExcel(data, filename, "Appointments");
  } else {
    exportToPDF(data, filename, "Appointments Report", [
      { header: "ID", dataKey: "Appointment ID" },
      { header: "Patient", dataKey: "Patient Name" },
      { header: "Doctor", dataKey: "Doctor" },
      { header: "Service", dataKey: "Service" },
      { header: "Date", dataKey: "Date" },
      { header: "Time", dataKey: "Time" },
      { header: "Status", dataKey: "Status" },
    ]);
  }
}

/**
 * Export patients report
 */
export function exportPatientsReport(
  patients: any[],
  format: "pdf" | "excel",
  filename = `patients-report-${formatDate(new Date(), "yyyy-MM-dd")}`
) {
  const data = patients.map((patient) => ({
    "Patient ID": patient.id,
    "Name": patient.name,
    "Age": patient.age,
    "Gender": patient.gender,
    "Phone": patient.phone,
    "Email": patient.email || "N/A",
    "Registration Date": patient.registrationDate,
    "Blood Group": patient.bloodGroup || "N/A",
  }));
  
  if (format === "excel") {
    exportToExcel(data, filename, "Patients");
  } else {
    exportToPDF(data, filename, "Patients Report", [
      { header: "ID", dataKey: "Patient ID" },
      { header: "Name", dataKey: "Name" },
      { header: "Age", dataKey: "Age" },
      { header: "Gender", dataKey: "Gender" },
      { header: "Phone", dataKey: "Phone" },
      { header: "Email", dataKey: "Email" },
      { header: "Registered", dataKey: "Registration Date" },
    ]);
  }
}

/**
 * Export financial report
 */
export function exportFinancialReport(
  invoices: any[],
  payments: any[],
  format: "pdf" | "excel",
  filename = `financial-report-${formatDate(new Date(), "yyyy-MM-dd")}`
) {
  const data = invoices.map((invoice) => {
    const invoicePayments = payments.filter((p) => p.invoiceNumber === invoice.number);
    const totalPaid = invoicePayments.reduce((sum, p) => sum + p.amount, 0);
    const invoiceTotal = invoice.items.reduce((sum: number, item: any) => sum + item.quantity * item.unitPrice, 0);
    
    return {
      "Invoice #": invoice.number,
      "Patient": invoice.patientName,
      "Date": invoice.date,
      "Total Amount": `KES ${invoiceTotal.toLocaleString()}`,
      "Paid": `KES ${totalPaid.toLocaleString()}`,
      "Balance": `KES ${(invoiceTotal - totalPaid).toLocaleString()}`,
      "Status": invoice.status,
    };
  });
  
  if (format === "excel") {
    exportToExcel(data, filename, "Financial Report");
  } else {
    exportToPDF(data, filename, "Financial Report", [
      { header: "Invoice", dataKey: "Invoice #" },
      { header: "Patient", dataKey: "Patient" },
      { header: "Date", dataKey: "Date" },
      { header: "Total", dataKey: "Total Amount" },
      { header: "Paid", dataKey: "Paid" },
      { header: "Balance", dataKey: "Balance" },
      { header: "Status", dataKey: "Status" },
    ]);
  }
}

/**
 * Export prescriptions report
 */
export function exportPrescriptionsReport(
  prescriptions: any[],
  format: "pdf" | "excel",
  filename = `prescriptions-report-${formatDate(new Date(), "yyyy-MM-dd")}`
) {
  const data = prescriptions.map((rx) => ({
    "Prescription ID": rx.id,
    "Patient": rx.patientName,
    "Doctor": rx.doctorName,
    "Medication": rx.medication,
    "Dosage": rx.dosage,
    "Frequency": rx.frequency,
    "Duration": rx.duration,
    "Date": rx.date,
    "Status": rx.status,
  }));
  
  if (format === "excel") {
    exportToExcel(data, filename, "Prescriptions");
  } else {
    exportToPDF(data, filename, "Prescriptions Report", [
      { header: "ID", dataKey: "Prescription ID" },
      { header: "Patient", dataKey: "Patient" },
      { header: "Medication", dataKey: "Medication" },
      { header: "Dosage", dataKey: "Dosage" },
      { header: "Frequency", dataKey: "Frequency" },
      { header: "Duration", dataKey: "Duration" },
      { header: "Date", dataKey: "Date" },
      { header: "Status", dataKey: "Status" },
    ]);
  }
}

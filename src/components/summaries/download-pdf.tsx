"use client";

import React from "react";
import { jsPDF } from "jspdf";


const DownloadPDF = ({ summary }: any) => {
  const generatePDF = async () => {
    // Parse the summary content
    const sections = parseSummaryContent(summary.summary_text);

    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set font
    doc.setFont("helvetica", "normal");

    // Add title
    doc.setFontSize(24);
    doc.setTextColor(229, 62, 62); // Rose-600 equivalent
    doc.text(summary.title, 20, 20);

    // Add metadata
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); // Gray-500 equivalent
    doc.text(`Source: ${summary.file_name}`, 20, 30);

    let yPosition = 40;
    const leftMargin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const availableWidth = pageWidth - 2 * leftMargin;

    // Add each section
    for (const section of sections) {
      // Add section title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(section.title, leftMargin, yPosition);
      yPosition += 10;

      // Add section content
      doc.setFontSize(12);
      doc.setTextColor(55, 65, 81); // Gray-700 equivalent

      for (const item of section.content) {
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        // Split long text into multiple lines
        const lines = doc.splitTextToSize(item, availableWidth);

        for (const line of lines) {
          doc.text(line, leftMargin, yPosition);
          yPosition += 6;
        }

        yPosition += 4; // Add space between items
      }

      yPosition += 10; // Add space between sections
    }

    // Save the PDF
    doc.save(`${summary.title.replace(/\s+/g, "_")}_Summary.pdf`);
  };

  const parseSummaryContent = (content: string) => {
    const sections: { title: string; content: string[] }[] = [];
    const parts = content.split(/^#\s+/m).filter(Boolean);

    parts.forEach((part) => {
      const lines = part.trim().split("\n");
      const title = lines[0].trim();
      const content = lines
        .slice(1)
        .filter((line) => line.trim())
        .map((line) => {
          const cleanedLine = line.replace(/^[\.\-]\s+/, ""); // Remove bullet
          return cleanedLine.replace(/👨‍💻|🚀|🌟|🎉|💡|📌|📊|🔥|⭐|📚|📖|🪄/g, ""); // Remove emojis
        });

      sections.push({ title, content });
    });

    return sections;
  };

  return (
    <button
      onClick={generatePDF}
      className="flex items-center px-4 py-2 rounded-md bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
    >
      Download Summary
    </button>
  );
};

export default DownloadPDF;

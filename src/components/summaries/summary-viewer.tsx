"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Parse the markdown content into sections
const parseSummaryContent = (content: string) => {
  const sections: { title: string; content: string[] }[] = [];

  // Split by headers
  const parts = content.split(/^#\s+/m).filter(Boolean);

  parts.forEach((part) => {
    const lines = part.trim().split("\n");
    const title = lines[0].trim();
    const content = lines
      .slice(1)
      .filter((line) => line.trim())
      .map((line) => line.replace(/^\.\s+/, "").replace(/^-\s+/, ""));

    sections.push({ title, content });
  });

  return sections;
};

const SummaryViewer = ({ summary }: any) => {
  const sections = parseSummaryContent(summary.summary_text);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define the order of sections we want to display
  const orderedSections = [
    "Quick Overview",
    "Document Details",
    "Key Highlights",
    "Why It Matters",
    "Main Points",
    "Pro Tips",
    "Key Terms to Know",
    "Bottom Line",
    "Final Thoughts",
  ];

  // Map our parsed sections to the ordered sections
  const displaySections = orderedSections
    .map((title) => {
      // For the first slide (Quick Overview), use the first section content
      if (title === "Quick Overview" && sections.length > 0) {
        return {
          title: "Quick Overview",
          content: [sections[0].content.join(" ")],
          icon: "🎯",
        };
      }

      // For Document Details
      if (title === "Document Details") {
        const docSection = sections.find((s) =>
          s.title.includes("Document Details")
        );
        return {
          title: "Document Details",
          content: docSection ? docSection.content : [],
          icon: "📄",
        };
      }

      // For Key Highlights
      if (title === "Key Highlights") {
        const highlightsSection = sections.find((s) =>
          s.title.includes("Key Highlights")
        );
        return {
          title: "Key Highlights",
          content: highlightsSection ? highlightsSection.content : [],
          icon: "🚀",
        };
      }

      // For Why It Matters
      if (title === "Why It Matters") {
        const whySection = sections.find((s) =>
          s.title.includes("Why It Matters")
        );
        return {
          title: "Why It Matters",
          content: whySection ? whySection.content : [],
          icon: "💡",
        };
      }

      // For Main Points
      if (title === "Main Points") {
        const pointsSection = sections.find((s) =>
          s.title.includes("Main Points")
        );
        return {
          title: "Main Points",
          content: pointsSection ? pointsSection.content : [],
          icon: "📌",
        };
      }

      // For Pro Tips
      if (title === "Pro Tips") {
        const tipsSection = sections.find((s) => s.title.includes("Pro Tips"));
        return {
          title: "Pro Tips",
          content: tipsSection ? tipsSection.content : [],
          icon: "⭐",
        };
      }

      // For Key Terms to Know
      if (title === "Key Terms to Know") {
        const termsSection = sections.find((s) =>
          s.title.includes("Key Terms to Know")
        );
        return {
          title: "Key Terms to Know",
          content: termsSection ? termsSection.content : [],
          icon: "📚",
        };
      }

      // For Bottom Line
      if (title === "Bottom Line") {
        const bottomSection = sections.find((s) =>
          s.title.includes("Bottom Line")
        );
        return {
          title: "Bottom Line",
          content: bottomSection ? bottomSection.content : [],
          icon: "🪄",
        };
      }

      // For Final Thoughts (using Bottom Line content if not available)
      if (title === "Final Thoughts") {
        const finalSection = sections.find((s) =>
          s.title.includes("Bottom Line")
        );
        return {
          title: "Final Thoughts",
          content: finalSection ? finalSection.content : [],
          icon: "🔥",
        };
      }

      return {
        title,
        content: [],
        icon: "📄",
      };
    })
    .filter((section) => section.content.length > 0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === displaySections.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? displaySections.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Get the current section
  const currentSection = displaySections[currentSlide];

  // Render content based on section type
  const renderContent = (section: typeof currentSection) => {
    switch (section.title) {
      case "Document Details":
        return (
          <div className="space-y-4">
            {section.content.map((item, index) => {
              if (item.includes("Type:")) {
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-md"
                  >
                    <span className="text-gray-700">{item}</span>
                  </div>
                );
              } else if (item.includes("For:")) {
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-md"
                  >
                    <span className="text-gray-700">{item}</span>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-md"
                >
                  <span className="text-gray-700">{item}</span>
                </div>
              );
            })}
          </div>
        );

      case "Key Highlights":
      case "Main Points":
      case "Pro Tips":
        return (
          <div className="space-y-4">
            {section.content.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-md"
                >
                  <span className="text-gray-700">{item}</span>
                </div>
              );
            })}
          </div>
        );

      case "Key Terms to Know":
        return (
          <div className="space-y-4">
            {section.content.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-md"
                >
                  <span className="text-gray-700">{item}</span>
                </div>
              );
            })}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {section.content.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col min-h-[300px] md:min-h-[500px] lg:min-h-[700px] w-md sm:w-xl md:w-3xl mx-auto">
      {/* Progress bar */}
      <div className="flex justify-center p-4">
        <div className="flex space-x-1">
          {displaySections.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full w-3 md:w-6 lg:w-12 ${
                index === currentSlide ? "bg-rose-500" : "bg-rose-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-8">
          {currentSection.title}
        </h2>
        {renderContent(currentSection)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={prevSlide}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="flex space-x-1">
          {displaySections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${
                index === currentSlide ? "bg-rose-500" : "bg-rose-200"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
};

export default SummaryViewer;

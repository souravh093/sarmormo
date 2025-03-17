import React from "react";
import { FileText } from "lucide-react";

const EmptySummaryState = () => {
  return (
    <div className="flex items-center justify-center h-full mt-20">
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <FileText size={48} className="text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-rose-500 mb-2">
          No Summaries Yet
        </h2>
        <p className="text-gray-500">
          You haven't created any summaries yet. Start by uploading a PDF to
          generate a summary.
        </p>
      </div>
    </div>
  );
};

export default EmptySummaryState;

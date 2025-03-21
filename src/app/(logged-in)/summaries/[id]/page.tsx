import React from "react";
import { getSummaryById } from "@/components/summaries/summary";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import SummaryViewer from "@/components/summaries/summary-viewer";
import DownloadPDF from "@/components/summaries/download-pdf";

const SummaryDetails = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryById(id);

  // Extract the creation date
  const createdAt = new Date(summary?.created_at);
  const formattedDate = `${createdAt.toLocaleString("default", {
    month: "long",
  })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;

  // Calculate read time (2 min for demo)
  const readTime = "2 min read";

  // Count words in summary
  const wordCount = summary?.summary_text.split(/\s+/).length;

  return (
    <div className="bg-gray-50 pb-24">
      <div className="max-w-3xl mx-auto p-4 min-h-screen">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-rose-500">
              <span className="text-xs font-medium flex items-center gap-1 border border-rose-200 px-2 py-1 rounded-full">
                <Sparkles className="size-4 animate-pulse" />
                AI Summary
              </span>
            </div>
            <div className="flex items-center text-gray-500 gap-1">
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-500 gap-1">
              <span className="text-sm">{readTime}</span>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="flex text-xs lg:text-base items-center px-4 py-2 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-rose-600 mb-4">
          {summary?.title}
        </h1>

        <div>
          <div className="flex flex-col lg:flex-row items-center justify-center mb-4 text-gray-600">
            <span className="flex items-center">
              Source: {summary?.file_name}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-center">
            <a
              href={summary?.original_file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-rose-600 hover:text-rose-700"
            >
              View Original
            </a>
            <DownloadPDF summary={summary} />
          </div>
        </div>

        <div>
          <div className="flex items-center mb-4 text-gray-600">
            <span>{wordCount} words</span>
          </div>

          <div>
            <SummaryViewer summary={summary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;

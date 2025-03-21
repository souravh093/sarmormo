import { Pizza } from "lucide-react";
import React from "react";
import SummaryViewer from "../summaries/summary-viewer";
import { getSummary } from "@/constant/summaryDetailsData";

const DemoSection = async () => {
  const summary = await getSummary();
  console.log(summary);
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 bg-gradient-to-br  from-emerald-500 via-teal-500 to-cyan-500  opacity-40 sm:left-[calc(50%+36rem)] sm:w-[75rem]"
            style={{
              clipPath:
                "polygon(74% 45%, 100% 60%, 95% 25%, 85% 2%, 75% 30%, 65% 55%, 50% 70%, 45% 60%, 40% 30%, 25% 75%, 5% 65%, 20% 100%, 30% 75%, 75% 95%, 74% 45%)",
            }}
          ></div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
            <Pizza className="size-6 text-rose-500" />
          </div>

          <div className="text-center mb-16">
            <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Watch how Sarmormo transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Sourave Resume PDF
              </span>{" "}
              into an easy-to-read summary!
            </h3>
          </div>

          <div className="px-2 sm:px-4 lg:px-6">
            <SummaryViewer summary={summary} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

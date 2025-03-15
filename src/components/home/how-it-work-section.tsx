import { BrainCircuit, FileOutput, FileText, MoveRight } from "lucide-react";
import React from "react";

type Step = {
  icon: React.ReactNode;
  label: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Simply drag and drop your PDF Document or click to upload.",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI Analysis",
    description: "Receive a concise summary of your document in seconds.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "Get summary",
    description: "Receive a clear, concise summary of your document",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-[#F9FAFB]/80">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="-z-10 pointer-events-none absolute inset-0 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 bg-gradient-to-br  from-emerald-500 via-teal-500 to-cyan-500  opacity-40 sm:left-[calc(50%-36rem)] sm:w-[70rem]"
            style={{
              clipPath:
                "polygon(65% 15%, 90% 40%, 100% 80%, 85% 100%, 60% 95%, 50% 80%, 40% 85%, 25% 70%, 10% 50%, 5% 20%, 15% 5%, 35% 10%, 55% 5%)",
            }}
          ></div>
        </div>

        <div className="text-center mb-16">
          <h2 className="uppercase font-bold text-xl mb-4 text-rose-500">
            How it work
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-stretch">
              <StepItem {...step} />
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

const StepItem = ({ icon, label, description }: Step) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/5 transition-colors group w-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10  to-transition group-hover:from-rose-500/20 transition-colors">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center font-bold text-xl">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

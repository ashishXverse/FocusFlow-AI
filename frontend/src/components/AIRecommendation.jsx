import {
  Bot,
  Sparkles,
  Target,
  Flame,
  Clock,
  AlertTriangle,
  Lightbulb,
  CalendarDays,
} from "lucide-react";

function ResultCard({ icon: Icon, title, children, accent = "slate" }) {
  const accents = {
    slate: "bg-slate-50 text-slate-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="bg-white/95 backdrop-blur rounded-xl p-5 border border-white/20 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${accents[accent]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-sm text-slate-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AIRecommendation({ loading, aiResult, onAnalyze }) {
  return (
    <section className="mt-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-6 lg:p-8 shadow-lg shadow-indigo-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 backdrop-blur shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                AI Productivity Coach
              </h2>
              <p className="text-indigo-200 text-sm mt-1">
                Let Gemini analyze your tasks and build an optimized schedule.
              </p>
            </div>
          </div>

          <button
            onClick={onAnalyze}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors shadow-md disabled:opacity-70 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Analyzing..." : "Analyze Tasks"}
          </button>
        </div>

        {loading && (
          <div className="relative mt-6 bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <p className="text-white/90 text-sm font-medium">
                Gemini is analyzing your tasks...
              </p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-3 rounded-full animate-shimmer" />
              <div className="h-3 rounded-full animate-shimmer w-4/5" />
            </div>
          </div>
        )}

        {!loading && aiResult && (
          <div className="relative mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultCard icon={Target} title="Highest Priority" accent="blue">
              <p className="font-semibold text-indigo-700 text-sm">
                {aiResult.priorityTask}
              </p>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                {aiResult.reason}
              </p>
            </ResultCard>

            <ResultCard icon={Flame} title="Productivity Score" accent="green">
              <p className="text-3xl font-bold text-emerald-600 tracking-tight">
                {aiResult.productivityScore}
              </p>
            </ResultCard>

            <ResultCard icon={Clock} title="Estimated Hours" accent="purple">
              <p className="text-2xl font-bold text-violet-600 tracking-tight">
                {aiResult.estimatedHours}
              </p>
            </ResultCard>

            <ResultCard icon={AlertTriangle} title="Risk Level" accent="red">
              <p className="text-xl font-bold text-red-500">
                {aiResult.riskLevel}
              </p>
            </ResultCard>

            <div className="md:col-span-2">
              <ResultCard icon={Lightbulb} title="AI Recommendation" accent="amber">
                <p className="text-slate-600 text-sm leading-relaxed">
                  {aiResult.tip}
                </p>
              </ResultCard>
            </div>

            <div className="md:col-span-2">
              <ResultCard icon={CalendarDays} title="Suggested Schedule" accent="blue">
                {aiResult.schedule?.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {aiResult.schedule.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2.5 text-sm first:pt-0 last:pb-0"
                      >
                        <span className="font-medium text-indigo-600 tabular-nums">
                          {item.time}
                        </span>
                        <span className="text-slate-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No schedule available.</p>
                )}
              </ResultCard>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

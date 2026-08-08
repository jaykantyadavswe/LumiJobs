export default function JobCard({ job }) {
  return (
    <article className="w-full min-w-0 rounded-xl border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-base font-semibold leading-6 text-gray-900">
            {job.title || "Title not listed"}
          </h2>

          <p className="mt-1 break-words text-sm font-medium text-gray-700">
            {job.company || "Company not listed"}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
          AI Tailored
        </span>
      </div>

      {/* Job details */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="break-words">
          📍 {job.location || "Location not listed"}
        </p>

        <p className="break-words">
          💰 {job.salary || "Salary not listed"}
        </p>

        <p>
          💼 {job.work_mode || "Work mode not listed"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
        <span className="text-sm font-semibold text-gray-900">
          {job.match_score != null
            ? `${job.match_score}% Match`
            : "Match score unavailable"}
        </span>

        {job.is_h1b_ok === true && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            H1B Sponsor
          </span>
        )}
      </div>
    </article>
  );
}
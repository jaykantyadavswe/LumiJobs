"use client";

import { useMemo, useState, useEffect} from "react";

import jobsData from "../app/data/jobs.json";
import JobCard from "./components/JobCard.jsx";
import FilterChips from "./components/FilterChips.jsx";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [filters, setFilters] = useState({
    h1b: false,
    remote: false,
    newGrad: false,
    salary: false,
  });

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        if (!jobsData || !Array.isArray(jobsData)) {
          throw new Error("Invalid jobs data");
        }

        setJobs(jobsData);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (filters.h1b && job.is_h1b_ok !== true) {
          return false;
        }

        if (filters.remote && job.work_mode !== "Remote") {
          return false;
        }

        if (filters.newGrad && job.is_new_grad !== true) {
          return false;
        }

        if (filters.salary && (job.salary_min == null || job.salary_min < 120000)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => (b.match_score ?? -1) - (a.match_score ?? -1));
  }, [jobs, filters]);

  function toggleFilter(filterName) {
    setFilters((current) => ({
      ...current,
      [filterName]: !current[filterName],
    }));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">

        {/* Header */}
        <header className="mb-6">
          <p className="text-sm font-semibold text-gray-500">
            LumiJobs
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Find your next opportunity
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            AI-tailored jobs matched to your profile.
          </p>
        </header>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border bg-white px-5 py-12 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <h2 className="text-lg font-semibold text-gray-900">
              Loading jobs...
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Finding opportunities for you.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-white px-5 py-12 text-center">
            <div className="mb-3 text-3xl">⚠️</div>

            <h2 className="text-lg font-semibold text-gray-900">
              Unable to load jobs
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Something went wrong while loading the job data.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loaded content */}
        {!loading && !error && (
          <>
            {/* Filters */}
            <section className="mb-6">
              <FilterChips
                filters={filters}
                onChange={toggleFilter}
              />
            </section>

            {/* Result information */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>

              <p className="text-xs text-gray-500">
                Highest match first
              </p>
            </div>

            {/* Empty state */}
            {filteredJobs.length === 0 ? (
              <div className="rounded-xl border bg-white px-5 py-12 text-center">
                <div className="mb-3 text-3xl">🔎</div>

                <h2 className="text-lg font-semibold text-gray-900">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Try removing one or more filters.
                </p>
              </div>
            ) : (
              /* Job list */
              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
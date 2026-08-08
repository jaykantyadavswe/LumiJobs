"use client";

const filterOptions = [
  {
    key: "h1b",
    label: "H1B Sponsor",
  },
  {
    key: "remote",
    label: "Remote",
  },
  {
    key: "newGrad",
    label: "New Grad",
  },
  {
    key: "salary",
    label: "$120k+",
  },
];

export default function FilterChips({ filters, onChange }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-max gap-2 pb-2">
        {filterOptions.map((filter) => {
          const active = filters[filter.key];

          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => onChange(filter.key)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
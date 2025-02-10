import { IFilters } from "../pages/Search";

export const Filters = ({
  filters,
  onFilterChange,
}: {
  filters: IFilters;
  onFilterChange: (filter: IFilters) => void;
}) => {
  const ratings = {
    1: "★☆☆☆☆",
    2: "★★☆☆☆",
    3: "★★★☆☆",
    4: "★★★★☆",
    5: "★★★★★",
  };

  return (
    <div className="space-y-2">
      <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Calificación </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button
              onClick={() => onFilterChange({ ...filters, rating: null })}
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Limpiar
            </button>
          </header>

          <ul className="space-y-1 border-t border-gray-200 p-4">
            {Object.entries(ratings).map(([rating, label]) => (
              <li key={rating} className="flex items-center gap-2">
                <input
                  className="size-5 rounded-sm border-gray-300"
                  type="radio"
                  id={rating}
                  checked={filters.rating === Number(rating)}
                  onChange={() =>
                    onFilterChange({ ...filters, rating: Number(rating) })
                  }
                />
                <label htmlFor={rating} className="font-medium text-gray-700">
                  {label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <details className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium"> Precio por noche </span>

          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>

        <div className="border-t border-gray-200 bg-white">
          <header className="flex items-center justify-between p-4">
            <button
              onClick={() =>
                onFilterChange({ ...filters, priceMin: 0, priceMax: 0 })
              }
              type="button"
              className="text-sm text-gray-900 underline underline-offset-4"
            >
              Limpiar
            </button>
          </header>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between gap-4">
              <label
                htmlFor="FilterPriceFrom"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  value={filters.priceMin}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      priceMin: Number(e.target.value),
                    })
                  }
                  type="number"
                  step={100}
                  id="FilterPriceFrom"
                  placeholder="Desde"
                  className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm p-3"
                />
              </label>

              <label
                htmlFor="FilterPriceTo"
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-600">$</span>

                <input
                  value={filters.priceMax}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      priceMax: Number(e.target.value),
                    })
                  }
                  type="number"
                  step={100}
                  id="FilterPriceTo"
                  placeholder="Hasta"
                  className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm p-3"
                />
              </label>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

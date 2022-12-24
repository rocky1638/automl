import React, { useState } from "react";

const Table = ({ columns, data }) => {
  // subtract 1 to account for header line
  const numRows = data.length - 1;
  const pageSize = 25;
  const numPages = Math.ceil(numRows / pageSize) - 1;
  const [page, setPage] = useState(0);

  return (
    <div className="container w-full">
      <div className="table table-auto w-full mt-2 bg-slate-100 px-4 py-2 rounded">
        <div className="table-header-group mb-6">
          <div className="table-row">
            {columns.map((col, idx) => (
              <div
                key={idx}
                className="table-cell text-left font-medium mb-2 py-2 px-1"
              >
                {col}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group">
          {data
            .slice(
              page * pageSize,
              Math.min(numRows, page * pageSize + pageSize)
            )
            .map((d, index) => (
              <div className="table-row" key={index}>
                {columns.map((col, idx) => (
                  <div key={idx} className="table-cell px-1">
                    {d[col]}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <nav
        className="flex items-center justify-between border-t border-gray-200 bg-white py-3 w-full"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page * pageSize + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min((page + 1) * pageSize, numRows)}
            </span>{" "}
            of <span className="font-medium">{numRows}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            className="disabled:opacity-50 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setPage(page - 1)}
            disabled={page <= 0}
          >
            Previous
          </button>
          <button
            className="disabled:opacity-50 relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setPage(page + 1)}
            disabled={page >= numPages}
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Table;

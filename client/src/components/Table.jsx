import React, { useState } from "react";

const Table = ({ columns, data }) => {
  const pageSize = 20;
  const numPages = Math.ceil(data.length / pageSize);
  const [page, setPage] = useState(0);

  return (
    <div className="container w-full">
      <div className="table table-auto w-full mt-2 bg-slate-100 px-4 py-2 rounded">
        <div className="table-header-group mb-6">
          <div className="table-row">
            {columns.map((col) => (
              <div className="table-cell text-left font-medium mb-2 py-2 px-1">
                {col}
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group">
          {data
            .slice(
              page * pageSize,
              Math.min(data.length, page * pageSize + pageSize)
            )
            .map((d, index) => (
              <div className="table-row" key={index}>
                {columns.map((col) => (
                  <div className="table-cell px-1">{d[col]}</div>
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
            to <span className="font-medium">{(page + 1) * pageSize}</span> of{" "}
            <span className="font-medium">{data.length}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setPage(page + 1)}
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Table;

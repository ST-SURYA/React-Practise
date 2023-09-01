import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

import dataJson from "./data.json";
import studentsJson from "./students.json";
import axios from "axios";

function DataGroupTable() {
  const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "id",
      },
      {
        header: "Name",
        columns: [
          {
            accessorKey: "firstName",
            header: "FirstName",
            cell: (info) => info.getValue(),
            getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            header: () => <span>LastName</span>,
            cell: (info) => info.getValue(),
          },
        ],
      },
      {
        header: "Info",
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue() * 100) / 100,
            aggregationFn: "median",
          },
          {
            header: "Gender",
            accessorKey: "gender",
          },
          {
            header: "Grade",
            accessorKey: "grade",
          },
        ],
      },
      {
        header: "Contact Info",
        columns: [
          {
            header: "Email",
            accessorKey: "email",
          },
          {
            header: "Phone",
            accessorKey: "contact_number",
          },
          {
            header: "Address",
            accessorKey: "address",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState(() => studentsJson);
  const refreshData = () => setData(() => studentsJson);

  const [grouping, setGrouping] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
  });
  return (
    <div className="p-2">
      {console.log(table)}
      <div className="h-2" />
      <table className="table table-hover table-responsive">
        <thead className="text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {header.column.getCanGroup() ? (
                          <button
                            onClick={header.column.getToggleGroupingHandler()}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `🛑(${header.column.getGroupedIndex()}) `
                              : `👊 `}
                          </button>
                        ) : null}{" "}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      style={{
                        background: cell.getIsGrouped()
                          ? "#0aff0082"
                          : cell.getIsAggregated()
                          ? "#ffa50078"
                          : cell.getIsPlaceholder()
                          ? "#ff000042"
                          : "white",
                      }}
                    >
                      {cell.getIsGrouped() ? (
                        <>
                          <button
                            onClick={row.getToggleExpandedHandler()}
                            style={{
                              cursor: row.getCanExpand() ? "pointer" : "normal",
                            }}
                            className="btn btn-success"
                          >
                            {row.getIsExpanded() ? "👇" : "👉"}{" "}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{" "}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="d-flex justify-content-between align-items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(grouping, null, 2)}</pre>
    </div>
  );
}

export default DataGroupTable;

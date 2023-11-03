import { useState, useEffect, ChangeEvent, MouseEvent, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import studentsJson from "./students.json";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
const DataTableAll = () => {
  const [data, setData] = useState(() => studentsJson);
  const [grouping, setGrouping] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFilterng] = useState("");
  const [colFilter, setColFilter] = useState([]);
  const columns = useMemo(
    () => [
      {
        header: "Id",
        columns: [
          {
            header: "id",
            accessorKey: "id",
            size: 20,
          },
        ],
      },
      {
        header: "Name",
        columns: [
          {
            accessorKey: "firstName",
            header: "FirstName",
            // cell: (info) => info.getValue(),
          },
          {
            accessorFn: (row) => row.lastName,
            id: "lastName",
            header: () => <span>LastName</span>,
            cell: (info) => info.getValue(),
          },
          // {
          //   header: "Name",
          //   id: "Name",
          //   accessorFn: (row) => `${row.firstName} ${row.lastName}`,
          // },
        ],
      },
      {
        header: "Info",
        columns: [
          {
            accessorKey: "age",
            header: () => "Age",
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

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting: sorting,
      grouping: grouping,
      globalFilter: filtering,
      columnFilters: colFilter,
    },
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilterng,
    onColumnFiltersChange: setColFilter,
  });
  return (
    <>
      <label className="form-control text-center d-flex flex-column align-items-center">
        Search
        <input
          type="text"
          className="form-control w-25 mt-2"
          onChange={(e) => setFilterng(e.target.value)}
        />
      </label>

      <table className="table table-bordered table-info  table-hover ">
        <thead className="text-center table-info">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.id === "id" && (
                        <button
                          className="btn"
                          onClick={
                            header.id === "id"
                              ? header.column.getToggleSortingHandler()
                              : null
                          }
                        >
                          {header.column.getIsSorted() ? (
                            { asc: <FaSortUp />, desc: <FaSortDown /> }[
                              header.column.getIsSorted() ?? null
                            ]
                          ) : (
                            <FaSort />
                          )}
                        </button>
                      )}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <button
                        className="btn"
                        onClick={header.column.getToggleGroupingHandler()}
                      >
                        {header.column.getIsGrouped()
                          ? `🛑(${header.column.getGroupedIndex()}) `
                          : `👊 `}
                      </button>
                      {header.column.getCanFilter() && (
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr>
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
                            className="btn btn-info"
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
                        flexRender(cell.getValue())
                      )}

                      {/* {flexRender(cell.column.columnDef.cell)} */}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="button-container d-flex justify-content-center">
        <button
          className="btn btn-primary m-1"
          onClick={() => table.setPageIndex(0)}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-primary m-1"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {"<"}
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default DataTableAll;

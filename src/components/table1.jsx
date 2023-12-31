import { useState, useEffect, ChangeEvent, MouseEvent, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import studentsJson from "./students.json";
import { tab } from "@testing-library/user-event/dist/tab";
export const Table1 = () => {
  const [data, setData] = useState(() => studentsJson);
  const [grouping, setGrouping] = useState([]);
  const [sorting, setSorting] = useState([]);
  const columns = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "id",
        size: 50,
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
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting: sorting,
      grouping: grouping,
    },
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
  });
  return (
    <>
      <table className="table table-hover ">
        <thead className="text-center">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      <button
                        className=""
                        onClick={
                          header.id === "id"
                            ? header.column.getToggleSortingHandler()
                            : null
                        }
                      >
                        {
                          { asc: "🔼", desc: "🔽" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </button>
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
                    <td>
                      {cell.getIsGrouped() ? (
                        <>
                          <button
                            onClick={row.getToggleExpandedHandler()}
                            style={{
                              cursor: row.getCanExpand() ? "pointer" : "normal",
                            }}
                            className="btn btn-outline-info"
                          >
                            {row.getIsExpanded() ? "👇" : "👉"}{" "}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{" "}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : (
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
      <div className="button-container d-flex">
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

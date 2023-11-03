import { useState, useMemo, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Loader from "./loader";
import { useGetDataQuery } from "../redux/services/dataQuery";

const CommentsTable = () => {
  // State's for grouping , filtering , sorting and pagination

  const [grouping, setGrouping] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColFilter] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // Structure of the Table
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Post_Id", accessorKey: "postId" },
      { header: "name", accessorKey: "name" },
      { header: "Email", accessorKey: "email" },
      { header: "Body", accessorKey: "body" },
    ],
    []
  );

  const { data, isLoading, isFetching } = useGetDataQuery(pagination);

  // Create a table instance using useReactTable for Filtering , Sorting , Grouping , Sub Rows , and Pagination
  const table = useReactTable({
    data: data?.data || [],
    columns,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    pageCount: Math.ceil(data?.totalCount / pagination.pageSize),
    state: {
      sorting,
      grouping,
      globalFilter,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColFilter,
  });

  return (
    <>
      <div className="m-5">
        <div className="alert alert-info">Comment's Table</div>
        <div className="row">
          <div className="col-lg-6  text-center">
            <label className="form-label float-lg-start">
              Search
              <input
                type="text"
                className="form-control mt-2 mx-auto"
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </label>
          </div>
          <div className="col-lg-6 ">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
                //Update Record showing Length in Redux store
              }}
              className="form-select mt-4 w-25 float-end"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Records Contents */}

        {/* Table Section */}
        <table className="table table-bordered table-info  table-hover ">
          {/* Table Header Section */}
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
                            onChange={(e) => {
                              header.column.setFilterValue(e.target.value);
                            }}
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          {/* Table Body section */}
          {isFetching ? (
            <tbody>
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "200px" }}
                  >
                    <Loader />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {console.log("isLoading", isLoading)}
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
                                  cursor: row.getCanExpand()
                                    ? "pointer"
                                    : "normal",
                                }}
                                className="btn btn-info"
                              >
                                {row.getIsExpanded() ? (
                                  <AiFillMinusCircle size={25} color="red" />
                                ) : (
                                  <AiFillPlusCircle size={25} color="green" />
                                )}{" "}
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{" "}
                                ({row.subRows.length})
                              </button>
                            </>
                          ) : cell.getIsAggregated() ? (
                            ""
                          ) : cell.getIsPlaceholder() ? null : (
                            flexRender(cell.getValue())
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {/* Pagination section */}
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
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </>
  );
};

export default CommentsTable;

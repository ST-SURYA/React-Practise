import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtual } from "react-virtual";
import axios from "axios"; // Import axios for API requests

import Loader from "./loader";

function DataVirtualizer1() {
  const fetchSize = 10;
  const tableContainerRef = useRef(null);
  const [sorting, setSorting] = useState([]);
  const apiUrl =
    "https://my-json-server.typicode.com/suryabaskaran15/db/students"; // API URL

  // Column Configuration
  const columns = useMemo(
    () => [
      {
        header: "id",
        // accessorFn: (row) => {
        //   return parseInt(row.id);
        // },
        accessorKey: "id",
        cell: (info) => parseInt(info.getValue()),
        size: 50,
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
            size: 50,
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
            size: 200,
          },
          {
            header: "Phone",
            accessorKey: "contact_number",
            size: 200,
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

  // Function to fetch data from the API
  const fetchData = async (start, size, sorting) => {
    const response = await axios.get(apiUrl, {
      params: {
        _start: start,
        _limit: size,
        _sort: sorting
          .map((sort) => (sort.desc ? `-${sort.id}` : sort.id))
          .join(","),
      },
    });

    return {
      data: response.data,
      meta: {
        totalRowCount: response.headers["x-total-count"],
      },
    };
  };

  // Fetching data with pagination
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    ["table-data", sorting],
    async ({ pageParam = 0 }) => {
      const start = pageParam * fetchSize;
      const fetchedData = await fetchData(start, fetchSize, sorting);
      return fetchedData;
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // Flattening the data for rendering
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  // Calculating total rows in the database
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = flatData.length;

  // Function to fetch more data when scrolling to the bottom of the table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 300 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  // Attach the fetchMoreOnBottomReached function to the scroll event
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  // Create a table using useReactTable
  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  // Get the rows from the table
  const { rows } = table.getRowModel();

  // Configure virtualization for the rows
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });

  // Extract virtualization properties
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  // Render loading message if data is still loading
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Render the table structure and rows
  return (
    <div className="p-2 virtual">
      <div className="h-2" />
      <div
        className="container text-center"
        onScroll={(e) => fetchMoreOnBottomReached(e.target)}
        ref={tableContainerRef}
      >
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="text-center m-3">
        Fetched {flatData.length} of {totalDBRowCount} Rows.
      </div>
    </div>
  );
}

export default DataVirtualizer1;

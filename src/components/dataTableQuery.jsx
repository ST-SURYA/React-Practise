import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import EditModal from "./editModel";
import Delete from "./deleteBtn";
import EditIcon from "./editBtn";
import Loader from "./loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HOC from "./hoc";

const DataTableQuery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const queryClient = useQueryClient();
  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "name", accessorKey: "name" },
    { header: "Age", accessorKey: "age" },
    { header: "Gender", accessorKey: "gender" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "contact_number" },
    { header: "Grade", accessorKey: "grade" },
    { header: "Address", accessorKey: "address" },
    { header: "action" },
  ];
  // Query for fetch the student details
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["studentQueryKey", currentPage],
    queryFn: () =>
      fetch(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students?page=${currentPage}&limit=10`
      ).then((response) => response.json()),
  });
  // Query for Fetch the index total count
  const { data: totalPage } = useQuery({
    queryKey: ["indexData"],
    queryFn: () =>
      fetch(`https://64c778b10a25021fde928997.mockapi.io/apt/s1/index/students`)
        .then((res) => res.json())
        .then((res) => Math.ceil(res.count / 10)),
  });

  //To Delete the record in the server
  const deleteStudentMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        return id; // Return the deleted ID to be used in onSuccess
      } else {
        throw new Error("Error deleting data");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("studentQueryKey");
    },
  });
  const updateRecordCount = useMutation({
    mutationFn: () => {
      fetch("");
    },
  });
  //For update the UI after successfully update the data
  const updateEditedData = () => {
    queryClient.invalidateQueries("studentQueryKey");
  };

  // Create a instance for TanStack Library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
      pagination: {
        pageIndex: currentPage,
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  useEffect(() => {
    refetch();
  }, [currentPage]);
  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
          <table className="table">
            {console.log(table.getHeaderGroups())}
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={
                        header.id === "id"
                          ? header.column.getToggleSortingHandler()
                          : null
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {
                            { asc: "🔼", desc: "🔽" }[
                              header.column.getIsSorted() ?? null
                            ]
                          }
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {cell.column.id === "action" ? (
                        <>
                          <EditIcon
                            onClick={() => {
                              // Handle edit action here using the row id
                              console.log(
                                "Edit clicked for row with ID:",
                                row.id
                              );

                              setEditRowData(row.original);
                              setShowEditModal(true);
                            }}
                          />
                          <Delete
                            onClick={() => {
                              console.log(
                                "Edit clicked for row with ID:",
                                row.original.id
                              );
                              deleteStudentMutation.mutate(row.original.id);
                            }}
                          />
                        </>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              className="btn btn-primary m-1"
              disabled={currentPage == 1}
              onClick={() => setCurrentPage(1)}
            >
              First page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={currentPage == 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                console.log(table.options.state.pagination.pageIndex);
              }}
            >
              Previous page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={currentPage === totalPage}
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                console.log(table.options.state.pagination.pageIndex);
              }}
            >
              Next page
            </button>
            <button
              className="btn btn-primary m-1"
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage(totalPage)}
            >
              Last page
            </button>
          </div>
        </>
      )}
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        rowData={editRowData}
        onUpdate={updateEditedData}
      />
    </div>
  );
};

export default HOC(DataTableQuery);

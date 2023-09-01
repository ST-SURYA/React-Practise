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
import HOC from "./hoc";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState(() => []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  //For update the UI after successfully update the data
  const updateEditedData = (updatedRowData) => {
    const editedRowIndex = data.findIndex(
      (row) => row.id === updatedRowData.id
    );
    if (editedRowIndex !== -1) {
      const newData = [...data];
      newData[editedRowIndex] = updatedRowData;

      setData(newData);
    }
  };
  //To handle the delete operation
  // krh
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students/${id}`
      );

      if (response.status === 200) {
        // Data deleted successfully
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
      } else {
        console.error("Error deleting data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Create a instance for TanStack Library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
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
    setIsLoading(true);
    axios({
      url: "https://64c778b10a25021fde928997.mockapi.io/apt/s1/index/students",
      method: "GET",
    }).then((res) => setTotalPage(() => Math.ceil(res.data.count / 10)));
    axios
      .get(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students?page=${currentPage}&limit=10`
      )
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
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
            onChange={(e) => {
              setFiltering(e.target.value);
              // fetch(
              //   `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students?name=${e.target.value}`
              // ).then((res) => {
              //   console.log(res.json());
              //   // setFiltering(res.json());
              //   return res.json();
              // });
            }}
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
                              handleDelete(row.original.id);
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

export default HOC(DataTable);

import React, { useEffect, useMemo, useState } from "react";
import BasicTable from "../components/table";
import movies from "./MOVIE_DATA.json";
import DataTable from "../components/dataTable";
import { Table1 } from "../components/table1";
import FormCmp from "../components/fromCmp";
import WizardsForm from "../components/WizardsForm";
import ReduxEx from "./reduxEx";
const Home = () => {
  const data = useMemo(() => movies, []);

  const movieColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Genre",
      accessorKey: "genre",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
  ];
  const coloums = [
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

  return (
    <>
      <h1 className="text-center mt-3">Home</h1>
      <br />
      {/* <ReduxEx /> */}
      {/* <WizardsForm /> */}
      {/* <FormCmp /> */}
      {/* <Table1 /> */}
      {/* <DataTable columns={coloums} /> */}
      {/* <BasicTable data={data} columns={movieColumns} /> */}
    </>
  );
};

export default Home;

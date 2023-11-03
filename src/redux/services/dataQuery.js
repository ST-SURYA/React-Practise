import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      queryFn: async ({ pageIndex, pageSize }) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${
            pageIndex + 1
          }&_limit=${pageSize}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Access the X-Total-Count header from the response
        const totalCount = response.headers.get("X-Total-Count");
        console.log("response", response, totalCount);
        return {
          data: {
            data: await response.json(),
            totalCount: totalCount,
          },
        };
      },
    }),
    filterData: builder.query({
      queryFn: async (globalFilter) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_page=${1}&_limit=${10}${
            globalFilter ? "&q=" + globalFilter : ""
          }`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Access the X-Total-Count header from the response
        const totalCount = response.headers.get("X-Total-Count");
        console.log("response", response, totalCount);
        return {
          data: {
            data: await response.json(),
            totalCount: totalCount,
          },
        };
      },
    }),
  }),
});

export const { useGetDataQuery, useFilterDataQuery } = dataApi;
export const { reducer } = dataApi;

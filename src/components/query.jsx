import React, { useEffect } from "react";
import Loader from "./loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Query = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["studentQueryKey"],
    queryFn: () =>
      fetch(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students?page=${1}&limit=10`
      ).then((response) => response.json()),
  });
  let id = 5;
  const {
    data: newData,
    isLoading: newLoading,
    error: newError,
  } = useQuery({
    queryKey: ["studentQueryKey", id],
    queryFn: () =>
      fetch(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students/${id}`
      ).then((response) => response.json()),
  });
  useEffect(() => {
    id = 10;
    queryClient.invalidateQueries(["studentQueryKey", id]);
  });
  return <>{isLoading ? <Loader /> : console.log(newData)}</>;
};

export default Query;

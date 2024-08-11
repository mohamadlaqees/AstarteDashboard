import React from "react";
import { useGetAllExperiencesQuery } from "../../store/apiSlice/apiSlice";

const Tours = () => {
  const { data: experiences } = useGetAllExperiencesQuery();

  return <div></div>;
};

export default Tours;

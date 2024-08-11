import React from "react";
import { useGetAllExperiencesQuery } from "../../store/apiSlice/apiSlice";

const Tours = () => {
  const { data: experiences } = useGetAllExperiencesQuery();
  console.log(experiences);
  return experiences ? <div>{experiences}</div> : <div>No data</div>;
};

export default Tours;

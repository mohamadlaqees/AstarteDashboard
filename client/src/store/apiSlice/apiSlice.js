import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: " https://hp-backend-741l.onrender.com/api/",
    mode:'no-cors'
  }),

  endpoints: (build) => ({
    getAllExperiences: build.query({
      query: () => "experiences",
      
    }),

    addExperience: build.query({}),

    updateExperience: build.query({}),

    deleteExperience: build.query({}),
  }),
});

export const {
  useGetAllExperiencesQuery,
  useAddExperienceQuery,
  useUpdateExperienceQuery,
  useDeleteExperienceQuery,
} = apiSlice;

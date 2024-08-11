import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),

  endpoints: (build) => ({
    getAllExperiences: build.query({
      query: () => "",
    }),

    addExperience: build.query({}),

    updateExperience: build.query({}),

    deleteExperience: build.query({}),
  }),
});

export const {
  useGetAllExperiences,
  useAddExperience,
  useUpdateExperience,
  useDeleteExperience,
} = apiSlice;

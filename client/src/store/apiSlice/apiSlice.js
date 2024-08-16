import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://hp-backend-741l.onrender.com/api/",
  }),

  endpoints: (build) => ({
    //experiences
    getAllExperiences: build.query({
      query: () => "experiences",
    }),
    getExperience: build.query({
      query: (id) => `experiences/${id}`,
    }),
    addExperience: build.query({}),
    updateExperience: build.query({}),
    deleteExperience: build.query({}),

    // projects
    getAllProjects: build.query({
      query: () => "projects",
    }),
    getProject: build.query({
      query: (id) => `projects/${id}`,
    }),
    addProject: build.query({}),
    updateProject: build.query({}),
    deleteProject: build.query({}),

    // impact funds
    getAllImpactFunds: build.query({
      query: () => "impact-funds",
    }),
    getFund: build.query({
      query: (id) => `impact-funds/${id}`,
    }),
    addFund: build.query({}),
    updateFund: build.query({}),
    deleteFund: build.query({}),
  }),
});

export const {
  useGetAllExperiencesQuery,
  useGetExperienceQuery,
  useAddExperienceQuery,
  useUpdateExperienceQuery,
  useDeleteExperienceQuery,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectQuery,
  useUpdateProjectQuery,
  useDeleteProjectQuery,
  useGetAllImpactFundsQuery,
  useGetFundQuery,
  useAddFundQuery,
  useUpdateFundQuery,
  useDeleteFundQuery,
} = apiSlice;

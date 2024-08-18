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
    addExperience: build.mutation({
      query: (newExperience) => ({
        url: "experiences",
        method: "POST",
        body: newExperience,
      }),
    }),
    updateExperience: build.mutation({
      query: ({ updatedExperience, id }) => ({
        url: `experiences/${id}`,
        method: "PATCH",
        body: updatedExperience,
      }),
    }),
    deleteExperience: build.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "DELETE",
      }),
    }),

    // projects
    getAllProjects: build.query({
      query: () => "projects",
    }),
    getProject: build.query({
      query: (id) => `projects/${id}`,
    }),
    addProject: build.mutation({
      query: (newProject) => ({
        url: "projects",
        method: "POST",
        body: newProject,
      }),
    }),
    updateProject: build.mutation({
      query: ({ updatedProject, id }) => ({
        url: `projects/${id}`,
        method: "PATCH",
        body: updatedProject,
      }),
    }),
    deleteProject: build.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
    }),

    // impact funds
    getAllImpactFunds: build.query({
      query: () => "impact-funds",
    }),
    getFund: build.query({
      query: (id) => `impact-funds/${id}`,
    }),
    addFund: build.mutation({
      query: (newFund) => ({
        url: "impact-funds",
        method: "POST",
        body: newFund,
      }),
    }),
    updateFund: build.mutation({
      query: ({ updatedFund, id }) => ({
        url: `impact-funds/${id}`,
        method: "PATCH",
        body: updatedFund,
      }),
    }),
    deleteFund: build.mutation({
      query: (id) => ({
        url: `impact-funds/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllExperiencesQuery,
  useGetExperienceQuery,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetAllImpactFundsQuery,
  useGetFundQuery,
  useAddFundMutation,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: " https://hp-backend-741l.onrender.com/api/",
    mode: "no-cors",
  }),

  endpoints: (build) => ({
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
} = apiSlice;

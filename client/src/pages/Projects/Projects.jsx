import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "../../store/apiSlice/apiSlice";
import { LoadingButton } from "@mui/lab";

const Projects = () => {
  const theme = useTheme();
  const { data: projects, isLoading, refetch } = useGetAllProjectsQuery();
  const [deleteProject, { isError, isLoading: deleteLoading, isSuccess }] =
    useDeleteProjectMutation();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const handleInfo = (id) => {
    navigate(`projectInfo/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await deleteProject(id).unwrap();
      refetch();
    } catch (error) {}
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "isEducational",
      headerName: "IsEducational",
      flex: 0.5,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 0.5,
    },
    {
      field: "startingPoint",
      headerName: "StartingPoint",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 0.5,
    },
    {
      field: "updatedAt",
      headerName: "UpdatedAt",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              title="show details"
              onClick={() => handleInfo(params.row.id)}
              color="secondary"
            >
              <FolderIcon />
            </IconButton>
            <IconButton
              onClick={() => handleEdit(params.row.id)}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="secondary"
              disableRipple={deleteLoading}
              disableFocusRipple={deleteLoading}
              sx={{
                width: "40px",
              }}
            >
              {loadingId === params.row.id ? (
                <LoadingButton
                  variant="text"
                  loading
                  sx={{ width: "20px" }}
                  loadingPosition="center"
                ></LoadingButton>
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Projects" subtitle="List of Projects" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={projects?.results || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Projects;

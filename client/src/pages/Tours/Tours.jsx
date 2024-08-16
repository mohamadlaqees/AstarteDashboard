import React from "react";
import { useGetAllExperiencesQuery } from "../../store/apiSlice/apiSlice";
import { Box, Collapse, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { dataExperience } from "./dataExperience";
import { useNavigate } from "react-router-dom";

const Tours = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: experiences, isLoading } = useGetAllExperiencesQuery();
  console.log(experiences);

  const handleEdit = (id) => {
    navigate(`${id}`);
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  const ItineraryCell = ({ itinerary }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <IconButton
          size="small"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Collapse in={open}>
          {itinerary.map((item, index) => (
            <Box key={index} marginY={1}>
              <Typography variant="body2">
                Milestone: {item.milestoneName}
              </Typography>
              <Typography variant="body2">Location: {item.location}</Typography>
            </Box>
          ))}
        </Collapse>
      </Box>
    );
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "bookedSeats",
      headerName: "BookedSeats",
      flex: 0.5,
    },
    {
      field: "registrationStartDate",
      headerName: "RegistrationStartDate",
      flex: 1,
    },
    {
      field: "registrationEndDate",
      headerName: "registrationEndDate",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 0.5,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.5,
    },
    {
      field: "itinerary",
      headerName: "Itinerary",
      width: 200,
      renderCell: (params) => <ItineraryCell itinerary={params.value} />,
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
              onClick={() => handleEdit(params.row.id)}
              color="secondary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Tours" subtitle="List of Tours" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            borderBottom: "none",
            height: "auto",
            minHeight: "50px",
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
          rows={experiences?.results || []}
          columns={columns}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};

export default Tours;

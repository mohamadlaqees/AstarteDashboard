import React, { useState } from "react";
import { Box, useTheme, IconButton, Collapse, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { dataFunds } from "./dataFunds";

const ImpactFunds = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleInfo = (id) => {
    navigate(`fundInfo/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  const DonorCell = ({ donor }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Box>
        <IconButton
          size="small"
          onClick={() => {
            setOpen(!open);
          }}
          aria-expanded={open}
        >
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        <Collapse in={open}>
          {donor.map((item, index) =>
            index <= 2 ? (
              <Box key={index} marginY={1}>
                <Typography variant="body2">
                  Donation: {item.donation}
                </Typography>
                <Typography variant="body2">Type: {item.type}</Typography>
                <Typography variant="body2">Date: {item.date}</Typography>
              </Box>
            ) : (
              ""
            )
          )}
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
      field: "project",
      headerName: "Project Name",
      flex: 1,
      valueGetter: (params) => params.name,
    },
    {
      field: "totalAmount",
      headerName: "TotalAmount",
      flex: 0.5,
    },
    {
      field: "allocatedAmount",
      headerName: "AllocatedAmount",
      flex: 0.5,
    },
    {
      field: "donors",
      headerName: "Donors",
      flex: 1,
      renderCell: (params) => <DonorCell donor={params.value} />,
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
      <Header title="Impact funds" subtitle="List of funds" />
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
          // loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={dataFunds || []}
          columns={columns}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};

export default ImpactFunds;

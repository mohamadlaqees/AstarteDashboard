import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, Collapse, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  useDeleteFundMutation,
  useGetAllImpactFundsQuery,
} from "../../store/apiSlice/apiSlice";
import { LoadingButton } from "@mui/lab";

const ImpactFunds = () => {
  const theme = useTheme();
  const { data: funds, isLoading, refetch } = useGetAllImpactFundsQuery();
  console.log(funds)
  const [deleteFund, { isError, isLoading: deleteLoading, isSuccess }] =
    useDeleteFundMutation();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);

  const handleInfo = (id) => {
    navigate(`fundInfo/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await deleteFund(id).unwrap();
      refetch();
    } catch (error) {}
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

  const flattenedFunds =
    funds?.results.map((fund) => ({
      id: fund.id,
      projectName: fund.project?.name || "N/A",
      description: fund.project?.description || "N/A",
      location: fund.project?.location || "N/A",
      startingPoint: fund.project?.startingPoint || "N/A",
      isEducational: fund.project?.isEducational ? "Yes" : "No",
      projectId: fund.project?.id || "N/A",
      totalAmount: fund.totalAmount || 0,
      allocatedAmount: fund.allocatedAmount || 0,
      donors: fund.donors || [],
    })) || [];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    { field: "projectName", headerName: "Project Name", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "location", headerName: "Location", flex: 0.5 },
    { field: "startingPoint", headerName: "Starting Point", flex: 0.5 },
    { field: "isEducational", headerName: "Is Educational", flex: 0.5 },
    { field: "projectId", headerName: "Project ID", flex: 1 },
    { field: "totalAmount", headerName: "Total Amount", flex: 0.5 },
    { field: "allocatedAmount", headerName: "Allocated Amount", flex: 0.5 },
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
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={flattenedFunds || []}
          columns={columns}
          getRowHeight={() => "auto"}
        />
      </Box>
    </Box>
  );
};

export default ImpactFunds;

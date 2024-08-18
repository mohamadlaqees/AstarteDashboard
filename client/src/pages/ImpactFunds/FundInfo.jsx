import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import TableComponent from "../../components/TableComponent";
import { useParams } from "react-router-dom";
import { useGetFundQuery } from "../../store/apiSlice/apiSlice";

const FundInfo = () => {
  const theme = useTheme();
  const { fundid } = useParams();
  const { data: fund, isLoading, refetch } = useGetFundQuery(fundid);
  const [fields, setFields] = useState([]);
  const [response, setResponse] = useState({});

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "donation", label: "Dontaion", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const rows = fields.map((donor, index) => ({
    id: donor.id,
    donation: donor.donation || "N/A",
    type: donor.type || "N/A",
    date: donor.date || "N/A",
  }));

  useEffect(() => {
    refetch();
    if (fund?.document?.donors) {
      setFields(fund.document.donors);
    }
    setResponse({
      name: fund?.document?.project,
      totalAmount: fund?.document?.totalAmount,
      allocatedAmount: fund?.document?.allocatedAmount,
    });
  }, [fund]);

  return isLoading ? (
    <CircularProgress
      sx={{
        position: "absolute",
        top: "50%",
        left: "55%",
      }}
      size={60}
      thickness={3}
    />
  ) : (
    <>
      <Box margin="40px">
        <Header title="Fund" subtitle={fundid} />
      </Box>

      <Box display="flex" justifyContent="space-between" width="100%">
        <Stack
          marginTop="20px"
          width="30%"
          marginLeft="auto"
          marginRight="auto"
          overflow="auto"
        >
          <Box paddingBottom="40px">
            <Header subtitle="Project info" />
          </Box>
          <TextField
            label="Name"
            variant="standard"
            value={response.name}
            defaultValue={"Name"}
            disabled
            InputLabelProps={{
              style: {
                color: theme.palette.secondary.main,
                fontSize: "18px",
              },
            }}
            InputProps={{
              sx: {
                marginBottom: "20px",
              },
            }}
          />

          <TextField
            label="TotalAmount"
            variant="standard"
            value={response.totalAmount}
            defaultValue={"TotalAmount"}
            disabled
            InputLabelProps={{
              style: {
                color: theme.palette.secondary.main,
                fontSize: "18px",
              },
            }}
            InputProps={{
              sx: {
                marginBottom: "20px",
              },
            }}
          />

          <TextField
            label="AllocatedAmount"
            variant="standard"
            value={response.allocatedAmount}
            defaultValue={"AllocatedAmount"}
            disabled
            InputLabelProps={{
              style: {
                color: theme.palette.secondary.main,
                fontSize: "18px",
              },
            }}
            InputProps={{
              sx: {
                marginBottom: "20px",
              },
            }}
          />
        </Stack>

        <Stack
          marginTop="20px"
          width="50%"
          marginLeft="auto"
          marginRight="auto"
          overflow="auto"
        >
          <Box paddingBottom="30px">
            <Header subtitle="Donnors info" />
          </Box>

          <TableComponent rows={rows} columns={columns} theme={theme} />
        </Stack>
      </Box>
    </>
  );
};

export default FundInfo;

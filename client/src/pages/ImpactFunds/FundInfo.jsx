import { Box, Stack, TextField, useTheme } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../../components/Header";
import TableComponent from "../../components/TableComponent";

const FundInfo = () => {
  const theme = useTheme();
  const [fields, setFields] = useState({});

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "donation", label: "Dontaion", minWidth: 100 },
    { id: "type", label: "Type", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 100 },
  ];
  const rows = [];

  if (fields !== undefined && fields.donors !== undefined) {
    fields.donors.map((field, index) =>
      rows.push({
        id: field.id,
        donation: field.donation,
        type: field.type,
        date: field.date,
      })
    );
  }

  // just for testing
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/fetchFunds.json");
      const data = await response.json();
      setFields(...data);
    };
    getData();
  }, []);

  return (
    <>
      <Box margin="40px">
        <Header title="Fund" subtitle={fields.id} />
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
            value={`${fields.project?.name}`}
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
            label="Description"
            variant="standard"
            value={`${fields.project?.description}`}
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
            label="Location"
            variant="standard"
            value={`${fields.project?.location}`}
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
            label="StartingPoint"
            variant="standard"
            value={`${fields.project?.startingPoint}`}
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
            value={`${fields.totalAmount}`}
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
            value={`${fields.allocatedAmount}`}
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

import { Box, Stack, TextField, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";

const ProjectInfo = () => {
  const theme = useTheme();
  const { projectid } = useParams();

  useEffect(() => {}, []);

  return (
    <>
      <Box margin="40px">
        <Header title="Project" subtitle={projectid} />
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
            value={""}
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
            value={""}
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
            value={""}
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
            value={""}
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
          width="30%"
          marginLeft="auto"
          marginRight="auto"
          marginBottom="auto"
          marginTop="auto"
        >
          <Box paddingBottom="30px">
            <Header subtitle="Project image" />
          </Box>

          <ImageUploader
            key={0}
            label={"Image"}
            disabled={true}
            index={0}
            radius={"0px"}
            src={""}
            sx={{
              cursor: "pointer",
              borderRadius: "0px",
              width: 250,
              height: 250,
              border: `3px solid ${theme.palette.secondary.main}`,
            }}
            boxSx={{
              margin: "auto",
            }}
            iconSx={{
              width: "270px",
              height: "270px",
              borderRadius: "0px",
            }}
          />
        </Stack>
      </Box>
    </>
  );
};

export default ProjectInfo;

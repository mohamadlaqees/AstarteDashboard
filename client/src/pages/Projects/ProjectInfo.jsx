import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/ImageUploader";
import { useGetProjectQuery } from "../../store/apiSlice/apiSlice";

const ProjectInfo = () => {
  const theme = useTheme();
  const { projectid } = useParams();
  const { data: project, isLoading, refetch } = useGetProjectQuery(projectid);
  const [response, setResponse] = useState({});

  useEffect(() => {
    refetch();
    setResponse({
      name: project?.document?.name,
      description: project?.document?.description,
      isEducational: project?.document?.isEducational,
      location: project?.document?.location,
      startingPoint: project?.document?.startingPoint,
      createdAt: project?.document?.createdAt,
      updatedAt: project?.document?.updatedAt,
      // image:project?.document?.image           there is no image yet in the hosted backEnd data
    });
  }, [project]);

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
            label="isEducational"
            variant="standard"
            value={response.isEducational}
            defaultValue={"IsEducational"}
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
            value={response.description}
            defaultValue={"Description"}
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
            value={response.location}
            defaultValue={"Location"}
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
            value={response.startingPoint}
            defaultValue={"StartingPoint"}
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
            label="CreatedAt"
            variant="standard"
            value={response.createdAt}
            defaultValue={"CreatedAt"}
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
            label="UpdatedAt"
            variant="standard"
            value={response.updatedAt}
            defaultValue={"UpdatedAt"}
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

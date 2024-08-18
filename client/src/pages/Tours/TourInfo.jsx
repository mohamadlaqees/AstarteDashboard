import React, { Fragment } from "react";
import {
  Box,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";

import { useParams } from "react-router-dom";
import { useGetExperienceQuery } from "../../store/apiSlice/apiSlice";
import TableComponent from "../../components/TableComponent";
import IconUploader from "../../components/IconUploader";
import ImageListComponent from "../../components/ImageListComponent";

const TourInfo = () => {
  const theme = useTheme();
  const { tourid } = useParams();
  const { data: experience, isLoading } = useGetExperienceQuery(tourid);

  const columns = [
    { id: "description", label: "Description", minWidth: 100 },
    { id: "icon", label: "Icon", minWidth: 100 },
  ];
  const rows = [];

  const response = {
    title: experience?.document?.title,
    description: experience?.document?.description,
    duration: experience?.document?.duration,
    rating: experience?.document?.rating,
    bookedSeats: experience?.document?.bookedSeats,
    registrationStartDate: experience?.document?.registrationStartDate,
    registrationEndDate: experience?.document?.registrationEndDate,
    itinerary: experience?.document?.itinerary,
    includes: experience?.document?.includes,
    media: experience?.document?.media,
    status: experience?.document?.status,
  };

  if (response !== undefined && response.includes !== undefined) {
    response.includes.map((field, index) => {
      rows.push({
        description: field.description,
        icon: (
          <IconUploader
            label={"icon"}
            disabled={true}
            index={index}
            key={index}
            src={field.icon}
            sx={{
              width: 56,
              height: 56,

              border: `3px solid ${theme.palette.secondary.main}`,
            }}
          />
        ),
      });
    });
  }
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
        <Header title="Tour" subtitle={tourid} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack
          marginTop="20px"
          width="30%"
          marginLeft="auto"
          marginRight="auto"
          overflow="auto"
        >
          <Box paddingBottom="40px">
            <Header subtitle="Experience info" />
          </Box>
          <TextField
            value={response?.title}
            variant="standard"
            label="Title"
            disabled
            type="text"
            defaultValue={"Title"}
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
            value={response?.description}
            variant="standard"
            label="Description"
            disabled
            type="text"
            defaultValue={"Description"}
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
            value={response?.duration}
            variant="standard"
            label="Duration"
            disabled
            type="text"
            defaultValue={"Duration"}
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
            value={response.bookedSeats}
            label={"BookedSeats"}
            disabled
            type="text"
            variant="standard"
            defaultValue={"BookedSeats"}
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
          <Box display="flex" gap="20px" sx={{ marginTop: "20px" }}>
            <Typography marginTop="10px">Rating</Typography>
            <Box>
              <Rating
                value={response.rating}
                disabled
                defaultValue={0}
                sx={{ marginTop: "10px", marginBottom: "5px" }}
              />
            </Box>
            <TextField
              value={response.status}
              variant="standard"
              label="Status"
              disabled
              defaultValue={"available"}
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
          </Box>

          <Box display="flex" gap="20px" marginBottom="20px" marginTop="20px">
            <TextField
              value={response.registrationStartDate}
              variant="standard"
              label="RegistrationStartDate"
              disabled
              defaultValue={"MM/DD/YYYY"}
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
              value={response.registrationEndDate}
              variant="standard"
              label="RegistrationEndDate"
              disabled
              defaultValue={"MM/DD/YYYY"}
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
          </Box>

          <Box paddingBottom="40px">
            <Header subtitle="Itinerary" />
          </Box>
          {response?.itinerary?.map((field, index) => (
            <Fragment key={index}>
              <Box display="flex" gap="10px">
                <TextField
                  value={field.milestoneName}
                  variant="standard"
                  label="Milestone Name"
                  disabled
                  defaultValue={""}
                  type="text"
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
                  value={field.location}
                  variant="standard"
                  label="Location"
                  disabled
                  defaultValue={""}
                  type="text"
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
              </Box>
            </Fragment>
          ))}
        </Stack>

        <Stack
          marginTop="20px"
          width="40%"
          marginLeft="auto"
          marginRight="auto"
          overflow="auto"
        >
          <Box maxHeight={"300px"} overflow={"auto"}>
            <Box marginBottom="40px">
              <Header subtitle="Includes" />
              <TableComponent
                rows={rows}
                columns={columns}
                theme={theme}
                Align={"center"}
              />
            </Box>
          </Box>

          <Divider />

          <Box marginTop="40px" maxHeight={"300px"} overflow={"auto"}>
            <Box marginBottom="40px">
              <Header subtitle="Media" />
            </Box>

            <ImageListComponent media={response?.media} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default TourInfo;

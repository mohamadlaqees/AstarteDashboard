import React, { Fragment, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import { addExperiencSchema } from "../../Utils/Validations";

const AddTour = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      itinerary: [
        {
          milestoneName: "",
          location: "",
        },
      ],
      duration: "",
      includes: [],
      media: [],
    },
    resolver: yupResolver(addExperiencSchema),
    mode: "onBlur",
  });

  const { register, control, handleSubmit, formState } = form;
  const { append, fields, remove } = useFieldArray({
    name: "itinerary",
    control,
  });
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const submitHandler = (data) => {
    console.log(data);
  };
  const [ratingValue, setRatingValue] = useState(0);

  return (
    <>
      <Box margin="40px" width="120px">
        <Header title="Tours" subtitle="Add a new tour" />
      </Box>

      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="200px"
        >
          <Stack width="30%" marginTop="20px">
            <TextField
              label="Title"
              sx={{ marginBottom: "20px" }}
              {...register("title")}
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
            <TextField
              label="Description"
              sx={{ marginBottom: "20px" }}
              {...register("description")}
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
            <TextField
              label="Duration"
              sx={{ marginBottom: "20px" }}
              {...register("duration", {
                valueAsNumber: true,
              })}
              error={!!errors.duration}
              helperText={errors?.duration?.message}
            />
            <Typography>Rating</Typography>
            <Rating
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue == null ? 0 : newValue);
              }}
              sx={{ marginBottom: "20px" }}
            />

            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <Box display="flex" gap="10px">
                  <TextField
                    type="text"
                    label="MilestonName"
                    {...register(`itinerary.${index}.milestoneName`)}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    error={!!errors?.milestoneName}
                    helperText={errors?.milestoneName?.message}
                  />

                  <TextField
                    type="text"
                    label="location"
                    {...register(`itinerary.${index}.location`)}
                    sx={{ marginTop: "20px", marginBottom: "20px" }}
                    error={!!errors?.location}
                    helperText={errors?.location?.message}
                  />
                </Box>

                {index > 0 && (
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    sx={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      width: "150px",
                    }}
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </Fragment>
            ))}

            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="medium"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                width: "150px",
              }}
              onClick={() =>
                append({
                  milestoneName: "",
                  location: "",
                })
              }
            >
              Add itinerary
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                marginTop: "50px",
                marginBottom: "10px",
              }}
            >
              Submit
            </Button>
          </Stack>

          <Stack>Media</Stack>
        </Box>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default AddTour;

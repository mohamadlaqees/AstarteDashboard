import React, { Fragment } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { addExperienceSchema } from "../../Utils/Validations";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddTour = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      status: "",
      bookedSeats: null,
      registrationStartDate: "",
      registrationEndDate: "",
      description: "",
      duration: "",
      rating: null,
      itinerary: [{ milestoneName: "", location: "" }],
    },
    resolver: yupResolver(addExperienceSchema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const submitHandler = (data) => {
    reset({
      title: "",
      status: "",
      bookedSeats: null,
      registrationStartDate: null,
      registrationEndDate: null,
      description: "",
      duration: "",
      rating: 0,
      itinerary: [{ milestoneName: "", location: "" }],
    });
    console.log(data);
  };

  return (
    <>
      <Box margin="40px">
        <Header title="Tours" subtitle="Add a new tour" />
      </Box>

      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
            overflow="auto"
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  autoFocus
                  sx={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.primary,
                      },
                      "&:hover fieldset": {
                        borderColor: "secondary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "secondary.main",
                      },
                    },
                  }}
                  error={!!errors.title || undefined}
                  helperText={errors?.title?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  sx={{
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.primary,
                      },
                      "&:hover fieldset": {
                        borderColor: "secondary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "secondary.main",
                      },
                    },
                  }}
                  error={!!errors.description || undefined}
                  helperText={errors?.description?.message}
                />
              )}
            />

            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Duration"
                  sx={{
                    marginBottom: "20px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.primary,
                      },
                      "&:hover fieldset": {
                        borderColor: "secondary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "secondary.main",
                      },
                    },
                  }}
                  error={!!errors.duration || undefined}
                  helperText={errors?.duration?.message}
                />
              )}
            />

            <Box display="flex" gap="20px" marginBottom="20px">
              <Typography marginTop="10px">Rating</Typography>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Box>
                    <Rating
                      {...field}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      sx={{ marginTop: "10px" }}
                      error={!!errors.rating || undefined}
                      helperText={errors?.rating?.message}
                    />
                    {errors.rating && (
                      <Typography color="error" sx={{ marginBottom: "20px" }}>
                        {errors.rating.message}
                      </Typography>
                    )}
                  </Box>
                )}
              />

              <Controller
                name={"status"}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors?.status}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      label="Status"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                          "&:hover fieldset": {
                            borderColor: "secondary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "secondary.main",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "secondary.main",
                          },
                        },
                      }}
                    >
                      <MenuItem value={"Available"}>Available</MenuItem>
                      <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                    </Select>
                    {errors?.status?.message && (
                      <Typography color="error">
                        {errors?.status?.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            <Box display="flex" gap="20px" marginBottom="20px">
              <Controller
                name="registrationStartDate"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      label="RegistrationStartDate"
                      sx={{
                        marginBottom: "20px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.primary,
                          },
                          "&:hover fieldset": {
                            borderColor: "secondary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "secondary.main",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "secondary.main",
                          },
                        },
                      }}
                    />
                  </FormControl>
                )}
              />

              <Controller
                name="registrationEndDate"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      label="RegistrationEndDate"
                      sx={{
                        marginBottom: "20px",
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.primary,
                          },
                          "&:hover fieldset": {
                            borderColor: "secondary.main",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "secondary.main",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "secondary.main",
                          },
                        },
                      }}
                    />
                  </FormControl>
                )}
              />
            </Box>

            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <Box display="flex" gap="10px">
                  <Controller
                    name={`itinerary.${index}.milestoneName`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="Milestone Name"
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.primary,
                            },
                            "&:hover fieldset": {
                              borderColor: "secondary.main",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.main",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                              color: "secondary.main",
                            },
                          },
                        }}
                        error={
                          !!errors?.itinerary?.[index]?.milestoneName ||
                          undefined
                        }
                        helperText={
                          errors?.itinerary?.[index]?.milestoneName?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`itinerary.${index}.location`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        label="Location"
                        sx={{
                          marginTop: "20px",
                          marginBottom: "20px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.primary,
                            },
                            "&:hover fieldset": {
                              borderColor: "secondary.main",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.main",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            "&.Mui-focused": {
                              color: "secondary.main",
                            },
                          },
                        }}
                        error={
                          !!errors?.itinerary?.[index]?.location || undefined
                        }
                        helperText={
                          errors?.itinerary?.[index]?.location?.message
                        }
                      />
                    )}
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
              onClick={() => append({ milestoneName: "", location: "" })}
            >
              Add Itinerary
            </Button>

            <Button
              type="submit"
              variant="contained"
              size="medium"
              sx={{
                marginTop: "50px",
                marginBottom: "50px",
                backgroundColor: theme.palette.secondary[600],
                ":hover": {
                  backgroundColor: theme.palette.secondary[500],
                },
              }}
              disabled={!isDirty || !isValid || isSubmitting}
            >
              Add Tour
            </Button>
          </Stack>

          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
            overflow="auto"
          >
            Media
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AddTour;

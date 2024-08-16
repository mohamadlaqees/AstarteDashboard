import React, { Fragment, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
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
import NumberInputComponent from "../../components/NumberInputComponent";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

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
      bookedSeats: 0,
      registrationStartDate: "",
      registrationEndDate: "",
      description: "",
      duration: "",
      rating: 0,
      itinerary: [{ milestoneName: "", location: "" }],
      includes: [
        {
          description: "",
          icon: "",
        },
      ],
    },
    resolver: yupResolver(addExperienceSchema),
    mode: "onBlur",
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const {
    fields: includesFields,
    append: appendIncludes,
    remove: removeIncludes,
  } = useFieldArray({
    control,
    name: "includes",
  });

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (data) => {
    reset({
      title: "",
      status: "",
      bookedSeats: "",
      registrationStartDate: null,
      registrationEndDate: null,
      description: "",
      duration: "",
      rating: 0,
      itinerary: [{ milestoneName: "", location: "" }],
      includes: [
        {
          description: "",
          icon: "",
        },
      ],
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

            <Controller
              name="bookedSeats"
              control={control}
              render={({ field }) => (
                <Box>
                  <InputLabel sx={{ marginBottom: "10px" }}>
                    Booked seats
                  </InputLabel>
                  <NumberInputComponent
                    field={field}
                    label={"BookedSeats"}
                    error={!!errors?.bookedSeats}
                    errorMessage={errors?.bookedSeats?.message}
                  />
                </Box>
              )}
            />

            <Box display="flex" gap="20px" sx={{ marginTop: "20px" }}>
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
                      sx={{ marginTop: "10px", marginBottom: "5px" }}
                      error={!!errors.rating || undefined}
                    />
                    {errors.rating && (
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "11px",
                          marginLeft: "15px",
                        }}
                      >
                        {" "}
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
                        marginBottom: "5px",
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
                      <Typography
                        color="error"
                        sx={{
                          fontSize: "11px",
                          marginLeft: "15px",
                        }}
                      >
                        {" "}
                        {errors?.status?.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            <Box display="flex" gap="20px" marginBottom="20px" marginTop="20px">
              <Controller
                name="registrationStartDate"
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    error={!!errors?.registrationStartDate}
                  >
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
                  <FormControl fullWidth error={!!errors?.registrationEndDate}>
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
            <Box marginBottom="20px">
              <Header subtitle="Includes" />
            </Box>

            {includesFields.map((include, index) => (
              <Fragment key={include.id}>
                <Box display="flex" justifyContent="space-between">
                  <Controller
                    name={`includes.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        type="text"
                        sx={{
                          marginBottom: "20px",
                          marginTop: "25px",
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
                        error={!!errors.includes?.[index]?.description}
                        helperText={
                          errors.includes?.[index]?.description?.message
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`includes.${index}.icon`}
                    render={({ field }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Icon
                        </InputLabel>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id={`icon-upload-${index}`}
                          type="file"
                          onChange={(e) => {
                            field.onChange(e.target.files[0]);
                            handleImageChange(e, index);
                          }}
                        />
                        <label htmlFor={`icon-upload-${index}`}>
                          <IconButton component="span">
                            <Avatar
                              src={imagePreviews[index] || ""}
                              sx={{
                                cursor: "pointer",
                                width: 56,
                                height: 56,
                                border: `3px solid ${theme.palette.secondary.main}`,
                                backgroundColor: imagePreviews[index]
                                  ? "transparent"
                                  : "grey.300",
                              }}
                            >
                              {!imagePreviews[index] && <PhotoLibraryIcon />}
                            </Avatar>
                          </IconButton>
                        </label>
                        {errors?.includes?.[index]?.message && (
                          <Typography
                            color="error"
                            sx={{
                              fontSize: "11px",
                              marginLeft: "15px",
                            }}
                          >
                            {errors?.includes?.[index]?.message}
                          </Typography>
                        )}
                      </Box>
                    )}
                  />
                </Box>
              </Fragment>
            ))}
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AddTour;

import React, { Fragment, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
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
import { addOrUpdateExperienceSchema } from "../../Utils/Validations";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import NumberInputComponent from "../../components/NumberInputComponent";
import ImageUploader from "../../components/ImageUploader";
import IconUploader from "../../components/IconUploader";
import { useAddExperienceMutation } from "../../store/apiSlice/apiSlice";
import { LoadingButton } from "@mui/lab";

const AddTour = () => {
  const theme = useTheme();
  const [addExperience, { isLoading, isSuccess, isError, error }] =
    useAddExperienceMutation();

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
      media: [
        {
          image: "",
        },
      ],
    },
    resolver: yupResolver(addOrUpdateExperienceSchema),
    mode: "onBlur",
  });
  const [iconPreviews, setIconPreviews] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itinerary",
  });

  const {
    fields: mediaFields,
    append: appendMedia,
    remove: removeMedia,
  } = useFieldArray({
    control,
    name: "media",
  });

  const {
    fields: includesFields,
    append: appendIncludes,
    remove: removeIncludes,
  } = useFieldArray({
    control,
    name: "includes",
  });

  const submitHandler = async (data) => {
    console.log(data);
    try {
      await addExperience(data)
        .unwrap()
        .then(() => {
          !isSubmitting
            ? reset({
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
                media: [
                  {
                    image: "",
                  },
                ],
              })
            : "";
        });
    } catch (error) {}
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
            <Box paddingBottom="20px">
              <Header subtitle="Experience info" />
            </Box>

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
                  error={!!errors.duration}
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

            <Box paddingBottom="20px">
              <Header subtitle="Itinerary" />
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
              {isSubmitting ? (
                <LoadingButton
                  variant="text"
                  loading
                  sx={{ width: "130px" }}
                  loadingPosition="start"
                >
                  Add Tour
                </LoadingButton>
              ) : (
                "Add Tour"
              )}{" "}
            </Button>
          </Stack>

          <Stack
            marginTop="20px"
            width="40%"
            marginLeft="auto"
            marginRight="auto"
            overflow="auto"
          >
            <Box maxHeight={"300px"} overflow={"auto"}>
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
                        <IconUploader
                          disabled={false}
                          errorMessage={
                            errors?.includes?.[index]?.icon?.message
                          }
                          field={field}
                          index={index}
                          label={"Icon"}
                          src={iconPreviews[index]}
                          sx={{
                            cursor: "pointer",
                            width: "56px",
                            height: "56px",
                            border: `3px solid ${theme.palette.secondary.main}`,
                          }}
                          iconSx={{
                            width: "76px",
                            height: "76px",
                          }}
                          iconPreviews={iconPreviews}
                          key={index}
                          setIconPreviews={setIconPreviews}
                          selectedFiles2={selectedFiles2}
                          setSelectedFiles2={setSelectedFiles2}
                        />
                      )}
                    />
                  </Box>

                  <Box display="flex" gap="20px">
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
                        onClick={() => removeIncludes(index)}
                      >
                        Remove
                      </Button>
                    )}

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
                        appendIncludes({
                          description: "",
                          icon: "",
                        })
                      }
                    >
                      Add Includes
                    </Button>
                  </Box>
                </Fragment>
              ))}
            </Box>

            <Divider sx={{ marginTop: "50px" }} />

            <Box marginTop="40px" maxHeight={"300px"} overflow={"auto"}>
              <Box marginBottom="20px">
                <Header subtitle="Media" />
              </Box>

              {mediaFields.map((media, index) => (
                <Fragment key={media.id}>
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      alignSelf={`${index > 0 ? "center" : ""}`}
                      marginTop={`${index > 0 ? "40px" : "70px"}`}
                      sx={{
                        maxWidth: "150px",
                      }}
                    >
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="medium"
                        sx={{
                          width: "150px",
                          maxHeight: "33px",
                        }}
                        onClick={() =>
                          appendMedia({
                            image: "",
                          })
                        }
                      >
                        Add Image
                      </Button>

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
                            maxHeight: "33px",
                          }}
                          onClick={() => removeMedia(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>

                    <Controller
                      name={`media.${index}.image`}
                      control={control}
                      render={({ field }) => (
                        <ImageUploader
                          key={index}
                          errorMessage={errors?.media?.[index]?.image?.message}
                          label={"Image"}
                          disabled={false}
                          field={field}
                          index={index}
                          radius={"0px"}
                          src={imagePreviews[index]}
                          sx={{
                            cursor: "pointer",
                            borderRadius: "0px",
                            width: 150,
                            height: 150,
                            border: `3px solid ${theme.palette.secondary.main}`,
                          }}
                          iconSx={{
                            width: "170px",
                            height: "170px",
                            borderRadius: "0px",
                          }}
                          imagePreviews={imagePreviews}
                          setImagePreviews={setImagePreviews}
                          selectedFiles={selectedFiles}
                          setSelectedFiles={setSelectedFiles}
                        />
                      )}
                    />
                  </Box>
                </Fragment>
              ))}
            </Box>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AddTour;

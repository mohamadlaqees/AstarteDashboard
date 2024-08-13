import React, { Fragment } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { addFund } from "../../Utils/Validations";
import Header from "../../components/Header";

const AddFund = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      project: {
        name: "",
        description: "",
        location: "",
        startingPoint: "",
      },
      totalAmount: 0,
      allocatedAmount: 0,
      donors: [
        {
          donation: 0,
          type: "",
          date: "",
        },
      ],
    },
    resolver: yupResolver(addFund),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "donors",
  });

  const submitHandler = (data) => {
    reset({
      project: {
        name: "s",
        description: "",
        location: "",
        startingPoint: "",
      },
      totalAmount: 0,
      allocatedAmount: 0,
      donors: [
        {
          donation: 0,
          type: "",
          date: "",
        },
      ],
    });
    console.log(data);
  };

  return (
    <>
      <Box margin="40px">
        <Header title="Funds" subtitle="Add a new funds" />
      </Box>

      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
          >
            <Controller
              name="project.name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  autoFocus
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
                  error={!!errors?.project?.name || undefined}
                  helperText={errors?.project?.name?.message}
                />
              )}
            />

            <Controller
              name="project.description"
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
                  error={!!errors?.project?.description || undefined}
                  helperText={errors?.project?.description?.message}
                />
              )}
            />

            <Controller
              name="project.location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
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
                  error={!!errors?.project?.location || undefined}
                  helperText={errors?.project?.location?.message}
                />
              )}
            />

            <Controller
              name="project.startingPoint"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="StartingPoint"
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
                  error={!!errors?.project?.startingPoint || undefined}
                  helperText={errors?.project?.startingPoint?.message}
                />
              )}
            />

            <Controller
              name="totalAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="TotalAmount"
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
                  error={!!errors.totalAmount || undefined}
                  helperText={errors?.totalAmount?.message}
                />
              )}
            />

            <Controller
              name="allocatedAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="AllocatedAmount"
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
                  error={!!errors.allocatedAmount || undefined}
                  helperText={errors?.allocatedAmount?.message}
                />
              )}
            />
          </Stack>

          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
          >
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <Controller
                  name={`donors.${index}.donation`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      label="Donation"
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
                      error={!!errors?.donors?.[index]?.donation || undefined}
                      helperText={errors?.donors?.[index]?.donation?.message}
                    />
                  )}
                />

                <Controller
                  name={`donors.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      label="Type"
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
                      error={!!errors?.donors?.[index]?.type || undefined}
                      helperText={errors?.donors?.[index]?.type?.message}
                    />
                  )}
                />

                <Controller
                  name={`donors.${index}.date`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Date"
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
                      error={!!errors?.donors?.[index]?.date || undefined}
                      helperText={errors?.donors?.[index]?.date?.message}
                    />
                  )}
                />

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
                  donation: null,
                  type: "",
                  date: "",
                })
              }
            >
              Add Donors
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
              Add Fund
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AddFund;

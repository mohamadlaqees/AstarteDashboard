import React, { Fragment, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { addOrUpdateFundSchema } from "../../Utils/Validations";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetFundQuery,
  useUpdateFundMutation,
} from "../../store/apiSlice/apiSlice";
import { LoadingButton } from "@mui/lab";

const Fund = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { fundid } = useParams();
  const { data: fund, isLoading, refetch } = useGetFundQuery(fundid);
  console.log(fund);
  const [updateFund, { isError, isLoading: updateLoading, isSuccess, error }] =
    useUpdateFundMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      project: "",
      totalAmount: 0,
      allocatedAmount: 0,
      donors: [
        {
          donation: 0,
          date: "",
        },
      ],
    },
    resolver: yupResolver(addOrUpdateFundSchema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "donors",
  });

  const submitHandler = async (data) => {
    console.log(data);
    try {
      await updateFund({ updatedFund: data, id: fundid })
        .unwrap()
        .then(() => {
          navigate("/funds");
        });
    } catch (error) {}

    console.log(data);
  };

  useEffect(() => {
    refetch();
    if (fund) {
      reset({
        project: fund?.document.project || "",
        totalAmount: fund?.document.totalAmount || 0,
        allocatedAmount: fund?.document.allocatedAmount || 0,
        donors: fund?.document?.donors.map((donor) => ({
          donation: donor.donation || 0,
          date: donor.date || "",
        })),
      });
    }
  }, [fund, reset]);

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
        <Header title={`Fund : ${fundid}`} subtitle="Update fund info" />
      </Box>

      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
            overflow="auto"
          >
            <Box paddingBottom="20px">
              <Header subtitle="Project info" />
            </Box>
            <Controller
              name="project"
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
                <LoadingButton variant="text" loading sx={{ width: "130px" }}>
                  Save{" "}
                </LoadingButton>
              ) : (
                "Save"
              )}{" "}
              {isError && (
                <Typography color={"error"}>{error?.data?.message}</Typography>
              )}
            </Button>
          </Stack>

          <Stack margin="auto" width="30%">
            <Box paddingBottom="20px">
              <Header subtitle="Donnors info" />
            </Box>
            <Stack overflow="auto" maxHeight={"375px"}>
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
                    name={`donors.${index}.date`}
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors?.donors?.[index]?.date}
                        sx={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <DatePicker
                          {...field}
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date) => {
                            field.onChange(date);
                          }}
                          label="Date"
                          slotProps={{
                            textField: {
                              variant: "outlined",
                            },
                          }}
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
                        />
                      </FormControl>
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
                    date: "",
                  })
                }
              >
                Add Donors
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default Fund;

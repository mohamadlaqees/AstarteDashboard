import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { addOrUpdateProjectSchema } from "../../Utils/Validations";
import Header from "../../components/Header";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ImageUploader from "../../components/ImageUploader";
import { useAddProjectMutation } from "../../store/apiSlice/apiSlice";
import { LoadingButton } from "@mui/lab";

const Addproject = () => {
  const theme = useTheme();
  const [addProject, { isError, isLoading, isSuccess }] =
    useAddProjectMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      isEducational: "",
      description: "",
      location: "",
      startingPoint: "",
      date: "",
      image: "",
    },
    resolver: yupResolver(addOrUpdateProjectSchema),
    mode: "onBlur",
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const submitHandler = async (data) => {
    console.log(data)
    try {
      await addProject(data)
        .unwrap()
        .then(() => {
          !isSubmitting
            ? (reset({
                name: "",
                isEducational: "",
                description: "",
                location: "",
                startingPoint: "",
                date: "",
                image: "",
              }),
              setImagePreviews([]))
            : "";
        });
    } catch (error) {}

    console.log(data);
  };

  return (
    <>
      <Box margin="40px">
        <Header title="Project" subtitle="Add a new project" />
      </Box>

      <form noValidate onSubmit={handleSubmit(submitHandler)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Stack
            marginTop="20px"
            width="30%"
            marginLeft="auto"
            marginRight="auto"
          >
            <Box paddingBottom="20px">
              <Header subtitle="Project info" />
            </Box>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
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
                  error={!!errors.name || undefined}
                  helperText={errors?.name?.message}
                />
              )}
            />

            <Controller
              name={"isEducational"}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.isEducational}>
                  <InputLabel>IsEducational</InputLabel>
                  <Select
                    {...field}
                    label="IsEducational"
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
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                  {errors?.isEducational?.message && (
                    <Typography
                      color="error"
                      sx={{
                        fontSize: "11px",
                        marginLeft: "15px",
                      }}
                    >
                      {errors?.isEducational?.message}
                    </Typography>
                  )}
                </FormControl>
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
                  error={!!errors.description || undefined}
                  helperText={errors?.description?.message}
                />
              )}
            />

            <Controller
              name="location"
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
                  error={!!errors.location || undefined}
                  helperText={errors?.location?.message}
                />
              )}
            />

            <Controller
              name="startingPoint"
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
                  error={!!errors.startingPoint || undefined}
                  helperText={errors?.startingPoint?.message}
                />
              )}
            />

            <Controller
              name={"date"}
              control={control}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  sx={{ marginBottom: "20px" }}
                  error={!!errors?.date}
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
                  Add Project
                </LoadingButton>
              ) : (
                "Add Project"
              )}
            </Button>
          </Stack>

          <Stack
            width="30%"
            marginLeft="auto"
            marginRight="auto"
            marginBottom="auto"
            marginTop="auto"
          >
            <Box paddingBottom="20px">
              <Header subtitle="Project image" />
            </Box>

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageUploader
                  errorMessage={errors?.image?.message}
                  field={field}
                  index={0}
                  label={"Image"}
                  key={field.id}
                  src={imagePreviews[0]}
                  imagePreviews={imagePreviews}
                  setImagePreviews={setImagePreviews}
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
              )}
            />
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default Addproject;

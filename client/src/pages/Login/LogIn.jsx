import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import { logInSchema } from "../../Utils/Validations";
import { LoadingButton } from "@mui/lab";
import { useLogInMutation } from "../../store/apiSlice/apiSlice";

const LogIn = () => {
  const theme = useTheme();
  const [logIn, { isError, isLoading, isSuccess, error }] = useLogInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(logInSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await logIn(data).unwrap(); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Stack display="flex">
      <Box marginTop="40px" marginLeft="40px">
        <Typography
          sx={{
            color: `${theme.palette.secondary[500]}`,
            fontSize: "40px",
          }}
        >
          Astarte Dashboard
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          width: "500px",
          margin:'auto'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h4" mb={2} color={theme.palette.secondary[600]}>
            Log In
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
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

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              marginTop: "50px",
              marginBottom: "20px", 
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
                LogIn
              </LoadingButton>
            ) : (
              "LogIn"
            )}
          </Button>

          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error?.error || "An error occurred while logging in."}
            </Typography>
          )}
        </form>
      </Box>
    </Stack>
  );
};

export default LogIn;

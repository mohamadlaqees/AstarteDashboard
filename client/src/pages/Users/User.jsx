import React, { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import AvatarUpload from "../../components/AvatarUpload";
import Paper from "@mui/material/Paper";
import { useParams, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserProfile from "./UserProfile";
import { userProfileSchema } from '../../Utils/Validations';
import UserHeader from "./UserHeader";

function User() {
  const routeParams = useParams();
  const { userId } = routeParams;

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(userProfileSchema),
  });

  const { reset, watch } = methods;
  const form = watch();

  useEffect(() => {
    if (userId === "new") {
      reset({});
    }
  }, [userId, reset]);

  if (userId !== "new") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography color="text.secondary" variant="h5">
          No Users
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to={`/users`}
          color="inherit"
        >
          Go To Users
        </Button>
      </Box>
    );
  }

  if (routeParams.userId !== "new") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
     
        <UserHeader />
       
          <Box my={10}>
            <UserProfile />
          </Box>
    </FormProvider>
  );
}

export default User;

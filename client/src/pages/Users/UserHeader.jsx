import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Button, Box, Typography, SvgIcon } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * The user header.
 */
function UserHeader() {
  // const dispatch = useDispatch<AppDispatch>();
  const routeParams = useParams();
  const { userId } = routeParams;
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;

  const theme = useTheme();
  const navigate = useNavigate();
  const { firstName, lastName, id } = watch();

  function optimizeUser(data) {
    const userData = { ...data };
    delete userData.createdAt;
    delete userData.updatedAt;
    delete userData.email;

    return userData;
  }

  // function handleSaveUser() {
  //   setLoading(true);
  //   (id && id !== "new" ? updateUser : createUser)(
  //     optimizeUser(getValues())
  //   )
  //     .unwrap()
  //     .then(() => {
  //       setLoading(false);
  //       dispatch(
  //         showMessage({
  //           message: t(`USER_SAVED_SUCCESSFULLY`),
  //           variant: "success",
  //           autoHideDuration: 2000,
  //           anchorOrigin: {
  //             vertical: "top",
  //             horizontal: "right",
  //           },
  //         })
  //       );
  //       navigate(`/users`);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       dispatch(
  //         showMessage({
  //           message: t(`SOMETHING_WENT_WRONG_WHEN_SAVE_USER`),
  //           variant: "error",
  //           autoHideDuration: 2000,
  //           anchorOrigin: {
  //             vertical: "top",
  //             horizontal: "right",
  //           },
  //         })
  //       );
  //     });
  // }

  // function handleRemoveUser(user) {
  //   dispatch(
  //     openDialog({
  //       children: (
  //         <AlertDialog
  //           title="Remove the Title"
  //           message="Are you sure You want to remove the user"
  //           onSubmit={() => {
  //             setLoadingRemove(true);
  //             removeUser(userId)
  //               .unwrap()
  //               .then((action) => {
  //                 setLoadingRemove(false);
  //                 dispatch(
  //                   showMessage({
  //                     message: t(`USER_REMOVED_SUCCESSFULLY`),
  //                     variant: "success",
  //                     autoHideDuration: 2000,
  //                     anchorOrigin: {
  //                       vertical: "top",
  //                       horizontal: "right",
  //                     },
  //                   })
  //                 );
  //                 navigate(`/users`);
  //               })
  //               .catch((e) => {
  //                 setLoadingRemove(false);
  //                 dispatch(
  //                   showMessage({
  //                     message: t(`SOMETHING_WENT_WRONG_WHEN_REMOVE_USER`),
  //                     variant: "error",
  //                     autoHideDuration: 2000,
  //                     anchorOrigin: {
  //                       vertical: "top",
  //                       horizontal: "right",
  //                     },
  //                   })
  //                 );
  //               });
  //           }}
  //         />
  //       ),
  //     })
  //   );
  // }

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="space-between"
      py={{ xs: 3, sm: 4 }}
      px={{ xs: 3, md: 4 }}
      sx={{ width: "100%" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{ width: "100%" }}
      >
        <Box display="flex" alignItems="center" mb={{ sm: 1.5 }}>
          <Button
            component={Link}
            to={`/users`}
            startIcon={<ArrowBackIcon />}
            sx={{ color: "inherit", textTransform: "none" }}
          >
            Users
          </Button>
        </Box>
        <Box display="flex" alignItems="center" maxWidth="100%">
          <Box
            display="flex"
            flexDirection="column"
            minWidth={0}
            mx={{ xs: 1, sm: 2 }}
          >
            <Typography variant="h6" noWrap>
              {firstName ? `${firstName ?? ""} ${lastName ?? ""}` : ""}
            </Typography>
            <Typography variant="caption">User Details</Typography>
          </Box>
        </Box>
      </Box>
      {id && id !== "new" && (
        <Box display="flex" flex={1} width="100%">
          <LoadingButton
            variant="contained"
            color="error"
            // onClick={handleRemoveUser}
            startIcon={<DeleteIcon />}
            loadingPosition="start"
            loading={loadingRemove}
            sx={{ mx: 1, width: "100%" }}
          >
            Remove User
          </LoadingButton>
        </Box>
      )}
      <Box display="flex" flex={1} width="100%">
        <LoadingButton
          variant="contained"
          color="secondary"
          //   onClick={handleSaveUser}
          startIcon={<SaveIcon />}
          loadingPosition="start"
          loading={loading}
        //   disabled={!isValid}
          sx={{ mx: 1, width: "100%" }}
        >
          {id && id !== "new" ? "Save User" : "Create User"}
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default UserHeader;

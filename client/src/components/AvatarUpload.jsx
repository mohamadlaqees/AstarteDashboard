import { orange } from "@mui/material/colors";
import { lighten, styled } from "@mui/material/styles";
import { Controller, useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function AvatarUpload() {
  const methods = useFormContext();
  const { control } = methods;
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteImage = (onChange) => {
    setImageUrl("");
    onChange("");
  };

  return (
    <Root>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={-11.75}
        mb={3}
      >
        <Controller
          control={control}
          name="avatarUrl"
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                position: 'relative',
                width: 128,
                height: 128,
                borderRadius: '50%',
                overflow: 'hidden',
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: '#ffedc2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'black',
                  opacity: 0.5,
                  zIndex: 10,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <label htmlFor="button-avatar" style={{ display: 'flex', padding: 8, cursor: 'pointer' }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="button-avatar"
                      type="file"
                      // onChange={async (e) => {
                      //   uploadImage(e.target.files[0], onChange);
                      // }}
                    />
                    {isLoading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <IconButton component="span">
                        <CameraAltIcon style={{ color: 'white' }} />
                      </IconButton>
                    )}
                  </label>
                  {!isLoading && (
                    <IconButton onClick={() => handleDeleteImage(onChange)}>
                      <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Avatar
                sx={{
                  backgroundColor: 'background.default',
                  color: 'text.secondary',
                  width: '100%',
                  height: '100%',
                  fontSize: 64,
                  fontWeight: 'bold',
                }}
                src={value}
              />
            </Box>
          )}
        />
      </Box>
    </Root>
  );
}

export default AvatarUpload;

import React from "react";
import { Avatar, Box, IconButton, InputLabel } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const ImageUploader = ({
  label,
  index,
  src,
  sx,
  boxSx,
  iconSx,
  disabled,
  field,
  imagePreviews = [],
  setImagePreviews = () => {},
  errorMessage,
}) => {
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result;
        setImagePreviews(newImagePreviews);
        field.onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={boxSx}>
      <InputLabel
        sx={{
          textAlign: "center",
          marginBottom: "5px",
        }}
      >
        {label}
      </InputLabel>

      <input
        accept="image/*"
        disabled={disabled}
        style={{ display: "none" }}
        type="file"
        id={`image-${index}`}
        onChange={(e) => {
          handleImageChange(e, index);
        }}
      />

      <label htmlFor={`image-${index}`}>
        <IconButton component="span" sx={iconSx} disabled={disabled}>
          <Avatar
            src={src || ""}
            sx={{
              ...sx,
              backgroundColor: src ? "transparent" : "grey.300",
            }}
          >
            {!src && <PhotoLibraryIcon />}
          </Avatar>
        </IconButton>
      </label>

      {errorMessage && (
        <Typography
          color="error"
          sx={{
            fontSize: "11px",
            marginLeft: "15px",
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUploader;

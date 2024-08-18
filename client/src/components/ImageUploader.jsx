import React from "react";
import { Avatar, Box, IconButton, InputLabel } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const ImageUploader = ({
  label,
  index,
  src,
  sx,
  disabled,
  radius,
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
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <InputLabel
        sx={{
          display: "flex",
          justifyContent: "center",
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
          field.onChange(src);
        }}
      />

      <label htmlFor={`image-${index}`}>
        <IconButton
          component="span"
          sx={{
            width: "180px",
            height: "180px",
            borderRadius: `${radius}`,
          }}
        >
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

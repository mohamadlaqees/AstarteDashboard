import React from "react";
import { Avatar, Box, IconButton, InputLabel } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const IconUploader = ({
  label,
  index,
  src,
  sx,
  disabled,
  field,
  iconPreviews = [],
  setIconPreviews = () => {},
  errorMessage,
}) => {
  const handleIconChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newIconPreviews = [...iconPreviews];
        newIconPreviews[index] = reader.result;
        setIconPreviews(newIconPreviews);
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
        id={`icon-${index}`}
        onChange={(e) => {
          handleIconChange(e, index);
          field.onChange(src);
        }}
      />

      <label htmlFor={`icon-${index}`}>
        <IconButton
          component="span"
          sx={{
            width: "56px",
            height: "56px",
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

export default IconUploader;

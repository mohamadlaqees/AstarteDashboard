import React from "react";
import { Avatar, Box, IconButton, InputLabel } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

const ImageUploader = ({ label, index, src, sx, disabled }) => {
    console.log(src)
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
        style={{ display: "none" }}
        id={`icon-upload-${index}`}
        type="file"
      />
      <label htmlFor={`icon-upload-${index}`}>
        <IconButton component="span" disabled={disabled}>
          <Avatar
            src={src || ""}
            sx={{
              ...sx,
              backgroundColor: src === "" ? "transparent" : "grey.300",
            }}
          >
            {!src && <PhotoLibraryIcon />}
          </Avatar>
        </IconButton>
      </label>
    </Box>
  );
};

export default ImageUploader;

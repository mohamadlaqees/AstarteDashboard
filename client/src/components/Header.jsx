/* eslint-disable react/prop-types */
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/users/new");
  };

  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
      
    </Box>
  );
};

export default Header;

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Collapse,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Group,
  AccountBalance,
  TravelExplore,
  Payment,
  Paid,
  Summarize,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    routes: [],
  },
  {
    text: "Managing",
    icon: null,
    routes: [],
  },
  {
    text: "Users",
    icon: <Group />,
    routes: [
      { path: "users", label: "All Users" },
      { path: "users/new", label: "New User" },
    ],
  },
  {
    text: "Artifacts",
    icon: <AccountBalance />,
    routes: [
      { path: "artifacts", label: "All Artifacts" },
      { path: "artifacts/new", label: "New Artifact" },
    ],
  },
  {
    text: "Tours",
    icon: <TravelExplore />,
    routes: [
      { path: "tours", label: "All Tours" },
      { path: "tours/new", label: "New Tour" },
    ],
  },
  {
    text: "Payments",
    icon: <Payment />,
    routes: [
      { path: "payments", label: "All Payments" },
      { path: "payments/new", label: "New Payment" },
    ],
  },
  {
    text: "Projects",
    icon: <Work />,
  },
  {
    text: "Imapct funds",
    icon: <Paid />,
    routes: [
      { path: "funds", label: "All Funds" },
      { path: "funds/new", label: "New Fund" },
    ],
  },
  {
    text: "Reports",
    icon: <Summarize />,
    routes: [
      { path: "reports", label: "All Reports" },
      { path: "reports/new", label: "New Report" },
    ],
  },
];



const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleClick = (text) => {
    setOpen((prevOpen) => ({ ...prevOpen, [text]: !prevOpen[text] }));
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 1rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    Astarte
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, routes }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "30px 0 5px 20px " }}>
                      {text}
                    </Typography>
                  );
                }

                return (
                  <Box key={text}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleClick(text)}
                        sx={{
                          backgroundColor:
                            active === text.toLowerCase()
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === text.toLowerCase()
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === text.toLowerCase()
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {open[text] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={open[text]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {routes.map(({ path, label }) => (
                          <ListItemButton
                            key={path}
                            sx={{ pl: 13 }}
                            onClick={() => {
                              navigate(`/${path}`);
                              setActive(path);
                            }}
                          >
                            <ListItemText primary={label} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </Box>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

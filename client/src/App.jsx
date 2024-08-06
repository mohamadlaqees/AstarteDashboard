import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useMode from "./hooks/useMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Artifacts from "./pages/Artifacts/Artifacts";
import Layout from "./Layout/Layout";
import UserProfile from "./pages/Users/UserProfile";
import User from "./pages/Users/User";

const App = () => {
  const { theme } = useMode();

  const routes = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "users",
          children: [
            {
              index: true,
              element: <Users />,
            },
            {
              path: ":userId",
              element: <User />, 
            },
          ],
        },

        {
          path: "artifacts",
          element: <Artifacts />,
        },

        {
          path: "tours",
          element: <Users />,
        },

        {
          path: "payments",
          element: <Users />,
        },

        {
          path: "funds",
          element: <Users />,
        },

        {
          path: "reports",
          element: <Users />,
        },
      ],
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export default App;

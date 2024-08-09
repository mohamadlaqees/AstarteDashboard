import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useMode from "./hooks/useMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Artifacts from "./pages/Artifacts/Artifacts";
import Layout from "./Layout/Layout";
import Projects from "./pages/Projects/Projects";
import Tours from "./pages/Tours/Tours";
import Payments from "./pages/Payments/Payments";
import ImpactFunds from "./pages/ImpactFunds/ImpactFunds";
import Reports from "./pages/Reports/Reports";

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
          element: <Users />,
        },

        {
          path: "artifacts",
          element: <Artifacts />,
        },

        {
          path: "tours",
          element: <Tours />,
        },

        {
          path: "payments",
          element: <Payments />,
        },

        {
          path: "projects",
          element: <Projects />,
        },

        {
          path: "funds",
          element: <ImpactFunds />,
        },

        {
          path: "reports",
          element: <Reports />,
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
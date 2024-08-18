import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useMode from "./hooks/useMode";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import User from "./pages/Users/User";
import Artifacts from "./pages/Artifacts/Artifacts";
import Layout from "./Layout/Layout";
import Projects from "./pages/Projects/Projects";
import Tours from "./pages/Tours/Tours";
import Payments from "./pages/Payments/Payments";
import ImpactFunds from "./pages/ImpactFunds/ImpactFunds";
import Reports from "./pages/Reports/Reports";
import AddArtificats from "./pages/Artifacts/AddArtificats";
import AddTour from "./pages/Tours/AddTour";
import AddPayment from "./pages/Payments/AddPayment";
import AddFund from "./pages/ImpactFunds/AddFund";
import AddReport from "./pages/Reports/AddReport";
import Tour from "./pages/Tours/Tour";
import Addproject from "./pages/Projects/Addproject";
import Project from "./pages/Projects/Project";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";
import FundInfo from "./pages/ImpactFunds/FundInfo";
import Fund from "./pages/ImpactFunds/Fund";
import TourInfo from "./pages/Tours/TourInfo";
import ProjectInfo from "./pages/Projects/ProjectInfo";

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
          children: [
            {
              index: true,
              element: <Artifacts />,
            },
            {
              path: "new",
              element: <AddArtificats />,
            },
          ],
        },

        {
          path: "tours",
          children: [
            {
              index: true,
              element: <Tours />,
            },
            {
              path: "tourInfo/:tourid",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TourInfo />
                </LocalizationProvider>
              ),
            },
            {
              path: ":tourid",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Tour />
                </LocalizationProvider>
              ),
            },
            {
              path: "new",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <AddTour />
                </LocalizationProvider>
              ),
            },
          ],
        },

        {
          path: "payments",
          children: [
            {
              index: true,
              element: <Payments />,
            },
            {
              path: "new",
              element: <AddPayment />,
            },
          ],
        },

        {
          path: "projects",
          children: [
            {
              index: true,
              element: <Projects />,
            },
            {
              path: "projectInfo/:projectid",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <ProjectInfo />
                </LocalizationProvider>
              ),
            },
            {
              path: ":projectid",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Project />
                </LocalizationProvider>
              ),
            },
            {
              path: "new",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Addproject />
                </LocalizationProvider>
              ),
            },
          ],
        },

        {
          path: "funds",
          children: [
            {
              index: true,
              element: <ImpactFunds />,
            },
            {
              path: "fundInfo/:fundid",
              element: <FundInfo />,
            },
            {
              path: ":fundid",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Fund />
                </LocalizationProvider>
              ),
            },
            {
              path: "new",
              element: (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <AddFund />
                </LocalizationProvider>
              ),
            },
          ],
        },

        {
          path: "reports",
          children: [
            {
              index: true,
              element: <Reports />,
            },
            {
              path: "new",
              element: <AddReport />,
            },
          ],
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

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "regenerator-runtime/runtime";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient";
import App from "./App.jsx";

//Pages imports
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import TestingPage from "./pages/TestingPage.jsx";
import TenYearDreamPage from "./pages/TenYearDreamPage.jsx";
import OneGoalPage from "./pages/OneGoal.jsx";
import AndNextPage from "./pages/AndNext.jsx";
import SummaryDreamsPage from "./pages/SummaryDreams.jsx";
import WelcomeBackPage from "./pages/WelcomeBack.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";
import ConfirmationPage from "./pages/Confirmation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      //Root page is login page
      {
        index: true,
        element: <PrivateRoute element={LoginPage} />
      },
      {
        path: "/login",
        element: <PrivateRoute element={LoginPage} />
      },
      {
        path: "/signup",
        element: <PrivateRoute element={SignupPage} />
      },
      //Setup pages. After signup > ten year dream > and next > one goal > summary dreams > (and the user should be directed to welcome back after signup complete) welcome back
      {
        path: "/ten-year-dream",
        element: <PrivateRoute element={TenYearDreamPage} />
      },
      {
        path: "/and-next",
        element: <PrivateRoute element={AndNextPage} />
      },
      {
        path: "/one-goal",
        element: <PrivateRoute element={OneGoalPage} />
      },
      {
        path: "/summary-dreams-page",
        element: <PrivateRoute element={SummaryDreamsPage} />
      },
      //Welcome back page and once its done > confirm page
      {
        path: "/welcome-back",
        element: <PrivateRoute element={WelcomeBackPage} />
      },
      {
        path: "/confirmation",
        element: <ConfirmationPage />
      },

      //misc routes
      {
        path: "/testing",
        element: <PrivateRoute element={TestingPage} />
      },
      {
        path: "/home",
        element: <HomePage />
      }
    ]
  }
]);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

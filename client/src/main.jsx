import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import TestingPage from "./pages/TestingPage.jsx";
import TenYearDreamPage from './pages/TenYearDreamPage.jsx';
import OneGoalPage from './pages/OneGoal.jsx';
import AndNextPage from './pages/AndNext.jsx';
import SummaryDreamsPage from './pages/SummaryDreams.jsx';
import WelcomeBackPage from './pages/WelcomeBack.jsx';
import PrivateRoute from './components/PrivateRouter.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "/home",
        element: <HomePage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: '/ten-year-dream',
        element: <PrivateRoute element={TenYearDreamPage} />
      },
      {
        path: "/testing",
        element: <PrivateRoute element={TestingPage} />
      },
      {
        path: "/and-next",
        element: <PrivateRoute element={AndNextPage} />
      },
      {
        path: "/summary-dreams-page",
        element: <PrivateRoute element={SummaryDreamsPage} />
      },
      {
        path: "/welcome-back",
        element: <PrivateRoute element={WelcomeBackPage} />
      },
      {
        path: "/one-goal",
        element: <PrivateRoute element={OneGoalPage} />
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
<<<<<<< Updated upstream
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
=======
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';

import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LoginPage />
      }, {
        path: '/home',
        element: <HomePage />
      }, {
        path: '/signup',
        element: <SignupPage />
      }
    ]
  }
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <RouterProvider router={router} />
);
>>>>>>> Stashed changes

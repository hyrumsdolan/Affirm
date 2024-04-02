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

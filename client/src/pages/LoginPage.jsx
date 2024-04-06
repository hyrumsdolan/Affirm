import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        console.log("User Form Data: ", userFormData);
        const { data } = await loginUser({
          variables: { ...userFormData }
        });
        console.log("look here FOR DATA");

        console.log("Login Page Data:", data);
        Auth.login(data.loginUser.token);

        setUserFormData({ email: "", password: "" });
        setShowAlert(false);
        // window.location.href = "/home";
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="relative flex w-full flex-col items-center justify-center md:w-3/5">
        <h1 className="my-4 text-center">let's improve together</h1>
        <h2 className="my-4 text-center">
          An app to help you dream BIG and stay on track to achieve your vision.
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-center border-t border-gray-200 p-8 md:w-2/5 md:border-l md:border-t-0">
        <form onSubmit={handleFormSubmit} className="w-full md:w-9/12">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block font-bold text-gray-700"
            >
              Email:
            </label>
            <InputBox
              type="email"
              id="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-gray-700"
            >
              Password:
            </label>
            <InputBox
              type="password"
              id="password"
              name="password"
              value={userFormData.password}
              onChange={handleInputChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            onClick={handleFormSubmit}
            className="w-full"
            // navigateTo="/ten-year-dream"
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </a>
        </p>
        {showAlert && (
          <div className="mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            Sign in failed
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

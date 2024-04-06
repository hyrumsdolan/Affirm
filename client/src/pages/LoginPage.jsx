import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Auth from "../utils/auth";
import { FiEyeOff, FiEye } from "react-icons/fi";

const MAX_LOGIN_ATTEMPTS = 5;

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    // Check if the account is locked
    if (isAccountLocked) {
      setShowAlert(true);
      setErrorMessage(
        "Your account is locked. Please try again later or contact support."
      );
      return;
    }

    // Check if the form fields are empty
    if (!userFormData.email || !userFormData.password) {
      setShowAlert(true);
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      console.log(userFormData);
      const { data } = await loginUser({
        variables: { ...userFormData }
      });
      console.log("look here FOR DATA");

      if (data.loginUser.token) {
        Auth.login(data.loginUser.token);
        setUserFormData({ email: "", password: "" });
        setShowAlert(false);
        setErrorMessage("");
        setLoginAttempts(0); // Reset login attempts on successful login
        navigate("/ten-year-dream");
      } else {
        setShowAlert(true);
        setErrorMessage("Invalid credentials. Please try again.");
        setLoginAttempts(prevAttempts => prevAttempts + 1);
      }
    } catch (err) {
      console.error(err);
      if (err.message.includes("User not found")) {
        setShowAlert(true);
        setErrorMessage("User not found. Please sign up.");
        setTimeout(() => {
          navigate("/signup");
        }, 3000);
      } else if (err.message.includes("Account locked")) {
        setShowAlert(true);
        setErrorMessage(
          "Your account is locked. Please try again later or contact support."
        );
        setIsAccountLocked(true);
      } else if (err.networkError) {
        setShowAlert(true);
        setErrorMessage(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setShowAlert(true);
        setErrorMessage("Invalid credentials. Please try again.");
        setLoginAttempts(prevAttempts => prevAttempts + 1);
      }
    }

    // Check if the maximum login attempts are reached
    if (loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS) {
      setShowAlert(true);
      setErrorMessage(
        "Maximum login attempts reached. Your account is locked. Please try again later or contact support."
      );
      setIsAccountLocked(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex h-full flex-col md:flex-row">
        <div className="relative flex w-full flex-col items-center justify-center md:w-3/5">
          <h2 className="mb-4 text-center text-3xl md:text-5xl">
            let's improve together
          </h2>
          <p className="text-center ">
            An application to help you dream big, and stay on course to live
            your best life.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center border-t border-gray-200 p-8 md:w-2/5 md:border-l md:border-t-0">
          <h2 className="mb-4 text-center text-3xl md:text-5xl">Login</h2>
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
              <div className="relative">
                <InputBox
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userFormData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform focus:outline-none"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              navigateTo="/ten-year-dream"
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
              Sign in failed. {errorMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;

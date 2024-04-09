import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import Auth from "../utils/auth";
import { FiEyeOff, FiEye } from "react-icons/fi";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState();

  const loading = false;
  const [addUser] = useMutation(ADD_USER);

  const [showPassword, setShowPassword] = useState(false);
  const [showPWConfirmation, setShowPWConfirmation] = useState(false);

  // password functions
  const pwCompare = (password1, password2) => {
    console.log(`pwCompare: ${password1 === password2}`);
    return password1 === password2;
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input Change function
  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    let var1 = "";
    let var2 = "";

    if (name === "password") {
      var1 = value;
      var2 = userFormData.confirmPassword;
      setShowPWConfirmation(pwCompare(var1, var2));
    } else if (name === "confirmPassword") {
      var2 = value;
      var1 = userFormData.password;
      setShowPWConfirmation(pwCompare(var1, var2));
    }
  };

  // Handle form submit function
  const handleFormSubmit = async event => {
    console.log("Sign up button clicked");
    setError("");
    event.preventDefault();
    console.log("Sign up button clicked");

    if (!isEmailValid(userFormData.email)) {
      console.log("Email not valid");
      setError(`Please enter a valid email address.`);
    } else {
      console.log(`showPassword ${showPWConfirmation}`);
      if (
        showPWConfirmation &&
        userFormData.password &&
        userFormData.confirmPassword
      ) {
        delete userFormData.confirmPassword;
        console.log(userFormData);

        const form = event.currentTarget;
        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
          try {
            // Exclude confirmPassword from form data
            const { data, token } = await addUser({
              variables: { ...userFormData }
            });
            console.log("look here FOR DATA");
            console.log("signup data", data);
            Auth.login(data.addUser.token);

            console.log("User successfully signed up!");
          } catch (err) {
            if (err.message.includes("dup key:")) {
              const errorKey = err.message
                .split("dup key: { ")[1]
                .split(":")[0];
              setError(
                `Sorry... But an account with this ${errorKey} already exists`
              );
            }
          }
        }
      } else {
        setError(`Password and confirmation password do not match!`);
      }
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1 className="mb-4 text-center text-4xl">Welcome!</h1>
          <p>
            <a href="/home">Go to home page</a>
          </p>
        </>
      ) : (
        <div className="flex h-full flex-col md:flex-row">
          <div className="relative flex w-full flex-col items-center justify-center md:w-3/5">
            <h2 className="mb-4 text-center text-3xl md:text-5xl">
              let's improve together
            </h2>
            <p className="text-center">
              An application to help you dream big, and stay on course to live
              your best life.
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center border-t border-gray-200 p-8 md:w-2/5 md:border-l md:border-t-0">
            <h2 className="mb-4 text-center text-3xl md:text-5xl">Signup</h2>
            <form onSubmit={handleFormSubmit} className="w-full md:w-9/12">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="mb-2 block font-bold text-gray-700"
                >
                  First Name:
                </label>
                <InputBox
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userFormData.firstName || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block font-bold text-gray-700"
                >
                  Confirm Password:
                </label>
                <div className="relative">
                  <InputBox
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userFormData.confirmPassword}
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
                <div
                  className={`mt-2 h-6 ${
                    userFormData.password || userFormData.confirmPassword
                      ? "opacity-100"
                      : "opacity-0"
                  } transition-opacity duration-300`}
                >
                  {showPWConfirmation ? (
                    <p className="text-sm text-green-600">Passwords match</p>
                  ) : (
                    <p className="text-sm text-red-600">
                      Passwords do not match
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Sign up!
              </Button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <a href="/" className="text-blue-500 hover:text-blue-700">
                Login here
              </a>
            </p>
            {error && <div className="mt-4 text-red-600">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default SignupForm;

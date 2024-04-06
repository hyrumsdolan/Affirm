import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

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

  //password functions
  const pwCompare = (password1, password2) => {
    console.log(`pwCompare: ${password1 === password2}`);
    return password1 === password2;
  };
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Handle input Change function
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

  //Handle form submit function
  const handleFormSubmit = async event => {
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

            Auth.login(data.addUser.token);

            console.log("User successfully signed up!");
            // window.location.href = "/home";
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
          <h1>Welcome!</h1>
          <p>
            <a href="/home">Go to home page</a>
          </p>
        </>
      ) : (
        <>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userFormData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userFormData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"} // Show text or password
                id="password"
                name="password"
                value={userFormData.password}
                onChange={handleInputChange}
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              <button type="button" onClick={toggleShowPassword}>
                Show Password
              </button>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"} // Show text or password
                id="confirmPassword"
                name="confirmPassword"
                value={userFormData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {showPWConfirmation ? (
                <p>Passwords match</p>
              ) : (
                <p>Passwords do not match</p>
              )}
            </div>
            {/* Password requirement info div! */}
            {/* <div>
              <p>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</p>
            </div> */}
            {/* End of password requirement div */}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Sign up!
            </button>
          </form>
          <p>
            Already have an account? <a href="/">Login here</a>
          </p>
          {error && <div>{error}</div>}
        </>
      )}
    </>
  );
};

export default SignupForm;

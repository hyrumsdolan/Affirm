import { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const loading = false;
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    setError("");
    event.preventDefault();

    console.log(userFormData);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        const { data, token } = await addUser({
          variables: { ...userFormData },
        });

        console.log(data, token);
        Auth.login(token);

        console.log("User successfully signed up!");
        window.location.href = "/home";
      } catch (err) {
        if (err.message.includes("dup key:")) {
          const errorKey = err.message.split("dup key: { ")[1].split(":")[0];
          setError(
            `Error signing up! An account with this ${errorKey} already exists`
          );
        }
      }
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1>Youre logged in boo!</h1>
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
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userFormData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
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
                type="password"
                id="password"
                name="password"
                value={userFormData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Sign Up
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

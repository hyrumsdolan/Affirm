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

  const [showAlert, setShowAlert] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(userFormData);
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });

        console.log("look here FOR DATA");
        console.log(data);
        Auth.login(data.addUser.token);
        window.location.assign("/home");
      } catch (err) {
        console.log("look here FOR ERROR");
        console.error(err);
        setShowAlert(true);
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
            <div >
              <label htmlFor="firstName" >
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userFormData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div >
              <label htmlFor="lastName" >
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userFormData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div >
              <label htmlFor="email" >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userFormData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div >
              <label htmlFor="password" >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userFormData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <a href="/">Login here</a>
          </p>
          {showAlert && <div>Sign up failed</div>}
        </>
      )}
    </>
  );
};

export default SignupForm;

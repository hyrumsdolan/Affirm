
import { useState } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  const [showAlert, setShowAlert] = useState(false);

  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      try {
        console.log(userFormData);
        const { data } = await loginUser({
          variables: { ...userFormData },
        });
        console.log("look here FOR DATA");
    
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <a href="/signup">
          Sign up
        </a>
      </p>
      {showAlert && <div>Sign in failed</div>}
      </>
      )}
    </>
  );
};

export default LoginForm;

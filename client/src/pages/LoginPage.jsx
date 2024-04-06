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
              <div className="h-full flex flex-col md:flex-row">
          <div className="w-full md:w-3/5 flex flex-col items-center justify-center relative">
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">let's improve together</h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              vitae elit libero, a pharetra augue.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 p-8">
            <form onSubmit={handleFormSubmit} className="w-full md:w-9/12">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email:
                </label>
                <InputBox
                  type="email"
                  id="email"
                  name="email"
                  value={userFormData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password:
                </label>
                <InputBox
                  type="password"
                  id="password"
                  name="password"
                  value={userFormData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" 
              className="w-full"
              navigateTo="/ten-year-dream">
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
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Sign in failed
              </div>
            )}
          </div>
        </div>
      
    </>
  );
}

export default LoginForm;

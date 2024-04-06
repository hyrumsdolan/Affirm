import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const HomePage = () => {

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }
  
  
  const { data } = useQuery(GET_ME, {  
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
  }});

 

  return (
    <>
      <div className="flex h-screen w-screen flex-col justify-center bg-slate-200 text-center align-middle text-black transition-all duration-200 dark:bg-zinc-900 dark:text-white">
        <div>
          <h1>Home Page</h1>
          <button onClick={Auth.logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;

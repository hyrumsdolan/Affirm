import Auth from "../utils/auth";

const HomePage = () => {
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

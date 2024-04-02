
import Auth from '../utils/auth';

const HomePage = () => {



return (
    <>
        <h1>Home Page</h1>
        <button onClick={Auth.logout}>Logout</button>
    </>
);
};

export default HomePage;

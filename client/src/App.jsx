import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AuthService from "./utils/auth";
import "./css/tailwind.css";
import { addDarkMode } from "./utils/toggleDarkMode";
import SettingsDropdown from "./components/settingsDropdown";
import Logo from "./components/Logo";
import { Outlet } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// addDarkMode();

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col max-h-screen h-screen">
        <div className="flex-none px-8 py-4">
          <Logo />
          <SettingsDropdown />
        </div>
        <div className="flex-1 ">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
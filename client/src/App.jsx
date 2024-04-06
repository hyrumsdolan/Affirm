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
      <div className="flex flex-col h-screen w-screen">
        <div className="flex-none">
          <Logo />
          <SettingsDropdown />
        </div>
        <div className="flex flex-col h-full w-screen">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
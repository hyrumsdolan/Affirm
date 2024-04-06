import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CALL_CLAUDE } from "./mutations";
import client from "./apolloClient";

export const sendToClaude = async (input, targetStorage = 0) => {
  try {
    console.log("Sending to Claude:", input);

    const { data } = await client.mutate({
      mutation: CALL_CLAUDE,
      variables: { input }
    });

    const result = data.callClaude;

    localStorage.setItem("claudeResponse", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getClaudeResponse = (startIndex = 0, endIndex = undefined) => {
  const storedResponse = localStorage.getItem("claudeResponse");
  if (storedResponse) {
    const dreamsList = storedResponse.split(" | ");
    return dreamsList.slice(startIndex, endIndex);
  }
  return [];
};

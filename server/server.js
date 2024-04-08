const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    }),
  );

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      checkENV();
    });
  });
};

startApolloServer();

function checkENV() {
  if (
    !process.env.AUTH_SECRET ||
    !process.env.MONGODB_URI ||
    !process.env.ANTHROPIC_API_KEY ||
    !process.env.SPEECHMATICS_API_KEY ||
    process.env.AUTH_SECRET.length < 5 ||
    process.env.MONGODB_URI.length < 5 ||
    process.env.ANTHROPIC_API_KEY.length < 5 ||
    process.env.SPEECHMATICS_API_KEY.length < 5
  ) {
    const missingVariable = !process.env.AUTH_SECRET
      ? "AUTH_SECRET"
      : !process.env.MONGODB_URI
        ? "MONGODB_URI"
        : !process.env.ANTHROPIC_API_KEY
          ? "ANTHROPIC_API_KEY"
          : "SPEECHMATICS_API_KEY";
    console.error(
      "\x1b[31m%s\x1b[0m",
      "❌ ERROR: Missing or invalid environment variable - " + missingVariable,
    );
  }
}

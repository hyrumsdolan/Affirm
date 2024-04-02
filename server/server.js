//We need to decide whether we want to run this server instance via node or via vite, both are possible,
//with vite it may be simpler in a sense to get the server up and running at the same time as the client,
//but with node it is just simpler to run the server, npm run dev works to run server through vite, npm start
//runs via node, we can package this into the client vite.config.js and run the server from there, some
//rollup options to have both client and server be packaged into seperate builds (if wanted, idk why we
//would though because we just push the full build folder to whatever publishing site we use), but we need to
//decide on whether to run this through node with the caviat being that we then have to setup rollup / webpack
//and get the client and server packaged correctly to run at the same time with one npm start command (pretty easy),
//or we run through vite and let vite deal with that, but then we have to figure out how to run the server and get
//vite dev to run

// import cors from 'cors';
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.use('/graphql', expressMiddleware(server, {context: authMiddleware}));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
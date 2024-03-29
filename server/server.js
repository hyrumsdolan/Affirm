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

import express from "express";
import cors from "cors";

export const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/hello", (req, res) => {
  res.json({ test: "Hello, World!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

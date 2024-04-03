const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.AUTH_SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    const publicOperations = ['loginUser', 'addUser'];

    if (publicOperations.includes(req.body.operationName)) {
      // Allow login and signup operations without authentication
      return req;
    }

    let token = req.headers.authorization;

    if (token) {
      token = token.split(' ')[1];
    }

    if (!token) {
      throw new AuthenticationError("Token not provided!");
    }

    try {

      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (error) {
      console.log("Token verification error:", error.message);
      throw new AuthenticationError("Invalid token!");
    }

    return req;
  },

  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    console.log("payload: ", payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
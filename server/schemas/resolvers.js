const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const claudeAPICall = require('../utils/claudeAPI');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('entries');
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user data.');
    },
    entries: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('entries');
        return user.entries;
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user entries.');
    },
    entry: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('entries');
        return user.entries.find(entry => entry._id.toString() === _id);
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user entry.');
    },
  },

  Mutation: {
    loginUser: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Can\'t login User not found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Can\'t login, Incorrect Password!');
      }
      console.log(user)
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { firstName, email, password }) => {
      const user = await User.create({ firstName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    setPageProgress: async (parent, { pageProgress }, context) => {

    },
    createEntry: async (parent, { title, content }, context) => {
      if (context.user) {
        const entry = await Entry.create({
          title,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { entries: entry._id } },
          { new: true }
        );
        return entry;
      }
      throw new AuthenticationError('User Not Logged in, unable to create entry');
    },
    updateEntry: async (parent, { _id, title, content }, context) => {
      if (context.user) {
        const entry = await Entry.findOneAndUpdate(
          { _id },
          { title, content, updatedAt: new Date().toISOString() },
          { new: true }
        );
        return entry;
      }
      throw new AuthenticationError('User Not Logged in, unable to update entry');
    },
    deleteEntry: async (parent, { _id }, context) => {
      if (context.user) {
        const entry = await Entry.findOneAndDelete({ _id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { entries: _id } }
        );
        return entry;
      }
      throw new AuthenticationError('User Not Logged in, unable to delete entry');
    },
    callClaude: async (parent, { input }, context) => {
      if (context.user) {
        const response = await claudeAPICall(input);
        return response;
      }
      throw new AuthenticationError('User unable to authenticate, unable to call Claude.');
    },
  },
};

module.exports = resolvers;
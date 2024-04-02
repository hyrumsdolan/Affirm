const { User, Entry } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('entries');
      }
      throw new AuthenticationError('Authentication required');
    },
    entries: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('entries');
        return user.entries;
      }
      throw new AuthenticationError('Authentication required');
    },
    entry: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('entries');
        return user.entries.find(entry => entry._id.toString() === _id);
      }
      throw new AuthenticationError('Authentication required');
    },
  },

  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Authentication required');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Authentication required');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { firstName, email, password }) => {
      const user = await User.create({ firstName, email, password });
      const token = signToken(user);
      return { token, user };
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
      throw new AuthenticationError('Authentication required');
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
      throw new AuthenticationError('Authentication required');
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
      throw new AuthenticationError('Authentication required');
    },
  },
};

module.exports = resolvers;
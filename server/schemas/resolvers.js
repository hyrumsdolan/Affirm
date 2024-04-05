const { User, Entry, Dream, LittleDreams } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const claudeAPICall = require('../utils/claudeAPI');


const resolvers = {
  Query: {
    //USER QUERIES ---------------------------------------------
    me: async (parent, args, context) => {
      console.log(context)
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user data.');
    },
    myDream: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('dream');
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user dream.');
    },

    //ENTRY QUERIES ---------------------------------------------
    entries: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate('entries');
        return user.entries;
      }
      throw new AuthenticationError('No Authenticated User Found, unable to get user entries.');
    },
    // entry: async (parent, { _id }, context) => {
    //   if (context.user) {
    //     const user = await User.findOne({ _id: context.user._id }).populate('entries');
    //     return user.entries.find(entry => entry._id.toString() === _id);
    //   }
    //   throw new AuthenticationError('No Authenticated User Found, unable to get user entry.');
    // },
  },

  Mutation: {
    //USER MUTATIONS ---------------------------------------------
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
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { pageProgress },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('User Not Logged in, unable to update page progress');
    },

    //ENTRY MUTATIONS ---------------------------------------------
    createEntry: async (parent, { gratefulFor, dailyAffirmations, ultimateAffirmation }, context) => {
      if (context.user) {
        const entry = await Entry.create({
          gratefulFor,
          dailyAffirmations,
          ultimateAffirmation,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        return entry;
      }
      throw new AuthenticationError('User Not Logged in, unable to create entry');
    },
    updateEntry: async (parent, { _id, gratefulFor, dailyAffirmations, ultimateAffirmation }, context) => {
      if (context.user) {
        const updatedEntry = await Entry.findOneAndUpdate(
          { _id },
          {
            gratefulFor,
            dailyAffirmations,
            ultimateAffirmation,
            updatedAt: new Date(),
          },
          { new: true }
        );

        return updatedEntry;
      }
      throw new AuthenticationError('User Not Logged in, unable to update entry');
    },
    deleteEntry: async (_, { _id }) => {
      const deletedEntry = await Entry.findByIdAndDelete(_id);
      return deletedEntry;
    },

    //DREAM MUTATIONS ---------------------------------------------
    updateDream: async (parent, { _id, bigDream, littleDreams, ultimateGoal }, context) => {
      if (context.user) {
        const dream = await Dream.findOneAndUpdate(
          { _id },
          { bigDream, littleDreams, ultimateGoal },
          { new: true }
        );
        return dream;
      }
      throw new AuthenticationError('User Not Logged in, unable to update dream');
    },

    //CLAUDE MUTATIONS ---------------------------------------------
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
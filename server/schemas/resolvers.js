const { User, Entry, Dream, LittleDreams } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const claudeAPICall = require("../utils/claudeAPI");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate({
            path: "dream",
            populate: {
              path: "littleDreams",
              model: "LittleDreams",
            },
          })
          .populate("entries");

        return user;
      }

      console.log("No Authenticated User Found, unable to get user data.");
    },
    entries: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "entries",
        );
        return user.entries;
      }
      throw new AuthenticationError(
        "No Authenticated User Found, unable to get user entries.",
      );
    },
    entry: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "entries",
        );
        return user.entries.find((entry) => entry._id.toString() === _id);
      }
      throw new AuthenticationError(
        "No Authenticated User Found, unable to get user entry.",
      );
    },
  },

  Mutation: {
    loginUser: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't login User not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Can't login, Incorrect Password!");
      }
      console.log(user);
      const token = signToken(user);
      console.log("loginUser token", token);
      return { token, user };
    },
    addUser: async (parent, { firstName, email, password }) => {
      const user = await User.create({ firstName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    updateEntry: async (parent, { _id, title, content }, context) => {
      if (context.user) {
        const entry = await Entry.findOneAndUpdate(
          { _id },
          { title, content, updatedAt: new Date().toISOString() },
          { new: true },
        );
        return entry;
      }
      throw new AuthenticationError(
        "User Not Logged in, unable to update entry",
      );
    },
    deleteEntry: async (parent, { _id }, context) => {
      if (context.user) {
        const entry = await Entry.findOneAndDelete({ _id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { entries: _id } },
        );
        return entry;
      }
      throw new AuthenticationError(
        "User Not Logged in, unable to delete entry",
      );
    },
    callClaude: async (parent, { input }, context) => {
      if (context.user) {
        const response = await claudeAPICall(input);
        return response;
      }
      throw new AuthenticationError(
        "User unable to authenticate, unable to call Claude.",
      );
    },
    addBigDream: async (parent, { bigDream }, context) => {
      if (context.user) {
        try {
          // Find the user by ID (assuming you have the user ID in the context)
          const user = await User.findById(context.user._id).populate("dream");

          if (user.dream) {
            // If the user already has a dream associated, update only the bigDream field
            user.dream.bigDream = bigDream;
            await user.dream.save();
            return user.dream;
          } else {
            // If the user doesn't have a dream associated, create a new Dream document
            const newDream = new Dream({
              bigDream: bigDream,
            });

            // Save the new dream to the database
            await newDream.save();

            // Associate the new dream with the user
            user.dream = newDream._id;

            // Save the updated user
            await user.save();

            return newDream;
          }
        } catch (error) {
          console.error(
            "Error updating or adding Big Dream to the user:",
            error,
          );
          throw new Error("Unable to update or add big dream");
        }
      }

      throw new AuthenticationError(
        "User not logged in, unable to update or add big dream",
      );
    },

    addLittleDreams: async (parent, { littleDreams }, context) => {
      if (context.user) {
        try {
          // Find the user by ID (assuming you have the user ID in the context)
          const user = await User.findById(context.user._id).populate("dream");

          if (user.dream) {
            // Create an array to store the newly created LittleDream documents
            const newLittleDreams = [];

            // Iterate over the littleDreams input array
            for (const littleDream of littleDreams) {
              // Create a new LittleDream document for each littleDream
              const newLittleDream = new LittleDreams({
                littleDream: littleDream,
              });

              // Save the new little dream to the database
              await newLittleDream.save();

              // Add the new little dream to the newLittleDreams array
              newLittleDreams.push(newLittleDream);

              // Add the new little dream to the user's dream's littleDreams array
              user.dream.littleDreams.push(newLittleDream._id);
            }

            // Save the updated dream
            await user.dream.save();

            return newLittleDreams;
          } else {
            throw new Error("User does not have a dream associated");
          }
        } catch (error) {
          console.error("Error adding Little Dreams to the user:", error);
          throw new Error("Unable to add little dreams");
        }
      }
      throw new AuthenticationError(
        "User not logged in, unable to add little dreams",
      );
    },

    addUltimateGoal: async (parent, { ultimateGoal }, context) => {
      if (context.user) {
        try {
          // Find the user by ID (assuming you have the user ID in the context)
          const user = await User.findById(context.user._id).populate("dream");

          if (user.dream) {
            // If the user has a dream associated, update the ultimateGoal field
            user.dream.ultimateGoal = ultimateGoal;

            // Save the updated dream
            await user.dream.save();

            return user.dream;
          } else {
            throw new Error("User does not have a dream associated");
          }
        } catch (error) {
          console.error("Error updating Ultimate Goal for the user:", error);
          throw new Error("Unable to update ultimate goal");
        }
      }
      throw new AuthenticationError(
        "User not logged in, unable to update ultimate goal",
      );
    },
    createEntry: async (
      parent,
      { gratefulFor, dailyAffirmations, ultimateAffirmation },
      context,
    ) => {
      if (context.user) {
        try {
          // Validate input
          if (
            !gratefulFor ||
            !Array.isArray(gratefulFor) ||
            gratefulFor.length === 0
          ) {
            throw new Error("Gratitudes must be a non-empty array");
          }
          if (
            !dailyAffirmations ||
            !Array.isArray(dailyAffirmations) ||
            dailyAffirmations.length === 0
          ) {
            throw new Error("Daily affirmations must be a non-empty array");
          }
          if (!ultimateAffirmation || typeof ultimateAffirmation !== "string") {
            throw new Error("Ultimate affirmation must be a non-empty string");
          }

          // Create the entry
          const entry = await Entry.create({
            gratefulFor,
            dailyAffirmations,
            ultimateAffirmation,
            createdAt: new Date(),
          });

          // Associate the entry with the user
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { entries: entry._id } },
            { new: true },
          );

          return entry;
        } catch (error) {
          console.error("Error creating entry:", error);
          throw new Error("Failed to create entry");
        }
      }
      throw new AuthenticationError(
        "User not logged in, unable to create entry",
      );
    },
  },
};

module.exports = resolvers;

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    pageProgress: {
      type: Number,
      default: 0,
    },
    dream: {
      type: Schema.Types.ObjectId,
      ref: "Dream",
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entry",
      },
    ],
    theme: {
      type: String,
      // required: true, // Made not required, because I don't know what it is
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("entryCount").get(function () {
  return this.entries.length;
});

const User = model("User", userSchema);

module.exports = User;

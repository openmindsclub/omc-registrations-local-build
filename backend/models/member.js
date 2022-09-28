const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const memberSchema = mongoose.Schema(
  {
    isAccepted: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      required: "First name is required",
      match: [
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Please fill a valid first name",
      ],
      trim: true,
    },
    lastname: {
      type: String,
      required: "Last name is required",
      match: [
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Please fill a valid last name",
      ],
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email"],
    },
    phonenumber: {
      type: String,
      required: "Phone number is required",
      unique: true,
      match: [
        /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
        "Please fill a valid phone number",
      ],
    },
    studentID: {
      type: String,
      required: "Student ID is required",
      unique: true,
    },
    level: {
      type: String,
      required: "Level is required",
      match: [/L1|L2|L3|M1|M2|D/, "Please fill a valid level"],
    },
    faculty: {
      type: String,
      trim: true,
    },
    field: {
      type: String,
      required: "Field name is required",
      trim: true,
    },
    motivation: {
      type: String,
      required: "Motivation is required",
      trim: true,
    },
    team: [
      {
        type: String,
        required: "Team choice is required",
      },
    ],
    experience: {
      type: String,
      required: "Experience is required",
      match: [
        /Beginner|Intermediate|Expert|/,
        "Please fill a valid experience",
      ],
    },
    portfolio: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    socials: {
      type: String,
      trim: true,
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

memberSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Member", memberSchema);

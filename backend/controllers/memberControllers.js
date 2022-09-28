const Member = require("../models/member");
const converter = require("json-2-csv");
const fs = require("fs");
const path = require("path"); // <-- import path module to use absolute path.
const absPath = path.join(__dirname, "members.json");
var data = fs.readFileSync(absPath);
var object = JSON.parse(data);

module.exports = {
  // Find member by ID
  async getMember(req, res, next) {
    let member;
    try {
      member = await Member.findById(req.params.memberID);
      if (member == null) {
        return res.status(404).json({ error: "Member could not be found." });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }

    res.member = member;
    next();
  },

  // Getting all members
  async index(req, res, next) {
    try {
      Member.find()
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          return res.status(200).json({ docs });
        });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Getting a member by ID
  async getMemberByID(req, res, next) {
    res.send(res.member);
    next();
  },

  // Creating a member
  async createMember(req, res, next) {
    try {
      let {
        firstname,
        lastname,
        email,
        phonenumber,
        studentID,
        level,
        faculty,
        field,
        motivation,
        experience,
        portfolio,
        github,
        socials,
        feedback,
        team,
      } = req.body;

      // check if all mandatory fields are filled
      if (
        !firstname ||
        !lastname ||
        !email ||
        !phonenumber ||
        !studentID ||
        !level ||
        !field ||
        !motivation ||
        !experience ||
        !socials
      ) {
        return res
          .status(400)
          .json({ error: "You must fill all mandatory fields..." });
      }

      // check if phonenumber is valid
      if (!phonenumber.match(/^(00213|\+213|0)(5|6|7)[0-9]{8}$/)) {
        return res
          .status(400)
          .json({ error: "The phonenumber you entered is invalid..." });
      }

      if (team.includes("IT") && !github) {
        // check github for team IT
        return res
          .status(400)
          .json({ error: "Github and/or Gitlab are required for team IT..." });
      }

      // create member
      const member = {
        date: new Date(),
        email,
        firstname,
        lastname,
        phonenumber,
        studentID,
        level,
        field,
        motivation,
        team,
        socials,
        experience,
        ...(faculty && { faculty }),
        ...(portfolio && { portfolio }),
        ...(github && { github }),
        ...(feedback && { feedback }),
      };

      // save member to json file
      object.push(member);
      var newData = JSON.stringify(object);
      fs.writeFile(absPath, newData, (err) => {
        // error checking
        if (err) throw err;

        console.log("New data added");
      });

      res.status(200).json({ message: "Member added." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Updating a member
  async updateMember(req, res, next) {
    if (req.body.email != null) {
      res.member.email = req.body.email;
    }
    if (req.body.firstname != null) {
      res.member.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
      res.member.lastname = req.body.lastname;
    }
    if (req.body.phonenumber != null) {
      res.member.phonenumber = req.body.phonenumber;
    }
    if (req.body.studentID != null) {
      res.member.studentID = req.body.studentID;
    }
    if (req.body.level != null) {
      res.member.level = req.body.level;
    }
    if (req.body.faculty != null) {
      res.member.faculty = req.body.faculty;
    }
    if (req.body.field != null) {
      res.member.field = req.body.field;
    }
    if (req.body.motivation != null) {
      res.member.motivation = req.body.motivation;
    }
    if (req.body.team != null) {
      res.member.team = req.body.team;
    }
    if (req.body.experience != null) {
      res.member.experience = req.body.experience;
    }

    if (req.body.portfolio != null) {
      res.member.portfolio = req.body.portfolio;
    }

    if (req.body.github != null) {
      res.member.github = req.body.github;
    }

    if (req.body.socials != null) {
      res.member.socials = req.body.socials;
    }

    if (req.body.feedback != null) {
      res.member.feedback = req.body.feedback;
    }
    if (req.body.isAccepted != null) {
      res.member.isAccepted = req.body.isAccepted;
    }
    try {
      const updatedMember = await res.member.save();
      res.status(200).json({ member: updatedMember });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Deleting a member
  async deleteMember(req, res, next) {
    try {
      // delete member
      await res.member.remove();

      res.status(200).json({ message: "Member deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Searching for member
  async searchMember(req, res, next) {
    try {
      /* {isAccepted, email,fullname,phonenumber,studentID,level,faculty,team} */
      let filters = req.body;
      let queryObj = {
        ...(filters.firstname && {
          firstname: { $regex: filters.firstname, $options: "$i" },
        }),
        ...(filters.lastname && {
          lastname: { $regex: filters.lastname, $options: "$i" },
        }),
        ...(filters.email && {
          email: { $regex: filters.email, $options: "$i" },
        }),
        ...(filters.studentID && {
          studentID: { $regex: filters.studentID, $options: "$i" },
        }),
        ...(filters.phonenumber && {
          phonenumber: { $regex: filters.phonenumber, $options: "$i" },
        }),
        ...(filters.level && { level: filters.level }),
        ...(filters.team && { team: filters.team }),
        ...(filters.isAccepted && { isAccepted: filters.isAccepted }),
      };

      Member.find(queryObj)
        .sort({ createdAt: -1 })
        .exec((err, docs) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          return res.status(200).json({ docs });
        });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Accept multiple members
  async acceptMembers(req, res, next) {
    try {
      // req.body.members has id of all members that should be accepted
      let { members } = req.body;
      let i,
        length = members.length,
        unhandled = [];
      // update status
      for (i = 0; i < length; i++) {
        await Member.findById({ _id: members[i] })
          .then((member) => {
            if (member) {
              member.isAccepted = true;
              member.save();
            } else unhandled = members[i];
          })
          .catch((err) => {
            unhandled = members[i];
          });
      }

      res.status(200).json({ message: "Members accepted.", unhandled });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Reject multiple members
  async rejectMembers(req, res, next) {
    try {
      // req.body.members has id of all members that should be accepted
      let { members } = req.body;
      let i,
        length = members.length,
        unhandled = [];
      // update status
      for (i = 0; i < length; i++) {
        await Member.findById({ _id: members[i] })
          .then((member) => {
            if (member) {
              member.isAccepted = false;
              member.save();
            } else unhandled = members[i];
          })
          .catch((err) => {
            unhandled = members[i];
          });
      }

      res.status(200).json({ message: "Members rejected.", unhandled });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },

  // Download all accepted members
  async downloadAccepted(req, res, next) {
    try {
      // get all accepted members
      let members = await Member.find({ isAccepted: true });
      // convert from json to csv format
      const csvString = await converter.json2csvAsync(members, {
        emptyFieldValue: "N/A",
        excelBOM: true,
        excludeKeys: ["_id", "isAccepted"],
        keys: [
          "createdAt",
          "firstname",
          "lastname",
          "email",
          "phonenumber",
          "studentID",
          "level",
          "faculty",
          "field",
          "team",
          "motivation",
          "experience",
          "github",
          "portfolio",
          "socials",
          "feedback",
        ],
      });
      // download file
      res.setHeader("Content-disposition", "attachment; filename=members.csv");
      res.set("Content-Type", "text/csv");
      res.status(200).send(csvString);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }

    next();
  },
};

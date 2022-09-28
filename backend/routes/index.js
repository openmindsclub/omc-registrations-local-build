const membersRouter = require("./members.js");

module.exports = (app) => {
  app.use("/members", membersRouter);
};

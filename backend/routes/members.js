const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberControllers");
// Getting all members
router.get(
  "/index/:page?",
  memberController.index
);

// Getting one member by id
router.get(
  "/getByID/:memberID",
  memberController.getMember,
  memberController.getMemberByID
);

// Creating a member
router.post("/", memberController.createMember);

// Updating a member
router.patch(
  "/:memberID",
  memberController.getMember,
  memberController.updateMember
);

// Deleting a member
router.delete(
  "/:memberID",
  memberController.getMember,
  memberController.deleteMember
);

// Getting one member by id
router.post(
  "/search/:page?",
  memberController.searchMember
);

// Accepting multiple members
router.post(
  "/accept",
  memberController.acceptMembers
);

// Rejecting multiple members
router.post(
  "/reject",
  memberController.rejectMembers
);

// Downloading all accepted members
router.get(
  "/downloadAccepted",
  memberController.downloadAccepted
);

module.exports = router;

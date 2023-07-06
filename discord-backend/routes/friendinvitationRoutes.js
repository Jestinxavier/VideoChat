const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validater = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationController = require("../controllers/friendInvitation/friendinvitationController");
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});
const invitationDecisionSchema = Joi.object({
  id: Joi.string().required(),
});
router.post(
  "/invite",
  auth,
  validater.body(postFriendInvitationSchema),
  friendInvitationController.controllers.postInvite
);
router.post(
  "/accept",
  auth,
  validater.body(invitationDecisionSchema),
  friendInvitationController.controllers.postAccept
),

router.post(
  "/reject",
  auth,
  validater.body(invitationDecisionSchema),
  friendInvitationController.controllers.postReject
),

  (module.exports = router);

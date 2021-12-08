const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const members = require("../../Members");

router.get("/", (req, res) => res.json(members));

router.get("/:id", (req, res) => {
  const urlParamsId = parseInt(req.params.id);
  const found = members.some((member) => member.id === urlParamsId);

  if (found) {
    res.json(members.filter((member) => member.id === urlParamsId));
  } else {
    res.status(400).json({ msg: `Member ${urlParamsId} not found` });
  }
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }

  members.push(newMember);

  res.json(members);
});

module.exports = router;

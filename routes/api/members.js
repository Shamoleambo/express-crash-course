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

router.put("/:id", (req, res) => {
  const paramsUrlId = parseInt(req.params.id);
  const found = members.some((member) => member.id === paramsUrlId);

  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === paramsUrlId) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with ${paramsUrlId} id` });
  }
});

router.delete("/:id", (req, res) => {
  const paramsUrlId = parseInt(req.params.id);
  const found = members.some((member) => member.id === paramsUrlId);

  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter((member) => member.id !== paramsUrlId),
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${id}` });
  }
});

module.exports = router;

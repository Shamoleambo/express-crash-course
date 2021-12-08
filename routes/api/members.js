const express = require("express");
const router = express.Router();

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

module.exports = router;

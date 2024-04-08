const express = require("express");
const router = express.Router();

router.get("/Login", function (request, response) {
  response.render("Login");
});
module.exports = router;

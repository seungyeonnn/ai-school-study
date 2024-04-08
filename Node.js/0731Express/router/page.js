// views 안에 있는 html 파일끼리 페이지 이동이 되게끔 설정해주는 역할

const express = require("express");
const router = express.Router();

// http://localhost:3000/page
router.get("/", function (request, response) {
  response.render("Main");
});
// http://localhost:3000/page/Login
router.get("/Login", function (request, response) {
  response.render("Login");
});

router.get("/join", function (request, response) {
  response.render("join");
});

router.get("/SelectOne", function (request, response) {
  let arr = [request.session.info];

  response.render("SelectOne", { rows: arr });
});

module.exports = router;

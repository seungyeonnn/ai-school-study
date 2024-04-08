const express = require("express");
const router = express.Router();

router.get("/setSession", function (request, response) {
  // 세션 생성하기
  request.session.nickName = "apple";
  request.session.age = 20;

  response.send("세션 만들기");
});

router.get("/getSession", function (request, response) {
  // 세션에 있는 값 가져오기
  let cookieData = response.cookie;
  console.log(cookieData);

  let nick = request.session.nickName;
  console.log(nick);
});

router.get("/deleteSession", function (request, response) {
  // 세션 값 지우기
  // delete request.session.키캆 -> 해당 세션만 삭제

  request.session.destroy(); // -> 전체 삭제
  response.send("세션 제거");
});

module.exports = router;

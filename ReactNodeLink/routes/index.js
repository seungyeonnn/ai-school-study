/*
    페이지 이동을 다뤄주는 라우터 모음
    - 메인 페이지 이동
      작성자: o o o (23-09-18) 오전 10:15
*/
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/link", (req, res) => {
  console.log("main router");
  res.sendFile(
    path.join(__dirname, "..", "react-project", "build", "index.html")
  );
});

module.exports = router;

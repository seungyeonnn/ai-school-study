/* user와 관련된 router들 모음
  - 기능: 회원가입, 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색
  - 작성자: o o o (23.09.19.)
*/

const express = require("express");
const router = express.Router();
const conn = require("../config/database");

// 회원가입 시 id 중복체크하기
router.post("/checkId", (req, res) => {
  console.log("check Id Router", req.body);
  let { id } = req.body;
  let sql = "select id from project_member where id = ?";

  conn.query(sql, [id], (err, rows) => {
    console.log("rows", rows);
    console.log("err", err);

    if (rows.length > 0) {
      // 중복값이 있다면?
      res.json({ result: "dup" });
    } else {
      // 중복값이 없다면?
      res.json({ result: "uniq" });
    }
  });
});

// 회원가입 라우터
router.post("/join", (req, res) => {
  console.log("join Router", req.body);
  let { id, pw, name, email } = req.body.userData;
  console.log(id, pw, name, email);
  let sql = "INSERT INTO PROJECT_MEMBER VALUES (?, ?, ?, ?)";

  conn.query(sql, [id, pw, name, email], (err, rows) => {
    console.log("rows", rows);
    console.log("err", err);

    if (rows) {
      // err is null?
      res.json({ msg: "sucess" });
    } else {
      // err is not null?
      res.json({ msg: "failed" });
    }
  });
});

// login router
router.post("/login", (req, res) => {
  console.log("login router");
  let { id, name, email } = req.body.userData;
  console.log(res);
});

module.exports = router;

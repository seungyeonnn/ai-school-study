const express = require("express");
const router = express.Router();
const conn = require("../config/database");

// 회원가입 시, ID 중복체크
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
  const { id, pw, name, email } = req.body.userData;
  console.log("이름", name);

  let sql = "insert into project_member values(?,?,?,?)";
  conn.query(sql, [id, pw, name, email], (err, rows) => {
    console.log("rows", rows);
    if (rows) {
      res.json({ msg: "success" });
    } else {
      res.json({ msg: "failed" });
    }
  });
});

// 로그인 라우터
router.post("/login", (req, res) => {
  console.log("login router", req.body);
  let { id, pw } = req.body;
  // let {id, pw} = req.body.userData; // 객체로 보낸 사람들

  let sql = `select id, user_name, email from project_member
                where id=? and pw=?`;

  conn.query(sql, [id, pw], (err, rows) => {
    console.log("rows", rows);

    if (rows.length > 0) {
      // 로그인 성공
      res.json({
        msg: "success",
        user: rows[0],
      });
    } else {
      // 로그인 실패
      res.json({ msg: "failed" });
    }
  });
});

// 로그아웃 라우터
// session을 server에 저장한 경우에는 해당 라우터로 와야함 (기존)
// session을 front에 저장한 경우에는 로그아웃을 react에서 설정 가능
router.get("/logout");

// 비밀번호 수정 라우터
router.post("/checkPw", (req, res) => {
  let { id, currentPw, changePw } = req.body;
  console.log("받아온 데이터", id, currentPw, changePw);

  // 1) 사용자가 비밀번호 입력을 틀리게 한 경우 : "비밀번호를 다시 입력해주세요."
  // 2) 서버 측 문제가 있는 경우 : "죄송합니다. 다시 시도해주세요."
  // 3) 1,2 모두 문제X => 정상 수정 : 변경 완료 로직

  // 1)
  let sql1 = "select id from project_member where id=? and pw=?";
  conn.query(sql1, [id, currentPw], (err, rows) => {
    console.log("1번 쿼리문 결과", rows);
    if (rows.length > 0) {
      // 우리 회원 맞음! 변경 쿼리문 시작!
      let sql2 = "update project_member set pw=? where id=?";
      conn.query(sql2, [changePw, id], (err, rows) => {
        console.log("2번 쿼리문 결과", rows);
        if (rows) {
          res.json({ msg: "success" });
        } else {
          res.json({ msg: "error" });
        }
      });
    } else {
      // 비번 잘못 입력함
      res.json({ msg: "failed" });
    }
  });
});

// 이름, 이메일 수정 라우터
router.post("/modify", (req, res) => {
  console.log("modify router");
  let { id, new_name, new_email } = req.body;
  let sql = "update project_member set user_name=?, email=? where id = ?";

  conn.query(sql, [new_name, new_email, id], (err, rows) => {
    console.log("정보수정 쿼리문 결과", rows);
    if (rows) {
      res.json({ msg: "success" });
    } else {
      res.json({ msg: "failed" });
    }
  });
});

// member delete router
router.post("/delete", (req, res) => {
  console.log("delete router");
  let { id, pw } = req.body;
  let sql = "select * from project_member where id =? and pw=?";
  conn.query(sql, [id, pw], (err, rows) => {
    if (rows) {
      let sql = "delete from project_member where id = ? and pw = ?";
      conn.query(sql, [id, pw], (err, rows) => {
        if (rows) {
          res.json({ msg: "success" });
        } else {
          res.json({ msg: "failed" });
        }
      });
    } else {
      console.log("회원정보가 일치하지 않아요");
    }
  });
});

// memberlist router
router.post("/select", (req, res) => {
  console.log("select router");
  let sql = "select id, user_name, email from project_member";
  conn.query(sql, (err, rows) => {
    console.log("rows", rows);
    res.json({ list: rows });
  });
});

module.exports = router;

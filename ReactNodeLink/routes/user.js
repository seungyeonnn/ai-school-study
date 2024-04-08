/* User와 관련된 router 들 모음 
- 기능 : 회원가입, 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색 
- 작성자 : 선영표 (23.09.19.) 
*/

const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const path = require("path");

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

// change password router
router.post("/checkPW", (req, res) => {
  console.log("checkPW router", req.body);

  let { currentPW, changePw, id } = req.body;

  // select member info
  let sql = "select * from project_member where id = ? and pw = ?";
  conn.query(sql, [id, currentPW], (err, rows) => {
    // if exsist memeber
    if (rows.length > 0) {
      // update new password
      let sql = "update project_member set pw = ? where id = ? and pw = ?";
      conn.query(
        sql,
        [changePw, id, currentPW],
        (err, rows) => {
          rows ? res.json({ msg: "success" }) : res.json({ msg: "failed" });
        },
        []
      );

      // if not in member
    } else {
      res.json({ msg: "failed!" });
    }
  });
});

// modify info router
router.post("/modify", (req, res) => {
  let { id, new_name, new_email } = req.body;
  let sql = "update project_member set user_name = ?, email = ? where id = ?";
  conn.query(sql, [new_name, new_email, id], (err, rows) => {
    err ? res.json({ msg: "failed" }) : res.json({ msg: "success" });
  });
});

// memberlist router
router.post("/select", (req, res) => {
  let sql = "select id, user_name, email from project_member";
  conn.query(sql, (err, rows) => {
    console.log(rows);
    if (rows) {
      res.json({ rows, msg: "success" });
    } else {
      res.json({ msg: "failed" });
    }
  });
});

router.post("/delete", (req, res) => {
  console.log("delete router", req.body);
  let { id, pw } = req.body;
  let sql = "delete from project_member where id=? and pw=?";
  conn.query(sql, [id, pw], (err, rows) => {
    console.log(rows);
    if (rows) {
      res.json({ msg: "success" });
    } else {
      res.json({ msg: "failed" });
    }
  });
});
// 라우터의 와일드 카드
// 위에 훑고 왔던 router에 전부 해당하지 않으면, 이 router로 들어오겠다
// router.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "react-project", "build", "index.html")
//   );
// });

module.exports = router;

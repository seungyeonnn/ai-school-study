const express = require("express");
const router = express.Router();

const db = require("../config/database");
// database.js에서 가진 정보를 init이라는 이름으로 밖으로 빼주고 있음
// 여기서 db랑 연결
// db랑 연결시키는 기능은 변수db에 담겨있음
let conn = db.init();

// http://localhost:3000/user/join
router.post("/join", function (request, response) {
  id_real = request.body.id;
  pw_real = request.body.pw;
  nick_real = request.body.nick;

  let id = request.body.id;
  let pw = request.body.pw;
  let nick = request.body.nick;

  conn.connect();

  let sql = `insert into member values (?,?,?)`;
  conn.query(sql, [id, pw, nick], function (err, rows) {
    if (!err) {
      console.log("쿼리문 실행 완료!");
    } else {
      // 에러라면
      console.log("DB 명령이 제대로 실행되지 않았습니다");
    }
  });
});

router.get("/SelectOne", function (request, response) {
  let id = request.query.InputId;

  conn.connect();

  let sql = `select * from member where id = ?`;
  conn.query(sql, [id], function (err, rows) {
    if (!err) {
      console.log("조회완료");
      ``;
    } else {
      // 에러라면
      console.log("조회 실패");
    }
  });
});

router.get("/Login", function (request, response) {
  let id = request.query.id;
  let pw = request.query.pw;

  conn.connect();

  let sql = `select * from member where id = ? and pw = ?`;
  conn.query(sql, [id, pw], function (err, rows) {
    if (!err) {
      if (rows.length > 0) {
        console.log("로그인 성공!");
        // 로그인 성공 했을 때 DB에서 가져온 정보를
        // cookie나 session에 저장
        // info라는 키값으로 rows의 0번째 가져올거야

        //cookie 설정
        response.cookie("info", rows[0]);

        //session 생성
        request.session.info = rows[0];

        response.render("Main");
      }
    } else {
      // 에러라면
      console.log("로그인 실패");
    }
  });
});
module.exports = router;

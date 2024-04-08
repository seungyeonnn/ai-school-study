const express = require("express");
const router = express.Router();

// DB 연결
// 1. MySQL 연결할 수 있는 mysql이라는 모듈 가져오기
const mysql = require("mysql2");

// 2. mysql DB에 접근할 수 있는 정보를 저장
// DB에 접근할 수 있는 기능을 conn에 저장
let conn = mysql.createConnection({
  // mysql 서버의 주소(ip)
  host: "127.0.0.1",
  //mysql에 접속할 id,pw
  user: "root",
  password: "123456",
  port: "3306",
  database: "nodejs_DB",
});

router.get("/", function (request, response) {
  console.log("접속 확인");
  response.render("Main");
});
router.get("/response", function (request, response) {
  console.log(request.query.text);
});
0;

router.get("/nextPage", function (request, response) {
  // 데이터를 가져옴
  if (request.query.next == "naver") {
    response.redirect("https://www.naver.com/");
  } else if (request.query.next == "google") {
    response.redirect("https://www.google.com/");
  } else {
    response.redirect("https://www.daum.net/");
  }
  // 페이지 이동하는 방법
});

router.get("/join", function (request, response) {
  id_real = request.query.id;
  pw_real = request.query.pw;
  nick_real = request.query.nick;

  let id = request.query.id;
  let pw = request.query.pw;
  let nick = request.query.nick;

  // DB 접속
  conn.connect();

  let sql = `insert into member values (?,?,?)`;
  //쿼리문 실행시키기
  //conn.query(sql): sql 쿼리문을 실행
  // function: 쿼리문 실행 후 작업 진행

  //? -> 나중에 값을 담아주겠습니다! (단 순서를 맞춰서!)
  conn.query(sql, [id, pw, nick], function (err, rows) {
    // err -> 쿼리문 오류 내용 받아옴
    // rows -> 정상 실행 된 결과 받아옴
    // err 또는 rows 둘 중 하나만 값이 들어감
    if (!err) {
      // 에러가 아니라면 (정상으로 쿼리문이 실행 되었다면)
      console.log("쿼리문 실행 완료!");
    } else {
      // 에러라면
      console.log("DB 명령이 제대로 실행되지 않았습니다");
    }
  });
});

// 로그인 router
router.get("/Login", function (request, response) {
  let id = request.query.id;
  let pw = request.query.pw;

  conn.connect();
  let sql = "select * from member where id = ? and pw = ?";

  // 값을 받아올 때 해당 값은 rows에 들어옴
  conn.query(sql, [id, pw], function (err, rows) {
    if (!err) {
      console.log(rows);
      if (rows.length == 0) {
        console.log("회원가입을 해주세용");
      } else {
        console.log("로그인 성공");
        response.render("LoginS", { nick: rows[0].nick });
        // response.redirect("http://127.0.0.1:5500/0727Express/public/Main.html");
      }
    } else {
      console.log("로그인 실행 실패");
    }
  });

  // request.query.id == id_real && request.query.pw == pw_real
  //   ? response.redirect("http://127.0.0.1:5500/0727Express/public/S.html")
  //   : response.redirect("http://127.0.0.1:5500/0727Express/public/F.html");
});

router.get("/delete", function (request, response) {
  let deleteUser = request.query.deleteUser;

  // 1. 서버와 DB 통로
  conn.connect();

  // 2. 실행시킬 쿼리문 작성
  let sql = "delete from MEMBER where nick = ?";

  //3. 쿼리문을 DB로 넘겨서 실행
  conn.query(sql, [deleteUser], function (err, rows) {
    if (!err) {
      // 에러가 아니라면 (정상으로 쿼리문이 실행 되었다면)
      console.log("회원삭제 성공!");
      response.redirect("http://localhost:5500/0727Express/public/Main.html");
    } else {
      // 에러라면
      console.log("회원삭제 실패");
    }
  });
});

router.get("/update", function (request, response) {
  let updateId = request.query.updateId;
  let updatePw = request.query.updatePw;
  let updateNick = request.query.updateNick;

  conn.connect();
  let sql = "update member set pw = ?, nick = ? where id = ?";

  conn.query(sql, [updatePw, updateNick, updateId], function (err, rows) {
    if (!err) {
      // 에러가 아니라면 (정상으로 쿼리문이 실행 되었다면)
      response.redirect("http://localhost:5500/0727Express/public/Main.html");
    } else {
      // 에러라면
      console.log("수정실패");
    }
  });
});

router.get("/getAlluser", function (request, response) {
  conn.connect();

  let sql = "select * from member";

  conn.query(sql, function (err, rows) {
    // err -> 쿼리문에 대한 오류, DB 오류에 대한 정보를 가지고 있음
    // rows -> 쿼리문 실행 데이터 (DB에 데이터가 없는 경우에도 여기 담김)

    if (!err) {
      // 에러가 아니라면 (정상으로 쿼리문이 실행 되었다면)
      console.log("회원조회 성공!");
      console.log(rows);
      response.render("UserList", { list: rows });
    } else {
      // 에러라면
      console.log("회원조회 실패");
    }
  });
});
// 위에 만들어진 기능을 외부에서 사용할 수 있도록 빼내는 작업
// -> router 변수를 모듈화
module.exports = router;

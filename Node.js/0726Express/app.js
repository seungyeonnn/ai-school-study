// 1. express 사용 기능 가져오기
const express = require("express");

// 2. express 실행 정보를 app 변수에 저장
const app = express();

// 3. router 기능 사용 선언
const router = express.Router();
//body 영역 사용 등록 -> post 방식 때 사용되어짐
app.use(express.urlencoded({ extended: true })); //body영역 허용
app.use(express.json()); // 받은 데이터를 json 객체로 반환!

// 4. 서버 등록
app.use(router);
//클라이언트가 요청보낸 주소값에 따라서 서버를 사용하겠습니다.

//6. 요청을 보낸 주소값에 대해서 처리!
// http://localhost:4000 -> /
router.get("/", function (request, response) {
  console.log("서버접속 확인");
});
router.get("/plus", function (request, response) {
  console.log("plus서버 접속 확인");
  console.log(request.query.num1);
  console.log(request.query.num2);
  let num1 = parseInt(request.query.firstNum);
  let num2 = parseInt(request.query.secNum);

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("<html>");
  response.write("<body>");
  response.write(`${num1} + ${num2} = ${num1 + num2}`);
  response.write("</body>");
  response.write("</html>");
});

// router를 통해서 각각의 주소값에 따라 다른 기능을 실행시킬 수 있음
// 주의! router.get , router.post 각각의 상황에 맞게 사용해야함
router.post("/Login", function (request, response) {
  console.log("login서버 접속 완");
  let id = request.body.inputId;
  let pw = request.body.inputPw;

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("<html>");
  response.write("<body>");
  id == "aischool" && pw == 123
    ? response.write("<h1>로그인 성공</h1>")
    : response.write("<h1>로그인 실패</h1>");
  response.write("</body>");
  response.write("</html>");

  response.end();
});

router.post("/grade", function (request, response) {
  let avg =
    (parseInt(request.body.html) +
      parseInt(request.body.css) +
      parseInt(request.body.node) +
      parseInt(request.body.andr)) /
    4;

  let grade = "";

  if (avg) {
    grade = "A+";
  } else if (95 > avg && avg >= 90) {
    grade = "A";
  } else if (90 > avg && avg >= 85) {
    grade = "B+";
  } else if (85 > avg && avg >= 80) {
    grade = "B";
  } else if (80 > avg && avg >= 75) {
    grade = "C";
  } else if (75 > avg) {
    grade = "F";
  } else {
    grade = "error!";
  }

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("<html>");
  response.write("<body>");
  response.write(`<p>name: ${request.body.name}</p>`);
  response.write(`<p>HTML ${request.body.html}</p>`);
  response.write(`<p>css: ${request.body.css}</p>`);
  response.write(`<p>nodejs: ${request.body.node}</p>`);
  response.write(`<p>android: ${request.body.andr}</p>`);
  response.write(`<p>avg: ${avg}</p>`);
  response.write(`<p>grade: ${grade}</p>`);
  response.write("</body>");
  response.write("</html>");

  response.end();
});
// 5. 포트번호 등록
app.listen(3002);

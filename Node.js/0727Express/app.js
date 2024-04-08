// express 사용 3단계
// 1. npm init --> 프로젝트의 정보를 저장하는 package.json 생성
// 2. 프로젝트 express 설치
// 3. 프로젝트 구조 생성
// config(환경설정), public(정적페이지), router(경로), app.js(서버)

//express 서버 생성
// 1. express 모듈 가져오기
const express = require("express");

// 2. express 실행정보를 app 변수에 담아주기
// 서버를 구축시킬 수 있는 모듈을 가져와서 app안에 담아주는 것
const app = express();

// 4. 경로를 설정할 수 있는 Router 만들기
// router라는 변수에 경로를 설정할 수 있는 기능을 넣어줌
// const router = express.Router();
const router = require("./router/router");
const page = require("./router/page");
app.use(page);
// get방식으로 선언했을 때 다음 기능을 실행할거야
// router.get("/", function (request, response) {
//   console.log("접속 확인");
// });
// router.get("/response", function (request, response) {
//   console.log(request.query.text);
// });

//동적 페이지를 사용할 수 있는 nunjucks 가져오기
// html 파일을 동적인 파일로 사용할 수 있음!
const nunjucks = require("nunjucks");
//view engine을 html로 사용하겠다!
// html파일들을 동적 파일로 사용할 수 있게 허용할게~
app.set("view engine", "html");

//view안에 있는 html을 동적 파일로 사용할 수 있게끔 만들겠다!
// 동적파일 -> 데이터가 바뀔 때마다 화면 내용도 같이 바뀌는 파일
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// 5. router로 만든 경로를 서버(app)에 등록시켜주기
// 서버에 등록 시킨다 -> 미들웨어

//body영역 허용 뒤 router 등록
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// 3. 포트번호 달아주기
app.listen(3000);

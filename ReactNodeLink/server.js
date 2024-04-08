// require, import ..
const express = require("express");
const app = express();

// Router Require
const indexRouter = require("./routes/");
// index는 default 값이기 때문에 생략이 가능한 것 뿐
const userRouter = require("./routes/user");

const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// 정적인 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, "react-project", "build")));

// cors 오류 해결을 위한 미들웨어
//  1) cors 모듈 설치: npm install cors
//  2) 미들웨어 호출 : require
//  3) 사용
//  node와 무엇인가를 연동할 때 필요한 작업 (react-node, flask(deep learning 등)-node)
app.use(cors());
app.use(express.json());

// body parser 미들웨어 대체 express 내장 모듈
app.use(express.urlencoded({ extended: true }));

// router
app.use("/", indexRouter);
app.use("/user", userRouter);
// app.use('*')는 express 라우팅에서 사용되는 패턴 중 '와일드 카드'로
// 모든 URL 경로에 대한 처리를 진행
// 단, 모든 라우팅 중 가장 하단에 존재
// React + Node 연동할 때 꼭 필요한 존재
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "react-project", "build", "index.html")
  );
});

// Q. 왜 3000번 안쓰나요?
// A. 3000번은 나중에 react에서 쓸 것!
app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("port waiting...😵");
});

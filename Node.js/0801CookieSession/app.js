const express = require("express");
const app = express();
const routerCookie = require("./router/cookie");
const routerSession = require("./router/session");

const cookieParse = require("cookie-parser");

// 세선: 공통 저장공간을 서버에 만들어서 사용하는 기능
const session = require("express-session");

app.use(
  session({
    httpOnly: true, // 서버로 들어온 통신이 http 통신일 때 허용
    secret: "secretKey", // 암호화 key, 세션에 접근할 수 있는 공간에 대한 비밀번호느낌
    resave: false, // 요청이 들어왔을 때 세션에 수정사항이 없더라도 다시 저장
  })
);
app.use("/s", routerSession);
app.use(cookieParse());
app.use("/c", routerCookie);
app.listen(3000);

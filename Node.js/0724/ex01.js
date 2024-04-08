console.log("실행 확인");

//파일을 서버로 만들기 위해서는 서버의 기능을 할 수 있는 모듈이라는 것들을 가져와서 사용해야함!
// http 기능(모듈)을 불러와서 사용하기
const http = require("http");

//http://192.168.20.125 (ip 주소)
//ip주소 확인하는 법 cmd 창에 ipconfig
//현재 내 컴퓨터의 ip주소를 확인 가능

http
  .createServer(function (request, response) {
    //     1. createServer : 현재 js 파일을 서버로 만들어주는 역할
    //     2. function(request, response){실행로직} : 클라이언트가 요청을 보냈을 때 실행할 로직

    console.log("접속확인!");
    // request: 클라이언트가 서버로 요청을 보냈을 때 정보를 가지고 있음
    let ip = request.connection.remoteAddress;
    console.log("요청 보낸 주소: " + ip);

    // 응답값 만들어 주기 -> html 형식!
    // 200 --> 통신성공코드
    // "Content-Type": "text/html" --> html 형식으로 응답하겠습닌다.
    // response: 응답할 수 있는 객체 --> 응답을 하기 위한 객체
    response.writeHead(200, { "content-Type": "text/html ; charset=UTF-8" });
    response.write("<html>");
    response.write("<body>");
    response.write("<h1>두번째 응답</h1>");
    response.write("</body>");
    response.write("</body>");

    response.end();
  })
  .listen(3000);

// 서버 실행: node 실행파일명
// 서버 중지: ctrl + c

// CLI: commend line interface --> linux 기반
// GUI : graphic user interface 사용자에 초점 맞춘 화면 --> window 명령

// cd : 경로이동 ex) cd 경로명(파일 명)
// cd .. 이전 경로로!
// ls 현재 경로에서 접근할 수 있는 파일 확인
// clear: commend 창 지우기
// tab: 자동완성

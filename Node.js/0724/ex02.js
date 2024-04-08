//4000번 포트로 서버를 열어주세용!
//접속했을 때 --> 서버 생성 완료!

const http = require("http");
const m_url = require("url");
// url 모듈: 클라이언트가 보낸 url 정보를 사용할 수 있게 도와주는 모듈(기능)

http
  .createServer(function (request, response) {
    // request: 클라이언트 --> 서버
    // response: 서버 --> 클라이언트

    // http://192.168.20.125:4000/?inputId=%E3%85%87%E3%84%B4%E3%84%B9&inputPw=12345
    // get 방식으로 쿼리스트링 형태로 데이터를 요청 보낸다
    // 쿼리스트링: ?를 기준으로 왼쪽에는 주소
    // 오른쪽 data(key-value 형태) key --> input 태그에 적은 name값으로 적용
    // 데이터가 여러 개라면 & 기호를 기준으로 나뉘어진다

    // url에 담긴 데이터 꺼내기

    console.log(request.url);

    //true: 쿼리스트링의 데이터 부분만 사용하겠습니다.
    // .query : 사용할 수 있게 객체로 만들어 주겠습니다.
    let queryData = m_url.parse(request.url, true).query;
    console.log(queryData);
    console.log("입력한 ID: " + queryData.inputId);
    console.log("입력한 Pw: " + queryData.inputPw);

    //넘겨받은 값이
    //ID: aischool, pw: 123
    //h1 태그로 '로그인 성공'
    //둘 중 하나라도 다르다면
    //h1태그로 '로그인실패'

    response.writeHead(200, { "content-Type": "text/html ; charset=UTF-8" });
    response.write("<html>");
    response.write("<body>");
    queryData.inputId == "aischool" && queryData.inputPw == 123
      ? response.write("<h1>로그인 성공</h1>")
      : response.write("<h1>로그인 실패</h1>");

    response.write("</body>");
    response.write("</html>");

    console.log("서버생성 완료!");

    response.end();
  })
  .listen(4000);
// 포트 --> 중복x

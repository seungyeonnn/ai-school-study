const http = require("http");
const qs = require("querystring");
// require("querystring") :
// 클라이언트로부터 넘겨받은 데이터를 (패킷의 body 안에 있는)
// 쿼리스트링 형식처럼 사용할 수 있게 도와주는 모듈
http
  .createServer(function (request, response) {
    //POST 방식 데이터 꺼내오기 (꺼내기, 사용하기)
    //1. request.on('data')
    // 서버로 데이터를 가지고 요청 보냈을 때 실행하겠습니다.
    let body = "";
    request.on("data", function (data) {
      //data : 클라이언트로부터 넘겨받은 데이터
      console.log(data);

      //데이터가 클라이언트에서부터 넘어올 때마다 body에 누적시킬거야
      body += data;
    });

    //2. 받아온 데이터를 사용 가능하게 변환'
    request.on("end", function () {
      let post = qs.parse(body);
      console.log(post);
    });

    response.end();
  })
  .listen(3003);

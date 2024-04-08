const http = require("http");
const qs = require("querystring");
const exPostTemp = require("./exPostTemp");
// --> body 안에 담긴 데이터를 객체 형식으로 변환해서 사용할 수 있게끔 도와주는 역할

http
  .createServer(function (request, response) {
    let bodyData = "";

    // 1. 클라이언트가 body로 보낸 데이터를 꺼낼게
    // "data" 를 보냈을 때! functuon의 (data)로 담겨짐
    // 현재는 data는 buffer라는 형태임
    request.on("data", function (data) {
      bodyData += data;

      // 2. 모든 요청이 끝나서 bodyData로 저정이 완료 됐을 때
      // 받아온 데이터를 쿼리스트링 모듈을 사용해서
      // 개발자가 사용할 수 있게 변환시켜서 사용할게
    });

    // 모든게 끝났을 때 실행할거야~
    request.on("end", function () {
      let queryData = qs.parse(bodyData);
      console.log(queryData);
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write(exPostTemp.postTemp(queryData));
      //이 모듈로부터 이 기능을 가져와서 사용
      //쿼리 데이터를 매개변수로 줘야함

      // response.write("<html>");
      // response.write("<body>");
      // response.write(`<p>ID: ${queryData.id}</p>`);
      // response.write(`<p>PW: ${queryData.pw}</p>`);
      // response.write(`<p>GENDER: ${queryData.gender}</p>`);
      // response.write(`<p>BLOOD: ${queryData.blood}</p>`);
      // response.write(`<p>BIRTH: ${queryData.birth}</p>`);
      // response.write(`<p>HOBBY: ${queryData.hobby}</p>`);
      // response.write(`<p>COLOR: ${queryData.color}</p>`);
      // response.write(`<p>INPUTTEXT: ${queryData.inputText}</p>`);
      // response.write("</body>");
      // response.write("</html>");

      response.end();
    });
  })
  .listen(3005);

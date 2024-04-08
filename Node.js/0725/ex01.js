const http = require("http");
const url = require("url");

http
  .createServer(function (request, response) {
    let queryData = url.parse(request.url, true).query;
    console.log(queryData.firstNum);
    console.log(queryData.secNum);
    console.log(queryData.cal);

    // 쿼리스트링으로 넘겨받은 값은 무조건 문자열타입
    let sum = parseInt(queryData.firstNum) + parseInt(queryData.secNum);
    let num1 = parseInt(queryData.firstNum);
    let num2 = parseInt(queryData.secNum);
    let cal = queryData.cal;
    let result = 0;

    switch (cal) {
      case "+":
        result = num1 + num2;
        break;

      case "-":
        result = num1 - num2;
        break;

      case "*":
        result = num1 * num2;
        break;

      case "/":
        result = num1 / num2;
        break;
    }

    response.writeHead(200, { "content-Type": "text/html ; charset=UTF-8" });
    response.write("<html>");
    response.write("<body>");
    response.write(`<h3>${num1} ${cal} ${num2} = ${result}</h3>`);
    response.write("</body>");
    response.write("</html>");

    response.end();
  })
  .listen(3000);

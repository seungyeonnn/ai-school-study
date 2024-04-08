const http = require("http");
const url = require("url");

http
  .createServer(function (request, response) {
    let queryData = url.parse(request.url, true).query;

    response.writeHead(200, { "content-Type": "text/html; charset=UTF-8 " });
    response.write("<html>");
    response.write("<body>");
    response.write("<table border=1>");
    response.write("<tr>");
    for (let i = 1; i <= queryData.num; i++) {
      response.write(`<td>${i}</td>`);
    }
    response.write("</tr>");
    response.write("</table>");
    response.write("</body>");
    response.write("</html>");
    response.end();
  })
  .listen(3000);

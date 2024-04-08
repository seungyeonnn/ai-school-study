const http = require("http");
const qs = require("querystring");
const ex03Temp = require("./ex03Temp");

http
  .createServer(function (request, response) {
    let bodyData = "";

    request.on("data", function (data) {
      bodyData += data;
    });

    request.on("end", function () {
      let queryData = qs.parse(bodyData);
      console.log(queryData);

      response.writeHead(200, { "Content-Type": "text.html; charset=utf-8" });
      response.write(ex03Temp.scoreData(queryData));

      response.end();
    });
  })
  .listen(4000);

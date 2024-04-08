/*
    database 정보기록
    * 주의사항! DB를 변경하면 꼭 table을 생성하고 확인해줄 것!

*/

const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "123456",
  database: "nodejs_DB",
});

conn.connect();
module.exports = conn;

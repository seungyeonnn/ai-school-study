// config --> 개발에 관련된 환경설정에 대한 정보를 관리
const mysql = require("mysql2");
let conn = {
  user: "root",
  password: "123456",
  port: "3306",
  database: "nodejs_DB",
};

module.exports = {
  // init이라는 key값으로 어떤 기능을 넘겨줄거야
  // db에 연결된 정보를 실행해줄거야~
  init: function () {
    return mysql.createConnection(conn);
  },
};

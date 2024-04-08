// 화면에 대한 구조 정의 -- > 모듈화
//특정 기능을 따로 빼놓음

// 이 js 파일을 import 했을 때 이것을 내보낼거야
exports.postTemp = function (queryData) {
  let result_html = "";
  result_html =
    "<html><body>" +
    `<p>ID: ${queryData.id}</p>` +
    `<p>PW: ${queryData.pw}</p>` +
    `<p>GENDER: ${queryData.gender}</p>` +
    `<p>BLOOD: ${queryData.blood}</p>` +
    `<p>BIRTH: ${queryData.birth}</p>` +
    `<p>HOBBY: ${queryData.hobby}</p>` +
    `<p>COLOR: ${queryData.color}</p>` +
    `<p>INPUTTEXT: ${queryData.inputText}</p>` +
    " </body></html>";

  return result_html;
};

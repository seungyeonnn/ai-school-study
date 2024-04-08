exports.scoreData = function (queryData) {
  let scoreResult = "";
  let avg =
    (parseInt(queryData.html) +
      parseInt(queryData.css) +
      parseInt(queryData.node) +
      parseInt(queryData.andr)) /
    4;
  let grade = "";

  if (avg) {
    grade = "A+";
  } else if (95 > avg && avg >= 90) {
    grade = "A";
  } else if (90 > avg && avg >= 85) {
    grade = "B+";
  } else if (85 > avg && avg >= 80) {
    grade = "B";
  } else if (80 > avg && avg >= 75) {
    grade = "C";
  } else if (75 > avg) {
    grade = "F";
  } else {
    grade = "error!";
  }

  scoreResult =
    "<html><body>" +
    `<p>name: ${queryData.name}</p>` +
    `<p>html: ${queryData.html}</p>` +
    `<p>css: ${queryData.css}</p>` +
    `<p>nodejs: ${queryData.node}</p>` +
    `<p>android: ${queryData.andr}</p>` +
    `<p>avg: ${avg}</p>` +
    `<p>grade: ${grade}</p>`;
  ("</body></html>");

  return scoreResult;
};

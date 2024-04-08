import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticate }) => {
  //submit 버튼 클릭 시, 로그인 상태값을 전환하고 메인 페이지로 이동되도록 구현하시오.

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // 이벤트 동작을 중지 시키는 함수 (본래의 기능을 막아줌)
    // 페이지가 새로고침 되면서 넘어가기 때문에 이걸 막고
    // Navigater 함수를 통해 넘어가도록 만들어줌
    e.preventDefault();
    setAuthenticate(true);
    navigate("/");
  };

  return (
    <div className="login-box">
      <div className="login-box-tit">
        <h2>로그인</h2>
      </div>
      <div className="login-box-form">
        <form>
          <div className="input-block">
            <input type="text" placeholder="아이디를 입력해주세요." />
          </div>
          <div className="input-block">
            <input type="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <div className="submit">
            <input
              type="submit"
              className="login-btn"
              onClick={handleSubmit}
              value="로그인"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

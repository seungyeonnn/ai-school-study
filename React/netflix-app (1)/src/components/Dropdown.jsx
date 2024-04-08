import React from "react";

const Dropdown = () => {
  return (
    <div className="accor-box">
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          정렬방식을 선택하세요
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">제목 오름차순</Dropdown.Item>
          <Dropdown.Item href="#/action-2">제목 내림차순</Dropdown.Item>
          <Dropdown.Item href="#/action-3">평점 오름차순</Dropdown.Item>
          <Dropdown.Item href="#/action-3">평점 내림차순</Dropdown.Item>
          <Dropdown.Item href="#/action-3">인기도 오름차순</Dropdown.Item>
          <Dropdown.Item href="#/action-3">인기도 내림차순</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Dropdown;

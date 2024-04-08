import React from "react";
import Dropdown from "./Dropdown";
import Accordion from "react-bootstrap/Accordion";

const Accordion_Comp = () => {
  return (
    <div className="accor-box">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>정렬</Accordion.Header>
          <Accordion.Body>
            <Dropdown />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Accordion_Comp;

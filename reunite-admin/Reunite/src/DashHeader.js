import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import LogoSvg from "./assets/images/LogoSvg";

const DashHeader = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("Auth", false);
    navigate("/");
  };

  return (
    <div className="dashHeader d-flex justify-content-between align-items-center ">
      <div className="d-flex align-items-center gap-3">
       
        <div style={{ fontSize: "25px", color: "#212529" }}>ReUnite</div>
      </div>

      
      <DropdownButton id="dropdown-basic-button" title="B">
        <Dropdown.Item href="#/action-1" onClick={handleLogout}>
          Log out
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default DashHeader;

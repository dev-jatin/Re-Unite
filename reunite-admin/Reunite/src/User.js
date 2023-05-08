import React from "react";
import DashHeader from "./DashHeader";
import DashSidebar from "./DashSidebar";
import  UserTable from "./UserTable";
import { useNavigate } from "react-router-dom";

const User = () => {
  let navigate = useNavigate();
  return (
    <div className="dash d-flex flex-column">
      <DashHeader />
      <div className="d-flex ">
        <DashSidebar />
        <div className="dashTable d-flex flex-column">
          <div className="d-flex justify-content-between m-4 tableHead">
            <h5>User</h5>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/create")}
            >
              create new Table{" "}
              <span style={{ fontSize: "17px", fontWeight: "500" }}>+</span>
            </button>
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default User;

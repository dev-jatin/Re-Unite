import React from "react";
import Dashboard from "./Dashboard";
import DashHeader from "./DashHeader";
import DashSidebar from "./DashSidebar";
import DashTable from "./DashTable";
import { useNavigate } from "react-router-dom";

const Branch = () => {
  let navigate = useNavigate();
  return (
    <div className="dash d-flex flex-column ">
      <DashHeader />

      <div className="d-flex ">
        <DashSidebar />
        <div className="dashTable d-flex flex-column">
          <div className="d-flex justify-content-between m-4 tableHead">
            <h5>Complaints</h5>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/create")}
            >
              create new Table{" "}
              <span style={{ fontSize: "17px", fontWeight: "500" }}>+</span>
            </button>
          </div>
          <DashTable/>
        </div>
      </div>
    </div>
  );
};

export default Branch;

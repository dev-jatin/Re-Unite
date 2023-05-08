import { React } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashHeader from "./DashHeader";
import DashSidebar from "./DashSidebar";


const Dashboard = () => {
  let navigate = useNavigate();

  return (
    <div className="dash d-flex flex-column">
      <DashHeader />
      <div className="d-flex ">
        <DashSidebar />
        <div >
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

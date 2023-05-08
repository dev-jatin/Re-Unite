import React from 'react'
import { useNavigate } from 'react-router-dom';

const DashSidebar = () => {

    let navigate = useNavigate();
  return (
    
      <div className='dashSideBar '>
<div className='dashSideBox  ' style={ {backgroundColor: "#fc7f3d"}} onClick={() => navigate("/complaint")}   > Complaints</div>

<div className='dashSideBox' style={ {backgroundColor: "#f88ed3"}} onClick={() => navigate("/user")}   >User</div>
<div className='dashSideBox' style={ {backgroundColor: "#c364fa"}} onClick={() => navigate("/")}   >Suggestion</div>
<div className='dashSideBox' style={ {backgroundColor: "#0aac84"}} onClick={() => navigate("/")}   >Help</div>
<div className='dashSideBox' style={ {backgroundColor: "#419be9"}} onClick={() => navigate("/")}  >Info</div>

</div>
   
  )
}

export default DashSidebar

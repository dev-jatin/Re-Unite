import {React,useState} from "react";
import DashHeader from "./DashHeader";
import DashSidebar from "./DashSidebar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DashForm = () => {

    const [FName,setFName] = useState("")
    const [LName,setLName] = useState("")
    
    const [dashGender,setDashGender] = useState("")
  
    const [city,setCity] = useState("")

   

    const handleSave =() =>{
        const branchData = {
        FName,
        LName,
       
        dashGender,
        
        city,
       
        }
        console.log(branchData)
    }


  return (
    <div className="dash d-flex flex-column">
      <DashHeader />
      <div className="d-flex ">
        <DashSidebar />
        <div className="dashForm d-flex flex-column">
<div className="dashHeader d-flex flex align-items-center justify-content-end">
<button className="btn btn-light " style={{color:"#fff"}} onClick={handleSave} > Save</button>
</div>
<div className="branchForm d-flex gap-5" >
    <div className="d-flex flex-column">
    <Form>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="First Name" className="dashInput" name="FName" onChange={(e) => setFName(e.target.value)} />
   
      </Form.Group>
      <Form.Group className="mb-3">
        
        <Form.Control type="text" placeholder=" Last Name" className="dashInput" onChange={(e) => setLName(e.target.value)}  />
      
      </Form.Group>
      
     

      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="gender" className="dashInput" onChange={(e) => setDashGender(e.target.value)}  />
      </Form.Group>
    
      

     
   
  
      
  
      
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder=" City" className="dashInput" onChange={(e) => setCity(e.target.value)}  />
      
      </Form.Group>

   
     

     
    </Form>
    </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default DashForm;

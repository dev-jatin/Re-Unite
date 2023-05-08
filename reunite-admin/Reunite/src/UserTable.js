import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "./loader/Loader"

const UserTable = () => {
  const [tableData, setTableData] = useState([]);
  const [handleViewData, setHandleViewData] = useState({});
  const [showTableData, setShowTableData] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios.get("https://4781hy.deta.dev/user").then((res) => {
      setTableData(res.data.result);
      setShowTableData(true)
    });
  }, []);

  console.log(".....",tableData);

  const handleView = (value) => {
    setHandleViewData(value);
    setShow(true);

  };

  const handleDelete = (id) =>{
    const newData = tableData.filter((value,index)=>{
      return index + 1 !== id;
    })
    setTableData(newData)
  }

  return (
    <div>
    
      <Table responsive="sm" style={{overflow:"scroll"}}  >
        <thead>
          <tr>
            <th>Key</th>
            <th>Profile Pic</th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {showTableData?  "" : <Loader/> }
          {tableData.map((value, index) => (


            <tr key={index}>
              
              <td>
                {value.key}
                <div className="d-flex dashTableButton">
                  <button onClick={() => handleView(value)} variant="primary">
                    <i className="bi bi-info"></i>
                  </button>

                  <button>
                    {" "}
                    <i className="bi bi-pen"  ></i>
                  </button>
                  <button  onClick={() => handleDelete(index + 1)}  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
              <td className="complainerPic">
              <img src={value.profilePic} alt="profile"  /></td>
              <td>{value.name}</td>
              <td>{value.mobNo}</td>
              <td>{value.email}</td>
              <td>{value.address}</td>
              <td>{value.city}</td>
              <td>{value.pincode}</td>
              <td>{value.country}</td>
            </tr>
        
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{handleViewData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalImage">
        <img src={handleViewData.profilePic} alt="profile"  />
        </Modal.Body>
        <Modal.Body>{handleViewData.body}</Modal.Body>
        <Modal.Body>{handleViewData.title}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;

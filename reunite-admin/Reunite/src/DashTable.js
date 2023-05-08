import { React, useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "./loader/Loader";

const DashTable = () => {
  const [tableData, setTableData] = useState([]);
  const [handleViewData, setHandleViewData] = useState({});
  const [showTableData, setShowTableData] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios.get("https://4781hy.deta.dev/complaints").then((res) => {
      setTableData(res.data.result._items);
      setShowTableData(true);
    });
  }, []);

  console.log(".....", tableData);

  const handleView = (value) => {
    setHandleViewData(value);
    setShow(true);
  };

  const handleDelete = (id) => {
    const newData = tableData.filter((value, index) => {
      return index + 1 !== id;
    });
    setTableData(newData);
  };

  return (
    <div>
      <Table responsive="sm" style={{ overflow: "scroll" }}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
            <th>Picture</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Eye Color</th>
            <th>Face Color</th>
            <th>Hair</th>
            <th>Complainer Name </th>
            <th>Complainer Picture</th>
            <th>Complainer Mobile No. </th>

            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {showTableData ? "" : <Loader />}
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
                    <i className="bi bi-pen"></i>
                  </button>
                  <button onClick={() => handleDelete(index + 1)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
              <td>{value.name}</td>
              <td className="complainerPic">
                <img src={value.imageUrl} alt="profile" />
              </td>
              <td>{value.age}</td>
              <td>{value.height}</td>
              <td>{value.weight}</td>
              <td>{value.eyeColor}</td>
              <td>{value.faceColor}</td>
              <td>{value.hairColor}</td>

              <td> {value.complainerName}</td>
              <td className="complainerPic">
                <img src={value.complainerPic} alt="profile"  />
              </td>
              <td>{value.complainerMobNo}</td>
              <td>{value.userId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{handleViewData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalImage">
        <img src={handleViewData.imageUrl} alt="profile"  />
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

export default DashTable;

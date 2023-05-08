import React from 'react'

const HelpInfo = ({info,setInfo}) => { 

const handleCross =() =>{
setInfo(" ")

}


  return (
    <div className="help_box" id="help_form">
    <div className="help_box_header d-flex justify-content-between">
      <p>Help Desk</p>

      <span id="CloseHelpDesk">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-x-lg"
          viewBox="0 0 16 16"
          onClick={handleCross}
        >
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </span>
    </div>
    <div className="d-flex flex-column p-2">
      <div className="phone p-2 d-flex gap-3 mt-3">
        <i className="bi bi-telephone-fill"></i>
        <div className="num">
          <a className="number_swil_service" href="tel:+91-141-2577605">
            +91-141-2577605{" "}
          </a>
          (5 lines)
        </div>
      </div>

      <div className="phone p-2 d-flex gap-3">
        <i className="bi bi-envelope-fill"></i>
        <div className="num">
          <a
            className="number_swil_service"
            href="mailto:info@swindia.com"
          >
            info@reunite.com
          </a>
        </div>
      </div>
      <div className="phone p-2 d-flex gap-3">
        <i className="bi bi-geo-alt-fill"></i>
        <div className="num">
          Alwar-301001(Raj) (India)
        </div>
      </div>
    </div>
    <div className="info_footer">
      <div className="quick_link">Quick Links:</div>
      <div className="quick_link_content d-flex gap-5 ml-3">
        <div className="d-flex flex-column mt-5">
          <a href="#">
            <p>Privacy policy</p>
          </a>
          <a href="#">
            {" "}
            <p>Payment info</p>
          </a>
          <a href="#">
            {" "}
            <p>Partner with us</p>
          </a>
          <a href="#">
            {" "}
            <p>Support policy</p>
          </a>
        </div>
        <div className="d-flex flex-column mt-5">
          <a href="#">
            <p>Price List</p>
          </a>
          <a href="#">
            <p>Disclaimer</p>
          </a>
          <a href="#">
            <p>REUNITE support desk</p>
          </a>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HelpInfo

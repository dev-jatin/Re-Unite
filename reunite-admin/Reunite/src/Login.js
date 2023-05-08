import React, { useEffect, useState } from "react";
import HelpInfo from "./HelpInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextBox from "./TextBox";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import LogoSvg from "./assets/images/LogoSvg";

function Login() {
  let navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [userLoginData, setuserLoginData] = useState({
    email: "admin123@gmail.com",
    password: "admin321",
  });

  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const { email, password } = userLoginData;

  const handleClick = () => {
    setInfo(<HelpInfo info={info} setInfo={setInfo} />);
  };

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setUserPass(event.target.value);
  };

  const handleLogin = () => {
    if (userEmail == email && userPass == password) {
      // alert("login success")
      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      localStorage.setItem("Auth", true);
    } else {
      toast.error("Login Failed");
    }
    console.log(userEmail, userPass);
  };

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (auth === "true") {
      navigate("/dashboard");
    } else if (auth === "false") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="loginbgoverlay"></div>
      <section
        className="loginMainBox"
        style={{
          backgroundImage: " url('./images/LoginPageUi-bg.png')",
          backgroundSize: "cover",
          overflow: "hidden",
          backgroundPosition: "center",
        }}
        id="overlay"
      >
        <div className="container loginBoxInner p-3">
          <div className="row login-content">
            <div className="col-md-6">
              <div className="loginLeft">
                <div className="logo_content d-flex">
                  <div>
                    <LogoSvg />
                  </div>
                  <div className="m-2 logo_des">
                    <p>
                      <b>Sign in </b>
                      <br />
                      to access <b>Reunite</b> Home
                    </p>
                  </div>
                </div>

                <TextBox
                  handleEmail={handleEmail}
                  handlePassword={handlePassword}
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Login →
                </button>

                <div className="forgotpass mt-3" style={{ cursor: "pointer" }}>
                  Forgot Password
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="loginRight">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide loginSlider"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active slide1"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                      className="rect slide2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                      className="slide3"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active loginSliderItem">
                      <img
                        src="./images/Untitled-1000001.png"
                        className="d-block"
                        alt="..."
                      />
                      <p>
                        Reunite goal is to develop an (Automation/AI) app based
                        on Artificial intelligence and automation which might be
                        effective in tracking the missing person co-relating the
                        database and the individual identity fed .
                      </p>
                    </div>
                    <div className="carousel-item loginSliderItem">
                      <img
                        src="./images/Untitled-1000001.png"
                        className="d-block"
                        alt="..."
                      />
                      <p>
                        Reunite goal is to develop an (Automation/AI) app based on
                        Artificial intelligence and automation which might be
                        effective in tracking the missing person co-relating the
                        database and the individual identity fed .
                      </p>
                    </div>
                    <div className="carousel-item loginSliderItem">
                      <img
                        src="./images/Untitled-1000001.png"
                        className="d-block"
                        alt="..."
                      />
                      <p>
                        Reunite goal is to develop an (Automation/AI) app based on
                        Artificial intelligence and automation which might be
                        effective in tracking the missing person co-relating the
                        database and the individual identity fed .
                      </p>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 socialIcon">
          <div className="logo" style={{ backgroundColor: "#3a54a0" }}>
            <a href="https://www.facebook.com/" target="_blank">
              {" "}
              <i className="bi bi-facebook"></i>
            </a>
          </div>
          <div className="logo" style={{ backgroundColor: " #ea0102" }}>
            <a href="https://www.youtube.com/" target="_blank">
              {" "}
              <i className="bi bi-youtube"></i>
            </a>
          </div>
          <div className="logo" style={{ backgroundColor: "#00b0ef" }}>
            <a href="https://twitter.com/" target="_blank">
              {" "}
              <i className="bi bi-twitter"></i>
            </a>
          </div>
          <div className="logo" style={{ backgroundColor: "#11bd18" }}>
            <a href="https://www.whatsapp.com/" target="_blank">
              {" "}
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
          <div className="logo" style={{ backgroundColor: " #ea2e8f" }}>
            <a href="https://www.instagram.com/" target="_blank">
              {" "}
              <i className="bi bi-instagram"></i>
            </a>
          </div>
          <div className="logo" style={{ backgroundColor: "#32425a" }}>
            <a href="#">
              {" "}
              <i className="bi bi-three-dots"></i>
            </a>
          </div>
        </div>
        {info}

        <div
          className="help logo"
          id="help_icon"
          onClick={handleClick}
          style={{ backgroundColor: "rgb(32 98 233)" }}
        >
          <a href="#">
            {" "}
            <i className="bi bi-question-circle"> </i>
          </a>
        </div>
        <div className="d-flex footer justify-content-center p-3">
          Copyright 2023 @ Reunite (India) All Rights Reserved
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Login;

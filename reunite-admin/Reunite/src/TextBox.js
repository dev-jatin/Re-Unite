import React from 'react'

const TextBox = ({handleEmail,handleLogin,handlePassword ,handleSignUp } ) => {
  return (
    <div>
         <div className="mt-4 email-rad">
                  <div className="material-textfield email">
                    <input placeholder=" " type="text" onChange={handleEmail}  />

                    <label>
                      <div className="d-flex justify-content-center align-items-center">
                        <span className="email_pos"> Email Address</span>
                      </div>
                    </label>
                    <div className="inputIcon">
                      <i className="bi bi-envelope"></i>
                    </div>
                  </div>
                </div>
                <div className="pass-rad mb-3">
                  <div className="material-textfield password">
                    <input
                      placeholder=" "
                      type="text"
                      onChange={handlePassword}
                      
                    />

                    <label>
                      <div className="d-flex justify-content-center align-items-center">
                        <span className="email_pos">Password</span>
                      </div>
                    </label>

                    <div className="inputIcon">
                      <i className="bi bi-shield-lock"></i>
                    </div>
                  </div>
                </div>
              
    </div>
  )
}

export default TextBox

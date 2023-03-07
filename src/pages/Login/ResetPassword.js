import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";

const ResetPassword = () => {
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get the login form data
    const formData = new FormData(e.target);
    const email = formData.get("email");

    setEmailError(null);
    // validate the form data
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    try {
      await axios
        .post(API_URL + "/password/email", { email })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
      setEmailError(false);
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="animate form login_form">
        <div style={{ textAlign: "center" }}>
          <img
          src="/images/growth-tracker.png"
          alt=""
        />
        <br/>
          <h6 >Forgot Password</h6>
          <br/>
          </div>
          <form onSubmit={handleSubmit}>
          
            <div className={`form-group ${emailError ? "has-error" : ""}`}>
              <div className={`form-group ${emailError ? "has-error" : ""}`}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={
                    emailError ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Email"
                />
                {emailError && <p style={{ color: "red" }}>{emailError}</p>}
              </div>
            </div>
            <br/>
            <div className="form-group text-align" >
              <button type="submit" className="btn btn-primary btn-sm">
                Forget Password
              </button>
            </div>
          </form>

          <div className="separator">
            <p className="change_link">
              Wanna Go Back?
              <Link to="/login"> Log in </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

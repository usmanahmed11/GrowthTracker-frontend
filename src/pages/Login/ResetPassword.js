import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";

const ResetPassword = () => {
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // get the login form data
    const formData = new FormData(e.target);
    const email = formData.get("email");

    setEmailError(null);
    // validate the form data
    if (!email) {
      setEmailError("Email is required");
      setLoading(false);

      return;
    }
    try {
      await axios
        .post(API_URL + "/password/email", { email })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
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
          setLoading(false);

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
    <div className="login2">
      <div className="container" style={{ overflowX: "hidden" }}>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="text-center">
                  {/* <img
                    src="/images/growth-tracker.png"
                    alt="Logo"
                    height="72"
                  /> */}
                </div>
                <h6 className="card-title text-center mb-4">Forget Password</h6>

                <form onSubmit={handleSubmit} autoComplete="off">
                  <div
                    className={`form-group ${emailError ? "has-error" : ""}`}
                  >
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={
                          emailError
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Email"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                  </div>
                  <br />
                  <div className="form-group text-align">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value={loading ? "Loading..." : "Submit"}
                      disabled={loading}
                    >
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

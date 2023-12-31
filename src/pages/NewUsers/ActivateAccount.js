import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";
import { Link } from "react-router-dom";
const ActivateAccount = (props) => {
  const [token, setToken] = useState("");

  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(null);

  useEffect(() => {
    const pathname = props.location.pathname;
    const tokenFromURL = pathname.split("/")[2];
   
    setToken(tokenFromURL);
  }, [props.location.pathname]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");

    setPasswordError(null);
    setPasswordConfirmationError(null);

    if (!password) {
      setPasswordError("Password is required");
    }

    if (!passwordConfirmation) {
      setPasswordConfirmationError("Password Confirmation is required");
    }

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError(
        "Password and Confirm-Password do not match"
      );
      return;
    }
    if (!password || !passwordConfirmation) {
      return;
    }
    try {
      await axios
        .post(API_URL + "/activateAccount", {
          password,
          password_confirmation: passwordConfirmation,
          token,
        })
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
          const errors = error.response.data.error;
          if (Array.isArray(errors)) {
            errors.map((errorMessage) => {
              return toast.error(errorMessage, {
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
          } else {
            toast.error(errors, {
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
        });
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
                <h6 className="card-title text-center mb-4">
                  Set New Password
                </h6>
                <form onSubmit={handleSubmit}>
                  <div
                    className={
                      passwordError ? "form-group has-error" : "form-group"
                    }
                  >
                    <div className="input-group">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className={
                          passwordError
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Password"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                    {passwordError && (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    )}
                  </div>
                  <div
                    className={
                      passwordConfirmationError
                        ? "form-group has-error"
                        : "form-group"
                    }
                  >
                    <div className="input-group">
                      <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        className={
                          passwordConfirmationError
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Confirm Password"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                    {passwordConfirmationError && (
                      <p style={{ color: "red" }}>
                        {passwordConfirmationError}
                      </p>
                    )}
                  </div>
                  <div className="form-group text-align">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Set Password
                    </button>
                  </div>
                </form>
                <div className="separator">
                  <p className="change_link">
                  Do you want to log in to your account?
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

export default ActivateAccount;

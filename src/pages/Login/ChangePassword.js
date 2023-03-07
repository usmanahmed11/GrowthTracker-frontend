import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import API_URL from "../../config";
const ChangePassword = (props) => {
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(null);
  const accessToken = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  useEffect(() => {
    const checkAuth = async () => {
      // redirect the user to the login page if the access token cookie is not present
      if (!accessToken) {
        props.history.push("/login");
        return;
      }
    };
    checkAuth();
  }, [props.history, accessToken]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const oldPassword = formData.get("oldPassword");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");
    setPasswordError(null);
    setPasswordConfirmationError(null);
    setOldPasswordError(null);

    if (!oldPassword) {
      setOldPasswordError("Old Password is required");
    }

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
    }
    if (!password || !oldPassword || !passwordConfirmation) {
      return;
    }
    //Get the access token from the cookie storage
    const accessToken = document.cookie.replace(
      // eslint-disable-next-line
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // Include the access token in the request header
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      axios
        .post(
          API_URL + "/change-password",
          {
            old_password: oldPassword,
            password: password,
            password_confirmation: passwordConfirmation,
          },
          config
        )
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
    } catch (error) {
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
    }
  };

  return (
    <div className="col-md-6 ">
      <div className="x_panel">
        <div className="x_title">
          <div className="back-button">
            <Link to="/dashboard">
              <i
               className="fa fa-arrow-left arrow"
                aria-hidden="true"
                
              ></i>
            </Link>
            <br />
            <span style={{ fontSize: "21px", color: "#73879c" }}>
              Change Password
            </span>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <br />
          <form onSubmit={handleSubmit} className="form-label-left input_mask">
            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    className={`form-control ${
                      oldPasswordError ? "is-invalid" : ""
                    } has-feedback-left`}
                    placeholder="Old Password"
                  />
                  <span className="fa fa-key form-control-feedback left"></span>
                </div>
                {oldPasswordError && (
                  <div className="invalid-feedback d-block">
                    {oldPasswordError}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    } has-feedback-left`}
                    placeholder="Password"
                  />
                  <span className="fa fa-key form-control-feedback left"></span>
                </div>
                {passwordError && (
                  <div className="invalid-feedback d-block">
                    {passwordError}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    className={`form-control ${
                      passwordConfirmationError ? "is-invalid" : ""
                    } has-feedback-left`}
                    placeholder="Confirm Password"
                  />
                  <span className="fa fa-key form-control-feedback left"></span>
                </div>
                {passwordConfirmationError && (
                  <div className="invalid-feedback d-block">
                    {passwordConfirmationError}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <Link to="/dashboard">
                <button className="btn btn-primary btn-sm" type="button">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="btn btn-success btn-sm">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";
function Login(props) {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // check for the presence of an access token cookie
  useEffect(() => {
    const accessTokenCookie = document.cookie.replace(
      // eslint-disable-next-line
      /(?:(?:^|.;\s)access_token\s*=\s*([^;]).$)|^.*$/,
      "$1"
    );
    if (accessTokenCookie) {
      // redirect the user to the dashboard page if the cookie is present
      props.history.push("/dashboard");
    }
  }, [props.history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // get the login form data
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    setEmailError(null);
    setPasswordError(null);

    // validate the form data
    if (!email) {
      setEmailError("Email is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (!email || !password) {
      return;
    }

    try {
      // send a request to the server to exchange the user's login credentials for an access token
      const response = await axios.post(
        API_URL + "/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // store the access token in a secure way (such as in an HTTP-only cookie)
      document.cookie = `access_token=${response.data.access_token}; path=/; secure; http-only`;
      document.cookie = `role_id=${response.data.role_id}; path=/; secure; http-only`;

      const accessToken = response.data.access_token;

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // redirect the user to the dashboard page
      props.history.push("/dashboard");
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
          <h4 className="text-center">Login Form</h4>
          <form onSubmit={handleSubmit} autocomplete="off">
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

            <div
              className={passwordError ? "form-group has-error" : "form-group"}
            >
              <input
                type="password"
                id="password"
                name="password"
                className={
                  passwordError ? "form-control is-invalid" : "form-control"
                }
                placeholder="Password"
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
            <div className="text-center">
              <button type="submit" className="btn-block btn-primary btn-sm">
                Log In
              </button>
            </div>
            <br />
            <div className="text-center">
              <Link to="/reset-password">Forget Password</Link>
            </div>
            <br />
            <div className="clearfix" />
            <div className="separator">
              <div className="clearfix" />
              <br />
              <div className="text-center">
                <h1>
                  <i className="fa fa-paw" /> Growth Tracker
                </h1>
                <p>
                  ©2023 All Rights Reserved. Growth Tracker!Privacy and Terms
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

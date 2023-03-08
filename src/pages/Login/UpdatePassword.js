import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../config";
const UpdatePassword = (props) => {
  const [token, setToken] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(null);

  useEffect(() => {
    const pathname = props.location.pathname;
    const tokenFromURL = pathname.split("/")[2];
    console.log(tokenFromURL);
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
    }
    if (!password || !passwordConfirmation) {
      return;
    }

    try {
      await axios
        .post(API_URL + "/password/reset", {
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
                  <img
                    src="/images/growth-tracker.png"
                    alt="Logo"
                    height="72"
                  />
                </div>
                <h5 className="card-title text-center mb-4">Reset Password</h5>
          <form onSubmit={handleSubmit}>
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
            <div
              className={
                passwordConfirmationError
                  ? "form-group has-error"
                  : "form-group"
              }
            >
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
              {passwordConfirmationError && (
                <p style={{ color: "red" }}>{passwordConfirmationError}</p>
              )}
            </div>
            <br/>
            <div className="form-group text-align">
              <button type="submit" className="btn btn-primary btn-sm">
                Reset Password
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default UpdatePassword;

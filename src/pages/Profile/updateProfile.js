import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import API_URL from "../../config";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  //Get the access token from the cookie storage
  const accessToken = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  // Include the access token in the request header
  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(null);
    setProfileError(null);

    if (!name) {
      setNameError("Name is required");
    }
    if (!profilePicture) {
      setProfileError("Profile picture is required");
    }

    if (!name || !profilePicture) {
      return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("profile_picture", profilePicture, profilePicture.name);

    // Only make the API call if both name and profilePicture are present
    if (name && profilePicture) {
      try {
        axios
          .post(API_URL + "/update-profile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${accessToken}`,
            },
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
          .catch((err) => {
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
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = document.cookie.replace(
          // eslint-disable-next-line
          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(API_URL + "/user", config);
        setEmail(response.data.email);
        // setRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

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
                      Update Profile
                    </span>
                  </div>

          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <br />
          <form
            className="form-label-left "
            onSubmit={handleSubmit}
            autocomplete="off"
          >
            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleNameChange}
                    className={`form-control ${
                      nameError ? "is-invalid" : ""
                    } has-feedback-left`}
                    placeholder="Name"
                  />
                  <span className="fa fa-user form-control-feedback left"></span>
                </div>
                {nameError && (
                  <div className="invalid-feedback d-block">{nameError}</div>
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="text"
                    disabled={true}
                    value={email}
                    className="form-control has-feedback-left"
                  />
                  <span className="fa fa-envelope form-control-feedback left"></span>
                </div>
              </div>
            </div>

            {/* <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="text"
                    value={role}
                    disabled={true}
                    className="form-control has-feedback-left"
                  />
                  <span className="fa fa-user-secret form-control-feedback left"></span>
                </div>
              </div>
            </div> */}

            <div className="form-group row">
              <div className="col-md-12">
                <div className="has-feedback">
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleProfilePictureChange}
                    className={`form-control ${
                      profileError ? "is-invalid" : ""
                    } has-feedback-left`}
                    style={{ padding: "3px 50px", fontSize: "14px" }}
                  />
                  <span className="fa fa-picture-o form-control-feedback left"></span>
                </div>
                {profileError && (
                  <div className="invalid-feedback d-block">{profileError}</div>
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
}

export default UpdateProfile;

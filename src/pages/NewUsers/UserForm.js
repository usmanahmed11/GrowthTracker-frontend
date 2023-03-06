import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNavigation from "../../components/TopNavigation";
import { Link } from "react-router-dom";
import API_URL from "../../config";

const UserForm = () => {
  const [emailError, setEmailError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Below useEffect will run once when the component is mounted and make a GET request to fetch data from the server
  // The fetched data will be set to the roles state using setRoles method
  // If there is an error, it will be logged to the console

  useEffect(() => {
    axios
      .get(API_URL + "/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // get the form data
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const name = formData.get("name");
    const role_id = parseInt(formData.get("role")); // convert to a number
    setLoading(true);
    // Form validation

    if (!email) {
      setEmailError("Email is required");
    }
    if (!name) {
      setNameError("Name is required");
    }
    if (!role_id) {
      setRoleError("Role is required");
    }

    if (!email || !name || !role_id) {
      setLoading(false);
      return;
    }

    // Find the role object that matches the selected role id
    const role = roles.find((r) => r.id === Number(role_id));

    // Send a request to the server to register the new user
    try {
      if (!role) {
        throw new Error("Invalid role selected.");
      }
      await axios
        .post(API_URL + "/newuser", {
          email,
          name,
          role_id: role.id,
          password: "NB_GT_123",
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
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
    <React.Fragment>
      <TopNavigation />

      <div className="container body">
        <div className="right_col" role="main">
          <div className="my-padding">
            <div>
              <div className="col-md-12 mx-auto">
                <div className="x_panel">
                  <div className="x_title my-breadcrumbstyle">
                    <h2>Add User</h2>
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb m-0 my-bgcolor">
                        <li className="breadcrumb-item">
                          <Link to="/users">Users</Link>
                        </li>

                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Add
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className="x_content">
                    <br />
                    <form
                      onSubmit={handleSubmit}
                      className="input_mask"
                      autocomplete="off"
                    >
                      <div className="form-group row">
                        <div className="col-md-9">
                          <div className="has-feedback">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className={`form-control ${
                                nameError ? "is-invalid" : ""
                              } has-feedback-left`}
                              placeholder="Name"
                            />
                            <span className="fa fa-user form-control-feedback left"></span>
                          </div>
                          {nameError && (
                            <div className="invalid-feedback d-block">
                              {nameError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-9">
                          <div className="has-feedback">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className={`form-control ${
                                emailError ? "is-invalid" : ""
                              } has-feedback-left`}
                              placeholder="Email"
                            />
                            <span className="fa fa-envelope form-control-feedback left"></span>
                          </div>
                          {emailError && (
                            <div className="invalid-feedback d-block">
                              {emailError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="col-md-9">
                          <select
                            id="role"
                            name="role"
                            className={`form-control ${
                              roleError ? "is-invalid" : ""
                            }`}
                            style={{ paddingLeft: "5px" }}
                            defaultValue=""
                          >
                            <option value="">Select a role</option>
                            {roles
                              .filter((role) => role.role_name !== "Admin")
                              .map((role) => (
                                <option key={role.id} value={role.id}>
                                  {role.role_name}
                                </option>
                              ))}
                          </select>

                          {roleError && (
                            <div className="invalid-feedback d-block">
                              {roleError}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div>
                          <Link to="/users">
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                            >
                              Cancel
                            </button>
                          </Link>
                          <button
                            type="submit"
                            value={loading ? "Loading..." : "Submit"}
                            disabled={loading}
                            className="btn btn-success btn-sm"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserForm;

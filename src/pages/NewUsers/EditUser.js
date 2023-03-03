import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNavigation from "../../components/TopNavigation";
import { Link } from "react-router-dom";
import API_URL from "../../config";

const EditUser = () => {
  const [roles, setRoles] = useState([]);
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState({});
  const [, setRoleName] = useState("");
  const [status, setStatus] = useState("active");
  const [roleError, setRoleError] = useState(null);
  const [loading, setLoading] = useState(false);

  // use the useParams hook to get the id from the URL
  const { id } = useParams();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(API_URL + `/users/${id}/email`);

        setName(response.data.name);
        setEmail(response.data.email);
        setRoleName(response.data.role_name);
        setRole({
          id: response.data.role_id,
          role_name: response.data.role_name,
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
    fetchEmail();
  }, [id]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const role_id = parseInt(formData.get("role"));
    setNameError(null);
    setLoading(true);

    if (!name) {
      setNameError("Name is required");
    }

    if (!role_id) {
      setRoleError("Role is required");
    }

    if (!name || !role_id) {
      setLoading(false);

      return;
    }

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
    // const selectedRole = roles.find((r) => r.id === Number(role_id));
    try {
      await axios
        .post(
          API_URL + `/users/${id}`,
          { name, role_id: role.id, status },
          config
        )
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
            <div className="col-md-12 mx-auto">
              <div className="x_panel">
                <div className="x_title my-breadcrumbstyle">
                  <h2>Edit User</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-bgcolor">
                      <li className="breadcrumb-item">
                        <Link to="/users">Users</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Edit
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            type="text"
                            disabled={true}
                            value={email}
                            className="form-control has-feedback-left"
                          />
                          <span className="fa fa-envelope form-control-feedback left"></span>
                        </div>
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
                          value={role.id}
                          onChange={(e) => {
                            const selectedRole = roles.find(
                              (r) => r.id === Number(e.target.value)
                            );
                            setRole(selectedRole);
                            setRoleName(selectedRole.role_name);
                          }}
                        >
                          <option disabled={true}>Select a role</option>
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
                    <div className="form-group row">
                      <div className="col-md-9">
                        <label className="col-md-1 col-form-label status-label">
                          Status:
                        </label>
                        <div className="radio p-2">
                          <label className="radio-label">
                            <input
                              type="radio"
                              value="active"
                              checked={status === "active"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <span className="radio-text">Active</span>
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              value="inactive"
                              checked={status === "inactive"}
                              onChange={(e) => setStatus(e.target.value)}
                            />
                            <span className="radio-text">Inactive</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
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
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default EditUser;

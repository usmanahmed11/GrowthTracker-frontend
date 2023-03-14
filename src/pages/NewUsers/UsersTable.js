import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import TopNavigation from "../../components/TopNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import API_URL from "../../config";

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState();
  const [showSettings, setShowSettings] = useState(false);
  const [, setShowTable] = useState(true);
  const [, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [, setStatus] = useState("");
  const [buttonText, setButtonText] = useState("Reset Password to Default");
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const roleId = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)role_id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowTable(false);
  };

  const handleDashboardClick = () => {
    setShowSettings(false);
    setShowTable(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();
    setDeleteId(id);
    setShow(true);
  };

  const handleDeleteItem = async () => {
    try {
      await axios
        .delete(API_URL + `/users/${deleteId}`)
        .then((response) => {
          if (response.status === 200) {
            setUsers(users.filter((user) => user.id !== deleteId));
            setShow(false);
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
          params: {
            page: currentPage + 1, // send current page number to server
          },
        };
        const response = await axios.get(API_URL + "/user-all", config);
        setUsers(response.data.data);
        setTotalUsers(response.data.total); // set total number of users

        const response2 = await axios.get(API_URL + "/user", config);

        setEmail(response2.data.email);
        setStatus(response2.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentPage]);

  const setPasswordToDefault = async (id) => {
    try {
      const response = await axios.post(
        API_URL + `/users/${id}/set-password-to-default`
      );
      if (response.status === 200) {
        const currentText = buttonText[id] || "Reset Password to Default";
        const newText =
          currentText === "Reset Password to Default"
            ? "Reset Password to User"
            : "Reset Password to Default";
        setButtonText({ ...buttonText, [id]: newText });
        localStorage.setItem(`resetText${id}`, newText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedTexts = {};
    users.forEach((user) => {
      const storedText = localStorage.getItem(`resetText${user.id}`);
      if (storedText) {
        storedTexts[user.id] = storedText;
      } else {
        storedTexts[user.id] = "Reset Password to Default";
      }
    });
    setButtonText({ ...storedTexts });
  }, [users]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are You Sure You Want To Delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button className="btn  btn-danger" onClick={handleDeleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container ">
        <div>
          <TopNavigation
            handleSettingsClick={handleSettingsClick}
            handleDashboardClick={handleDashboardClick}
          />
          <div className="my-padding">
            {/* <!-- page content --> */}

            <div>
              <div>
                <div>
                  <div className="col-md-12 col-sm-12 ">
                    <div className="x_panel">
                      <div className="x_title d-flex align-items-center justify-content-between">
                        <h5>User Management</h5>
                        <ul className="nav navbar-right panel_toolbox">
                          {roleId === "1" ? (
                            <button className="btn btn-primary btn-sm">
                              <Link
                                to={"/users/add"}
                                style={{ color: "white" }}
                              >
                                Add User
                              </Link>
                            </button>
                          ) : null}
                        </ul>
                      </div>
                      <div className="x_content">
                        <div className="row">
                          <div className="col-md-12 col-sm-12 ">
                            <div className="card-box table-responsive">
                              <table
                                id="datatable"
                                className="table table-striped table-bordered"
                                style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    {roleId === "1" ? <th>Actions</th> : null}
                                  </tr>
                                </thead>

                                <tbody>
                                  {users.map((user) => (
                                    <tr key={user.id}>
                                      <td>{user.name}</td>
                                      <td>{user.email}</td>
                                      <td>{user.role_name}</td>
                                      <td>{user.status}</td>
                                      {roleId === "1" ? (
                                        <td style={{ width: "28%" }}>
                                          <button className="btn btn-primary btn-sm">
                                            <Link
                                              to={`/users/edit/${user.id}`}
                                              style={{ color: "white" }}
                                            >
                                              Edit
                                            </Link>
                                          </button>

                                          <button
                                            className="btn btn-danger btn-sm"
                                            onClick={(e) =>
                                              deleteUser(e, user.id)
                                            }
                                          >
                                            Delete
                                          </button>

                                          <button
                                            className="btn-sm btn-warning"
                                            onClick={() =>
                                              setPasswordToDefault(user.id)
                                            }
                                            style={{ display: "none" }}
                                          >
                                            {buttonText[user.id] ||
                                              "Reset Password to Default"}
                                          </button>
                                        </td>
                                      ) : null}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={Math.ceil(totalUsers / itemsPerPage)}
                                marginPagesDisplayed={5}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                disabledClassName={"disabled"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /page content --> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default UsersTable;

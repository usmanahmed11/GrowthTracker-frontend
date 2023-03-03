import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TopNavigation from "../../components/TopNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "react-bootstrap";
import Settings from "../../components/settings";
import ReactPaginate from "react-paginate";
import moment from "moment";
import API_URL from "../../config";

const DashboardComponents = (props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [showSettings, setShowSettings] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [totalUsers, setTotalUsers] = useState();
  const roleId = document.cookie.replace(
    // eslint-disable-next-line
    /(?:(?:^|.*;\s*)role_id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  useEffect(() => {
    const checkAuth = async () => {
      // get the access token from the cookie
      const accessTokenCookie = document.cookie.replace(
        // eslint-disable-next-line
        /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // redirect the user to the login page if the access token cookie is not present
      if (!accessTokenCookie) {
        props.history.push("/login");
        return;
      }

      // If the access token is present, redirect the user to the dashboard
      props.history.push("/dashboard");
    };

    checkAuth();
  }, [props.history]);

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
        .delete(API_URL + `/growth/${deleteId}`)
        .then((response) => {
          if (response.status === 200) {
            setUsers(users.filter((user) => user.id !== deleteId));
            setShow(false);
            setData(data.filter((item) => item.id !== deleteId));

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
    const fetchGrowthData = async () => {
      try {
        let response;
        if (roleId === "3") {
          response = await axios.get(API_URL + "/growthStatus", config);
          setData(response.data.data);
          setTotalUsers(response.data.total);
        } else {
          response = await axios.get(API_URL + "/growth-users", config);
          setData(response.data.data);
          setTotalUsers(response.data.total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGrowthData();
  }, [roleId, currentPage]);

  const handleViewClick = (titleId) => {
    props.history.push(`/growth/candidate/${titleId}`);
  };

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
      <div className="container">
        <div>
          <TopNavigation
            handleSettingsClick={handleSettingsClick}
            handleDashboardClick={handleDashboardClick}
          />
          <div className="my-padding">

          {/* <!-- page content --> */}
          {showTable && (
            <div>
              <div className="col-md-12 col-sm-12 ">
                <div className="x_panel">
                  <div className="x_title d-flex align-items-center justify-content-between">
                    <h5>Growth Management</h5>
                    <ul className="nav navbar-right panel_toolbox">
                      {roleId !== "3" ? (
                        <button className="btn btn-primary btn-sm">
                          <Link to={"/growth/add"} style={{ color: "white" }}>
                            Add Growth
                          </Link>
                        </button>
                      ) : null}
                    </ul>
                  </div>
                  <div className="x_content">
                    <div>
                      <div className="col-md-12 col-sm-12 ">
                        <div className="card-box table-responsive">
                          <table
                            id="datatable"
                            className="table table-striped table-bordered"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Status</th>

                                <th>Created At</th>

                                <th>Actions</th>
                              </tr>
                            </thead>

                            <tbody>
                              {data.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.title}</td>
                                  <td>{item.status}</td>
                                  <td>
                                    {moment(item.created_at).format(
                                      "MMMM D, YYYY"
                                    )}
                                  </td>
                                  {roleId === "3" ? (
                                    <td>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleViewClick(item.id)}
                                      >
                                        View
                                      </button>
                                    </td>
                                  ) : (
                                    <td>
                                      <button className="btn btn-primary btn-sm">
                                        <Link
                                          to={`/growth/update/${item.id}`}
                                          style={{ color: "white" }}
                                        >
                                          Edit
                                        </Link>
                                      </button>

                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={(e) => {
                                          deleteUser(e, item.id);
                                        }}
                                      >
                                        Delete
                                      </button>
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleViewClick(item.id)}
                                      >
                                        View
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={Math.ceil(totalUsers / itemsPerPage)} // use totalUsers instead of users.length
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
          )}

          {showSettings && <Settings />}

          {/* <!-- page content --> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashboardComponents;

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import moment from "moment";
import API_URL from "../../config";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ShowCandidateInfo2 from "../../components/showCandidateInfo2";
const CandidateInfoPage = () => {
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const { titleId } = useParams();

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleViewClick = async (titleId, page) => {
      try {
        const response = await axios.get(
          API_URL + `/get-candidate-info/${titleId}`
        );
        const data = response.data.data;
        setCandidateInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    handleViewClick(titleId);
  }, [titleId]);

  useEffect(() => {
    const handleViewClick = async (titleId, page) => {
      try {
        const response = await axios.get(
          API_URL + `/get-candidate-info/${titleId}`
        );

        setTitle(response.data.data.title);
        setCreatedAt(response.data.data.created_at);
        setStatus(response.data.data.status);
      } catch (error) {
        console.log(error);
      }
    };
    handleViewClick(titleId);
  }, [titleId]);
  const handleModal = (e) => {
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
    // Modify candidateInfo array to send skillSet as an array
    const updatedCandidateInfo = candidateInfo.candidates.map((candidate) => {
      const skillSetArray = candidate.skillSet.split(","); // Split skillSet string into an array
      return { ...candidate, skillSet: skillSetArray };
    });

    try {
      axios
        .post(API_URL + `/growth/${titleId}`, {
          candidateInfo: updatedCandidateInfo,
          title: title,
          status: "Sent",
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success("Email Has Been Sent To All The Recipients Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              onClose: () => {
                window.location.reload();
              },
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
    <div className="nav-md">
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        candidateInfo={candidateInfo}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShowCandidateInfo2 growthData={candidateInfo?.candidates} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            className="btn btn-primary btn-sm"
          >
            Close
          </Button>
          <Button
            type="submit"
            className="btn btn-success btn-sm"
            onClick={(e) => {
              handleSubmit(e, "Sent");
            }}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      <TopNavigation />

      <div className="container ">
        <div className="right_col" role="main">
          <div className="my-padding">
            <div className="col-md-12 col-sm-12 ">
              <div className="x_panel">
                <div className="x_title d-flex align-items-center justify-content-between">
                  <div className="title-container">
                    <div className="back-button">
                      <Link to="/dashboard">
                        <i
                          className="fa fa-arrow-left arrow"
                          aria-hidden="true"
                        ></i>
                      </Link>
                      <br />
                      <span style={{ fontSize: "21px", color: "#73879c" }}>
                        {title}
                      </span>
                    </div>
                  </div>
                  <div className="info-container d-flex align-items-center">
                    {status === "Draft" && (
                      <Button
                        type="submit"
                        className="btn btn-success btn-sm"
                        onClick={(e) => {
                          handleModal(e);
                        }}
                      >
                        Send
                      </Button>
                    )}
                    <label>Status:</label>
                    <span style={{ margin: "2px" }}></span>
                    <h6>
                      {status === "Sent" ? (
                        <span
                          className="badge badge-success"
                          style={{ color: "white" }}
                        >
                          Sent
                        </span>
                      ) : (
                        <span
                          className="badge badge-secondary"
                          style={{ color: "white" }}
                        >
                          Draft
                        </span>
                      )}
                    </h6>

                    <span style={{ margin: "8px" }}></span>
                    <label>Created At:</label>
                    <span style={{ margin: "2px" }}></span>
                    <h6>{moment(createdAt).format("MMMM D, YYYY")}</h6>
                  </div>
                </div>

                <div className="x_content">
                  <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                      <div className="card-box table-responsive">
                        {candidateInfo ? (
                          <table
                            id="datatable"
                            className="table table-striped table-bordered"
                          >
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Experience(years)</th>
                                <th>Skill Set</th>
                                <th>Job Title</th>
                                <th>Team</th>
                                <th>Location</th>
                                <th>Joining Date</th>
                                <th>Status</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {candidateInfo.candidates.map(
                                (candidate, index) => (
                                  <tr key={index}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.experience}</td>
                                    <td>{candidate.skillSet}</td>
                                    <td>{candidate.jobTitle}</td>
                                    <td>{candidate.team}</td>
                                    <td>{candidate.location}</td>
                                    <td>{candidate.joiningDate}</td>
                                    <td>{candidate.status}</td>
                                    <td>
                                      {moment(candidateInfo.created_at).format(
                                        "MMMM D, YYYY"
                                      )}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <p>Loading...</p>
                        )}
                      </div>
                    </div>
                  </div>
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

export default CandidateInfoPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import TopNavigation from "../../components/TopNavigation";
import moment from "moment";
import API_URL from "../../config";
import { Link } from "react-router-dom";

const CandidateInfoPage = () => {
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [status, setStatus] = useState("");
  const { titleId } = useParams();

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

  return (
    <div className="nav-md">
      <TopNavigation />

      <div className="container ">
        <div className="right_col" role="main">
          <div className="my-padding">
            <div className="col-md-12 col-sm-12 ">
              <div className="x_panel">
                <div className="x_title d-flex align-items-center justify-content-between">
                  <div className="title-container">
                  <div className="back-button">
                      <Link to='/dashboard'>
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
                    <label>Status:</label>
                    <span style={{ margin: "2px" }}></span>
                    <h6>{status}</h6>
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
    </div>
  );
};

export default CandidateInfoPage;

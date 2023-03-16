import React from "react";
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ShowCandidateInfo = ({ growthData }) => {
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [greetings, setGreetings] = useState("");
  const [signature, setSignature] = useState("");
  const [subject, setSubject] = useState("");


  useEffect(() => {
    axios
      .get(API_URL + "/email-config")
      .then((response) => {
        setTo(response.data.to);
        setCc(response.data.cc);
        setBcc(response.data.bcc);
        const dateStr = "{{date:dddd DD MMM, YYYY}}"; // original date string
        const formattedDate = moment().format("dddd DD MMM, YYYY"); // formatted date string
        const updatedSubject = response.data.subject.replace(
          dateStr,
          formattedDate
        );
        setSubject(updatedSubject);
        setGreetings(response.data.greetings);
        setSignature(response.data.signature);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{ background: "#f6f6f6" }}>
        <div style={{ paddingLeft: 30 }}></div>

        <table
          style={{
            fontFamily: "Helvetica, 'Open Sans', Arial",
            boxSizing: "border-box",
            fontSize: "12px",
            width: "100%",
            backgroundColor: "#f6f6f6",
            margin: 0,
          }}
        >
          <tbody>
            <tr
              style={{
                fontFamily: "Helvetica, 'Open Sans', Arial",
                boxSizing: "border-box",
                fontSize: "12px",
                margin: 0,
              }}
            >
              
              <td
                style={{
                  fontFamily: "Helvetica, 'Open Sans', Arial",
                  boxSizing: "border-box",
                  fontSize: "12px",
                  verticalAlign: "top",
                  display: "block !important",
                  maxWidth: "900px !important",
                  clear: "both !important",
                  margin: 0,
                  width: "900px",
                }}
                valign="top"
              >
                <div>
                  <table
                    style={{
                      fontFamily: "Helvetica, 'Open Sans', Arial",
                      boxSizing: "border-box",
                      fontSize: "12px",
                      borderRadius: "3px",
                      backgroundColor: "#fff",
                      margin: 0,
                      border: "1px solid #e9e9e9",
                    }}
                    width="100%"
                    cellSpacing="0"
                    cellPadding="0"
                  >
                    <tbody>
                      <tr
                        style={{
                          fontFamily: "Helvetica, 'Open Sans', Arial",
                          boxSizing: "border-box",
                          fontSize: "12px",
                          margin: 0,
                        }}
                      >
                        <td
                          style={{
                            fontFamily: "Helvetica, 'Open Sans', Arial",
                            boxSizing: "border-box",
                            fontSize: "15px",
                            verticalAlign: "top",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: "3px 3px 0 0",
                            backgroundColor: "#fffefe",
                            margin: 0,
                            padding: "0px",
                            borderBottom: "1px solid #b5b9bd",
                          }}
                          valign="top"
                        >
                          <span style={{ float: "left" }}>
                            <span style={{ color: "#212529" }}>
                              <span style={{ paddingLeft: 18 }}>
                                <strong>To:</strong> {to.join(", ")}
                              </span>
                              <br />
                              <span style={{ paddingLeft: 18 }}>
                                {cc.join(", ") ? (
                                  <>
                                    <strong>CC:</strong> {cc.join(", ")}
                                    <br />
                                  </>
                                ) : (
                                  ""
                                )}
                              </span>
                              

                              <span style={{ paddingLeft: 18 }}>
                                {bcc.join(", ") ? (
                                  <>
                                    <strong>Bcc:</strong> {bcc.join(", ")}
                                    <br />
                                  </>
                                ) : (
                                  ""
                                )}
                              </span>

                              <span style={{ paddingLeft: 18 }}>
                                <strong>Subject:</strong> {subject}
                              </span>
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr
                        style={{
                          fontFamily: "Helvetica, 'Open Sans', Arial",
                          boxSizing: "border-box",
                          fontSize: "12px",
                          margin: 0,
                        }}
                      >
                        <td
                          style={{
                            fontFamily: "Helvetica, 'Open Sans', Arial",
                            boxSizing: "border-box",
                            fontSize: "12px",
                            verticalAlign: "top",
                            margin: 0,
                            padding: "20px",
                          }}
                          valign="top"
                        >
                          <table
                            style={{
                              fontFamily: "Helvetica, 'Open Sans', Arial",
                              boxSizing: "border-box",
                              fontSize: "12px",
                              margin: 0,
                            }}
                            width="100%"
                            cellSpacing="0"
                            cellPadding="0"
                          >
                            <tbody>
                              <tr
                                style={{
                                  fontFamily:
                                    "'Helvetica Neue',Helvetica,Arial,sans-serif",
                                  boxSizing: "border-box",
                                  fontSize: "14px",
                                }}
                              >
                                <td
                                  style={{
                                    fontFamily:
                                      "'Helvetica Neue',Helvetica,Arial,sans-serif",
                                    boxSizing: "border-box",
                                    fontSize: "14px",
                                    verticalAlign: "top",
                                    margin: "0",
                                    paddingBottom: "20px",
                                  }}
                                  valign="top"
                                >
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: greetings,
                                    }}
                                  ></p>
                                  <table
                                    id="datatable"
                                    className="table table-striped table-bordered"
                                    style={{ width: "100%" }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Experience</th>
                                        <th>Skill Set</th>
                                        <th>Job Title</th>
                                        <th>Team</th>
                                        <th>Location</th>
                                        <th>Joining Date</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {growthData.candidateInfo.map(
                                        (candidate, index) => (
                                          <tr key={index}>
                                            <td>{candidate.name}</td>
                                            <td>{candidate.experience}</td>
                                            <td>
                                              {candidate.skillSet.join(", ")}
                                            </td>
                                            <td>{candidate.jobTitle}</td>
                                            <td>{candidate.team}</td>
                                            <td>{candidate.location}</td>
                                            <td>
                                              {moment(
                                                candidate.joiningDate
                                              ).format("MMMM DD, YYYY")}
                                            </td>

                                            <td>{candidate.status}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <p
                                dangerouslySetInnerHTML={{ __html: signature }}
                              ></p>

                              <tr
                                style={{
                                  fontFamily: "Helvetica, 'Open Sans', Arial",
                                  boxSizing: "border-box",
                                  fontSize: "12px",
                                  margin: "0",
                                }}
                              >
                                <td
                                  style={{
                                    fontFamily:
                                      "'Helvetica Neue',Helvetica,Arial,sans-serif",
                                    boxSizing: "border-box",
                                    fontSize: "14px",
                                    verticalAlign: "top",
                                    margin: "0",
                                  }}
                                  valign="top"
                                ></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default ShowCandidateInfo;

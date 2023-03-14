import React from "react";
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Chips from "react-chips/lib/Chips";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
        setSubject(response.data.subject);
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
        <div style={{ paddingLeft: 30 }}>
          <p> To: {to.join(", ")}</p>
          <p> {cc.join(", ") ? <p>Cc: {cc.join(", ")}</p> : ""}</p>
          <p> {bcc.join(", ") ? <p>Bcc: {bcc.join(", ")}</p> : ""}</p>
        </div>

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
                  margin: 0,
                }}
                valign="top"
              ></td>
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
                <div
                  style={{
                    fontFamily: "Helvetica, 'Open Sans', Arial",
                    boxSizing: "border-box",
                    fontSize: "12px",
                    maxWidth: "900px",
                    display: "block",
                    margin: "0 auto",
                    padding: "20px",
                  }}
                >
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
                            fontSize: "22px",
                            verticalAlign: "top",
                            color: "#fff",
                            fontWeight: 500,
                            textAlign: "center",
                            borderRadius: "3px 3px 0 0",
                            backgroundColor: "#fffefe",
                            margin: 0,
                            padding: "0px",
                            borderBottom: "1px solid #b5b9bd",
                          }}
                          valign="top"
                        >
                          <strong style={{ padding: "15px", float: "left" }}>
                            <span style={{ color: "#212529" }}>
                              GrowthTracker
                            </span>
                          </strong>
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
                                  Hi ,
                                  <br />
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: greetings,
                                    }}
                                  ></p>
                                  <table
                                    border="2"
                                    style={{ borderCollapse: "collapse" }}
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
                                              {candidate.skillSet.length >
                                                0 && (
                                                <ul>
                                                  {candidate.skillSet.map(
                                                    (skill, index) => (
                                                      <li key={index}>
                                                        {skill}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              )}
                                            </td>
                                            <td>{candidate.jobTitle}</td>
                                            <td>{candidate.team}</td>
                                            <td>{candidate.location}</td>
                                            <td>{candidate.joiningDate}</td>
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
                                >
                                  <strong>Thanks</strong>,
                                  <br />
                                  <strong>GrowthTracker</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
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
                            fontFamily: "Helvetica, 'Open Sans', Arial",
                            boxSizing: "border-box",
                            fontSize: "14px",
                            verticalAlign: "top",
                            color: "#000",
                            textAlign: "center",
                            borderTop: "1px solid #b5b9bd",
                            margin: "0",
                            padding: "0",
                          }}
                          valign="top"
                        >
                          <div style={{ padding: "15px" }}>
                            <p style={{ marginBottom: "0", marginTop: "5px" }}>
                              Please contact support@nxb.com.pk If you find any
                              issue with growthtracker.vteamslabs.com
                            </p>
                            <p style={{ marginTop: "5px" }}>
                              Copyright @2023 Nextbridge (Pvt.) Ltd.
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
              <td
                style={{
                  fontFamily: "Helvetica, 'Open Sans', Arial",
                  boxSizing: "border-box",
                  fontSize: "12px",
                  verticalAlign: "top",
                  margin: "0",
                }}
                valign="top"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default ShowCandidateInfo;

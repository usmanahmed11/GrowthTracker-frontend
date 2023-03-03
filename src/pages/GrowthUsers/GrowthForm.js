import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNavigation from "../../components/TopNavigation";
import { Link } from "react-router-dom";
import Select from "react-select";
import API_URL from "../../config";
import { Button, Modal } from "react-bootstrap";
import Chips from "react-chips/lib/Chips";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const GrowthForm = () => {
  const [jobTitles, setJobTitles] = useState([]);
  const [team, setTeam] = useState([]);
  const [location, setLocation] = useState([]);
  const [status, setStatus] = useState([]);
  const [buttonStatus, setButtonStatus] = useState("Draft");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [skillSet, setSkillSet] = useState([]);

  const [growthData, setGrowthData] = useState({
    title: "",
    email_status: "Pending",
    candidateInfo: [
      {
        name: "",
        experience: "",
        skillSet: [],
        jobTitle: "",
        team: "",
        location: "",
        joiningDate: "",
        status: "",
        showDeleteButton: false,
      },
    ],
  });
  const [titleError, setTitleError] = useState(null);
  const [candidateError, setCandidateError] = useState([]);
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [greetings, setGreetings] = useState("");
  const [signature, setSignature] = useState("");
  const [subject, setSubject] = useState("");
  const [candidateInfo, setCandidateInfo] = useState([]);

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

  useEffect(() => {
    axios
      .get(API_URL + "/team")
      .then((response) => {
        setTeam(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "/skillSet")
      .then((response) => {
        setSkillSet(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "/job-titles")
      .then((response) => {
        setJobTitles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "/location")
      .then((response) => {
        setLocation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL + "/status")
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleValidation = (e) => {
    e.preventDefault();
    setLoading(true);

    setTitleError(null);
    setCandidateError([]);

    if (!growthData.title) {
      setTitleError("Title is required");
    }

    let errorList = [];
    growthData.candidateInfo.forEach((candidate, index) => {
      let candidateErrors = {};
      if (!candidate.name) {
        candidateErrors.name = "Name is required";
      }
      if (!candidate.experience) {
        candidateErrors.experience = "Experience is required";
      }
      if (!candidate.skillSet || candidate.skillSet.length === 0) {
        errorList[index] = {
          ...errorList[index],
          skillSet: "Skill set is required",
        };
      }
      if (!candidate.jobTitle) {
        candidateErrors.jobTitle = "Job title is required";
      }
      if (!candidate.team) {
        candidateErrors.team = "Team is required";
      }
      if (!candidate.location) {
        candidateErrors.location = "Location is required";
      }
      if (!candidate.joiningDate) {
        candidateErrors.joiningDate = "Joining date is required";
      }
      if (!candidate.status) {
        candidateErrors.status = "Status is required";
      }
      if (Object.keys(candidateErrors).length > 0) {
        errorList[index] = { ...errorList[index], ...candidateErrors };
      }
    });

    if (errorList.length > 0) {
      setCandidateError(errorList);
      setLoading(false);

      return;
    }

    setCandidateInfo(growthData.candidateInfo, growthData.title);
    console.log(candidateInfo);
    setShow(true);
  };

  const handleSubmit = (e, Sent) => {
    e.preventDefault();
    setLoading(true);

    setTitleError(null);
    setCandidateError([]);

    if (!growthData.title) {
      setTitleError("Title is required");
    }

    let errorList = [];
    growthData.candidateInfo.forEach((candidate, index) => {
      let candidateErrors = {};
      if (!candidate.name) {
        candidateErrors.name = "Name is required";
      }
      if (!candidate.experience) {
        candidateErrors.experience = "Experience is required";
      }
      if (!candidate.skillSet || candidate.skillSet.length === 0) {
        errorList[index] = {
          ...errorList[index],
          skillSet: "Skill set is required",
        };
      }
      if (!candidate.jobTitle) {
        candidateErrors.jobTitle = "Job title is required";
      }
      if (!candidate.team) {
        candidateErrors.team = "Team is required";
      }
      if (!candidate.location) {
        candidateErrors.location = "Location is required";
      }
      if (!candidate.joiningDate) {
        candidateErrors.joiningDate = "Joining date is required";
      }
      if (!candidate.status) {
        candidateErrors.status = "Status is required";
      }
      if (Object.keys(candidateErrors).length > 0) {
        errorList[index] = { ...errorList[index], ...candidateErrors };
      }
    });

    if (errorList.length > 0) {
      setCandidateError(errorList);
      setLoading(false);

      return;
    }
    const growthDataWithStatus = { ...growthData, status : Sent };
    try {
      axios
        .post(API_URL + "/growth", growthDataWithStatus)
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
    } catch (error) {
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
    }

    
  };

  const handleCandidateInfoChange = (e, index) => {
    const { name, value } = e.target;
    const newCandidateInfo = [...growthData.candidateInfo];
    if (name === "skillSet") {
      if (Array.isArray(value)) {
        newCandidateInfo[index][name] = value;
      } else {
        newCandidateInfo[index][name] = value.map((option) => option.value);
      }
    } else {
      newCandidateInfo[index][name] = value;
    }
    setGrowthData({ ...growthData, candidateInfo: newCandidateInfo });
  };

  const handleDeleteCandidateInfo = (index) => {
    const candidateInfoCopy = [...growthData.candidateInfo];
    candidateInfoCopy.splice(index, 1);
    setGrowthData({
      ...growthData,
      candidateInfo: candidateInfoCopy,
    });
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        candidateInfo={candidateInfo}
      >
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-6 mx-auto">
            <div className="x_content">
              <div className="form-group row">
                <label className="col-md-6 col-form-label">
                  <span style={{ color: "red" }}>*</span> To:
                </label>
                <div className="col-md-10">
                  <div className="has-feedback my-colorClass">
                    <Chips value={to} className={"form-control "} />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-6 col-form-label">CC:</label>
                <div className="col-md-10">
                  <div className="has-feedback my-colorClass">
                    <Chips value={cc} className={"form-control"} />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-6 col-form-label">BCC:</label>
                <div className="col-md-10">
                  <div className="has-feedback my-colorClass">
                    <Chips value={bcc} className={"form-control"} />
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-md-6 col-form-label">
                  <span style={{ color: "red" }}>*</span>
                  Subject:
                </label>

                <div className="col-md-10">
                  <div
                    className="has-feedback my-colorClass"
                    style={{ position: "relative" }}
                  >
                    <input value={subject} className="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mx-auto">
            <div>
              <div>
                <div className="form-group row">
                  <label className="col-md-6 col-form-label">
                    <span style={{ color: "red" }}>*</span>
                    Greetings:
                  </label>
                  <div className="col-md-12 ckeditor-container">
                    <div className="has-feedback my-colorClass">
                      <CKEditor
                        className={"form-control"}
                        editor={ClassicEditor}
                        disabled={ClassicEditor}
                        data={greetings}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-md-6 col-form-label">
                    <span style={{ color: "red" }}>*</span>
                    Signature:
                  </label>
                  <div className="col-md-12 ">
                    <div className="has-feedback my-colorClass">
                      <CKEditor
                        className={"form-control"}
                        editor={ClassicEditor}
                        disabled={ClassicEditor}
                        data={signature}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            className="btn btn-success"
            onClick={(e) => {
              handleSubmit(e, "Sent");
              setShow(false);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <TopNavigation />

      <div className="container body" style={{ overflowX: "hidden" }}>
        <div className="right_col" role="main">
          <div className="my-padding">
            <div className="col-md-12 mx-auto">
              <div className="x_panel">
                <div className="x_title my-breadcrumbstyle">
                  <h2>Add Growth</h2>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-bgcolor">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Growth</Link>
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
                    onSubmit={(e) => handleSubmit(e)}
                    className="input_mask"
                    autoComplete="off"
                  >
                    <div className="form-group row">
                      <div className="col-md-12">
                        <div className="has-feedback">
                          <input
                            type="text"
                            value={growthData.title}
                            onChange={(e) =>
                              setGrowthData({
                                ...growthData,
                                title: e.target.value,
                              })
                            }
                            className={`form-control ${
                              titleError ? "is-invalid" : ""
                            } has-feedback-left`}
                            placeholder="Title"
                          />
                          <span className="fa fa-certificate form-control-feedback left"></span>
                        </div>
                        {titleError && (
                          <div className="invalid-feedback d-block">
                            {titleError}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="x_title">
                      <h2>Candidate Info</h2>
                      <div className="clearfix"></div>
                    </div>

                    {growthData.candidateInfo.map((candidate, index) => (
                      <div key={index}>
                        {index > 0 && <hr />}

                        {candidate.showDeleteButton && (
                          <button
                            className=" fa fa-times btn-danger float-right btn-sm"
                            type="button"
                            onClick={() => handleDeleteCandidateInfo(index)}
                          />
                        )}
                        <div className="clearfix"></div>

                        <div className="form-group row">
                          <div className="col-md-3">
                            <div className="has-feedback">
                              <input
                                type="text"
                                name="name"
                                value={candidate.name}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                placeholder="Name"
                                className={`form-control ${
                                  candidateError[index]?.name
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                              />
                              <span className="fa fa-user form-control-feedback left"></span>
                            </div>

                            {candidateError[index]?.name && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.name}
                              </div>
                            )}
                          </div>

                          <div className="col-md-3">
                            <div className="has-feedback">
                              <input
                                type="text"
                                name="experience"
                                value={candidate.experience}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                placeholder="Experience"
                                className={`form-control ${
                                  candidateError[index]?.experience
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                              />
                              <span className="fa fa-clock-o form-control-feedback left"></span>
                            </div>

                            {candidateError[index]?.experience && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.experience}
                              </div>
                            )}
                          </div>
                          <div className="col-md-3">
                            <div className="has-feedback">
                              <select
                                name="status"
                                value={candidate.status}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                className={`form-control ${
                                  candidateError[index]?.status
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                                style={{ paddingLeft: "5px" }}
                              >
                                <option value="">Select Status</option>
                                {status.map((status) => (
                                  <option key={status.id} value={status.status}>
                                    {status.status}
                                  </option>
                                ))}
                              </select>
                              {/* <span className="fa fa-check form-control-feedback left"></span> */}
                            </div>

                            {candidateError[index]?.status && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.status}
                              </div>
                            )}
                          </div>

                          <div className="col-md-3">
                            <div className="has-feedback">
                              <select
                                name="jobTitle"
                                value={candidate.jobTitle}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                className={`form-control ${
                                  candidateError[index]?.jobTitle
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                                style={{ paddingLeft: "5px" }}
                              >
                                <option value="">Select Job Title</option>
                                {jobTitles.map((jobTitle) => (
                                  <option
                                    key={jobTitle.id}
                                    value={jobTitle.job_title}
                                  >
                                    {jobTitle.job_title}
                                  </option>
                                ))}
                              </select>
                              {/* <span className="fa fa-briefcase form-control-feedback left"></span> */}
                            </div>
                            {candidateError[index]?.jobTitle && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.jobTitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-md-4">
                            <div className="has-feedback">
                              <select
                                name="team"
                                value={candidate.team}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                className={`form-control ${
                                  candidateError[index]?.team
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                                style={{ paddingLeft: "5px" }}
                              >
                                <option value="">Select Team</option>
                                {team.map((team) => (
                                  <option key={team.id} value={team.team_name}>
                                    {team.team_name}
                                  </option>
                                ))}
                              </select>
                              {/* <span className="fa fa-users form-control-feedback left"></span> */}
                            </div>

                            {candidateError[index]?.team && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.team}
                              </div>
                            )}
                          </div>

                          <div className="col-md-4">
                            <div className="has-feedback">
                              <select
                                name="location"
                                value={candidate.location}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                className={`form-control ${
                                  candidateError[index]?.location
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                                style={{ paddingLeft: "5px" }}
                              >
                                <option value="">Select Location</option>
                                {location.map((location) => (
                                  <option
                                    key={location.id}
                                    value={location.location_name}
                                  >
                                    {location.location_name}
                                  </option>
                                ))}
                              </select>
                              {/* <span className="fa fa-map-marker form-control-feedback left"></span> */}
                            </div>

                            {candidateError[index]?.location && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.location}
                              </div>
                            )}
                          </div>
                          <div className="col-md-4">
                            <div className="has-feedback">
                              <input
                                type="date"
                                name="joiningDate"
                                value={candidate.joiningDate}
                                onChange={(e) =>
                                  handleCandidateInfoChange(e, index)
                                }
                                placeholder="Joining Date"
                                className={`form-control ${
                                  candidateError[index]?.joiningDate
                                    ? "is-invalid"
                                    : ""
                                } has-feedback-left`}
                              />
                              <span className="fa fa-calendar form-control-feedback left"></span>
                            </div>

                            {candidateError[index]?.joiningDate && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.joiningDate}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-group row">
                          <div className="col-md-12">
                            <div className="form-control-select">
                              <Select
                                name="skillSet"
                                value={growthData.candidateInfo[
                                  index
                                ].skillSet.map((skill) => ({
                                  value: skill,
                                  label: skill,
                                }))}
                                onChange={(selectedOptions) => {
                                  const selectedValues = selectedOptions.map(
                                    (option) => option.value
                                  );
                                  handleCandidateInfoChange(
                                    {
                                      target: {
                                        name: "skillSet",
                                        value: selectedValues,
                                      },
                                    },
                                    index
                                  );
                                }}
                                options={skillSet.map((skill) => ({
                                  value: skill.skill_name,
                                  label: skill.skill_name,
                                }))}
                                placeholder="Select Skill"
                                isMulti
                                styles={{
                                  placeholder: (provided) => ({
                                    ...provided,
                                    color: "black",
                                  }),
                                  control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.selectProps.menuIsOpen
                                      ? provided.borderColor
                                      : candidateError[index]?.skillSet
                                      ? "red"
                                      : provided.borderColor,
                                    "&:hover": {
                                      borderColor: state.selectProps.menuIsOpen
                                        ? provided.borderColor
                                        : candidateError[index]?.skillSet
                                        ? "red"
                                        : provided.borderColor,
                                    },
                                  }),
                                }}
                              />
                            </div>

                            {candidateError[index]?.skillSet && (
                              <div className="invalid-feedback d-block">
                                {candidateError[index]?.skillSet}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() =>
                          setGrowthData({
                            ...growthData,
                            candidateInfo: [
                              ...growthData.candidateInfo,
                              {
                                name: "",
                                experience: "",
                                skillSet: [],
                                jobTitle: "",
                                team: "",
                                location: "",
                                joiningDate: "",
                                status: "",
                                showDeleteButton: true,
                              },
                            ],
                          })
                        }
                      >
                        <i className="fa fa-plus "></i>
                      </button>
                    </div>
                    <br />

                    <div className="col-md-5 form-group d-flex justify-content-start">
                      <Link to="/dashboard">
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
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => {
                          handleSubmit(e, "Draft");
                        }}
                      >
                        Save as Draft
                      </button>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={(e) => handleValidation(e)}
                      >
                        Submit and Send
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

export default GrowthForm;

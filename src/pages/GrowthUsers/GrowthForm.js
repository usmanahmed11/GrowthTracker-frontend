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

  // The useEffect hook gets email configuration data from the API and
  // updates state variables using setTo(), setCc(), setBcc(), setSubject(), setGreetings() and setSignature()
  // functions provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.

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

  // The useEffect hook gets team data from the API and updates the team state variable using setTeam()
  // function provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.
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

  // The useEffect hook gets skill set data from the API and updates the skillSet
  // state variable using setSkillSet() function provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.
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

  // The useEffect hook gets job titles data from the API and updates the
  //jobTitles state variable using setJobTitles() function provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.
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

  // The fifth useEffect hook gets location data from the API and updates the location
  // state variable using setLocation() function provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.
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

  // The sixth useEffect hook gets status data from the API and updates the status state
  // variable using setStatus() function provided by React's useState hook.
  // It takes an empty array [] as the second argument to only run once, when the component mounts.
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
    //Prevents the page from reloading
    e.preventDefault();

    // set the loading state to true to indicate the form is being submitted
    setLoading(true);

    // reset any previous errors
    setTitleError(null);
    setCandidateError([]);

    // validate the title input
    if (!growthData.title) {
      setTitleError("Title is required");
    }

    // validate the candidate information
    let errorList = [];
    growthData.candidateInfo.forEach((candidate, index) => {
      let candidateErrors = {};

      // validate the name input
      if (!candidate.name) {
        candidateErrors.name = "Name is required";
      }

      // validate the experience input
      if (!candidate.experience) {
        candidateErrors.experience = "Experience is required";
      }
      // validate the skillset input

      if (!candidate.skillSet || candidate.skillSet.length === 0) {
        errorList[index] = {
          ...errorList[index],
          skillSet: "Skill set is required",
        };
      }
      // validate the job title input

      if (!candidate.jobTitle) {
        candidateErrors.jobTitle = "Job title is required";
      }
      // validate the team input

      if (!candidate.team) {
        candidateErrors.team = "Team is required";
      }
      // validate the location input

      if (!candidate.location) {
        candidateErrors.location = "Location is required";
      }
      // validate the joining date input

      if (!candidate.joiningDate) {
        candidateErrors.joiningDate = "Joining date is required";
      }
      // validate the status input

      if (!candidate.status) {
        candidateErrors.status = "Status is required";
      }
      // if there are any errors, add them to the errorList
      if (Object.keys(candidateErrors).length > 0) {
        errorList[index] = { ...errorList[index], ...candidateErrors };
      }
    });

    // if there are any errors in the candidate information, set them and stop the form submission
    if (errorList.length > 0) {
      setCandidateError(errorList);
      setLoading(false);

      return;
    }
    // if there are no errors, set the candidate information and show the confirmation modal
    setCandidateInfo(growthData.candidateInfo, growthData.title);
    setShow(true);
  };

  const handleSubmit = (e, Sent) => {
    e.preventDefault();
    setLoading(true);

    setTitleError(null);
    setCandidateError([]);

    // Validate all the data before sending api request

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
    // Adds the 'Sent' status to the growthData object
    const growthDataWithStatus = { ...growthData, status: Sent };

    // Sends a post request to the API with the growthData object
    try {
      axios
        .post(API_URL + "/growth", growthDataWithStatus)
        .then((response) => {
          // If the request is successful, stops loading and shows a success toast message
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
          // If there's an error, stops loading and shows an error toast message
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
      // If there's an error, stops loading and shows an error toast message
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
    // Destructuring name and value from the event target.
    const { name, value } = e.target;

    // Making a copy of the candidateInfo array using the spread operator.
    const newCandidateInfo = [...growthData.candidateInfo];

    // If the name is skillSet, check if the value is an array or not.
    if (name === "skillSet") {
      // If value is an array, set the value of the skillSet at the given index in the newCandidateInfo array to the value received in the event.
      if (Array.isArray(value)) {
        newCandidateInfo[index][name] = value;
      } else {
        // If the value is not an array, map over the value and set the value of the skillSet at the given index
        //in the newCandidateInfo array to an array of option values received in the event.
        newCandidateInfo[index][name] = value.map((option) => option.value);
      }
    } else {
      // If the name is not skillSet, set the value of the name at the
      // given index in the newCandidateInfo array to the value received in the event.
      newCandidateInfo[index][name] = value;
    }
    // Update the growthData state with the newCandidateInfo array using the spread operator.
    setGrowthData({ ...growthData, candidateInfo: newCandidateInfo });
  };

  const handleDeleteCandidateInfo = (index) => {
    // Create a copy of the candidateInfo array from the state
    const candidateInfoCopy = [...growthData.candidateInfo];

    // Remove the candidate at the specified index from the copied array
    candidateInfoCopy.splice(index, 1);

    // Update the state with the new candidateInfo array
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

      <div className="container body" >
        <div className="right_col" role="main">
          <div className="my-padding">
            <div className="col-md-12 mx-auto">
              <div className="x_panel">
                <div className="x_title my-breadcrumbstyle">
                <div className="back-button">
                      <Link to='/dashboard'>
                        <i
                           className="fa fa-arrow-left arrow"
                          aria-hidden="true"
                      
                        ></i>
                      </Link>
                      <br />
                      <span style={{ fontSize: "21px", color: "#73879c" }}>
                       Add Growth
                      </span>
                    </div>
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import Chips from "react-chips";
import TopNavigation from "../../components/TopNavigation";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import API_URL from "../../config";

function EmailForm() {
  const [toError, setToError] = useState(null);
  const [subjectError, setSubjectError] = useState(null);
  const [greetingsError, setGreetingsError] = useState(null);
  const [signatureError, setSignatureError] = useState(null);
  const [to, setTo] = useState([]);
  const [cc, setCc] = useState([]);
  const [bcc, setBcc] = useState([]);
  const [greetings, setGreetings] = useState("");
  const [signature, setSignature] = useState("");
  const [subject, setSubject] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const DEFAULT_SUBJECT = "End of Day Report - {{date:dddd DD MMM, YYYY}}";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate form data
    if (to.length === 0) {
      setToError("To field is required");
    }

    if (!subject) {
      setSubjectError("Subject field is required");
    }
    if (!greetings) {
      setGreetingsError("Greetings field is required");
    }
    if (!signature) {
      setSignatureError("Signature field is required");
    }
    if (to.length === 0 || !subject || !greetings || !signature) {
      setLoading(false);
      return;
    }

    axios
      .post(API_URL + "/email-config", {
        to: to,
        cc: cc,
        bcc: bcc,
        subject: subject,
        greetings: greetings,
        signature: signature,
      })
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
  };
  const handleReset = () => {
    setIsReset(true);
    setSubject(DEFAULT_SUBJECT);
    setIsReset(false);
  };

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="container body">
        <div className="right_col" role="main">
          <div className="my-padding">
            <form onSubmit={handleSubmit} className="input_mask">
              <div className="col-md-12 mx-auto">
                <div className="x_panel">
                  <div className="x_title my-breadcrumbstyle">
                    <h2>Email Configuration</h2>
                    <nav aria-label="breadcrumb">
                      <ol
                        className="breadcrumb m-0"
                        style={{ backgroundColor: "white" }}
                      >
                        <li className="breadcrumb-item">
                          <Link to="/dashboard">Growth</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Email-Configuration
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <div className="x_content">
                      <br />

                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">
                          <span style={{ color: "red" }}>*</span> To:
                        </label>
                        <div className="col-md-10">
                          <div className="has-feedback my-colorClass">
                            <Chips
                              value={to}
                              onChange={setTo}
                              placeholder="Add recipient(s)"
                              name="to"
                              id="to"
                              className={
                                toError
                                  ? "form-control is-invalid my-class"
                                  : "form-control my-class"
                              }
                            />
                          </div>
                          {toError && <p style={{ color: "red" }}>{toError}</p>}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">CC:</label>
                        <div className="col-md-10">
                          <div className="has-feedback my-colorClass">
                            <Chips
                              value={cc || []}
                              onChange={setCc}
                              name="cc"
                              id="cc"
                              className={"form-control"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-md-6 col-form-label">BCC:</label>
                        <div className="col-md-10">
                          <div className="has-feedback my-colorClass">
                            <Chips
                              value={bcc || []}
                              onChange={setBcc}
                              name="bcc"
                              id="bcc"
                              className={"form-control"}
                            />
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
                            <input
                              value={isReset ? DEFAULT_SUBJECT : subject}
                              onChange={(e) => setSubject(e.target.value)}
                              type="text"
                              name="subject"
                              id="subject"
                              className={`form-control ${
                                subjectError ? "" : ""
                              }`}
                            />
                            <button
                              type="button"
                              className="btn btn-submit"
                              onClick={handleReset}
                              style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                transform: "translateY(-50%)",
                              }}
                            >
                              Reset
                            </button>
                          </div>
                          {subjectError && (
                            <div className="invalid-feedback d-block">
                              <p style={{ color: "red" }}> {subjectError}</p>
                            </div>
                          )}
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
                                className={`form-control ${
                                  greetingsError ? "is-invalid" : ""
                                } has-feedback-left`}
                                editor={ClassicEditor}
                                data={greetings}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setGreetings(data);
                                }}
                              />
                            </div>
                            {greetingsError && (
                              <div className="invalid-feedback d-block">
                                <p style={{ color: "red" }}>{greetingsError}</p>
                              </div>
                            )}
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
                                className={`form-control ${
                                  greetingsError ? "is-invalid" : ""
                                } has-feedback-left`}
                                editor={ClassicEditor}
                                data={signature}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setSignature(data);
                                }}
                              />
                            </div>
                            {signatureError && (
                              <div className="invalid-feedback d-block">
                                <p style={{ color: "red" }}>{signatureError}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 ">
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
                        className="btn btn-success btn-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
}

export default EmailForm;

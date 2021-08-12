import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./edit.css";
import Dashboard from "../../Dashboard.js";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudent = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});

  async function getStudentDetails() {
    const response = await fetch("http://localhost:5004/getstudent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idd: id }),
    });

    const data1 = await response.json();
    console.log(data1);
    setData(data1);
    console.log(data);
  }

  //toast function
  const notify = () => {
    toast("student updated! ");
  };

  //name change handlers
  function fnameHandler(e) {
    console.log(data);
    setData({ ...data, fname: e.target.value });
  }
  function lnameHandler(e) {
    console.log(data);
    setData({ ...data, lname: e.target.value });
  }

  //onsubmit handler
  async function onSubmitHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5004/updatestudents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      notify();
      const d = await response.json();
      console.log(d);
    }
  }

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <div className="editdetails-parent">
      <Dashboard />
      <ToastContainer />
      <div className="editdetails-child">
        <form>
          <i
          type="button"
            className="bi bi-arrow-bar-left fs-5 mb-3 fw-bold"
            onClick={(e) => history.push("/addstudent")}
          >Go Back</i>
          <p className="fs-3 fw-bold justify-content-center">
            Edit Student Details :
          </p>
          <div className="mb-3">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control fw-bold"
              id="fname"
              value={data.fname ? data.fname : ""}
              aria-describedby="first name"
              onChange={(e) => fnameHandler(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control fw-bold"
              id="lname"
              onChange={(e) => lnameHandler(e)}
              value={data.lname}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lname" className="form-label">
              Assigned Mentor
            </label>
            <input
              type="text"
              className="form-control fw-bold"
              id="lname"
              value={data.mentorName}
              readonly
              data-tip="to change mentor headover to change mentor section"
            />
            <ReactTooltip />
          </div>

          {/* <select className="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> */}

          <button
            type="submit"
            className="btn1 btn btn-primary"
            onClick={onSubmitHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./edit.css";
import Dashboard from "../../Dashboard.js";
import ReactTooltip from "react-tooltip";

const EditStudent = () => {
  const { id } = useParams();
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
      alert("success");
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
      <div className="editdetails-child container">
        <form>
          <p className="fs-3 fw-bold justify-content-center">
            Edit Student Details :
          </p>
          <div class="mb-3">
            <label htmlFor="fname" class="form-label">
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
          <div class="mb-3">
            <label for="lname" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              class="form-control fw-bold"
              id="lname"
              onChange={(e) => lnameHandler(e)}
              value={data.lname}
            />
          </div>
          <div class="mb-3">
            <label for="lname" class="form-label">
              Assigned Mentor
            </label>
            <input
              type="text"
              class="form-control fw-bold"
              id="lname"
              value={data.mentorName}
              readonly
              data-tip="to change mentor headover to change mentor section"
            />
            <ReactTooltip />
          </div>

          {/* <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select> */}

          <button
            type="submit"
            class="btn1 btn btn-primary"
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

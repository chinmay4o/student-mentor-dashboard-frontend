import React, { useState, useEffect } from "react";
import Dashboard from "../../Dashboard.js";
// import ReactTooltip from "react-tooltip";
import "./showstu.css";

const ShowStu = () => {
  const [StuData, setStuData] = useState([]);
  const [Mentordata, setMentorData] = useState([]);
  const [mentorId, setMentorId] = useState("");

  //getting all studetns
  async function getStudentDetails() {
    const response = await fetch("http://localhost:5004/students", {
      method: "GET",
    });

    const data1 = await response.json();
    console.log(data1);
    setStuData(data1);
  }

  //getting all menotrs
  async function getMentorDetails() {
    const response = await fetch("http://localhost:5004/mentors", {
      method: "GET",
    });

    const data1 = await response.json();
    console.log(data1);
    setMentorData(data1);
  }

  //listing mentors
  function printMentors(ele, index) {
    return (
      <option key={index} value={ele._id}>
        {ele.fname}
      </option>
    );
  }

  //listing students
  function printStuData(ele, index) {
    if (mentorId) {
      if (ele.mentorId === mentorId) {
        return (
          <li className="list-group-item" key={index}>
            {ele.fname}
          </li>
        );
      }
    }
    return;
  }

  useEffect(() => {
    getStudentDetails();
    getMentorDetails();
    console.log(window);
    console.log(window.screen.width);
  }, []);

  return (
    <div className="show-parent">
     {window.screen.width > 600 ? <Dashboard /> : null}

      <div className="show-child">
        <p className="fs-3 fw-bold justify-content-center">
          show students for selected Mentors
        </p>
        <div className="div3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setMentorId(e.target.value);
              console.log(mentorId);
            }}
          >
            <option selected>Open this to select Mentor</option>
            {Mentordata.length > 0 ? Mentordata.map(printMentors) : null}
          </select>

          <ul className="list-group">
            {StuData.length > 0 ? StuData.map(printStuData) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowStu;

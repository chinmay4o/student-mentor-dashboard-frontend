import React, { useState, useEffect } from "react";
import Dashboard from "../../Dashboard.js";
import "./changementor.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangeMentors = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [assignMentors, setAssignMentors] = useState({
    id: "",
    name: "",
  });
  const [assignStudents, setAssignStudents] = useState([]);



  //toast function
  const notify = () => {
    toast("mentor changed! ")
  }

  //getting students from database
  const listStudents = async () => {
    const response = await fetch("http://localhost:5004/students", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    setStudents(data);
  };

  //getting mentors from database
  async function listMentors() {
    const response = await fetch("http://localhost:5004/mentors", {
      method: "GET",
      Accept: "application/json",
    });

    const data = await response.json();
    setMentors(data);
    console.log("mentors", data);
  }

  //mapping students array
  function printStudents(ele, index) {
    return (
      <li
        className="list-group-item"
        style={ele.mentorId ? { display: "block" } : { display: "none" }}
      >
        <input
          class="form-check-input me-3 p-2"
          type="checkbox"
          value=""
          aria-label="..."
          // checked= "false"
          onClick={(e) => {
            if (e.target.checked === true) {
              setAssignStudents([...assignStudents, ele._id]);
              console.log(ele._id);
              console.log(assignStudents);
            }
            if (e.target.checked === false) {
              setAssignStudents(
                assignStudents.filter((ele1) => ele1 !== ele._id)
              );
              console.log("false from printStudents");
              console.log(ele._id);
              console.log(assignStudents);
            }

            return console.log(e.target.checked);
          }}
        ></input>

        {/* {!ele.mentorId && ele.fname} */}
        {ele.mentorId ? ele.fname : null}
      </li>
    );
  }

  //mapping mentors array
  function printMentors(ele, index) {
    return (
      <li className="list-group-item">
        <input
          className="form-check-input me-3 p-2"
          type="radio"
          value={ele._id}
          name="mentor"
          onClick={() => {
            setAssignMentors({
              id: ele._id,
              name: ele.fname,
            });
          }}
        />
        {ele.fname} 
        {/* ({ele._id}) */}
      </li>
    );
  }

  // final button handler
  async function finalAssignHandler(e) {
    //  e.preventDefault();
    console.log(assignStudents);
    console.log(assignMentors);
    const response = await fetch("http://localhost:5004/assignmentor", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentList: assignStudents,
        mentorId: assignMentors.id,
        mentorName: assignMentors.name,
      }),
    });

    if (response.status === 200) {
        notify();
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      alert("fail");
    }
  }
  // useEffect hook
  useEffect(() => {
    listStudents();
    listMentors();
  }, []);
  return (
    <>
      <div className="assign-parent">
        <Dashboard />
        <ToastContainer />
        <div className="assign-child">
          <div className="row g-4">
            {/* students list */}
            <div className="student-list col-12 col-md-6 ">
              <p className="fw-bold fs-3 mb-3">Select students to assign</p>
              <ul className="list-group">
                {/* {students.length > 0 ? students[0].name : null} */}
                {students.length > 0 ? (
                  students.map(printStudents)
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </ul>
            </div>

            {/* mentors list */}
            <div className="mentor-list col-12 col-md-6">
              <p className="fw-bold fs-3 mb-3">Select Mentor to assign</p>
              <ul className="list-group">
                {mentors.length > 0 ? (
                  mentors.map(printMentors)
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </ul>

              <button
                className="btn1 btn-primary mt-4 rounded fw-bold"
                onClick={finalAssignHandler}
              >
                Change Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeMentors;

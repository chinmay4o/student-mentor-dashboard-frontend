import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import "./assignmentor.css";
import PrintMentor from "./PrintMentor";

const AssignMentor = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [assignMentors, setAssignMentors] = useState({
    id: "",
    name: "",
  });
  const [assignStudents, setAssignStudents] = useState([]);

  const [count, setCount] = useState(0);

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
      <li className="list-group-item"
      style={ele.mentorId ? {"display" : "none"} : {"display" : "block"}}
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
        {!ele.mentorId ?  ele.fname : null}
      </li>
    );
  }

  //mapping mentors array
  function printMentors(ele, index) {
    return (
      <PrintMentor
        ele={{ ...ele }}
        count={count}
        setCount={setCount}
        assignMentors={assignMentors}
        setAssignMentors={setAssignMentors}
      />
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
      alert("success");
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
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
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
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </ul>

              <button
                className="btn1 btn-primary mt-4 rounded fw-bold"
                onClick={finalAssignHandler}
              >
                Assign Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignMentor;

// const [assignments, setAssignments] = useState({
//   students: [],
//   mentor : ""
// });

// setAssignments({...assignments , students: [...assignments.students , ele._id]});

//  if(e.target.checked === false) {
//            setAssignments({students: assignments.students.filter(ele1 => ele1._id !==  ele._id)});
//           console.log("false from printStudents");
//           console.log(ele._id);
//           console.log(assignments);
//          }

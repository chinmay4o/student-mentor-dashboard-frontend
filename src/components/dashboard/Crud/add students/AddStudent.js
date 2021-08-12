import React, { useState, useEffect } from "react";
import Dashboard from "../../Dashboard.js";
import "./student.css";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

const AddStudent = () => {
  const history = useHistory();
  const [stuName, setStuName] = useState({
    fname: "",
    lname: "",
  });
  const [data, setData] = useState([]);

  //onSubmit handler
  async function addStudentHandler(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5004/addstudents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stuName),
    });

    stuName.fname = "";
    stuName.lname = "";

    stuTable();
    if (response.status === 200) {
      alert("Success");
    }
  }

  //getting all - listing studetns
  async function stuTable() {
    const response = await fetch("http://localhost:5004/students", {
      method: "GET",
    });

    const data1 = await response.json();
    console.log(data1);
    setData(data1);
  }

  //delete student
  async function deleteStudent(id) {
    console.log(id);
    const response = await fetch("http://localhost:5004/studentDelete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    stuTable();
    alert(JSON.stringify(data.error));
  }

  //tabel maaping;
  function mapTable(ele, index) {
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{ele.fname}</td>
        <td>{ele.lname}</td>
        <td colspan="1">{ele.mentorName}</td>
        <td role="button">
          <div className="row">
            <div className="col-6">
              <i
                onClick={() => deleteStudent(ele._id)}
                class="bi  bi-person-x-fill"
                data-tip="Delete user"
                data-background-color="red"
              ></i>
              <ReactTooltip />
            </div>
            <div className="col-6">
              <i
                onClick={() => history.push(`/editdetails/${ele._id}`)}
                class="bi bi-pencil-square"
                data-tip="Edit user"
                data-background-color="blue"
              ></i>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  useEffect(() => {
    stuTable();
  }, []);
  return (
    <div className="addstu-parent">
      <Dashboard />

      <div className="addstu-child p-5">
        <div className="row g-4">
          <p className="fw-bold fs-3 mb-3 justify-content-center d-grid">
            Add Students to the database
          </p>

            <form className="student-list col-12 col-md-6">
              <div className="mb-3">
                <label htmlFor="stuName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stuName"
                  value={stuName.fname}
                  onChange={(e) => {
                    setStuName({ ...stuName, fname: e.target.value });
                    console.log(stuName);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="stuName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stuName"
                  value={stuName.lname}
                  onChange={(e) => {
                    setStuName({ ...stuName, lname: e.target.value });
                    console.log(stuName);
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn1 btn-primary col-6 mt-4"
                onClick={addStudentHandler}
              >
                Add Student
              </button>
            </form>

          <div className="table-list col-12 col-md-6">
            <p className="fw-bold fs-3 mb-3 justify-content-center d-grid">
              Existing Students
            </p>

            <table class="table table-striped table-dark mt-3 table-bordered align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Date added</th>
                  <th scope="col">More</th>
                </tr>
              </thead>
              <tbody>{data.map(mapTable)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;

import React, { useState, useEffect } from "react";
import Dashboard from "../../Dashboard.js";
import "./mentor.css";
import ReactTooltip from 'react-tooltip'


const AddMentor = () => {
  const [mentorName, setMentorName] = useState({
    fname: "",
    lname: ""
  });
  const [data, setData] = useState([]);

  // onclick creating mentor
  const addMentorHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5004/addmentors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mentorName),
    });

    if (response.status === 200) {
      alert("success");
      getMentors();
    }
  };

  // getting mentors array to map in table
  async function getMentors() {
    const response = await fetch("http://localhost:5004/mentors", {
      method: "GET",
    });

    const data1 = await response.json();
    setData(data1);
    console.log(data1);
  }

  //mapping details of mentors .map menthod
  function mapTable(ele, index) {
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{ele.fname}</td> 
        <td>{ele.lname}</td> 
       <td>{ele.dateCreated}</td> 
       <td role="button" onClick={() => true}>delete Me!</td>
      </tr>
    );
  }

  //useEffect hook
  useEffect(() => {
    getMentors();
  }, []);

  return (
    <div className="addMentor-parent">
      <Dashboard />

      <div className="addMentor-container">
        <div className="row g-4">
          <p className="fw-bold fs-3 mb-3 d-grid justify-content-center">
            Add Mentors to the database
          </p>

          <form className="col-12 col-md-6 div1">
            <div className="mb-3">
              <label htmlFor="mentor" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="mentor"
                aria-describedby="fname"
                onChange={(e) => setMentorName({...mentorName , fname: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mentor" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="mentor"
                aria-describedby="lname"
                onChange={(e) => setMentorName({...mentorName , lname: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="btn btn1 btn-primary"
              onClick={addMentorHandler}
            >
              Submit
            </button>
          </form>

          <div className="col-12 col-md-6 div2">
            <table class="table table-striped table-dark mt-5 ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Date added</th>
                  <th scope="col">Delete</th>
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

export default AddMentor;

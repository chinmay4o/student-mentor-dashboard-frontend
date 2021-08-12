import React from "react";
import "./sidebar.css";
import {useHistory} from "react-router-dom";

const Sidebar = () => {
const history = useHistory();
  return (
    <div className="sidebar">
     {/* <button className="btn btn-primary">close</button>
      <li>
        <button className="btn btn-primary">close</button>
      </li> */}
      <li onClick={() => history.push("/addstudent")}>
        <i class="bi bi-arrow-return-right"></i>
        AddStudent
      </li>
      <li onClick={() => history.push("/addmentor")}>
        <i class="bi bi-arrow-return-right"></i>
        AddMentor
      </li>
      <li onClick={() => history.push("/assignmentor")}>
        <i class="bi bi-arrow-return-right"></i>
        Assign Mentor
      </li>
      <li onClick={() => history.push("/changementor")} >
        <i class="bi bi-arrow-return-right"></i>
        Change Mentor
      </li>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";

const PrintMentor = ({ ele, count, setCount, assignMentors, setAssignMentors }) => {


  return (
    <li className="list-group-item">
      <input
        class="form-check-input me-3 p-2"
        type="radio"
        value={ele._id}
        name= "mentor"
        onClick={() => {
            console.log(ele._id);
            console.log(ele.name);
            setAssignMentors({id : ele._id , name: ele.fname}); ;
            console.log("assignMentors " + assignMentors);
        }}
      ></input>
      {ele.fname}
       {/* ({ele._id}) */}
    </li>
  );
};


export default PrintMentor;

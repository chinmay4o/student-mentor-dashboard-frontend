import React from "react";

const PrintMentor = ({ ele, assignMentors, setAssignMentors }) => {


  return (
    <li className="list-group-item">
      <input
        className="form-check-input me-3 p-2"
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

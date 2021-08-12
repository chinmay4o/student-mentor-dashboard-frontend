import React, { useState, useEffect} from "react";
import "./dashboard.css";
import Sidebar from "./Sidebar.js";

const Dashboard = () => {
  const [width, setWith] = useState("7em");
  function sidebarHandler(e) {
    //   e.preventDefault();
    setWith("16em");
  }


  useEffect(() => {
    setWith("16em");
  }, [])
  return (
      <div className="dashboard-sidebar" style={{ width: width }}>
        {width === "16em" ? (
          <Sidebar />
        ) : (
          <i
            className="font sha-open rounded bi bi-arrow-right-square-fill"
            onClick={sidebarHandler}
          ></i>
        )}
        {width === "16em" ? <Btn setWith={setWith}/> : null}
      </div>
  );
};

function Btn({setWith}) {
  function closeSidebar(e) {
    setWith("7em");
  }

  return (
    <div className="close-btn">
      <i
        className="bi sha-close rounded bi-arrow-up-left-square-fill mb-5"
        onClick={closeSidebar}
      ></i>
    </div>
  );
}

export default Dashboard;

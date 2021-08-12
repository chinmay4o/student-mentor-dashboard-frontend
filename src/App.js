import './App.css';
import {BrowserRouter as Router , Route , Switch , Link } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import AddStudent from "./components/dashboard/Crud/add students/AddStudent";
import EditStudent from "./components/dashboard/Crud/add students/EditStudent";
import AddMentor from "./components/dashboard/Crud/add mentors/AddMentor";
import Dashboard from "./components/dashboard/Dashboard";
import About from "./components/About.js";
import AssignMentor from "./components/dashboard/Crud/Assign Mentors/AssignMentor.js";
import ChangeMentor from "./components/dashboard/Crud/Change Mentors/ChangeMentors.js";
import ShowStu from "./components/dashboard/Crud/Show Students/ShowStu.js";

function App() {
  return (
    <div className="App">
     <Nav />

     <Switch>
       <Route path="/home">
         <Home />
       </Route>

       <Route path="/addstudent">
         <AddStudent />
       </Route>

       <Route path="/editdetails/:id">
         <EditStudent />
       </Route>
      
       <Route path="/addmentor">
         <AddMentor />
       </Route>

       <Route path="/dashboard">
         <AddStudent />
       </Route>

       <Route path="/about">
         <About />
       </Route>

       <Route path="/assignmentor">
         <AssignMentor />
       </Route>

       <Route path="/changementor">
         <ChangeMentor />
       </Route>

       <Route path="/showstudents">
         <ShowStu />
       </Route>
     </Switch>

    </div>
  );
}

export default App;

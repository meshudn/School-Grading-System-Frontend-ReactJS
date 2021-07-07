import React from 'react';
import './App.css';
import LoginPage from "./components/login";
import AdminPage from "./components/admin";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import axios from "axios";
import AdminEditUser from "./components/adminEditUser";
import AddNewUser from "./components/addNewUser";
import AddNewClass from "./components/addNewClass";
import AssignStudent from "./components/assignStudent";
import DeassignStudent from "./components/deassignStudent";
import AddSubject from "./components/addSubject";


class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Router>
                <div className="main_body">
                    <Switch>
                        <Route path="/" exact component={LoginPage}/>
                        <Route path="/admin" exact component={AdminPage}/>
                        <Route path="/add-user" exact component={AddNewUser}/>
                        <Route path="/edit-user" exact component={AdminEditUser}/>
                        <Route path="/add-class" exact component={AddNewClass}/>
                        <Route path="/assign-student" exact component={AssignStudent}/>
                        <Route path="/deassign-student" exact component={DeassignStudent}/>
                        <Route path="/add-subject" exact component={AddSubject}/>
                    </Switch>
                    <div className="footer-container">
                        <div className="footer container text-center">
                            <p>&copy; Developed by Meshu Deb Nath and Nafisa Islam.</p>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

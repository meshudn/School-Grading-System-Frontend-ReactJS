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

import React from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";


class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <div className="main_body">
                    <Switch>
                        <Route path="/" exact component={LoginPage} />
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

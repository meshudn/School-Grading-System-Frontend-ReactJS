import React from "react";
import {Link} from "react-router-dom";
import '../App.css';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="navbar-header">
                <div className="">
                    <div className="">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container">
                                <a className="navbar-brand navbar_text" href="#"><img width={30} src="elearning.png"
                                                                                      alt=""/> <span
                                    className="navbar_title">School Grading System</span></a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">Home</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/order">My Order</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link" to="/carts">Carts</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar;



import React from "react";
import {Link} from "react-router-dom";
import '../App.css';
import axios from 'axios';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
    * handle form submit event
    * */
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            username: event.target.username.value,
            password: event.target.password.value
        });
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post('http://localhost:3000/api/v1/users/login', data, config)
            .then(response => {
                if (response.status === 200) {
                    if (response.data === "admin") {
                        this.props.history.push('/admin');
                    } else if (response.data === "teacher") {

                    } else if (response.data === "student") {

                    }
                }
            }).catch(error => {
            console.error(error)
        });
    }

    render() {
        return (
            <section className="d-flex align-items-center justify-content-sm-center col-sm-12">
                <div className="col-sm-4 loginpage">
                    <form className="form-signin" onSubmit={(e) => this.handleSubmit(e)}>
                        <a href="#"><img className="mb-4" src="elearning.png"
                                         alt="" width="72" height="72"/> <span>School Grading System</span></a>
                        <h1 className="h3 mb-3">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Username</label>
                        <input type="text" name="username" className="form-control" placeholder="Username"
                               required autoFocus/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" name="password" id="inputPassword" className="form-control"
                               placeholder="Password"
                               required/>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" name="remember_me"/> Remember me </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default LoginPage;



/*
* Admin view
* */
import React from 'react';
import '../App.css';
import './admin-stylesheets.css'
import axios from 'axios';
import Navbar from "./navbar";
import AdminEditUser from "./adminEditUser";
import {Link} from "react-router-dom";

class AdminPage extends React.Component {
    constructor() {
        super();
        this.state = {
            users: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/users")
            .then(response => {
                const users = response.data;
                console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    users : users
                })
            });
    }

    render() {
        const navMenu = ['Home','Add New User'];
        const navMenuLink = ['admin','add-user'];
        /*
        * saving the list of users in array before rendering
        * */
        const userList = [];
        try {
            var temp = this.state.users;
            let count = 0;
            temp.map(function (index) {
                count++;
                let status = "";
                if(index.archived == "false"){
                    status = "Active";
                }else{
                    status = "Inactive";
                }
                return userList.push(
                    <tr>
                        <td>{count}</td>
                        <td>{index.username}</td>
                        <td className="text-capitalize">{index.firstName} {index.lastName}</td>
                        <td className="text-capitalize">{index.role}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td className="action-button">
                            <Link to={{pathname: '/add-user', userid: index.userid, username: index.username, password: index.password, firstName: index.firstName, lastName: index.lastName, archived: index.archived, role: index.role }} className="settings" ><img src="./setting.png" width="20" /></Link>
                            | <a href="#" className="delete" ><img src="./delete.png" width="20" /></a>
                        </td>
                    </tr>
                );
            });
        }
        catch{
            console.log('... No data ...');
        }

        return (
            <div className="body">
                <Navbar navMenu={navMenu} navMenuLink={navMenuLink}/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h2>User Management</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span>Add New User</span></a>
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#9788;</i><span>Export to Excel</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                         {userList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;

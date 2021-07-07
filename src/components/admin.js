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
            users: '',
            count: 1,
            newClass: false,
            newUser: false,
            classes: '',
            subjects: ''
        };
        this.newClass = false;
        this.newUser = false;
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleDeleteClass = this.handleDeleteClass.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let component = this;
        if(this.state.newUser === true){
            this.state.newUser = false;
            axios.get("http://localhost:3000/api/v1/users")
                .then(response => {
                    const users = response.data;
                    console.log(JSON.stringify(users));
                    //console.log(products[1].product_id);
                    component.setState({
                        users: users
                    });
                });

            console.log("update users");
        }
        if(this.state.newClass === true) {
            this.state.newClass = false;
            axios.get("http://localhost:3000/api/v1/classes")
                .then(response => {
                    const classes = response.data;
                    console.log(JSON.stringify(classes));
                    //console.log(products[1].product_id);
                    component.setState({
                        classes: classes
                    });
                });
            console.log("update class");
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3000/api/v1/users")
            .then(response => {
                const users = response.data;
                console.log(JSON.stringify(users));
                //console.log(products[1].product_id);
                this.setState({
                    users: users
                });
            });
        axios.get("http://localhost:3000/api/v1/classes")
            .then(response => {
                const classes = response.data;
                console.log(JSON.stringify(classes));
                //console.log(products[1].product_id);
                this.setState({
                    classes: classes
                });
            });
        axios.get("http://localhost:3000/api/v1/subjects")
            .then(response => {
                const subjects = response.data;
                console.log(JSON.stringify(subjects));
                //console.log(products[1].product_id);
                this.setState({
                    subjects: subjects
                });
            });
    }

    handleDeleteUser(e, index) {
        e.preventDefault();
        /*
        * checking weather the teacher has atleast one subjects.
        * */
        let myComponent = this;
        axios.get("http://localhost:3000/api/v1/subjects/search?teacherId=" + index.userid)
            .then(response => {
                if (response.status === 200) {
                    console.log("checking teacher has any subjects");
                } else {
                    axios.delete("http://localhost:3000/api/v1/users/" + index.userid)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }).catch(function (error) {
            axios.delete("http://localhost:3000/api/v1/users/" + index.userid)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            myComponent.setState({newUser: true});
        });
    }

    /*
    * Delete event for class
    * */
    handleDeleteClass(e, index) {
        e.preventDefault();
        /*
        * checking weather the teacher has atleast one subjects.
        * */
        let myComponent = this;
        axios.delete("http://localhost:3000/api/v1/admission/" + index.classId)
            .then(response => {
                if (response.status === 200) {
                    console.log("deleting admitted student from the admission table");
                } else {
                    console.log("admitted student deletions failed");
                }
            }).catch(function (error) {
            console.log(error);
        });
        /*
         * deleting the class instance
         * */
        axios.delete("http://localhost:3000/api/v1/classes/" + index.classId)
            .then(function (response) {
                console.log(response);
                myComponent.setState({ newClass: true });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const navMenu = ['Admin View', 'Log-out'];
        const navMenuLink = ['admin', ''];
        /*
        * saving the list of users in array before rendering
        * */
        const userList = [];
        const classList = [];
        const subjectList = [];
        try {
            var temp = this.state.users;
            let count = 0;
            let myComponent = this;
            temp.map(function (index) {
                count++;
                let status = "";
                if (index.archived == "false") {
                    status = "Active";
                } else {
                    status = "Inactive";
                }
                let tempUserId = index.userid;
                return userList.push(
                    <tr>
                        <td>{count}</td>
                        <td>{index.username}</td>
                        <td className="text-capitalize">{index.firstName} {index.lastName}</td>
                        <td className="text-capitalize">{index.role}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td className="action-button">
                            <Link to={{
                                pathname: '/edit-user',
                                userid: index.userid,
                                username: index.username,
                                password: index.password,
                                firstName: index.firstName,
                                lastName: index.lastName,
                                archived: index.archived,
                                role: index.role
                            }} className="settings"><img src="./setting.png" width="20"/></Link>
                            | <a href="#" key={count + 1} onClick={(e) => myComponent.handleDeleteUser(e, index)}
                                 className="delete"><img src="./delete.png" width="20"/></a>
                        </td>
                    </tr>
                );
            });

            /*
            * class management
            * */
            var tempClass = this.state.classes;
            let classCount = 0;
            tempClass.map(function (index) {
                classCount++;
                let status = "";
                if (index.archived == "false") {
                    status = "Active";
                } else {
                    status = "Inactive";
                }
                let tempClassId = index.classId;
                return classList.push(
                    <tr>
                        <td>{classCount}</td>
                        <td>{index.className}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td className="action-button">
                            <Link to={{
                                pathname: '/edit-class',
                                className: index.className,
                                archived: index.archived
                            }} className="settings"><img src="./setting.png" width="20"/></Link>
                            | <a href="#" key={count + 1} onClick={(e) => myComponent.handleDeleteClass(e, index)}
                                 className="delete"><img src="./delete.png" width="20"/></a>
                        </td>
                    </tr>
                );
            });

            /*
            * subject management
            * */
            var tempSubject = this.state.subjects;
            let subjectCount = 0;
            tempSubject.map(function (index) {
                subjectCount++;
                let status = "";
                if (index.archived == "false") {
                    status = "Active";
                } else {
                    status = "Inactive";
                }
                let tempSubjectId = index.subjectId;
                return subjectList.push(
                    <tr>
                        <td>{subjectCount}</td>
                        <td>{index.subjectName}</td>
                        <td>{index.className}</td>
                        <td>{index.teacherName}</td>
                        <td><span className="status text-success">&bull;</span> {status}</td>
                        <td className="action-button">
                            <Link to={{
                                pathname: '/edit-subject',
                                subjectId: index.subjectId,
                                classId: index.classId,
                                teacherName: index.teacherName,
                                teacherId: index.teacherId,
                                archived: index.archived
                            }} className="settings"><img src="./setting.png" width="20"/></Link>
                            | <a href="#" key={count + 1} onClick={(e) => myComponent.handleDeleteClass(e, index)}
                                 className="delete"><img src="./delete.png" width="20"/></a>
                        </td>
                    </tr>
                );
            });

        } catch {
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
                                                    <span><Link to="/add-user">Add New User</Link></span></a>
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

                {/* classes */}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h2>Class Management</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/add-class">Add New Class</Link></span></a>
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/assign-student">Assign Student</Link></span></a>
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/deassign-student">Deassign Student</Link></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Class Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {classList}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* subjects */}

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="table-responsive">
                                <div className="table-wrapper">
                                    <div className="table-title">
                                        <div className="row">
                                            <div className="col-sm-5">
                                                <h2>Class Management</h2>
                                            </div>
                                            <div className="col-sm-7">
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/add-subject">Add New Subjects</Link></span></a>
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/assign-student">Archiving a subject</Link></span></a>
                                                <a href="#" className="btn btn-secondary"><i
                                                    className="material-icons">&#xE147;</i>
                                                    <span><Link to="/deassign-student">Deassign Student</Link></span></a>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Subject Name</th>
                                            <th>Class Name</th>
                                            <th>Teacher Name</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {subjectList}
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
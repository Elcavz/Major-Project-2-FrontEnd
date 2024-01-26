import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import admin from './assets/admin.png'

function BoyStudents() {
    const [adminUsername, setAdminUsername] = useState();
    const userToken = localStorage.getItem('token: ')
    const [showModal, setShowModal] = useState('none');
    const [SetViewStudentsBtn, SetSetViewStudentsBtnBg] = useState(true)
    const [ViewStudents, SetViewStudentsDisplay] = useState(true)
    const [ViewStudentsColor, SetViewStudentsColor] = useState(true)

    const [searchInput, setSearchInput] = useState('');

    const [searchInputVisibility, setSearchInputInputVisibility] = useState(false);
    const [searchInputWidth, setSearchInputInputWidth] = useState(false);
    const [searchFilterVisibility, setSearcFilterVisibility] = useState(false);
    const [searchFilterWidth, setSearcFilterWidth] = useState(false);
    const [searchIcon, setSearchInputIcon] = useState(true);
    const [searchOnClick, setSearchInputOnClick] = useState(true);

    const [searchBtnBG, setSearchInputBtnBG] = useState()
    const [searchBtnBorder, setSearchInputBtnBorder] = useState()
    const [searchBtnBoxShadow, setSearchInputBtnBoxShadow] = useState()

    function searchShow() {
        setSearchInputInputVisibility(true);
        setSearcFilterVisibility(true);
        setSearchInputInputWidth(true);
        setSearcFilterWidth(true);
        setSearchInputBtnBG(true);
        setSearchInputBtnBorder(true);
        setSearchInputBtnBoxShadow(true);
        LoadStudentData();
        setSearchInputIcon(!searchIcon);
        setSearchInputOnClick(!searchOnClick);
    }

    function searchHide() {
        setSearchInputInputVisibility(false);
        setSearcFilterVisibility(false);
        setSearchInputInputWidth(false);
        setSearcFilterWidth(false);
        setSearchInputBtnBG(false);
        setSearchInputBtnBorder(false);
        setSearchInputBtnBoxShadow(false);
        setSearchInput('');
        setSearchInputIcon(!searchIcon);
        setSearchInputOnClick(!searchOnClick);
    }

    const adminData = () => {
        fetch('http://localhost:3000/admin', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + userToken,
            },
            body: null
        }).then((adminData) => {
            return adminData.json();
        }).then((adminData) => {
            console.log(adminData.result)
            setAdminUsername(adminData.result.username)
        }) 
    }

    function viewStudents() {
        SetViewStudentsDisplay(true);
        SetSetViewStudentsBtnBg(true);
        SetViewStudentsColor(true);
        document.title = 'VIEW STUDENTS'
    }

    function LoadStudentData() {
        // Assuming Search is a global variable or passed as a parameter
        fetch('http://localhost:3000/boy-students', {
            method: 'get',
        }).then((response) => {
            return response.json();
        }).then((studentData) => {
            const tableBody = document.getElementById('studentsTableBody');
            
            // Assuming Search is a global variable or passed as a parameter
            console.log(studentData.students)
            const filteredData = studentData.students.filter((element) => {
                const filterValue = document.getElementById('filter').value
                
                if (filterValue === 'name') {
                    return searchInput.toLocaleLowerCase() === '' ?
                    element :
                    element.FirstName.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
                } else if (filterValue === 'age') {
                    return searchInput.toString() === '' ?
                    element :
                    element.Age.toString().includes(searchInput);
                } else if (filterValue === 'grade') {
                    return searchInput.toString() === '' ?
                    element :
                    element.Grade.toString().includes(searchInput);
                } else if (filterValue === 'contactNo') {
                    return searchInput.toLocaleLowerCase() === '' ?
                    element :
                    element.ContactNumber.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
                } else if (filterValue === 'address') {
                    return searchInput.toLocaleLowerCase() === '' ?
                    element :
                    element.Address.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
                } else if (filterValue === 'dateEnrolled') {
                    return searchInput.toString() === '' ?
                    element :
                    element.Date_Enrolled.toString().includes(searchInput);
                }
            });
    
            let tr = "";
            console.log('test: ' + filteredData)
            if (filteredData.length > 0) {
                for (let i = 0; i < filteredData.length; i++) {
                    const element = filteredData[i];
                    tr += "<tr>" +
                        "<td class='border'>" + element.FirstName + " " + element.LastName + "</td>" +
                        "<td class='border'>" + element.Age + "</td>" +
                        "<td class='border'>" + element.Gender + "</td>" +
                        "<td class='border'>" + element.Grade + "</td>" +
                        "<td class='border'>" + element.ContactNumber + "</td>" +
                        "<td class='border'>" + element.Address + "</td>" +
                        "<td class='border'>" + element.Date_Enrolled + "</td>" +
                        "</tr>";
                }
            } else {
                // Display a message or handle the case when no results are found
                tr = "<tr><td colspan='6'>No matching records found</td></tr>";
            }
            tableBody.innerHTML = tr;
        }).catch((error) => {
            console.error('Error during fetch operation:', error);
        });
    }
    
    function searchKeyUp() {
        LoadStudentData()
    }

    function logOut() {
        localStorage.clear();
        document.location.href = 'login'
    }

    useEffect(() => {
        adminData();
        LoadStudentData();
    }, []);

    return (
        <div id="boyStudents">
            <section className="wrapper d-flex flex-row bg-dark">
            <nav className="vh-100">
                <div className="pt-5">
                    <div id="profilePic" className="text-center m-auto p-auto border rounded-circle">
                        <img className="img-fluid w-75" src={admin} alt=""/>
                    </div>
                </div>
                <div id="adminContainer" className="p-5 text-center">
                    <span id="adminUsername" className="text-white fw-bold fs-3" title={`${adminUsername} | Administrator`}>{adminUsername}</span>
                    <h2 className="text-white-50 fs-5 text-center text-decoration-underline">ADMINISTRATIVE</h2>
                </div>
                <div className="navBar mt-5">
                    <li>
                        <button 
                            id="profileBtn" 
                            className="fs-4 h-100 w-100"
                            title="View Students"
                            style={
                                {backgroundColor: SetViewStudentsBtn ? '#454a61' : '#181e36',
                                color: ViewStudentsColor ? 'white' : 'rgb(161, 161, 161)'}
                            } 
                            onClick={viewStudents}
                        >
                            <i className="fa-solid fa-table-list pe-2 text-center"></i>
                            <span className="fs-4 pe-3">
                                View Students
                            </span>
                        </button>
                    </li>
                </div>
                <div id="logoutDiv">
                    <button id="logoutBtn" className="fs-4 h-100 w-100" data-bs-toggle="modal" data-bs-target="#logoutModal" onClick={() => setShowModal(true)}>
                        <i className="fa-solid fa-arrow-right-from-bracket text-center"></i>
                        <span className="fs-4 me-5 pe-4">
                            Log Out
                        </span>
                    </button>
                </div>
            </nav>

            {/* <!-- View Students Content --> */}
            <div id="vs" style={{display: ViewStudents ? 'block' : 'none'}} className="container shadow-lg">
                <div className="mb-5 d-flex flex-nowrap justify-content-between">
                    <h1 id="vsHeader" className="fw-bold text-start">View Students</h1>
                    <Link to={'/Home'}>
                        <button id="backToHome" className="me-1">
                            <i className="fa-solid text-white fs-3 pt-1 fa-arrow-left-long"></i>
                        </button>
                    </Link>
                </div>
                <div>
                    <div className="mt-5">
                        <div className="d-flex flex-nowrap justify-content-around w-100">
                            <div className="d-flex flex-nowrap">
                                <div id="searchContainer" className="d-flex flex-nowrap justify-content-between">
                                    <h2 className="m-0 pt-2">Boy Students List:</h2>
                                    <input id="searchStudent" 
                                        style={{
                                            visibility: searchInputVisibility ? 'visible' : 'hidden',
                                            width: searchInputWidth ? '20%' : '0%'
                                        }}
                                        className="fs-3 px-2"
                                        type="text"
                                        autoComplete="off"
                                        value={searchInput}
                                        onKeyUp={searchKeyUp}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                </div>
                                <div className="ps-2">
                                    <select
                                    style={{
                                        visibility: searchFilterVisibility ? 'visible' : 'hidden',
                                        width: searchFilterWidth ? '100%' : '0%'
                                    }}
                                    name="filterTable" id="filter" className="fs-4 px-1">
                                        <option value="name">Name</option>
                                        <option value="age">Age</option>
                                        <option value="grade">Grade</option>
                                        <option value="contactNo">Contact Number</option>
                                        <option value="address">Address</option>
                                        <option value="dateEnrolled">Date Enrolled</option>
                                    </select>
                                </div>
                            </div>
                            <button id="searchBtn"
                                style={{
                                    background: searchBtnBG ? '#e90e0e' : '#54b7c0',
                                    border: searchBtnBorder ? '#df4444 1px solid' : '#7ec9cf 1px solid',
                                    boxShadow: searchBtnBoxShadow ? '#b90c0c 0px 0px 15px 0px' : '#6ef3ff 0px 0px 20px 0px'
                                }}
                                onClick={searchOnClick ? searchShow : searchHide}>
                                <i id="searchIcon" className={`${searchIcon ? "fa-solid fs-3 pt-1 fa-magnifying-glass" : "fa-solid fs-3 pt-1 fa-xmark"}`}></i>
                            </button>
                        </div>
                        <div id="table-wrapper">
                            <div id="table-scroll" className="border border-bottom-0">
                                <table className="table table-striped border border-2">
                                    <thead>
                                        <tr>
                                            <th className="table-name border">Name</th>
                                            <th className="table-age border">Age</th>
                                            <th className="table-gender border">Gender</th>
                                            <th className="table-grade border">Grade</th>
                                            <th className="table-contactNumber border">Contact No.</th>
                                            <th className="table-address border">Address</th>
                                            <th className="table-dateEnrolled border">Date Enrolled</th>
                                        </tr>
                                    </thead>
                                    <tbody id="studentsTableBody">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LOG OUT MODAL */}
            {showModal && (
            <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="logoutModalLabel">LOGOUT</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="modalBody" className="modal-body text-center">
                        <div className="mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 512 512"><path fill="#f00000" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
                        <p className="fs-3">Are you sure you want to exit?</p>
                        </div>
                    </div>
                    <div className="modal-footer py-3">
                        <button id="cancelLogoutBtn" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                            id="modalLogoutBtn" 
                            type="button" 
                            className="btn"
                            onClick={logOut}
                        >
                            LOG OUT
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            )}
            </section>
        </div>
    );
}

export default BoyStudents;
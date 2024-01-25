import { useEffect, useState } from "react";
import React from 'react';
import male from './assets/male.png';
import female from './assets/female.png';
import admin from './assets/admin.png'
import qr from './assets/qr.png';
import profileBg from './assets/profileBg.png';

function Home() {

const [firstNameValue, setFirstNameValue] = useState('');
const [lastNameValue, setLastNameValue] = useState('');
const [ageValue, setAgeValue] = useState('');
const [genderValue, setGenderValue] = useState('Choose a gender . . .');
const [gradeValue, setGradeValue] = useState('What his/her grade? . . .');
const [contactNumberValue, setContactNumberValue] = useState('');
const [addressValue, setAddressValue] = useState('');

const [searchInput, setSearchInput] = useState('');

const [Dashboard, SetDbDisplay] = useState(true)
const [RegStudent, SetRSDisplay] = useState()
const [ViewStudents, SetViewStudentsDisplay] = useState()
const [Profile, SetPFDisplay] = useState()

const [DashboardBtn, SetDbBtnBg] = useState(true)
const [RegStudentBtn, SetRegStudentBtnBg] = useState()
const [SetViewStudentsBtn, SetSetViewStudentsBtnBg] = useState()
const [ProfileBtn, SetProfileBtnBg] = useState()

const [DashboardBtnColor, SetDbBtnColor] = useState(true)
const [RegStudentBtnColor, SetRegStudentBtnColor] = useState()
const [ViewStudentsColor, SetViewStudentsColor] = useState()
const [ProfileBtnColor, SetProfileBtnColor] = useState()

const [ContactNumber, SetContactNoBoxShadow] = useState('none')

const [RSContainer, SetRSContainerWidth] = useState()
const [StudentId, SetStudentIdDisplay] = useState()
const [contactNoBorder, SetContactNoBorder] = useState('none')
const [ContactNoAnim, SetContactNumberAnim] = useState()

function dashBoard() {
    SetDbDisplay(true);
    SetRSDisplay(false);
    SetPFDisplay(false);
    SetViewStudentsDisplay(false);
    SetDbBtnBg(true);
    SetRegStudentBtnBg(false)
    SetProfileBtnBg(false);
    SetSetViewStudentsBtnBg(false);
    SetDbBtnColor(true);
    SetRegStudentBtnColor(false);
    SetProfileBtnColor(false);
    SetViewStudentsColor(false);
    document.title = 'DASHBOARD'

    fetch('http://localhost:3000/students-count', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({})
    }).then((data) => {
        return data.json()
    }).then((data) => {
        setTotalBoys(data.TotalBoys)
        setTotalGirls(data.TotalGirls)
        setTotalStudents(data.TotalBoys + data.TotalGirls)
    })
}

function registerStudent() {
    SetRSDisplay(true);
    SetDbDisplay(false);
    SetPFDisplay(false);
    SetViewStudentsDisplay(false);
    SetRegStudentBtnBg(true)
    SetDbBtnBg(false);
    SetProfileBtnBg(false);
    SetSetViewStudentsBtnBg(false);
    SetRegStudentBtnColor(true);
    SetDbBtnColor(false);
    SetProfileBtnColor(false);
    SetViewStudentsColor(false);
    document.title = 'ENROLL STUDENT'
}

function viewStudents() {
    SetPFDisplay(false);
    SetRSDisplay(false);
    SetDbDisplay(false);
    SetViewStudentsDisplay(true);
    SetProfileBtnBg(false);
    SetDbBtnBg(false);
    SetRegStudentBtnBg(false);
    SetSetViewStudentsBtnBg(true);
    SetProfileBtnColor(false);
    SetDbBtnColor(false);
    SetRegStudentBtnColor(false);
    SetViewStudentsColor(true);
    document.title = 'VIEW STUDENTS'
}

function profile() {
    SetPFDisplay(true);
    SetRSDisplay(false);
    SetDbDisplay(false);
    SetViewStudentsDisplay(false);
    SetProfileBtnBg(true);
    SetDbBtnBg(false);
    SetRegStudentBtnBg(false);
    SetSetViewStudentsBtnBg(false);
    SetProfileBtnColor(true);
    SetDbBtnColor(false);
    SetRegStudentBtnColor(false);
    SetViewStudentsColor(false);
    document.title = 'PROFILE'
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

function submitStudent() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    fetch('http://localhost:3000/students' , {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: firstNameValue,
            lastname: lastNameValue,
            age: ageValue,
            gender: genderValue,
            grade: gradeValue,
            contactnumber: contactNumberValue,
            address: addressValue,
            date: formattedDate
        })
    }).then((studentData) => {
        return studentData.json()
    }).then((studentData) => {
        const idFirstName = document.getElementById('idFirstName')
        const idLastName = document.getElementById('idLastName')
        const idNumber = document.getElementById('idNumber')
        const phoneNumber = document.getElementById('phoneNumber')
        const numberExist = document.getElementById('numberExist')
        const idPic = document.getElementById('idPic')
        const gradeLevel = document.getElementById('gradeLevel')
        
        if (studentData.success) {
            if (genderValue === 'Male') {
                idPic.src = male;
            } else {
                idPic.src = female;
            }
            SetRSContainerWidth(true);
            setTimeout(() => {
            SetStudentIdDisplay(true);
            }, 1000);
            
        idFirstName.innerHTML = firstNameValue
        idLastName.innerHTML = lastNameValue
        phoneNumber.innerHTML = contactNumberValue
        numberExist.innerHTML = ''
        LoadStudentData();
        SetContactNoBoxShadow(true);
        SetContactNoBorder(true);
        fetch('http://localhost:3000/validation' , {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contactnumber: contactNumberValue
            })
        }).then((id) => {
            return id.json()
        }).then((id) => {
            idNumber.innerHTML = id.idresult
            gradeLevel.innerHTML = id.grade
        })
    } else {
        SetRSContainerWidth(false);
        SetContactNumberAnim(true);
        SetContactNoBoxShadow(false)
        SetContactNoBorder(false);
        numberExist.innerHTML = 'Already Exists';
        setTimeout(function() {
            SetContactNumberAnim(false);
        }, 500)
        SetStudentIdDisplay(false);
        }
    })
}

function LoadStudentData() {
    // Assuming Search is a global variable or passed as a parameter
    fetch('http://localhost:3000/show-students', {
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
            } else if (filterValue === 'gender') {
                return searchInput.toLocaleLowerCase() === '' ?
                element :
                element.Gender.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase());
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


const [SubmitBtnDisable, SetSubBtnDisable] = useState()
const [SubmitBtnBgColor, SetSubBtnBgColor] = useState()
const [SubmitBtnColor, SetSubBtnColor] = useState()
const [SubmitBtnFontWeight, SetSubBtnFontWeight] = useState()
const [SubmitBtnBorder, SetSubBtnBorder] = useState()
const [SubmitBtnBoxShadow, SetSubBtnBoxShadow] = useState()
const [SubmitBtnBoxCursor, SetSubBtnCursor] = useState()

function studentForm() {
    const isNotGrade = gradeValue === "1" || gradeValue === "2" || gradeValue === "3" || gradeValue === "4" || gradeValue === "5" || gradeValue === "6";
    const isValidForm =
        firstNameValue !== "" &&
        lastNameValue !== "" &&
        ageValue !== "" &&
        genderValue !== "" &&
        gradeValue !== "" &&
        contactNumberValue !== "" &&
        addressValue !== "" &&
        isNotGrade &&
        (genderValue === "Male" || genderValue === "Female");

    SetSubBtnDisable(!isValidForm);
    SetSubBtnBgColor(isValidForm);
    SetSubBtnColor(isValidForm);
    SetSubBtnFontWeight(isValidForm);
    SetSubBtnBorder(isValidForm);
    SetSubBtnBoxShadow(isValidForm);
    SetSubBtnCursor(isValidForm);
}

function clr() {  
    const numberExist = document.getElementById('numberExist')
    numberExist.innerHTML = ''
    setFirstNameValue('');
    setLastNameValue('')
    setAgeValue('');
    setGenderValue('Choose a gender . . .');
    setGradeValue('What his/her grade? . . .');
    setContactNumberValue('');
    setAddressValue('');
    SetSubBtnBgColor(false);
    SetSubBtnColor(false);
    SetSubBtnCursor(false);
    SetSubBtnBorder(false);
    SetSubBtnBoxShadow(false);
    SetRSContainerWidth(false);
    SetStudentIdDisplay(false);
    SetContactNoBoxShadow(true);
    SetContactNoBorder(true);
}

const [totalBoys, setTotalBoys] = useState();
const [totalGirls, setTotalGirls] = useState();
const [totalStudents, setTotalStudents] = useState();

const Students = () => {
    fetch('http://localhost:3000/students-count', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({})
    }).then((data) => {
        return data.json()
    }).then((data) => {
        setTotalBoys(data.TotalBoys)
        setTotalGirls(data.TotalGirls)
        setTotalStudents(data.TotalBoys + data.TotalGirls)
    })
}

const [showModal, setShowModal] = useState('none');

function logOut() {
    localStorage.clear();
    document.location.href = 'login'
}

const [adminUsername, setAdminUsername] = useState()
const [adminEmail, setAdminEmail] = useState()
const userToken = localStorage.getItem('token: ')

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
        setAdminEmail(adminData.result.email)
    }) 
}

const [oldPassword, setOldPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newCPassword, setNewCPassword] = useState('')
const oldPassWrong = document.getElementById('oldPassWrong')
const updateProfile = document.getElementById('updateProfile')

function updatePass() {
    fetch('http://localhost:3000/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: adminUsername,
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    }).then((data) => {
        return data.json()
    }).then((data) => {
        if (data.success === false) {
            oldPassWrong.innerHTML = 'Wrong Password!'
        } else {
            updateProfile.innerHTML = '✔️'
            oldPassWrong.innerHTML = ''
        }
    })
}

const [updateProfileBtn, setUpdateProfileBtn] = useState()
const [updateProfileBtnDisabled, setUpdateProfileBtnDisabled] = useState()
const [updateProfileBtnColor, setUpdateProfileBtnColor] = useState()
const [updateProfileBtnFW, setUpdateProfileBtnFW] = useState()
const [updateProfileBtnBorder, setUpdateProfileBtnBorder] = useState()
const [updateProfileBtnCursor, setUpdateProfileBtnCursor] = useState()
const [updateProfileBtnBoxShadow, setUpdateProfileBtnBoxShadow] = useState()

function validatePass() {
    if (oldPassword !== '' && newPassword !== '' && newCPassword !== '') {
        if (newPassword === newCPassword) {
            setUpdateProfileBtn(true);
            setUpdateProfileBtnDisabled(false);
            setUpdateProfileBtnColor(true);
            setUpdateProfileBtnFW(true);
            setUpdateProfileBtnBorder(true);
            setUpdateProfileBtnCursor(true);
            setUpdateProfileBtnBoxShadow(true);
        } else {
            setUpdateProfileBtn(false);
            setUpdateProfileBtnDisabled(true);
            setUpdateProfileBtnColor(false);
            setUpdateProfileBtnFW(false);
            setUpdateProfileBtnBorder(false);
            setUpdateProfileBtnBoxShadow(false);
            setUpdateProfileBtnCursor(false);
        }
    } else {
        setUpdateProfileBtn(false);
        setUpdateProfileBtnDisabled(true);
        setUpdateProfileBtnColor(false);
        setUpdateProfileBtnFW(false);
        setUpdateProfileBtnBorder(false);
        setUpdateProfileBtnBoxShadow(false);
        setUpdateProfileBtnCursor(false);
    }
}

function cancel() {
    setOldPassword('')
    setNewPassword('')
    setNewCPassword('')
    setUpdateProfileBtn(false);
    setUpdateProfileBtnDisabled(true);
    setUpdateProfileBtnColor(false);
    setUpdateProfileBtnFW(false);
    setUpdateProfileBtnBorder(false);
    setUpdateProfileBtnBoxShadow(false);
    setUpdateProfileBtnCursor(false);
}

const [eye0, setEye0Display] = useState()
const [eye1, setEye1Display] = useState()
const [eye2, setEye2Display] = useState()

function eyeOldPass() {
    (oldPassword !== '') ? setEye0Display(true) : setEye0Display(false);
}

function eyeNewPass() {
    (newPassword !== '') ? setEye1Display(true) : setEye1Display(false);
}

function eyeNewCPass() {
    (newCPassword !== '') ? setEye2Display(true) : setEye2Display(false);
}

const [eyeToggle0, setEyeShow0] = useState(false)
const [passType, setpassType] = useState(true)
function eye0Show() {
    setEyeShow0(!eyeToggle0)
    setpassType(!passType)
}

const [eyeToggle1, setEyeShow1] = useState(false)
const [NewPassType, setNewPassType] = useState(true)
function eye1Show() {
    setEyeShow1(!eyeToggle1)
    setNewPassType(!NewPassType)
}

const [eyeToggle2, setEyeShow2] = useState(false)
const [newCPassType, setNewCPassType] = useState(true)
function eye2Show() {
    setEyeShow2(!eyeToggle2)
    setNewCPassType(!newCPassType)
}

function profileAct() {
    validatePass()
    eyeOldPass()
    eyeNewPass()
    eyeNewCPass()
}

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

useEffect(() => {
    adminData();
    Students();
    LoadStudentData();
}, []);
  
  return (
    <div>
    
    {/* NAVIGATION BAR */}
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
                        id="dbBtn" 
                        className="fs-4 h-100 w-100"
                        title="Dashboard"
                        style={
                            {backgroundColor: DashboardBtn ? '#454a61' : '#181e36',
                            color: DashboardBtnColor ? 'white' : 'rgb(161, 161, 161)'}
                        } 
                        onClick={dashBoard}
                    >
                        <i className="fa-solid fa-chart-line pe-2 text-center"></i>
                        <span className="fs-4 me-5">
                            Dashboard
                        </span>
                    </button>
                </li>
                <li>
                    <button 
                        id="regStudentBtn" 
                        className="fs-4 h-100 w-100"
                        title="Register Student" 
                        style={
                                {backgroundColor: RegStudentBtn ? '#454a61' : '#181e36',
                                color: RegStudentBtnColor ? 'white' : 'rgb(161, 161, 161)'}
                            } 
                        onClick={registerStudent}
                    >
                        <i className="fa-solid fa-user-plus me-1 text-end"></i>
                        <span className="fs-4 pe-3">
                            Enroll Student
                        </span>
                    </button>
                </li>
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
                <li>
                    <button 
                        id="profileBtn" 
                        className="fs-4 h-100 w-100"
                        title="Profile"
                        style={
                            {backgroundColor: ProfileBtn ? '#454a61' : '#181e36',
                            color: ProfileBtnColor ? 'white' : 'rgb(161, 161, 161)'}
                        } 
                        onClick={profile}
                    >
                        <i className="fa-solid fa-address-card pe-2 text-center"></i>
                        <span className="fs-4 me-5 pe-5">
                            Profile
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

        {/* <!-- Dashboard Content --> */}
        <div id="db" style={{display: Dashboard ? 'block' : 'none'}} className="container shadow-lg">
            <div className="db">
                <div className="mb-2">
                    <h2 className="fs-1 fw-bold">My Dashboard</h2>
                </div>
                <div className="row">
                    <div className="first card p-5 col me-5">
                        <div className="m-3 h-75">
                            <h2 className="text-white">Total Boys</h2>
                        </div>
                        <div className="card-body">
                            <span id="totalBoys" className="text-white">{totalBoys}</span>
                        </div>
                    </div>
                    <div className="second card p-5 col">
                        <div className="m-3 h-75">
                            <h2 className="text-white">Total Girls</h2>
                        </div>
                        <div className="card-body">
                            <span id="totalGirls" className="text-white">{totalGirls}</span>
                        </div>
                    </div>
                    <div className="third card p-5 col ms-5">
                        <div className="m-3 h-75">
                            <h2 className="text-white">Total Students</h2>
                        </div>
                        <div className="card-body">
                            <span id="totalStudents" className="text-white">{totalStudents}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Enroll Student Content --> */}
        <div id="regStudent" style={{display: RegStudent ? 'block' : 'none'}} className="container shadow-lg">
            <div className="d-flex">
                <div id="regStudentContainer" style={{
                    width: RSContainer ? '75%' : '100%'
                }}>
                    <div className="mb-5">
                        <h1>Enroll Student</h1>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <h4>First Name <span className="required fs-3">*</span></h4>
                            <input id="firstname" 
                                className="fs-3 px-2" 
                                type="text" 
                                value={firstNameValue} 
                                onChange={(e) => setFirstNameValue(e.target.value)} 
                                onKeyUp={studentForm}
                            />
                        </div>
                        <div className="col">
                            <h4>Last Name <span className="required fs-3">*</span></h4>
                            <input 
                                id="lastname" 
                                className="fs-3 px-2" 
                                type="text"
                                value={lastNameValue}
                                onKeyUp={studentForm}
                                onChange={(e) => setLastNameValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col">
                            <h4>Age <span className="required fs-3">*</span></h4>
                            <input 
                                id="age" 
                                className="fs-3 px-2" 
                                type="number" 
                                onKeyUp={studentForm}
                                value={ageValue}
                                onChange={(e) => setAgeValue(e.target.value)}
                            />
                        </div>
                        <div className="col">
                            <h4>Gender <span className="required fs-3">*</span></h4>
                            <select 
                                id="gender" 
                                name="gender" 
                                className="fs-3 px-2" 
                                onKeyUp={studentForm}
                                value={genderValue}
                                onChange={(e) => setGenderValue(e.target.value)}
                            >
                                <option disabled hidden>Choose a gender . . .</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col">
                            <h4>Grade <span className="required fs-3">*</span></h4>
                            <select 
                                id="grade" 
                                name="grade" 
                                className="fs-3 px-2" 
                                onKeyUp={studentForm}
                                value={gradeValue}
                                onChange={(e) => setGradeValue(e.target.value)}
                            >
                                <option disabled hidden>What his/her grade? . . .</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div className="col">
                            <h4>Contact Number <span className="required fs-3">*</span> <span id="numberExist" className="fs-3 text-danger fw-bold"></span></h4>
                            <input 
                                id="contactNo" 
                                className="fs-3 px-2" 
                                style={{
                                    boxShadow: ContactNumber ? 'none' : 'red 0px 0px 10px 0px',
                                    border: contactNoBorder ? '1px solid black' : '2px solid red',
                                    animation: ContactNoAnim ? 'shake1 0.5s' : 'none'
                                }}
                                type="number" 
                                onKeyUp={studentForm}
                                value={contactNumberValue}
                                onChange={(e) => setContactNumberValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4>Address <span className="required fs-3">*</span></h4>
                        <textarea 
                            name="address" 
                            id="address" 
                            className="fs-3 px-2 w-100" 
                            cols="30" 
                            rows="10" 
                            onKeyUp={studentForm}
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <div className="row">
                        <div className="me-2">
                            <button
                                id="submitStudentBtn"
                                className="rounded-2"
                                style={{
                                    backgroundColor: SubmitBtnBgColor ? "#54b7c0" : "#b3e0e4",
                                    color: SubmitBtnColor ? "black" : "#8b8b8b",
                                    fontWeight: SubmitBtnFontWeight ? "bold" : "normal",
                                    border: SubmitBtnBorder ? "#7ec9cf 1px solid" : "#addee0 1px solid",
                                    boxShadow: SubmitBtnBoxShadow
                                    ? "#6ef3ff 0px 0px 10px 0px"
                                    : "none",
                                    cursor: SubmitBtnBoxCursor ? "pointer" : "not-allowed",
                                }}
                                disabled={SubmitBtnDisable}
                                onClick={submitStudent}
                                >
                                Submit
                            </button>
                        </div>
                        <div className="ms-2">
                            <button id="clearBtn" className="rounded-2" onClick={clr}>Clear</button>
                        </div>
                    </div>
                </div>
                <div id="studentId" style={{
                    display: StudentId ? 'block' : 'none'
                }}>
                    <div className="d-flex flex-nowrap justify-content-end align-items-center h-100">
                        <div className="padding">
                            <div className="font">
                                <div className="top">
                                    <img id="idPic" src={male} alt='Profile Pic'/>
                                </div>
                                <div className="bottom">
                                    <p className="mb-0"><span id="idFirstName" className="fs-3"></span> <span id="idLastName" className="fs-3"></span></p>
                                    <p className="m-0 fs-6">Grade <span id="gradeLevel" className="fs-6">0000</span></p>
                                    <p className="mb-2 fs-6">ID No. <span id="idNumber" className="fs-6">0000</span></p>
                                    <div className="barcode">
                                        <img src={qr} alt='QR Code'/>
                                    </div>
                                    <div className="mt-3">
                                        <p id="phoneNumber" className="no"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- View Students Content --> */}
        <div id="vs" style={{display: ViewStudents ? 'block' : 'none'}} className="container shadow-lg">
            <div className="mb-5">
                <h1 className="fw-bold text-start">View Students</h1>
            </div>
            <div>
                <div className="mt-5">
                    <div className="d-flex flex-nowrap justify-content-around w-100">
                        <div className="d-flex flex-nowrap">
                            <div id="searchContainer" className="d-flex flex-nowrap justify-content-between">
                                <h2 className="m-0 pt-2">Students List:</h2>
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
                                    <option value="gender">Gender</option>
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

        {/* <!-- Profile Content --> */}
        <div id="pf" style={{display: Profile ? 'block' : 'none'}} className="container shadow-lg">
            <div className="mb-5">
                <h1 className="fw-bold text-start">Profile</h1>
            </div>
            <div className="d-flex pt-5">
                <div className="w-50 ms-5">
                    <div className="mb-5">
                        <h4>Username:</h4>
                        <input id="pfUsername" className="w-50 fs-3 px-2" type="text" value={adminUsername} disabled/>
                    </div>
                    <div className="mb-5">
                        <h4>Email:</h4>
                        <input id="pfEmail" className="w-50 fs-3 px-2" type="text" value={adminEmail} disabled/>
                    </div>
                    <div className="mb-4 pt-5">
                        <h2>Change Password:</h2>
                    </div>
                    <div className="mb-5">
                        <div className="position-relative row">
                            <h4 id="oldPasswordH4">Current Password:</h4> <h4 id="oldPassWrong" className="fs-4 b-2 text-danger fw-bold"> </h4>
                        </div>
                        <div className="position-relative">
                            <input
                                id="oldPassword"
                                className="w-50 fs-3 px-2" 
                                type={`${passType ? 'password' : 'text'}`}
                                value={oldPassword} 
                                onKeyUp={profileAct} 
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <button id="eyeBtn-0" 
                                style={{
                                    display: eye0 ? 'block' : 'none'
                                }}
                                className="position-absolute h-100 bg-transparent"
                                onClick={eye0Show}
                            >
                                <i id="fas-eye-0" 
                                    className={`${eyeToggle0 ? 'fa-solid fa-eye fa-xl' : 'fa-solid fa-eye-slash fa-xl'}`}
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <h4>New Password:</h4>
                        <div className="position-relative">
                            <input
                                id="newPassword"
                                className="w-50 fs-3 px-2" 
                                value={newPassword} 
                                onKeyUp={profileAct} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                type={`${NewPassType ? 'password' : 'text'}`}
                            />
                            <button id="eyeBtn-1" 
                                style={{
                                    display: eye1 ? 'block' : 'none'
                                }}
                                className="position-absolute h-100 bg-transparent"
                                onClick={eye1Show}
                            >
                                <i id="fas-eye-1" 
                                    className={`${eyeToggle1 ? 'fa-solid fa-eye fa-xl' : 'fa-solid fa-eye-slash fa-xl'}`}
                                ></i>
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h4>Confirm Password:</h4>
                        <div className="position-relative">
                            <input
                                id="newCPassword"
                                className="w-50 fs-3 px-2" 
                                type={`${newCPassType ? 'password' : 'text'}`}
                                value={newCPassword} 
                                onKeyUp={profileAct} 
                                onChange={(e) => setNewCPassword(e.target.value)}
                            />
                            <button id="eyeBtn-2" 
                                style={{
                                    display: eye2 ? 'block' : 'none'
                                }}
                                className="position-absolute h-100 bg-transparent"
                                onClick={eye2Show}
                            >
                                <i id="fas-eye-2" 
                                    className={`${eyeToggle2 ? 'fa-solid fa-eye fa-xl' : 'fa-solid fa-eye-slash fa-xl'}`}
                                ></i>
                            </button>
                        </div>
                    </div>
                    <button 
                        id="updateProfile"
                        style={{
                            backgroundColor: updateProfileBtn ? '#54b7c0' : '#b3e0e4',
                            color: updateProfileBtnColor ? 'black' : '#8b8b8b',
                            fontWeight: updateProfileBtnFW ? 'bold' : 'none',
                            border: updateProfileBtnBorder ? '#7ec9cf 1px solid' : '#addee0 1px solid',
                            cursor: updateProfileBtnCursor ? 'pointer' : 'not-allowed',
                            boxShadow: updateProfileBtnBoxShadow ? '#6ef3ff 0px 0px 10px 0px' : 'none'
                        }} 
                        className="rounded-2 fw-bold me-3" 
                        onClick={updatePass} 
                        disabled={updateProfileBtnDisabled}
                    >
                        Update
                    </button>
                    <button id="cancelProfile" className="rounded-2 fw-bold" onClick={cancel}>Cancel</button>
                </div>
                <div className="w-50">
                    <img className="img-fluid" src={profileBg} alt=""/>
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

export default Home;
import { useState } from "react";
import React from 'react';
import male from './assets/male.png';
import female from './assets/female.png';
import admin from './assets/admin.png'
import qr from './assets/qr.png';

function Home() {

const [firstNameValue, setFirstNameValue] = useState('');
const [lastNameValue, setLastNameValue] = useState('');
const [ageValue, setAgeValue] = useState('');
const [genderValue, setGenderValue] = useState('Choose a gender . . .');
const [contactNumberValue, setContactNumberValue] = useState('');
const [addressValue, setAddressValue] = useState('');

const [Dashboard, SetDbDisplay] = useState(true)
const [RegStudent, SetRSDisplay] = useState()
const [Profile, SetPFDisplay] = useState()

const [DashboardBtn, SetDbBtnBg] = useState(true)
const [RegStudentBtn, SetRegStudentBtnBg] = useState()
const [ProfileBtn, SetProfileBtnBg] = useState()

const [DashboardBtnColor, SetDbBtnColor] = useState(true)
const [RegStudentBtnColor, SetRegStudentBtnColor] = useState()
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
SetDbBtnBg(true);
SetRegStudentBtnBg(false)
SetProfileBtnBg(false);
SetDbBtnColor(true);
SetRegStudentBtnColor(false);
SetProfileBtnColor(false);

fetch('http://localhost:3000/totalboys', {
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
})

fetch('http://localhost:3000/totalgirls', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({})
}).then((data) => {
    return data.json()
}).then((data) => {
    setTotalGirls(data.TotalGirls)
})

fetch('http://localhost:3000/totalstudents', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({})
}).then((data) => {
    return data.json()
}).then((data) => { 
    setTotalStudents(data.TotalStudents)
})
}

function registerStudent() {
SetRSDisplay(true);
SetDbDisplay(false);
SetPFDisplay(false);
SetRegStudentBtnBg(true)
SetDbBtnBg(false);
SetProfileBtnBg(false);
SetRegStudentBtnColor(true);
SetDbBtnColor(false);
SetProfileBtnColor(false);
}

function profile() {
SetPFDisplay(true);
SetRSDisplay(false);
SetDbDisplay(false);
SetProfileBtnBg(true);
SetDbBtnBg(false);
SetRegStudentBtnBg(false)
SetProfileBtnColor(true);
SetDbBtnColor(false);
SetRegStudentBtnColor(false);
}

function submitStudent() {
    
console.log('test')

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
            contactnumber: contactNumberValue,
            address: addressValue
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

        const tableBody = document.getElementById('studentsTableBody');
        const newRow = tableBody.insertRow(-1);

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.textContent = firstNameValue + ' ' + lastNameValue;
        cell2.textContent = ageValue;
        cell3.textContent = genderValue;
        cell4.textContent = contactNumberValue;
        cell5.textContent = addressValue;
            
        idFirstName.innerHTML = firstNameValue
        idLastName.innerHTML = lastNameValue
        phoneNumber.innerHTML = contactNumberValue
        numberExist.innerHTML = ''
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
            console.log(id.idresult)
            idNumber.innerHTML = id.idresult
        })
    } else {
        SetRSContainerWidth(false);
        SetContactNumberAnim(true);
        SetContactNoBoxShadow(false)
        SetContactNoBorder(false);
        numberExist.innerHTML = 'Already Exists'
        setTimeout(function() {
            SetContactNumberAnim(false);
        }, 500)
        SetStudentIdDisplay(false);
        }
    })
}

const [SubmitBtnDisable, SetSubBtnDisable] = useState()
const [SubmitBtnBgColor, SetSubBtnBgColor] = useState()
const [SubmitBtnColor, SetSubBtnColor] = useState()
const [SubmitBtnFontWeight, SetSubBtnFontWeight] = useState()
const [SubmitBtnBorder, SetSubBtnBorder] = useState()
const [SubmitBtnBoxShadow, SetSubBtnBoxShadow] = useState()
const [SubmitBtnBoxCursor, SetSubBtnCursor] = useState()

function studentForm() {
const isValidForm =
    firstNameValue !== "" &&
    lastNameValue !== "" &&
    ageValue !== "" &&
    genderValue !== "" &&
    contactNumberValue !== "" &&
    addressValue !== "" &&
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

fetch('http://localhost:3000/totalboys', {
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
})

fetch('http://localhost:3000/totalgirls', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({})
}).then((data) => {
    return data.json()
}).then((data) => {
    setTotalGirls(data.TotalGirls)
})

fetch('http://localhost:3000/totalstudents', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({})
}).then((data) => {
    return data.json()
}).then((data) => { 
    setTotalStudents(data.TotalStudents)
})
  
  return (
    <div>
      <section className="wrapper d-flex flex-row">
        <nav className="vh-100">
            <div className="pt-5">
                <div id="profilePic" className="text-center m-auto p-auto border rounded-circle">
                    <img className="img-fluid w-75" src={admin} alt=""/>
                </div>
            </div>
            <div className="m-5">
                <h2 className="text-white text-center">ADMINISTRATIVE</h2>
            </div>
            <div className="navBar">
                <li>
                    <button id="dbBtn" className="fs-4 h-100 w-100" 
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
                    <button id="regStudentBtn" className="fs-4 h-100 w-100" 
                        style={
                                {backgroundColor: RegStudentBtn ? '#454a61' : '#181e36',
                                color: RegStudentBtnColor ? 'white' : 'rgb(161, 161, 161)'}
                            } 
                        onClick={registerStudent}
                    >
                        <i className="fa-solid fa-user-plus ms-1 text-end"></i>
                        <span className="fs-4 ms-2">
                            Register Student
                        </span>
                    </button>
                </li>
                <li>
                    <button id="profileBtn" className="fs-4 h-100 w-100" 
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
                <button id="logoutBtn" className="fs-4 h-100 w-100">
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
                <div class="row">
                    <div class="first card p-5 col me-5">
                        <div class="m-3 h-75">
                            <h2 class="text-white">Total Boys</h2>
                        </div>
                        <div class="card-body">
                            <span id="totalBoys" class="text-white">{totalBoys}</span>
                        </div>
                    </div>
                    <div class="second card p-5 col">
                        <div class="m-3 h-75">
                            <h2 class="text-white">Total Girls</h2>
                        </div>
                        <div class="card-body">
                            <span id="totalGirls" class="text-white">{totalGirls}</span>
                        </div>
                    </div>
                    <div class="third card p-5 col ms-5">
                        <div class="m-3 h-75">
                            <h2 class="text-white">Total Students</h2>
                        </div>
                        <div class="card-body">
                            <span id="totalStudents" class="text-white">{totalStudents}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h2>Students List:</h2>
                <table className="table table-striped border border-2">
                    <thead>
                        <tr>
                            <th className="table-name border">Name</th>
                            <th className="table-age border">Age</th>
                            <th className="table-gender border">Gender</th>
                            <th className="table-contactNumber border">Contact No.</th>
                            <th className="table-address border">Address</th>
                        </tr>
                    </thead>
                    <tbody id="studentsTableBody">
                    </tbody>
                </table>
            </div>
        </div>

        {/* <!-- Register Student Content --> */}
        <div id="regStudent" style={{display: RegStudent ? 'block' : 'none'}} className="container shadow-lg">
            <div className="d-flex">
                <div id="regStudentContainer" style={{
                    width: RSContainer ? '75%' : '100%'
                }}>
                    <div className="mb-5">
                        <h1>Register Student</h1>
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
                <div id="studentId" className="w-25" style={{
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
                                    <p className="fs-6">ID No. <span id="idNumber" className="fs-6">0000</span></p>
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

        {/* <!-- Profile Content --> */}
        <div id="pf" style={{display: Profile ? 'block' : 'none'}} className="container shadow-lg">
            <div className="mb-5">
                <h1 className="fw-bold text-start">Profile</h1>
            </div>
            <div className="d-flex pt-5">
                <div className="w-50 ms-5">
                    <div className="mb-5">
                        <h4>Username:</h4>
                        <input className="w-50 fs-3 px-2" type="text" value="" disabled/>
                    </div>
                    <div className="mb-5">
                        <h4>Email:</h4>
                        <input className="w-50 fs-3 px-2" type="text" value="" disabled/>
                    </div>
                    <div className="mb-4 pt-5">
                        <h2>Change Password:</h2>
                    </div>
                    <div className="mb-5">
                        <h4>Current Password:</h4>
                        <input className="w-50 fs-3 px-2" type="password" value="******"/>
                    </div>
                    <div className="mb-5">
                        <h4>New Password:</h4>
                        <input className="w-50 fs-3 px-2" type="password" value=""/>
                    </div>
                    <div className="mb-4">
                        <h4>Confirm Password:</h4>
                        <input className="w-50 fs-3 px-2" type="password" value=""/>
                    </div>
                    <button id="updateProfile" className="rounded-2 fw-bold me-3">Update</button>
                    <button id="cancelProfile" className="rounded-2 fw-bold">Cancel</button>
                </div>
                <div className="w-50">
                    <img className="img-fluid" src="49.png" alt=""/>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
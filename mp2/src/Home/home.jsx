import React from 'react';

function Home() {

const [firstNameValue, setFirstNameValue] = React.useState('');
const [lastNameValue, setLastNameValue] = React.useState('');
const [ageValue, setAgeValue] = React.useState('');
const [genderValue, setGenderValue] = React.useState('');
const [contactNumberValue, setContactNumberValue] = React.useState('');
const [addressValue, setAddressValue] = React.useState('');
const db = document.getElementById("db")
const regStudent = document.getElementById("regStudent")
const dbBtn = document.getElementById("dbBtn")
const regStudentBtn = document.getElementById("regStudentBtn")
const pf = document.getElementById("pf")
const profileBtn = document.getElementById("profileBtn")
const submitStudentBtn = document.getElementById('submitStudentBtn')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const age = document.getElementById('age')
const gender = document.getElementById('gender')
const contactNo = document.getElementById('contactNo')
const address = document.getElementById('address')

  function registerStudent() {
      db.style.display = "none"
      pf.style.display = "none"
      regStudent.style.display = "block"
      regStudentBtn.style.backgroundColor = "#454a61"
      regStudentBtn.style.color = "white"
      dbBtn.style.backgroundColor = "#181e36"
      dbBtn.style.color = "rgb(161, 161, 161)"
      profileBtn.style.backgroundColor = "#181e36"
      profileBtn.style.color = "rgb(161, 161, 161)"
  }

  function dashBoard() {
      db.style.display = "block"
      regStudent.style.display = "none"
      pf.style.display = "none"
      dbBtn.style.backgroundColor = "#454a61"
      dbBtn.style.color = "white"
      regStudentBtn.style.backgroundColor = "#181e36"
      regStudentBtn.style.color = "rgb(161, 161, 161)"
      profileBtn.style.backgroundColor = "#181e36"
      profileBtn.style.color = "rgb(161, 161, 161)"
  }

  function profile() {
      profileBtn.style.backgroundColor = "#454a61"
      profileBtn.style.color = "white"
      pf.style.display = "block"
      db.style.display = "none"
      regStudent.style.display = "none"
      dbBtn.style.backgroundColor = "#181e36"
      dbBtn.style.color = "rgb(161, 161, 161)"
      regStudentBtn.style.backgroundColor = "#181e36"
      regStudentBtn.style.color = "rgb(161, 161, 161)"
  }

  function submitStudent() {
      const firstName = document.getElementById('firstname')
      const lastName = document.getElementById('lastname')
      const age = document.getElementById('age')
      const gender = document.getElementById('gender')
      const contactNo = document.getElementById('contactNo')
      const address = document.getElementById('address')

      fetch('http://localhost:3000/students' , {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              firstname: firstName.value,
              lastname: lastName.value,
              age: age.value,
              gender: gender.value,
              contactnumber: contactNo.value,
              address: address.value
          })
      }).then((studentData) => {
          return studentData.json()
      }).then((studentData) => {
          const regStudentContainer = document.getElementById('regStudentContainer')
          const studentId = document.getElementById('studentId')
          const idFirstName = document.getElementById('idFirstName')
          const idLastName = document.getElementById('idLastName')
          const idNumber = document.getElementById('idNumber')
          const phoneNumber = document.getElementById('phoneNumber')
          const numberExist = document.getElementById('numberExist')
          const idPic = document.getElementById('idPic')
          
          if (studentData.success) {
              if (gender.value === 'Male') {
                  idPic.src = 'male.png'
              } else {
                  idPic.src = 'female.png'
              }
              regStudentContainer.style.width = '75%'
              setTimeout(() => {
                  studentId.style.display = 'block'
              }, 1000);
              
              idFirstName.innerHTML = firstName.value
              idLastName.innerHTML = lastName.value
              phoneNumber.innerHTML = contactNo.value
              numberExist.innerHTML = ''
              contactNo.style.boxShadow = 'none';
              contactNo.style.border = "1px solid black"
              fetch('http://localhost:3000/validation' , {
                  method: 'post',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      contactnumber: contactNo.value
                  })
              }).then((id) => {
                  return id.json()
              }).then((id) => {
                  console.log(id.idresult)
                  idNumber.innerHTML = id.idresult
              })
          } else {
              regStudentContainer.style.width = '100%'
              contactNo.style.animation = 'shake1 0.5s'
              contactNo.style.boxShadow = 'red 0px 0px 10px 0px';
              contactNo.style.border = "2px solid red"
              numberExist.innerHTML = 'Already Exists'
              setTimeout(function() {
                  contactNo.style.removeProperty('animation')
              }, 500)
              studentId.style.display = 'none'
          }
      })
  }
  

  function studentForm() {
      if (firstName.value !== '' && lastName.value !== '' && age.value !== '' && gender.value !== '' && contactNo.value !== '' && address.value !== '' ) {
          if (gender.value === 'Male' || gender.value === 'Female') {
              submitStudentBtn.disabled = false
              submitStudentBtn.style.backgroundColor = '#54b7c0'
              submitStudentBtn.style.color = 'black'
              submitStudentBtn.style.fontWeight = 'bold'
              submitStudentBtn.style.border = '#7ec9cf 1px solid'
              submitStudentBtn.style.boxShadow = '#6ef3ff 0px 0px 10px 0px'
              submitStudentBtn.style.cursor = 'pointer'
          } else {
              submitStudentBtn.style.backgroundColor = '#b3e0e4'
              submitStudentBtn.style.color = '#8b8b8b'
              submitStudentBtn.style.cursor = 'not-allowed'
              submitStudentBtn.style.border = '#addee0 1px solid'
              submitStudentBtn.style.boxShadow = 'none' 
          }    
      } else {
          submitStudentBtn.style.backgroundColor = '#b3e0e4'
          submitStudentBtn.style.color = '#8b8b8b'
          submitStudentBtn.style.cursor = 'not-allowed'
          submitStudentBtn.style.border = '#addee0 1px solid'
          submitStudentBtn.style.boxShadow = 'none'
      }
  }

  // firstName.addEventListener('keyup', studentForm)
  // lastName.addEventListener('keyup', studentForm)
  // age.addEventListener('keyup', studentForm)
  // gender.addEventListener('keyup', studentForm)
  // contactNo.addEventListener('keyup', studentForm)
  // address.addEventListener('keyup', studentForm)

  function clr() {
      const regStudentContainer = document.getElementById('regStudentContainer')
      const studentId = document.getElementById('studentId')
      const numberExist = document.getElementById('numberExist')

      firstName.value = ''
      lastName.value = ''
      age.value = ''
      gender.value = 'Choose a gender . . .'
      contactNo.value = ''
      address.value = ''
      submitStudentBtn.style.backgroundColor = '#b3e0e4'
      submitStudentBtn.style.color = '#8b8b8b'
      submitStudentBtn.style.cursor = 'not-allowed'
      submitStudentBtn.style.border = '#addee0 1px solid'
      submitStudentBtn.style.boxShadow = 'none'
      regStudentContainer.style.width = '100%'
      studentId.style.display = 'none'
      numberExist.innerHTML = ''
      contactNo.style.boxShadow = 'none';
      contactNo.style.border = "1px solid black"
  }
  
  return (
    <div>
      <section className="wrapper d-flex flex-row">
        <nav className="vh-100">
            <div className="pt-5">
                <div id="profilePic" className="text-center m-auto p-auto border rounded-circle">
                    <img className="img-fluid w-75" src="user-64.png" alt=""/>
                </div>
            </div>
            <div className="m-5">
                <h2 className="text-white text-center">ADMINISTRATIVE</h2>
            </div>
            <div className="navBar">
                <li>
                    <button id="dbBtn" className="fs-4 h-100 w-100" onClick={dashBoard}>
                        <i className="fa-solid fa-chart-line pe-2 text-center"></i>
                        <span className="fs-4 me-5">
                            Dashboard
                        </span>
                    </button>
                </li>
                <li>
                    <button id="regStudentBtn" className="fs-4 h-100 w-100" onClick={registerStudent}>
                        <i className="fa-solid fa-user-plus ms-1 text-end"></i>
                        <span className="fs-4 ms-2">
                            Register Student
                        </span>
                    </button>
                </li>
                <li>
                    <button id="profileBtn" className="fs-4 h-100 w-100" onClick={profile}>
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
        <div id="db" className="container shadow-lg">
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
                            <span className="text-white">0</span>
                        </div>
                    </div>
                    <div className="second card p-5 col">
                        <div className="m-3 h-75">
                            <h2 className="text-white">Total Girls</h2>
                        </div>
                        <div className="card-body">
                            <span className="text-white">0</span>
                        </div>
                    </div>
                    <div className="third card p-5 col ms-5">
                        <div className="m-3 h-75">
                            <h2 className="text-white">Total Students</h2>
                        </div>
                        <div className="card-body">
                            <span className="text-white">0</span>
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
                    <tbody>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                        <tr>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                            <td className="border"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* <!-- Register Student Content --> */}
        <div id="regStudent" className="container shadow-lg">
            <div className="d-flex">
                <div id="regStudentContainer">
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
                                <option selected disabled hidden>Choose a gender . . .</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="col">
                            <h4>Contact Number <span className="required fs-3">*</span> <span id="numberExist" className="fs-3 text-danger fw-bold"></span></h4>
                            <input 
                                id="contactNo" 
                                className="fs-3 px-2" 
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
                            <button id="submitStudentBtn" className="rounded-2" onClick={submitStudent} disabled>Submit</button>
                        </div>
                        <div className="ms-2">
                            <button id="clearBtn" className="rounded-2" onClick={clr}>Clear</button>
                        </div>
                    </div>
                </div>
                <div id="studentId" className="w-25">
                    <div className="d-flex flex-nowrap justify-content-end align-items-center h-100">
                        <div className="padding">
                            <div className="font">
                                <div className="top">
                                    <img id="idPic" src="female.png" alt='Profile Pic'/>
                                </div>
                                <div className="bottom">
                                    <p className="mb-0"><span id="idFirstName" className="fs-3"></span> <span id="idLastName" className="fs-3"></span></p>
                                    <p className="fs-6">ID No. <span id="idNumber" className="fs-6">0000</span></p>
                                    <div className="barcode">
                                        <img src="qr sample.png" alt='QR Code'/>
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
        <div id="pf" className="container shadow-lg">
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
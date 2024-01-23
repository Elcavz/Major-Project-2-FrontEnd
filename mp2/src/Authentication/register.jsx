import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';

function Registration() {

const [userNameValue, SetUserNameValue] = useState('')
const [emailValue, SetEmailValue] = useState('')
const [passwordValue, SetPasswordValue] = useState('')
const [cPasswordValue, SetCPasswordValue] = useState('')
const regBtn = document.getElementById('regBtn');
const [RegBtnCursor, SetRegBtnCursor] = useState()
const [RegBtnBGColor, SetRegBtnBgColor] = useState()
const [RegBtnColor, SetRegBtnColor] = useState(false)
const [RegBtnBorder, setRegBtnBorder] = useState()

const [UserNameBoxShadow, SetUserNameBoxShadow] = useState('none')
const [UserNameBorder, SetUserNameBorder] = useState('none')
const [UserNameAnimation, SetUserNameAnimation] = useState()

const [RegBtnWidth, SetRegBtnWidth] = useState()
const [RegBtnSubmitBoxShadow, SetRegBtnSubmitBoxShadow] = useState()
const [ExistColor, SetExistColor] = useState()

const ValidatePassword = () => {
    checkFields()
    validatePass()
    checkPassword()
    eyePass()
}

const ValidateCPassword = () => {
    checkFields()
    checkPassword()
    eyeCPass()
}

const [eye0, setEye0Display] = useState()
const [eye1, setEye1Display] = useState()

function eyePass() {
    (passwordValue !== '') ? setEye0Display(true) : setEye0Display(false);
}

function eyeCPass() {
    (cPasswordValue !== '') ? setEye1Display(true) : setEye1Display(false);
}

const [eyeToggle0, setEyeShow0] = useState(false)
const [passType, setpassType] = useState(true)
function eye0Show() {
    setEyeShow0(!eyeToggle0)
    setpassType(!passType)
}

const [eyeToggle1, setEyeShow1] = useState(false)
const [CPassType, setCPassType] = useState(true)
function eye1Show() {
    setEyeShow1(!eyeToggle1)
    setCPassType(!CPassType)
}

function checkFields() {
    const wrongPassword = document.getElementById('wrongPass').innerHTML;

    if (userNameValue !== '' && emailValue !== '' && passwordValue !== '' && cPasswordValue !== '' && wrongPassword === '.') {
        SetRegBtnCursor(true);
        SetRegBtnBgColor(true);
        SetRegBtnColor(true);
    } else {
        SetRegBtnCursor(false);
        SetRegBtnBgColor(false);
        SetRegBtnColor(false);
    }
}

const [XPasswordColor, SetXPassColor] = useState('none')
const [PasswordBorder, SetPasswordBorder] = useState('none')
const [PasswordBoxShadow, SetPasswordBoxShadow] = useState('none')
const [CPasswordBorder, SetCPasswordBorder] = useState('none')
const [CPasswordBoxShadow, SetCPasswordBoxShadow] = useState('none')
const [PassH3Color, SetPassH3Color] = useState('none')
const [CPassH3Color, SetCPassH3Color] = useState('none')
const [WarningIconColor, SetWarningIconColor] = useState('none')
const [WarningIconUsername, SetWarningIconUsername] = useState('none')
const [RegBtnDisable, SetRegBtnDisable] = useState('none')

function checkPassword() {
    const password = document.getElementById('password');
    const cPassword = document.getElementById('cPassword');
    const wrongPassword = document.getElementById('wrongPass');
    const warningIconPassword = document.getElementById('warningIconPassword');
    
    if (passwordValue !== '' && cPasswordValue !== '') {
        if (passwordValue === cPasswordValue) {
            SetXPassColor(true);
            SetPasswordBorder(true);
            SetCPasswordBorder(true);
            SetPassH3Color(true);
            SetCPassH3Color(true);
            SetRegBtnColor(true);
            SetRegBtnBgColor(true);
            SetWarningIconColor(true);
            SetRegBtnCursor(true);
            wrongPassword.innerHTML = "."
            SetRegBtnDisable(false);
            password.removeAttribute('style');
            cPassword.removeAttribute('style');
        } else {
            SetXPassColor(false);
            SetPasswordBorder(false);
            SetCPasswordBorder(false);
            SetPassH3Color(false);
            SetCPassH3Color(false);
            SetRegBtnColor(false);
            SetRegBtnBgColor(false);
            SetWarningIconColor(false);
            wrongPassword.innerHTML = " " + "Incorrect Password"
            SetCPasswordBoxShadow(false);
            SetPasswordBoxShadow(false);
            SetRegBtnDisable(true);
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
        }
    } else {
        SetXPassColor(false);
            SetPasswordBorder(false);
            SetCPasswordBorder(false);
            SetPassH3Color(false);
            SetCPassH3Color(false);
            SetRegBtnColor(false);
            SetRegBtnBgColor(false);
            SetWarningIconColor(false);
            wrongPassword.innerHTML = " " + "Incorrect Password"
            SetCPasswordBoxShadow(false);
            SetPasswordBoxShadow(false);
            SetRegBtnDisable(true);
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
    }
}

function validatePass() {
    const password = document.getElementById('password');
    const cPassword = document.getElementById('cPassword');
    const wrongPassword = document.getElementById('wrongPass');
    const warningIconPassword = document.getElementById('warningIconPassword');

    if (cPasswordValue !== '' && passwordValue !== '') {
        if (passwordValue === cPasswordValue) {
            SetXPassColor(true);
            SetPasswordBorder(true);
            SetCPasswordBorder(true);
            SetPassH3Color(true);
            SetCPassH3Color(true);
            SetRegBtnColor(true);
            SetRegBtnBgColor(true);
            SetWarningIconColor(true);
            SetRegBtnCursor(true);
            wrongPassword.innerHTML = "."
            SetRegBtnDisable(false);
            password.removeAttribute('style');
            cPassword.removeAttribute('style');
        } else {
            SetXPassColor(false);
            SetPasswordBorder(false);
            SetCPasswordBorder(false);
            SetPassH3Color(false);
            SetCPassH3Color(false);
            SetRegBtnColor(false);
            SetRegBtnBgColor(false);
            SetWarningIconColor(false);
            wrongPassword.innerHTML = " " + "Incorrect Password"
            SetCPasswordBoxShadow(false);
            SetPasswordBoxShadow(false);
            SetRegBtnDisable(true);
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
        }
    } else {
        SetXPassColor(false);
            SetPasswordBorder(false);
            SetCPasswordBorder(false);
            SetPassH3Color(false);
            SetCPassH3Color(false);
            SetRegBtnColor(false);
            SetRegBtnBgColor(false);
            SetWarningIconColor(false);
            wrongPassword.innerHTML = " " + "Incorrect Password"
            SetCPasswordBoxShadow(false);
            SetPasswordBoxShadow(false);
            SetRegBtnDisable(true);
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
    }
}

function register() {
    console.log('test')
    fetch('http://localhost:3000/register', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userNameValue,
            email: emailValue,
            password: passwordValue,
        })
    }).then((data) => {
        return data.json()
    }).then((data) => {
        const warningIconUsername = document.getElementById('warningIconUsername');
        const exist = document.getElementById('exist');

        if (data.success) {
            exist.innerHTML = ""
            regBtn.innerHTML = '✔️'
            SetUserNameBoxShadow(true);
            SetUserNameBorder(true);
            SetRegBtnWidth(true);
            SetRegBtnSubmitBoxShadow(true);
            SetWarningIconUsername(true);
            setRegBtnBorder(true);
        } else {
            SetUserNameBoxShadow(false);
            SetUserNameBorder(false);
            SetUserNameAnimation(true);
            SetWarningIconUsername(false);
            setRegBtnBorder(false);
            warningIconUsername.classList.add('fa-triangle-exclamation');
            SetExistColor(true);
            exist.innerHTML = " " + "Username Already Taken"
            setTimeout(() => {
                SetUserNameAnimation(false);
            }, 500);
        }
    })
}

useEffect(() => {
    document.title = 'REGISTER'
}, [])

  return (
    <div id="register">
        <div className="vh-100 d-flex flex-nowrap justify-content-center align-items-center">
            <div className="h-75 shadow-lg border rounded-5">
                <div className="h-25 border rounded-4 text-center d-flex flex-nowrap justify-content-center align-items-center">
                    <h4 className="text-white text-decoration-underline">REGISTRATION</h4>
                </div>
                <div className="mx-4 bg-transparent">
                    <div className="mb-4 bg-transparent">
                        <h3 className="bg-transparent text-white">Username <span className="text-danger bg-transparent fs-3">*</span></h3>
                            <input id="userName" 
                                style={{
                                    boxShadow: UserNameBoxShadow ? '' : 'red 0px 0px 10px 0px',
                                    border: UserNameBorder ? '' : '2px solid red',
                                    animation: UserNameAnimation ? 'shake1 0.5s' : 'none'
                                }}
                                className="fs-3 px-2 rounded-3 bg-transparent"
                                type="text" value={userNameValue}
                                onChange={(e) => SetUserNameValue(e.target.value)}
                                onKeyUp={checkFields}
                                autoComplete="off"
                            />
                        <br/><i id="warningIconUsername" style={{color: WarningIconUsername ? 'transparent' : 'red'}} className="fa-solid"></i>
                        <span id="exist" style={{
                            color: ExistColor ? 'black' : 'black'
                        }} className="fs-5 bg-transparent"></span>
                    </div>
                    <div className="mb-5 bg-transparent">
                        <h3 className="bg-transparent text-white">Email <span className="text-danger bg-transparent fs-3">*</span></h3>
                        <input id="email" className="fs-3 px-2 rounded-3 bg-transparent" type="text" value={emailValue} autoComplete="off" onChange={(e) => SetEmailValue(e.target.value)} onKeyUp={checkFields}/>
                    </div>
                    <div className="mb-5 bg-transparent">
                        <h3 id="passH3" 
                            style={{
                                color: PassH3Color ? 'black' : 'red'
                            }}
                            className="bg-transparent text-white"
                        >
                            Password <span className="text-danger bg-transparent fs-3">*</span></h3>
                        <div className="position-relative">
                            <input id="password" 
                                style={{
                                    border: PasswordBorder ? '2px solid rgb(168, 168, 168)' : '2px solid red',
                                    boxShadow: PasswordBoxShadow ? '' : 'red 0px 0px 10px 0px'
                                }}
                                className="fs-3 px-2 rounded-3 bg-transparent" 
                                type={`${passType ? 'password' : 'text'}`}
                                value={passwordValue} 
                                onChange={(e) => SetPasswordValue(e.target.value)} 
                                onKeyUp={ValidatePassword}
                            />
                            <button id="eyeBtnR-0" 
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
                    <div className="mb-5 bg-transparent">
                        <h3 id="cPassH3" 
                            style={{
                                color: CPassH3Color ? 'black' : 'red'
                            }}
                            className="bg-transparent text-white"
                        >Confirm Password <span className="text-danger bg-transparent fs-3">*</span>
                        </h3>
                        <div className="position-relative">
                        <input id="cPassword" 
                            style={{
                                border: CPasswordBorder ? '2px solid rgb(168, 168, 168)' : '2px solid red',
                                boxShadow: CPasswordBoxShadow ? '' : 'red 0px 0px 10px 0px'
                            }}
                            className="fs-3 px-2 rounded-3 bg-transparent"
                            type={`${CPassType ? 'password' : 'text'}`}
                            value={cPasswordValue}
                            onChange={(e) => SetCPasswordValue(e.target.value)}
                            onKeyUp={ValidateCPassword}
                        />
                        <button id="eyeBtnR-1"
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
                        <i id="warningIconPassword" 
                        style={{
                            color: WarningIconColor ? 'transparent' : 'red'
                        }} className="fa-solid"></i><span id="wrongPass" 
                        style={{
                            color: XPasswordColor ? 'transparent' : 'black'
                        }} className="fs-5 bg-transparent">.</span>
                    </div>
                    <div className="text-center bg-transparent">
                        <button id="regBtn"
                        style={{
                            cursor: RegBtnCursor ? 'pointer' : 'not-allowed',
                            backgroundColor: RegBtnBGColor ? '#24315c' : '#7f8fc0',
                            boxShadow: RegBtnSubmitBoxShadow ? 'green 0px 0px 10px 0px' : 'none',
                            color: RegBtnColor ? 'white' : '#cccccc',
                            width: RegBtnWidth ? '15%' : '',
                            border: RegBtnBorder ? 'green 1px solid' : '#cccccc 1px solid'
                        }} className="rounded-3" onClick={register} disabled={RegBtnDisable}>REGISTER</button>
                    </div>
                    <div className="mt-4 bg-transparent">
                        <Link to='/login' id="loginBtn" className="d-flex flex-nowrap justify-content-center align-items-center text-decoration-none w-100 rounded-3">
                            LOG IN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Registration;
import { useState } from "react";
import React from 'react';

function Registration() {

const [userNameValue, SetUserNameValue] = useState('')
const [emailValue, SetEmailValue] = useState('')
const [passwordValue, SetPasswordValue] = useState('')
const [cPasswordValue, SetCPasswordValue] = useState('')
const regBtn = document.getElementById('regBtn');
// const userName = document.getElementById('userName');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const cPassword = document.getElementById('cPassword');
const [RegBtnCursor, SetRegBtnCursor] = useState()
const [RegBtnBGColor, SetRegBtnBgColor] = useState()
const [RegBtnColor, SetRegBtnColor] = useState('none')

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
}

const ValidateCPassword = () => {
    checkFields()
    checkPassword()
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
            // regBtn.disabled = false;
            password.removeAttribute('style');
            cPassword.removeAttribute('style');
            // regBtn.style.cursor = 'pointer'
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
            // regBtn.disabled = true;
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
            // regBtn.style.cursor = 'not-allowed'
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
            // regBtn.disabled = true;
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
            // regBtn.style.cursor = 'not-allowed'
    }
}

// password.addEventListener('keyup' , checkPassword)
// cPassword.addEventListener('keyup' , checkPassword)

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
            // regBtn.disabled = false;
            password.removeAttribute('style');
            cPassword.removeAttribute('style');
            // regBtn.style.cursor = 'pointer'
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
            // regBtn.disabled = true;
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
            // regBtn.style.cursor = 'not-allowed'
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
            // regBtn.disabled = true;
            warningIconPassword.removeAttribute('style')
            warningIconPassword.classList.add('fa-triangle-exclamation');
            SetRegBtnCursor(false);
            // regBtn.style.cursor = 'not-allowed'
    }
}
    
// password.addEventListener('keyup' , validatePass) 

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
            SetRegBtnWidth(true);
            SetRegBtnSubmitBoxShadow(true);
        } else {
            SetUserNameBoxShadow(false);
            SetUserNameBorder(false);
            SetUserNameAnimation(true);
            warningIconUsername.removeAttribute('style');
            warningIconUsername.classList.add('fa-triangle-exclamation');
            SetExistColor(true);
            exist.innerHTML = " " + "Username Already Taken"
            setTimeout(() => {
                SetUserNameAnimation(false);
            }, 500);
        }
    })
}

  return (
    <div className="vh-100 d-flex flex-nowrap justify-content-center align-items-center">
        <div className="h-75 shadow-lg border rounded-5">
            <div className="h-25 border rounded-4 text-center d-flex flex-nowrap justify-content-center align-items-center">
                <h4 className="text-white text-decoration-underline">REGISTRATION</h4>
            </div>
            <div className="mx-4 bg-white">
                <div className="mb-4 bg-white">
                    <h3 className="bg-white">Username <span className="text-danger bg-white fs-3">*</span></h3>
                    <input id="userName" 
                    style={{
                        boxShadow: UserNameBoxShadow ? '' : 'red 0px 0px 10px 0px',
                        border: UserNameBorder ? '' : '2px solid red',
                        animation: UserNameAnimation ? 'shake1 0.5s' : 'none'
                    }} className="fs-3 px-2 rounded-3 bg-white" type="text" value={userNameValue} onChange={(e) => SetUserNameValue(e.target.value)} onKeyUp={checkFields}/>
                    <br/><i id="warningIconUsername" className="fa-solid"></i>
                    <span id="exist" style={{
                        color: ExistColor ? 'black' : 'black'
                    }} className="fs-5 bg-transparent"></span>
                </div>
                <div className="mb-5 bg-white">
                    <h3 className="bg-white">Email <span className="text-danger bg-white fs-3">*</span></h3>
                    <input id="email" className="fs-3 px-2 rounded-3 bg-white" type="text" value={emailValue} onChange={(e) => SetEmailValue(e.target.value)} onKeyUp={checkFields}/>
                </div>
                <div className="mb-5 bg-white">
                    <h3 id="passH3" 
                    style={{
                        color: PassH3Color ? '#1b46d4' : 'red'
                    }} className="bg-white">Password <span className="text-danger bg-white fs-3">*</span></h3>
                    <input id="password" 
                    style={{
                        border: PasswordBorder ? '2px solid rgb(168, 168, 168)' : '2px solid red',
                        boxShadow: PasswordBoxShadow ? '' : 'red 0px 0px 10px 0px'
                    }} className="fs-3 px-2 rounded-3 bg-white" type="password" value={passwordValue} onChange={(e) => SetPasswordValue(e.target.value)} onKeyUp={ValidatePassword}/>
                </div>
                <div className="mb-5 bg-white">
                    <h3 id="cPassH3" 
                    style={{
                        color: CPassH3Color ? '#1b46d4' : 'red'
                    }} className="bg-white">Confirm Password <span className="text-danger bg-transparent fs-3">*</span></h3>
                    <input id="cPassword" 
                    style={{
                        border: CPasswordBorder ? '2px solid rgb(168, 168, 168)' : '2px solid red',
                        boxShadow: CPasswordBoxShadow ? '' : 'red 0px 0px 10px 0px'
                    }} className="fs-3 px-2 rounded-3 bg-white" type="password" value={cPasswordValue} onChange={(e) => SetCPasswordValue(e.target.value)} onKeyUp={ValidateCPassword}/>
                    <i id="warningIconPassword" 
                    style={{
                        color: WarningIconColor ? 'white' : 'black'
                    }} className="fa-solid"></i><span id="wrongPass" 
                    style={{
                        color: XPasswordColor ? 'white' : 'black'
                    }} className="fs-5 bg-transparent">.</span>
                </div>
                <div className="text-center bg-transparent">
                    <button id="regBtn"
                    style={{
                        cursor: RegBtnCursor ? 'pointer' : 'not-allowed',
                        backgroundColor: RegBtnBGColor ? '#24315c' : '#7f8fc0',
                        boxShadow: RegBtnSubmitBoxShadow ? 'green' : 'green',
                        color: RegBtnColor ? 'white' : 'rgb(231, 231, 231)',
                        width: RegBtnWidth ? '15%' : ''
                    }} className="rounded-3" onClick={register} disabled={RegBtnDisable}>REGISTER</button>
                </div>
                <div className="mt-4 bg-white">
                    <a id="loginBtn" className="d-flex flex-nowrap justify-content-center align-items-center text-decoration-none w-100 rounded-3" href="login.html" type="button">
                        LOG IN
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Registration;
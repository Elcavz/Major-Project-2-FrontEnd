import { useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import loginLogo from './assets/adminLogin.png';

function Login() {

    
    const loginCard = document.getElementById('loginCard')
    const invalidCred = document.getElementById('invalidCred')
    const [userNameValue, SetUserNameValue] = useState('')
    const [passwordValue, SetPasswordValue] = useState('')
    const [LoginBtnBGColor, SetLoginBtnBGColor] = useState()
    const [LoginBtnDisabled, SetLoginBtnDisabled] = useState()
    const [LoginBtnCursor, SetLoginBtnCursor] = useState()
    const [LoginBtnWidth, SetLoginBtnWidth] = useState()
    const [LoginBtnBorder, SetLoginBtnBorder] = useState()
    const [LoginBtnBoxShadow, SetLoginBtnBoxShadow] = useState()
    const [LoginCard, SetLoginCardAnim] = useState()

    function enableLoginBtn() {
        if (userNameValue !== '' && passwordValue !== '') {
            SetLoginBtnBGColor(true);
            SetLoginBtnDisabled(false);
            SetLoginBtnCursor(true);
        } else {
            SetLoginBtnBGColor(false);
            SetLoginBtnDisabled(true);
            SetLoginBtnCursor(false);
        }
    }

    function login() {
        fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userNameValue,
                password: passwordValue,
            })
        }).then((data) => {
            return data.json()
        }).then((data) => {
            if (data.success) {
                const loginBtn = document.getElementById('login_Btn')
                loginCard.style.removeProperty('animation')
                invalidCred.innerHTML = ''
                loginBtn.innerHTML = '✔️'
                SetLoginBtnWidth(true);
                SetLoginBtnBorder(true);
                SetLoginBtnBoxShadow(true);

                function myURL() {
                    document.location.href = '/';
                }
                setTimeout(myURL, 2000);
            } else {
                SetLoginCardAnim(true);
                // loginCard.style.animation = 'shake 0.5s'
                setTimeout(function() {
                    SetLoginCardAnim(false);
                }, 500)
                invalidCred.innerHTML = 'Invalid Username Or Password'
            }
        })
    }

    return (
        <div id="login">
        <div className="vh-100 d-flex flex-nowrap justify-content-center align-items-center">
        <div id="loginCard" 
        style={{
            animation: LoginCard ? 'shake 0.5s' : 'none'
        }} className="h-75 shadow-lg border rounded-5">
            <div className="h-50 border rounded-4 text-center d-flex flex-nowrap flex-column justify-content-center align-items-center">
                <div className="bg-transparent h-50 w-50">
                    <img className="img-fluid bg-transparent h-75 w-75" src={loginLogo} alt=""/>
                </div>
                <h4 className="text-white text-decoration-underline">LOG IN</h4>
            </div>
            <div className="mx-4 bg-white">
                <div className="mb-5 bg-white">
                     <span id="invalidCred" className="fs-4 bg-transparent text-danger fw-bold"></span>
                    <h3 className="bg-white">Username <span className="text-danger bg-white fs-3">*</span></h3>
                    <input id="userName" className="fs-3 px-2 rounded-3 bg-white" value={userNameValue} onKeyUp={enableLoginBtn} onChange={(e) => SetUserNameValue(e.target.value)} type="text"/>
                </div>
                <div className="mb-5 bg-white">
                    <h3 id="passH3" className="bg-white">Password <span className="text-danger bg-white fs-3">*</span></h3>
                    <input id="password" className="fs-3 px-2 rounded-3 bg-white" value={passwordValue} onKeyUp={enableLoginBtn} onChange={(e) => SetPasswordValue(e.target.value)} type="password"/>
                </div>
                <div className="text-center bg-transparent">
                    <button id="login_Btn" 
                    style={{
                        backgroundColor: LoginBtnBGColor ? '#39df47' : '#a0dfa5',
                        cursor: LoginBtnCursor ? 'pointer' : 'not-allowed',
                        width: LoginBtnWidth ? '15%' : '100%',
                        border: LoginBtnBorder ? 'green' : 'none',
                        boxShadow: LoginBtnBoxShadow ? 'green 0px 0px 10px 0px' : 'none'
                    }} className="rounded-3" onClick={login} disabled={LoginBtnDisabled}>LOG IN</button>
                </div>
                <div className="mt-4 bg-white">
                    <Link id="reg_Btn" to='/register' className="d-flex flex-nowrap justify-content-center align-items-center text-decoration-none w-100 rounded-3">REGISTER</Link>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Login;
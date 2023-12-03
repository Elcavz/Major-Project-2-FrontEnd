import { useEffect, useState } from "react";
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
                localStorage.setItem('token: ', data.token)
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
                setTimeout(function() {
                    SetLoginCardAnim(false);
                }, 500)
                invalidCred.innerHTML = 'Invalid Username Or Password'
            }
        })
    }

    const [eye, setEyeDisplay] = useState()

    function eyePass() {
        (passwordValue !== '') ? setEyeDisplay(true) : setEyeDisplay(false);
    }

    const [eyeToggle, setEyeShow] = useState(false)
    const [passType, setpassType] = useState(true)
    function eyeShow() {
        setEyeShow(!eyeToggle)
        setpassType(!passType)
    }

    function passwordLogin() {
        enableLoginBtn()
        eyePass()
    }

    useEffect(() => {
        document.title = 'ADMIN | LOGIN'
    }, [])

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
            <div className="mx-4 bg-transparent">
                <div className="mb-5 bg-transparent">
                     <span id="invalidCred" className="fs-4 bg-transparent text-danger fw-bold"></span>
                    <h3 className="bg-transparent">Username <span className="text-danger bg-transparent fs-3">*</span></h3>
                    <input id="userName" className="fs-3 px-2 rounded-3 bg-transparent" value={userNameValue} onKeyUp={enableLoginBtn} onChange={(e) => SetUserNameValue(e.target.value)} type="text"/>
                </div>
                <div className="mb-5 bg-transparent">
                    <h3 id="passH3" className="bg-transparent">Password <span className="text-danger bg-transparent fs-3">*</span></h3>
                    <div className="position-relative">
                        <input id="password" 
                            className="fs-3 px-2 rounded-3 bg-transparent" 
                            value={passwordValue}
                            onKeyUp={passwordLogin} 
                            onChange={(e) => SetPasswordValue(e.target.value)} 
                            type={`${passType ? 'password' : 'text'}`}
                        />
                        <button id="eyeLoginBtn"
                            style={{
                                display: eye ? 'block' : 'none'
                            }}
                            className="position-absolute h-100 bg-transparent"
                            onClick={eyeShow}
                        >
                            <i id="fas-eye" 
                                className={`${eyeToggle ? 'fa-solid fa-eye fa-xl' : 'fa-solid fa-eye-slash fa-xl'}`}
                            ></i>
                        </button>
                    </div>
                </div>
                <div className="text-center bg-transparent">
                    <button id="login_Btn" 
                    style={{
                        backgroundColor: LoginBtnBGColor ? '#39df47' : '#a0dfa5',
                        cursor: LoginBtnCursor ? 'pointer' : 'not-allowed',
                        width: LoginBtnWidth ? '15%' : '100%',
                        border: LoginBtnBorder ? 'green 1px solid' : 'white 1px solid',
                        boxShadow: LoginBtnBoxShadow ? 'green 0px 0px 10px 0px' : 'none'
                    }} className="rounded-3" onClick={login} disabled={LoginBtnDisabled}>LOG IN</button>
                </div>
                <div className="mt-4 bg-transparent">
                    <Link id="reg_Btn" to='/register' className="d-flex flex-nowrap justify-content-center align-items-center text-decoration-none w-100 rounded-3">REGISTER</Link>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Login;
import React from 'react';
import  NaverLogin  from './NaverLogin';


function LoginForm(props){


    return(
        <div className="Login_box">
            <div className="login_box_title"><span>로그인</span></div>
                <form onSubmit={props.handleSubmit}>
                    <div className="login_id">
                        <label>아이디</label><input type="text" name="username" id="아이디" value={props.username} onChange={props.handleChange}/>
                    </div>
                    <div className="login_password">
                        <label>비밀번호</label><input type="password" name="password" id="비밀번호" value={props.password} onChange={props.handleChange}/>
                    </div>
                    <div className="login_message">
                    {props.loginMessage && <span>{props.loginMessage}</span>}   
                    </div>
                    <div className="login_button">
                        <input type="submit" value="로그인"/>    
                    </div>
                </form>
            <NaverLogin/>
        </div>
    )
}

export default LoginForm;
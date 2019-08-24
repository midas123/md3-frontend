import React from 'react';
import {Router, Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedInDone : false,
            loginMessage : "",
            username: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.clearLoginForm = this.clearLoginForm.bind(this);
    }

    handleSubmit(event){
        this.setState({isLoggedInDone:true});
        event.preventDefault();
        console.log("handleLogin: "+event.target.username.value);
        const form = event.target;
        const data = new FormData(form);
        const json = {};
        Array.from(data.entries()).forEach(([key, value]) => {
            json[key] = value;
          })
        this.clearLoginForm();
        fetch("/api/auth/login", {
            //credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(json =>{
            console.log("login-done:"+json.accessToken);
            localStorage.setItem("accessToken", json.accessToken);
            const token = localStorage.getItem("accessToken")
            console.log("token: "+token);
            this.closeLoginForm();
            this.props.handleLogInButton();
          })
        .catch(e => {
            console.warn(e)
            this.setState({
                loginMessage: "아이디 또는 비밀번호를 확인해주세요."
            })
        })
    }

    closeLoginForm() {
        console.log("closeLoginForm");
        this.props.handleLogInForm();
    }

    handleChange(event) {
        this.setState({
            username: event.target.username,
            password: event.target.password
        });
    }
    clearLoginForm(){
        console.log("clearLoginForm");
        this.setState({
            username:"",
            password:""
        })
    }
    render(){
        return(
            <div className="Login_box" style={{
                display:this.props.isLoginFormDisplayed ? 'block' : 'none'}} >
                <form onSubmit={this.handleSubmit}>
                    <div className="login_id">
                        아이디:<input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="login_password">
                        비밀번호:<input type="password" name="password" id="password" value={this.state.password}/>
                    </div>
                    <div className="login_message">
                     {this.state.loginMessage && <span>{this.state.loginMessage}</span>}   
                    </div>
                    <div className="login_button">
                        <input type="submit" value="로그인"/>    
                        <input type="button" value="닫기" onClick={this.closeLoginForm}/>
                    </div>
                </form>
                
            </div>
        )    
    };
}

export default LoginForm;
import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../../services/auth/actions';
import { API_BASE_URL } from '../../services/util/constant';


import './LoginForm.scss';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage : "",
            username: "test",
            password: "123456"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        
        var msg = '';
        if(event.target.username.value === ""){
            msg = "아이디를 입력해주세요."
        }
        else if(!event.target.password.value){
            msg = "비밀번호를 입력해주세요."
        }
        if(msg.length > 0){
            this.setState({
                loginMessage:msg
            })
            return ;
        }
        
        const form = event.target;
        const data = new FormData(form);
        const json = {};
        Array.from(data.entries()).forEach(([key, value]) => {
            json[key] = value;
        })
          fetch(API_BASE_URL+"/api/auth/login", {
              //credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              method: 'post',
              body: JSON.stringify(json)
            })
            .then(response => response.json())
            .then(json =>{
                if(json.status == "401"){
                    this.setState({
                        loginMessage: "아이디 또는 비밀번호를 확인해주세요."
                    })
                    return ;
                }

                if(json.accessToken !== null){
                    this.props.loginUser();
                    localStorage.setItem("accessToken", json.tokenType+" "+json.accessToken);
                }
               
          })
        .catch(e => {
            console.warn(e)
        })
    }
    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }
  
    render(){
        const { isLoggedIn } = this.props;
        if(isLoggedIn){
            return <Redirect push to="/"/>;
        }
        return(
            <div className="login_page">
                <div className="Login_box">
                <div className="login_box_title"><span>로그인</span></div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="login_id">
                            <label>아이디</label><input type="text" name="username" id="아이디" value={this.state.username} onChange={this.handleChange}/>
                        </div>
                        <div className="login_password">
                            <label>비밀번호</label><input type="password" name="password" id="비밀번호" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                        <div className="login_message">
                        {this.state.loginMessage && <span>{this.state.loginMessage}</span>}   
                        </div>
                        <div className="login_button">
                            <input type="submit" value="로그인"/>    
                        </div>
                    </form>
                    
                </div>
            </div>
        )    
    };
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = {
    loginUser
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
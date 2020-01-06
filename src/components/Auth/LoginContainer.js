import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginUser } from '../../services/auth/actions';
import { API_BASE_URL } from '../../services/util/constant';
import  NaverLogin  from './NaverLogin';
import LoginForm from './LoginForm';

import {YOUR_CLIENT_ID, YOUR_CALLBACK_URL, YOUR_SERVICE_URL} from '../../services/util/constant';

import './LoginForm.scss';

var client_id = YOUR_CLIENT_ID;
var redirectURI = YOUR_CALLBACK_URL;


class LoginContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage : "",
            username: "test",
            password: "123456",
            name:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        window.naverSignInCallback = this.naverSignInCallback.bind(this);

    }

    componentDidMount() {
        var naver_id_login = new window.naver_id_login(client_id, redirectURI)
        
        
        naver_id_login.get_naver_userprofile("naverSignInCallback()")
    }
    
    displayLoginMessage(message){

    }

    naverSignInCallback() {
        var naver_id_login = new window.naver_id_login(client_id, redirectURI)
        let token = naver_id_login.oauthParams.access_token;
        
        if(token != null){
            this.props.loginUser();
            localStorage.setItem("Naver_accessToken", token);
        }
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
                <LoginForm username={this.state.username} password={this.state.password}
                loginMessage={this.state.loginMessage} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
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
  )(LoginContainer)
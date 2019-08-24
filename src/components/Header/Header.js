import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import LoginForm from '../Auth/LoginForm';
import LoginButton from '../Button/LoginButton';
import './Header.scss'


const LogoimagePath = process.env.PUBLIC_URL + '/images/';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoggedIn : false,
            isLoginFormDisplayed : false,
            
        };
       this.handleLogInForm = this.handleLogInForm.bind(this);
       this.handleLogInButton = this.handleLogInButton.bind(this);
    }

    handleLogInForm(){
        if(this.state.isLoggedIn){
            localStorage.removeItem("accessToken");
            console.log("removeToken:"+!localStorage.getItem("accessToken"));
            this.setState({
                isLoggedIn:!this.state.isLoggedIn
            })

        }
        if(!this.state.isLoggedIn){
            this.setState({
                isLoginFormDisplayed : !this.state.isLoginFormDisplayed
            })
        }
    }
    handleLogInButton(){
        this.setState({
            isLoggedIn:!this.state.isLoggedIn
        })
    }

    render(){
        return(
            <Router>
                <div className="Header">
                    <div className="logo_box">
                        <Link to="/">
                            <img className="logo_image" src={LogoimagePath+'logo@2x_2.png'} alt=""/>
                        </Link>
                    </div>
                    <div className="menu_wrapper">
                        <ul>
                        <li>
                            <a onClick={this.handleLogInForm}>
                                <LoginButton isLogged={this.state.isLoggedIn}/>
                            </a>
                        </li>
                            <li className="social_page_link">
                                <Link to="/login">소셜</Link>
                            </li>
                        {this.isLoggedIn && (
                            <li className="personal_page_link">
                                <Link to="/login">내 정보</Link>
                            </li>
                        )}
                        <li className="customer_page_link">
                            <Link to="/login">고객센터</Link>
                        </li>
                        </ul>
                        <div className="dropdown_login">
                            <LoginForm isLoginFormDisplayed={this.state.isLoginFormDisplayed} handleLogInForm={this.handleLogInForm} handleLogInButton={this.handleLogInButton}/>
                        </div>
                    </div>
                </div>
            </Router>
            ) 
    }
        


}

export default Header;
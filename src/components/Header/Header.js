import React from 'react';
import { Router, Link, NavLink  } from "react-router-dom";

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
    // componentDidMount(){
    //     //localStorage.getItem("accessToken")
    // }


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
        console.log("isLoggedIn")
        this.setState({
            isLoggedIn:!this.state.isLoggedIn
        })
    }

    render(){
        return(
           
                <div className="Header">
                    <div className="logo_box">
                        <Link to="/store">
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
                            {/* <li className="social_page_link">
                                <NavLink to="/login">소셜</NavLink>
                            </li> */}
                        {this.state.isLoggedIn && (
                            <li className="personal_page_link">
                                <NavLink to="/userinfo">내 정보</NavLink>
                            </li>
                        )}
                        <li className="customer_page_link">
                            <NavLink to="/login">고객센터</NavLink>
                        </li>
                        <li className="store_link">
                            <NavLink to="/store">스토어</NavLink>
                        </li>
                        </ul>
                        <div className="dropdown_login">
                            <LoginForm isLoginFormDisplayed={this.state.isLoginFormDisplayed} handleLogInForm={this.handleLogInForm} handleLogInButton={this.handleLogInButton}/>
                        </div>
                    </div>
                </div>
          
            ) 
    }
        


}

export default Header;
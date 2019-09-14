import React from 'react';
import { connect } from 'react-redux';

import { Link, NavLink  } from "react-router-dom";

import LoginForm from '../Auth/LoginForm';
import LoginButton from '../Auth/LoginButton';
import Cart from '../Cart/Cart';

import './Header.scss';
import './dropdown_menu.css';


const LogoImagePath = process.env.PUBLIC_URL + '/images/';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isLoggedIn : false,
            isLoginFormDisplayed : false,
            isMobileMenuDisplayed : false
            
        };
       this.handleLogInForm = this.handleLogInForm.bind(this);
       this.handleLogInButton = this.handleLogInButton.bind(this);
    }

    handleLogInForm(){
        if(this.state.isLoggedIn){
            localStorage.removeItem("accessToken");
            this.props.logout();
            this.setState({
                isLoggedIn:!this.state.isLoggedIn
            })
            window.location.href = "/";

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
           
                <div className="Header">
                    <div className="logo_box">
                        <Link to="/">
                            <img className="logo_image" src={LogoImagePath+'logo@2x_2.png'} alt=""/>
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
                        {/* <li className="customer_page_link">
                            <NavLink to="/login">고객센터</NavLink>
                        </li> */}
                        <li className="store_link">
                            <NavLink to="/store">스토어</NavLink>
                        </li>
                        <li className="store_cart">
                           <Cart/>
                        </li>

                        </ul>
                        <div className="dropdown_login">
                            <LoginForm isLoginFormDisplayed={this.state.isLoginFormDisplayed} handleLogInForm={this.handleLogInForm} handleLogInButton={this.handleLogInButton}/>
                        </div>
                        <div className="menu_drop_down">
                            
                        
                            <div className="dropdown">
                                <button className="dropbtn" onClick={()=>{
                            this.setState({
                                isMobileMenuDisplayed:!this.state.isMobileMenuDisplayed
                            })
                        }}>=메뉴</button>
                        {this.state.isMobileMenuDisplayed?
                                <div className="dropdown-content">
                                <a onClick={this.handleLogInForm}>
                                <LoginButton isLogged={this.state.isLoggedIn}/>
                                </a>
                                <NavLink to="/store">스토어</NavLink>
                                <NavLink to="/cart">장바구니</NavLink>
                                </div>
                        :null}
                            </div>
                        </div>    
                    </div>


                </div>
          
            ) 
    }
        


}


// export default connect()(Header);

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      logout: () => dispatch({ type: "USER_LOGOUT" }),
    };
  };
  
  export default connect(
    null,
    mapDispatchToProps
  )(Header)
import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink  } from "react-router-dom";

import { logoutUser } from '../../services/auth/actions';
import Cart from '../Cart/Cart';

import './Header.scss';
import './dropdown_menu.css';


const LogoImagePath = process.env.PUBLIC_URL + '/images/';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isMobileMenuDisplayed : false
        };
 
       this.userLogout = this.userLogout.bind(this);
    }

    userLogout(e){
        e.preventDefault();
        console.log("userLogout");
        const { isLoggedIn } = this.props;
        if(isLoggedIn){
            this.props.logoutUser();
        }
    }

    render(){
        const { isLoggedIn } = this.props;
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
                     
                            {isLoggedIn ? <a href="#" onClick={(e) => this.userLogout(e)}>로그아웃</a>:
                                <NavLink to="/login">
                                    로그인
                                </NavLink>
                            }
                        </li>
                        {isLoggedIn && (
                            <li className="personal_page_link">
                                <NavLink to="/userinfo">내 정보</NavLink>
                            </li>
                        )}
                        <li className="store_link">
                            <NavLink to="/store">스토어</NavLink>
                        </li>
                        <li className="store_cart">
                           <Cart/>
                        </li>
                        </ul>
                        <div className="menu_drop_down">
                            <div className="dropdown">
                            <div className="menu-btn" onClick={()=>{
                                        this.setState({
                                            isMobileMenuDisplayed:!this.state.isMobileMenuDisplayed
                                        })
                                    }}>
                                <div className="menu-icon">
                                    <div className="hamburger-menu"></div>
                                    <div className="hamburger-menu"></div>
                                    <div className="hamburger-menu"></div>
                                </div>
                                <div>
                                    <button className="dropbtn">
                                    메뉴</button>
                                </div>
                            </div>    
                        {this.state.isMobileMenuDisplayed?
                                <div className="dropdown-content">
                                {isLoggedIn ? <a href="#" onClick={(e) => this.userLogout(e)}>로그아웃</a>:
                                <NavLink to="/login" onClick={()=>{
                                    this.setState({
                                        isMobileMenuDisplayed: !this.state.isMobileMenuDisplayed
                                    })
                                }}>
                                    로그인
                                </NavLink>
                                }
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


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})


const mapDispatchToProps = {
    logoutUser
};
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
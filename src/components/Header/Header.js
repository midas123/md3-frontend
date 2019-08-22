import React from 'react';

import './Header.scss'

const LogoimagePath = process.env.PUBLIC_URL + '/images/';


class Header extends React.Component {

    render(){
        return(
            <div className="Header">
                <div className="logo_wrapper">
                    <img className="logo_image" src={LogoimagePath+'logo@2x_2.png'}/>
                </div>
            </div>         

            ) 
    }
        


}

export default Header;
import React from 'react';


function LoginButton(props){
    return(
        <span>
              {!props.isLogged ? "로그인":"로그아웃"}
        </span>
    )
}

export default LoginButton;
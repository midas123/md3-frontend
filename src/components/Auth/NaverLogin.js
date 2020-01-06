import React , {Component} from 'react';
import {YOUR_CLIENT_ID, YOUR_CALLBACK_URL, YOUR_SERVICE_URL} from '../../services/util/constant';


var client_id = YOUR_CLIENT_ID;
var redirectURI = YOUR_CALLBACK_URL;
var service_url = encodeURI(YOUR_SERVICE_URL);

class NaverLogin extends Component{
    constructor(props) {
        super(props)
    }

  //   componentWillMount(){
  //     const src= ["https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js",
  //     "http://code.jquery.com/jquery-1.11.3.min.js"];


  //     var i ;
  //     for(i of src){
  //         const script = document.createElement("script");
  //         script.type = 'text/javascript';
  //         script.src = i;
  //         script.charset = 'utf-8';
  //         // script.async = true;
  //         // document.body.appendChild(script);
  //         document.head.appendChild(script);
  //     }
      
  // }
    componentDidMount() {
      
        console.log("naver: "+naver_id_login);
        var naver_id_login = new window.naver_id_login(client_id, redirectURI);
        var state = naver_id_login.getUniqState();
        naver_id_login.setButton("green", 3,40);
        naver_id_login.setDomain(service_url);
        naver_id_login.setState(state);
        naver_id_login.init_naver_id_login();
      }
    
      render() {
        return (
          <div id="naver_id_login"></div>
        )
      }
}

export default NaverLogin;

import  React , { Component } from 'react';
import {YOUR_CLIENT_ID, YOUR_CALLBACK_URL, YOUR_SERVICE_URL} from '../../services/util/constant';

var client_id = YOUR_CLIENT_ID;
var redirectURI = YOUR_CALLBACK_URL;
var service_url = YOUR_SERVICE_URL;

class NaverLoginCallback extends Component{
    constructor(props) {
      super(props)
      window.naverSignInCallback = this.naverSignInCallback.bind(this)
      this.state = {
        nickname: ''
      }
    }
    
    componentDidMount() {
      var naver_id_login = new window.naver_id_login(client_id, redirectURI)
      console.log(naver_id_login.oauthParams.access_token)
      naver_id_login.get_naver_userprofile("naverSignInCallback()")
    }

    naverSignInCallback() {
      var naver_id_login = new window.naver_id_login(client_id, redirectURI)
      console.log("naverSignInCallback: "+naver_id_login.getProfileData('name'))
      this.setState({
        nickname: naver_id_login.getProfileData('name')
      })
    }
    

   
    
      render() {
        return <div>환영합니다 {this.state.nickname}님</div>
      }
}

export default NaverLoginCallback;

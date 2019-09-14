import React from 'react';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loginMessage : "",
            username: "test",
            password: "123456"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeLoginForm = this.closeLoginForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        var token = localStorage.getItem("accessToken");
        if(token)
            this.props.handleLogInButton();
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
          fetch("/api/auth/login", {
              //credentials: 'include',
              headers: {'Content-Type': 'application/json'},
              method: 'post',
              body: JSON.stringify(json)
            })
            .then(response => response.json())
            .then(json =>{
                
                if(json.status === "401"){
                    this.setState({
                        loginMessage: "아이디 또는 비밀번호를 확인해주세요."
                    })
                    return ;
                }
                localStorage.setItem("accessToken", json.tokenType+" "+json.accessToken);
                this.clearLoginForm();
                this.closeLoginForm();
                this.props.handleLogInButton();
          })
        .catch(e => {
            console.warn(e)
        })
    }

    closeLoginForm() {
        this.props.handleLogInForm();
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    clearLoginForm(){
        this.setState({
            username:"",
            password:""
        })
    }
    render(){
        return(
            <div className="Login_box" style={{
                display:this.props.isLoginFormDisplayed ? 'block' : 'none'}} >
                <form onSubmit={this.handleSubmit}>
                    <div className="login_id">
                        아이디<input type="text" name="username" id="아이디" value={this.state.username} onChange={this.handleChange}/>
                    </div>
                    <div className="login_password">
                        비밀번호<input type="password" name="password" id="비밀번호" value={this.state.password} onChange={this.handleChange}/>
                    </div>
                    <div className="login_message">
                     {this.state.loginMessage && <span>{this.state.loginMessage}</span>}   
                    </div>
                    <div className="login_button">
                        <input type="submit" value="로그인"/>    
                        <input type="button" value="닫기" onClick={this.closeLoginForm}/>
                    </div>
                </form>
                
            </div>
        )    
    };
}

export default LoginForm;
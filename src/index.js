import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Root from './Root';
import Header from './components/Header/Header';
import UserInfo from './components/UserInfo/UserInfo';
import Footer from './components/Footer/Footer';

import home from './home';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';



const routing = (
    <Router>
        <Root>
            <Header/>
            <Route exact path="/" component={home} />
            <Route path="/userinfo" component={UserInfo} /> 
            <Route path="/store" component={App} />
            <Footer/> 
        </Root>
    </Router>
  )




ReactDOM.render(routing, document.getElementById('root')
    
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

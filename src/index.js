import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import Root from './Root';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
import Product_Container from './components/Products_Container/Product_Container';
import ProductDetail from './components/Product/ProductDetail';



const routing = (
    <Root>
    <Router>
            <Header/>
            <Route exact path="/" component={App} />
            <Route path="/store" component={Product_Container} />
            <Route path="/goods/:id" component={ProductDetail} /> 
            <Footer/> 
    </Router>
    </Root>
  )


ReactDOM.render(routing, document.getElementById('root')
    
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

import 'react-app-polyfill/ie11';
import 'core-js/features/array/keys';
import 'formdata-polyfill';
import 'core-js/features/array/find';


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './components/App/App';
import Root from './Root';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Product_Container from './components/Products_Container/Product_Container';
import ProductDetail from './components/Product/ProductDetail';
import OrderContainer from './components/Order/OrderContainer';
import OrderResult from './components/Order/OrderResult';
import LoginForm from './components/Auth/LoginForm';
import ScrollToTop from './services/util/ScrollTop';
import MCart from './components/Cart/MCart';
import Product_header from './components/Product_header/Product_header';



const routing = (
    <Root>
    <Router>
    <ScrollToTop>
            <Header/>
            <Route exact path="/" component={App} />
            <Route path="/store/:id" component={Product_header} />
            {/* <Route path="/store/:id" component={Product_Container} /> */}
            <Route path="/store" component={Product_Container} />
            <Route path="/goods/:id" component={ProductDetail} /> 
            <Route path="/order" component={OrderContainer} /> 
            <Route path="/orderResult" component={OrderResult} /> 
            <Route path="/login" component={LoginForm} /> 
            <Route path="/mcart" component={MCart} /> 
            <Footer/> 
    </ScrollToTop>
    </Router>
    </Root>
  )


ReactDOM.render(routing, document.getElementById('root')
    
    
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

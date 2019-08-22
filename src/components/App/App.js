import React from 'react';
import './App.css';

import SwiftSlider from 'react-swift-slider'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import ProductContainer from '../Products_Container/Product_Container.js';
import Cart from '../cart/Cart';


const SlideImagePath = process.env.PUBLIC_URL + '/images/slide/';

const data =  [
  {'id':'1','src': SlideImagePath+'20180827storemain1.jpeg'},
  {'id':'2','src': SlideImagePath+'20180827storemain2.jpeg'},
  {'id':'3','src': SlideImagePath+'20180827storemain3.jpeg'},
  {'id':'4','src': SlideImagePath+'20180827storemain4.jpeg'}
];


class App extends React.Component {
 
  render(){
    return (
      <div className="App">
        <Header/>
        <div className="Wrapper">
          <div className="mainSlider">
            <SwiftSlider data={data} enableNextAndPrev={false}/>
          </div>
          <ProductContainer/>
          <Cart/>
        </div>
        <Footer/>
      </div>
      );
    }
}

export default App;

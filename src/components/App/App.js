import React from 'react';
import './App.css';

import SwiftSlider from 'react-swift-slider'

import Header from '../Header/Header';
import ProductContainer from '../Product_Container/Product_Container.js';



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
        <SwiftSlider data={data}/>
        <ProductContainer/>
      </div>
      );
    }
}

export default App;

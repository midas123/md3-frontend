import React from 'react';
import './App.css';

import Product_Container from '../Products_Container/Product_Container';
import ImageSlider from './ImageSlider';


const SlideImagePath = process.env.PUBLIC_URL + '/images/slide/';

const data =  [
  {'id':'1','src': SlideImagePath+'20180827storemain1.jpeg'},
  {'id':'2','src': SlideImagePath+'20180827storemain2.jpeg'},
  {'id':'3','src': SlideImagePath+'20180827storemain3.jpeg'},
  {'id':'4','src': SlideImagePath+'20180827storemain4.jpeg'}
];


class App extends React.Component {
  
  render(){
    const sort = 
    [
      {category:"가구", sort:"popularity"}, 
      {category:"가전", sort:"popularity"}
    ];
    return (
      <div className="App">
        <div className="Wrapper">
          <div className="mainSlider">
            <ImageSlider/>
          </div>
        </div>
        <div className="rank-collection__title">인기 상품</div>
        <Product_Container app_sort={sort}/>
      </div>
      );
    }
}

export default App;

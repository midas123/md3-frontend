import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const SlideImagePath = process.env.PUBLIC_URL + '/images/slide/';

const data =  [
  {'id':'1','src': SlideImagePath+'20180827storemain1.jpeg'},
  {'id':'2','src': SlideImagePath+'20180827storemain2.jpeg'},
  {'id':'3','src': SlideImagePath+'20180827storemain3.jpeg'},
  {'id':'4','src': SlideImagePath+'20180827storemain4.jpeg'}
];

class ImageSlider extends React.Component {
  render() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false
        
        
        ,responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
    const images = data.map(i => {
        return(
            <div key={i.id}>
                <img src={i.src}/>
            </div>
        )
    })
    return (
      <Slider {...settings}>
          {images}
      </Slider>
    );
  }
}
export default ImageSlider;
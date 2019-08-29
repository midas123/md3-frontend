import React ,{ Component } from 'react';
import { withRouter } from 'react-router';


import './Product.scss';

// class ProductDetail extends Component {
//     constructor(props){
//         super(props);
//         this.state = {}
//     }
//     render(){
function ProductDetail({match}) {
        console.log("ProductDetail");
        // const goodNum = this.props.match.param.id;
        const goodNum = match.params.id;
        var goodsList = JSON.parse(localStorage.getItem("goodsList"));
        console.log(goodsList+" : "+goodNum);
        const goods = goodsList.find(function(element){
            return element.goods_id == goodNum;
        });
        
        if (!goods) {
            return (
                <div>
                    404
                </div>    
                )
            }
        console.log("goods: "+goods)
        return(
            <div className="Product_detail">
                <div className="product_top">
                    <div className="top_left"></div>
                    <div className="top_right"></div>
                </div>

                <div className="product_bottom">
                    <div className="product_contents"></div>
                </div>
                {goods.goods_name}
            </div>
        )
    //}
}

export default withRouter(ProductDetail);
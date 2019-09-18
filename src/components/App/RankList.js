import React from 'react'
import { Link } from "react-router-dom";

import  util from '../../services/util/util';
import './RankList.scss';

class RankList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };

  }
  render() {
    console.log("RankList")
    const { goodsList } = this.props;
    const products = goodsList.map((goods, index) => {
      if(index < 6 ){
         
      return (
        //   <Product product={p} buyProduct={this.buyProduct} key={p.goods_id} />
        <Link key={goods.goods_id} to={{
            pathname: `/goods/${goods.goods_id}`,
            state: { modal : true }
            }}>
        <div className="rank-collection-item" key={goods.goods_id} >
            <img src={util.imagePath+goods.goods_thumbnail} alt={goods.goods_name}/>     
            <div className="rank-collection-title">{goods.goods_name}</div>
            <div className="rank-collection-price">
                <span>
            {util.formatPrice(goods.goodsDetail[0].goods_disprice)}
                </span>
            원
            </div>
        </div>
        </Link>
        );
      }
      });    
      return (
      <div className="rank-collection">
          <div className="rank-collection-container">

            <div className="rank-collection__title">베스트 셀러</div>
            <div className="rank-collection__list">
                {products}
            </div>
          </div>
      </div>
    )
  }
}
export default RankList;
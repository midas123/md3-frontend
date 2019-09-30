import React from 'react'
import { Link } from "react-router-dom";

import  util from '../../services/util/util';
import './RankList.scss';

import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';


//spinner
const override = css`
    position:fixed;
    top: 50%;
    left: 50%;
    `;

class RankList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    const { goodsList } = this.props;
    const { category } = this.props;
 

    let index = 0;
    const products = goodsList.map((goods) => {
      if(goods.goods_category1 == category && index < 5){
         ++index;
      return (
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
          {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
          <div className="category-name">{category}</div>
          <div className="rank-collection-container">
            <div className="rank-collection__list">
                {products}
            </div>
          </div>
      </div>
    )
  }
}
export default RankList;
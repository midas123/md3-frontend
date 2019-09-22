import React from 'react'
import Container_Header from '../Product_header/Product_header';
import Product from './Product';
import Pagination from '../Pagination/Pagination'

import { FadeLoader } from 'react-spinners';
import './ProductList.scss';
import { css } from '@emotion/core';

class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      productList: [], 
      currentScrollPage: 1,
      requestSent: false,
      scrollTopBtn: false,
      loading:false
    };
    this.myRef = React.createRef();

  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    window.addEventListener('scroll', this.handleScrollTopBtn);
    this.initProductList();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
    window.removeEventListener('scroll', this.handleScrollTopBtn);
  }

  handleCategory = (category, e) => {
    e.preventDefault();
    this.props.updateCategory(category);
  }

  initProductList = () => {
    const data = this.props.goodsList;
    this.setState({productList: data});
  }

  loadProductList = () => {
    if (this.state.requestSent) {
      return;
    }
    this.setState({ loading: true });
    setTimeout(this.doLoad, 1000);
    this.setState({ loading: false });
    this.setState({requestSent: true});
  }
  handleOnScroll = () => {
    const wid = document.documentElement.getBoundingClientRect().width;

    if(wid<825){
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      var clientHeight = document.documentElement.clientHeight || window.innerHeight;
      var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      
      if (scrolledToBottom) {
        this.loadProductList();
      }
    } 

    return false;
    
  }
  handleScrollTopBtn = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({
        scrollTopBtn:true
      })
    } else {
      this.setState({
        scrollTopBtn:false
      })
    }
  }

  doLoad = () => {
    let currentScrollPage = this.state.currentScrollPage +1;
    const { pager } = this.props;
    this.props.handleCurrentPage(currentScrollPage, pager);
    const goodsList = this.state.productList.concat(this.props.goodsList);
    
    this.setState({
      productList: goodsList, 
      requestSent: false,
      currentScrollPage: currentScrollPage
    });
  }

  render() {
    const wid = document.documentElement.getBoundingClientRect().width;
    var { goodsList } = this.props;
    if(wid<824){
      goodsList = this.state.productList;
    }

    const override = css`
    position:fixed;
    bottom:0;
    `;

    const { pager } = this.props;
    const products = goodsList.map(p => {
      return (
          <Product product={p} buyProduct={this.buyProduct} key={p.goods_id} />
        );
      });    
      
      return (
      <div className="Product_Container">
            <Container_Header app_sort={this.props.app_sort}/>
            <div className="product_list">
              {products}
              {this.state.scrollTopBtn &&
            <button className="to-the-top-btn">맨 위로</button>}
            {this.state.loading && <FadeLoader color={'#000000'} css={override}/>}
            </div>
          {wid > 823 &&
            <Pagination pager={pager} UpdatingCurrentPage={this.props.handleCurrentPage}/>}
      </div>
    )
  }
}
export default ProductList;



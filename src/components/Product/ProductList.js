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
  }

  componentWillReceiveProps(nextProps){
    const wid = document.documentElement.getBoundingClientRect().width;
    const { sort: nextSort, category:nextCategory } = nextProps;

    let pager = nextProps.pager;
    let category = this.props.category;
    let sort = this.props.sort;
  
    if(category !== nextCategory){
      this.setState({
        currentScrollPage:1
      })
    }

    if(wid < 824 && !!nextCategory && pager.currentPage ==1){
    this.setState({
      productList:nextProps.goodsList,
      requestSent: false
    })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
    window.removeEventListener('scroll', this.handleScrollTopBtn);
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
  
  loadProductList = () => {
    const { pager } = this.props;
    if (this.state.requestSent || pager.currentPage == pager.endPage ) {
      return;
    }

    this.setState({ loading: true });
    setTimeout(this.doLoad, 1000);
    this.setState({ 
      loading: false,
      requestSent: true });
  }
  updateCurrentPage= (currentScrollPage) => {
    const { pager } = this.props;
    this.setState({
      currentScrollPage: currentScrollPage
    });
    this.props.handleCurrentPage(currentScrollPage, pager);
    
  }
  
  doLoad = () => {
    var currentScrollPage = this.state.currentScrollPage;
    this.updateCurrentPage(currentScrollPage+1);
    var goodsList = this.state.productList.concat(this.props.goodsList);
    this.setState({
      productList: goodsList, 
      requestSent: false
    });
  }

  render() {
    const { pager } = this.props;
    const wid = document.documentElement.getBoundingClientRect().width;
    var { goodsList } = this.props;

    if(wid<824 && pager.currentPage !== 1){
      goodsList = this.state.productList;
    }

    const override = css`
    position:fixed;
    bottom:0;
    `;

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
            <button className="to-the-top-btn" onClick={() => {
                  window.scrollTo(0, 0)}}>맨 위로</button>}
            {this.state.loading && <FadeLoader color={'#000000'} css={override}/>}
            </div>
          {wid > 823 &&
            <Pagination pager={pager} UpdatingCurrentPage={this.props.handleCurrentPage}/>}
      </div>
    )
  }
}
export default ProductList;



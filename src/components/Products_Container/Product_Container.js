import React from 'react';
import Product from '../Product/Product';
import ContainerHeader from '../Product_header/Product_header';

import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination'

import { connect } from 'react-redux';
import { fetchProducts, UpdatingCurrentPage } from '../../services/products/actions';
import { addProduct } from '../../services/cart/actions';


import './Product_Container.scss';
import { css } from '@emotion/core';

//spinner
const override = css`
    display: block;
    margin: 0 auto;
`;


class Product_Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false
        };

      }

      componentDidMount(){
        console.log("componentDidMount");
        let pager = this.props.pager;
        this.handleFetchProducts("newest", pager);
     
      }

      componentWillReceiveProps(nextProps) { //state가 변경되면서 컴포넌트가 새로운 prop을 받았을때 실행
        console.log("componentWillReceiveProps");
        const { sort: nextSort, pager: pager } = nextProps;
        let preCurrentPage = this.props.pager.currentPage;
        let sort = this.props.sort;

        if(nextSort !== sort){
          this.handleFetchProducts(nextSort, pager, 1);
        }
        
        if(pager.currentPage !== preCurrentPage){
          this.handleFetchProducts(sort, pager, pager.currentPage);
        }

      }

      handleFetchProducts = (
        sort,
        pager,
        currentPage
      ) => {
        this.setState({ loading: true });
        this.props.fetchProducts(sort, pager, currentPage, () => {
          this.setState({ loading: false});

        });

      };

      handleCurrentPage = (
        currentPage, 
        pager = this.props.pager,
        sort = this.props.sort
        ) =>{
        console.log("UpdatingCurrentPage: "+currentPage);
        this.setState({ loading: true });
        this.props.fetchProducts(sort, pager, currentPage, () => {
          this.setState({ loading: false});

            });
        };
    

      render(){
        var { goodsList } = this.props;
        var { pager }= this.props;
        const products = goodsList.map(p => {
          return (
            <Product product={p} addProduct={this.props.addProduct} key={p.goods_id} />
          );
        });

        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
              <div className="Product_Container">
                  <ContainerHeader productCount={goodsList.length}/>
                  {products}
              </div>
              <Pagination pager={pager} UpdatingCurrentPage={this.handleCurrentPage}/>
          </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
  goodsList: state.goods.goodsList,
  sort: state.sort.type,
  pager: state.goods.pager
});

const mapDispatchToProps = {
  fetchProducts, UpdatingCurrentPage, addProduct
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Product_Container);
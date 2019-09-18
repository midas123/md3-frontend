import React from 'react';
import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination'

import { connect } from 'react-redux';
import { fetchProducts, UpdatingCurrentPage } from '../../services/products/actions';

import { css } from '@emotion/core';
import ProductList from '../Product/ProductList';
import RankList from '../App/RankList';

//spinner
const override = css`
    position:fixed;
    top: 50%;
    left: 50%;
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
        const { app_sort } = this.props;
        if(app_sort){
          console.log("app_sort: "+app_sort)
          this.handleFetchProducts(app_sort, pager);
          return;
        }

        this.handleFetchProducts("newest", pager);
      }

      componentWillReceiveProps(nextProps) { 
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
        var { pager }= this.props;
        var { goodsList } = this.props;
        const { app_sort } = this.props;
        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
              {app_sort ? <RankList goodsList={goodsList}/>:  
                <ProductList goodsList={goodsList} app_sort={app_sort} pager={pager} handleCurrentPage={this.handleCurrentPage}/>
              }
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
  fetchProducts, UpdatingCurrentPage
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Product_Container);

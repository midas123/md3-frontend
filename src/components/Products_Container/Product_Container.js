import React from 'react';
import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination'

import { connect } from 'react-redux';
import { fetchProducts, sortAndPagingProduct, UpdatingCurrentPage } from '../../services/products/actions';

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
        this.initialFetchProduct();
        this.handleFetchProducts("newest", pager);
      }

      componentWillReceiveProps(nextProps) { 
        console.log("componentWillReceiveProps");
        const { sort: nextSort, category:nextCategory } = nextProps;
        let preCurrentPage = this.props.pager.currentPage;
        let sort = this.props.sort;
        let pager = this.props.pager;
        let category = this.props.category;

        console.log("ex-category: "+category)

        if(nextCategory !== category){
          console.log("nextcategory: "+nextCategory)
          this.handleFetchProducts(sort, pager, 1, nextCategory);
        }
        
        if(nextSort !== sort){
          console.log("test2: "+nextSort)
          this.handleFetchProducts(nextSort, pager, 1, category);
        }
        
        if(pager.currentPage !== preCurrentPage){
          this.handleFetchProducts(sort, pager, pager.currentPage);
        }



      }
      initialFetchProduct = () => {
        this.props.fetchProducts();
      }

      handleFetchProducts = (
        sort,
        pager,
        currentPage,
        category
      ) => {
        this.setState({ loading: true });
        this.props.sortAndPagingProduct(sort, pager, currentPage, category, () => {
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
        this.props.sortAndPagingProduct(sort, pager, currentPage, () => {
          this.setState({ loading: false});

            });
        };

      render(){
        var { pager }= this.props;
        const { goodsListSorted } = this.props;
   
        let goodsList = JSON.parse(localStorage.getItem("goodsList"));

        const { app_sort } = this.props;
        var ranklist;
        if(app_sort){
          ranklist = app_sort.map((m,index) => {
            return (<RankList goodsList={goodsList}  category={m.category} app_sort={m.sort} key={index}/>)
          })
        }
        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
              {app_sort ? 
              // <RankList goodsList={goodsList}/>
              ranklist
              :  
                <ProductList goodsList={goodsListSorted} pager={pager} handleCurrentPage={this.handleCurrentPage}/>
              }
          </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
  goodsListSorted: state.goods.goodsList,
  sort: state.sort.type,
  pager: state.goods.pager,
  category : state.category.category
});

const mapDispatchToProps = {
  fetchProducts, sortAndPagingProduct, UpdatingCurrentPage
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Product_Container);

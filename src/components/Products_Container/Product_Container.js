import React from 'react';
import { FadeLoader } from 'react-spinners';

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
        let pager = this.props.pager;
        this.initialFetchProduct(pager);
      }

      componentWillReceiveProps(nextProps) { 
        const { sort: nextSort, category:nextCategory } = nextProps;
        let preCurrentPage = this.props.pager.currentPage;
        let sort = this.props.sort;
        let pager = this.props.pager;
        let category = this.props.category;

        if(nextCategory !== category){
          this.handleFetchProducts(sort, pager, 1, nextCategory);
        }
        
        if(nextSort !== sort){
          this.handleFetchProducts(nextSort, pager, 1, category);
        }
        
        if(pager.currentPage !== preCurrentPage){
          this.handleFetchProducts(sort, pager, pager.currentPage);
        }



      }
      initialFetchProduct = () => {
        var { pager }= this.props;
        this.setState({ loading: true});
        this.props.fetchProducts("newest", pager, 1, null, () => {
          this.setState({ loading: false});
        } );
      }

      handleFetchProducts = (
        sort,
        pager,
        currentPage,
        category
      ) => {
        this.setState({ loading: true });
        this.props.fetchProducts(sort, pager, currentPage, category, () => {
          this.setState({ loading: false});

        });

      };

      handleCurrentPage = (
        currentPage, 
        pager = this.props.pager,
        sort = this.props.sort,
        category = this.props.category
        ) =>{
        this.setState({ loading: true });
        this.props.fetchProducts(sort, pager, currentPage, category, () => {
          this.setState({ loading: false});

            });
        };

      render(){
        var { pager }= this.props;
        const { goodsListSorted } = this.props;
        const { sort } = this.props;
        const { category } = this.props;
        const { allGoodsList } = this.props;
        const { app_sort } = this.props;

        var ranklist;
        if(app_sort){
          ranklist = app_sort.map((m,index) => {
            return (<RankList goodsList={allGoodsList}  category={m.category} app_sort={m.sort} key={index}/>)
          })
        }
        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
              {app_sort ? 
              ranklist
              :  
                <ProductList goodsList={goodsListSorted} category={category} pager={pager} sort={sort} handleCurrentPage={this.handleCurrentPage}/>
              }
          </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
  goodsListSorted: state.goods.goodsList,
  allGoodsList: state.goods.initial_goodsList,
  sort: state.sort.type,
  pager: state.goods.pager,
  category : state.category.category
});

const mapDispatchToProps = {
  fetchProducts, UpdatingCurrentPage
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Product_Container);

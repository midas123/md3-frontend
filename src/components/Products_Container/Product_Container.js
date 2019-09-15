import React from 'react';
import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination'

import { connect } from 'react-redux';
import { fetchProducts, UpdatingCurrentPage } from '../../services/products/actions';

import './Product_Container.scss';
import { css } from '@emotion/core';
import ProductList from '../Product/ProductList';

//spinner
const override = css`
    position:fixed;
    top: 50%;
    left: 50%;
    `;
    
    // display: block;
    // margin: 0 auto;

class Product_Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: false
        };

      }

      componentDidMount(){
        console.log("componentDidMount");
        //  localStorage.removeItem("goodsList");
        //  localStorage.removeItem("goodsListExpiration");
        let pager = this.props.pager;
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
        buyProduct = () =>{
          fetch("/api-product/goods/order")
          .then(response => response.json())
          .then(json =>{
                console.log(json.message);
            }
          )
          .catch(error => console.log(error) );
        }

      render(){
        var { pager }= this.props;
        var { goodsList } = this.props;
        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
                <ProductList goodsList={goodsList}/>
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
  fetchProducts, UpdatingCurrentPage
};


export default connect(
  mapStateToProps, mapDispatchToProps)(Product_Container);

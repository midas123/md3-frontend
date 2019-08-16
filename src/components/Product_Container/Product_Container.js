import React from 'react';
import Product from '../Product/Product';
import ContainerHeader from '../P_Container_header/P_Container_header';

import { FadeLoader } from 'react-spinners';
import Pagination from '../Pagination/Pagination'

import { connect } from 'react-redux';
import { fetchProducts } from '../../services/products/actions';

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
          loading: false,
          pageOfItems: []
        };
      }

      componentDidMount(){
        this.handleFetchProducts("newest");
        // fetch('/api/goods/all')
        // .then(response => response.json()
        // )
        // .then(jsonData => {
        //   this.setState({goodsList: jsonData})
        // })
      }

      componentWillReceiveProps(nextProps) { //state가 변경되면서 컴포넌트가 새로운 prop을 받았을때 실행
        const { sort: nextSort } = nextProps;
        
        if(nextSort !== this.props.sort){
          console.log("sort:"+nextSort)
          this.handleFetchProducts(nextSort);

        }
      }

      handleFetchProducts = (
        sort = this.props.sort
      ) => {
        this.setState({ loading: true });
        this.props.fetchProducts(sort, () => {
          this.setState({ loading: false});
        });
      };

      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }

      onChangePage(pageOfItems) {
        // update state with new page of items
        //this.setState({ pageOfItems: pageOfItems });
        console.log("changePage");
       }
      

      render(){
        const { goodsList } = this.props;
        return(
          <React.Fragment>
                {this.state.loading && <FadeLoader color={'#000000'} 
                css={override}/>}
              <div className="Product_Container">
                  <ContainerHeader productCount={goodsList.length}/>
                  {/* <Product list={goodsList}/> */}
              </div>
              <Pagination items={goodsList} onChangePage={this.onChangePage}/>
          </React.Fragment>
        );
    }

}

const mapStateToProps = state => ({
  goodsList: state.goods.goodsList,
  sort: state.sort.type
});



export default connect(
  mapStateToProps, { fetchProducts })(Product_Container);
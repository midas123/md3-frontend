import React from 'react';
import Product from '../Product/Product';
import ContainerHeader from '../P_Container_header/P_Container_header';

import { connect } from 'react-redux';
import { fetchProducts } from '../../services/products/actions';

import './Product_Container.scss';


class Product_Container extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {goodsList:[]};
    //   }
    
      componentDidMount(){
        this.handleFetchProducts();
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
          this.setState({loading:false});
        });
      };

    render(){
        const { goodsList } = this.props;
        return(
            <div className="Product_Container">
                <ContainerHeader productCount={goodsList.length}/>
                <Product list={goodsList}/>
 
            </div>
        );
    }

}

const mapStateToProps = state => ({
  goodsList: state.goods.goodsList,
  sort: state.sort.type
});



export default connect(
  mapStateToProps, { fetchProducts })(Product_Container);
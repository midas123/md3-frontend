import React from 'react'
import Container_Header from '../Product_header/Product_header';
import Product from './Product';


class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
     
    };

  }
  render() {
    console.log("ProductList")
    const { goodsList } = this.props;
    const products = goodsList.map(p => {
      return (
        // <Link key={p.goods_id} to={{
        //   pathname: `/goods/${p.goods_id}`,
        //   state: { modal : true }
        // }}>
          <Product product={p} addProduct={this.props.addProduct} buyProduct={this.buyProduct} key={p.goods_id} />
          //  </Link>
        );
      });    
      return (
        <div className="Product_Container">
            <Container_Header productCount={goodsList.length}/>
            {products}
            {/* <Route
              exact
              path={match.path}
              render={() => <h3>Please select a topic.</h3>}
            /> */}

      </div>
    )
  }
}
export default ProductList;
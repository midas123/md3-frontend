import React from 'react';
import Sort from '../Product_Sort/Product_Sort';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateCategory } from '../../services/category/actions';

import './Product_Header.scss';

class Container_Header extends React.Component {

    handleCategory = (category, e) => {
        e.preventDefault();
        this.props.updateCategory(category);
    }

    render(){
        const { app_sort } = this.props;
        const categories = 
        [
          {category:"전체"}, 
          {category:"가구"}, 
          {category:"가전"},
          {category:"패브릭"},
          {category:"주방"},
          {category:"생활·수납"}
        ];

        const category = categories.map((c,index)=>{
            return(
                <Link to={'/store/'+c.category} key={index}>
                <div className="main-category-item" onClick={(e) => this.handleCategory(c.category, e)}> 
                    {c.category}
                </div>
                </Link>
            )
        })

        return(
            <div className="Product_Container_Header">
                <div className="main-category-list">
                    {category}
                </div>
                {app_sort? null:<Sort/>}
            </div>
        )
    }
}


// export default Container_Header;

const mapDispatchToProps = {
    updateCategory
  };
  
export default connect( null, mapDispatchToProps)(Container_Header)
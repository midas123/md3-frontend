import React from 'react';
import Sort from '../Product_Sort/Product_Sort';
import './Product_Header.scss';

class Container_Header extends React.Component {
    render(){
        const { app_sort } = this.props;

        return(
            <div className="Product_Container_Header">
                {app_sort? null:<Sort/>}
            </div>
        )
    }
}

export default Container_Header;
import React from 'react';
import SelectBox from './SelectBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateSort } from '../../../services/sort/actions';

const sortBy = [
    { value:'newest', label: '최신순'},
    { value:'popularity', label: '인기순'},
    { value:'lowestprice', label: '낮은 가격'},
    { value:'highestprice', label: '높은 가격'}
]


class Product_Sort extends React.Component{
    static propTypes = {
        updateSort: PropTypes.func.isRequired,
        sort: PropTypes.string.isRequired
    };
    
    handleSort = value => {
        this.props.updateSort(value);
    };


    render(){
        return(
            <div className="Product_Sort">
                <span>정렬 순서</span><SelectBox options={sortBy} handleOnChange={this.handleSort}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sort: state.sort.type
  });

export default connect(
    mapStateToProps, { updateSort }
)(Product_Sort);
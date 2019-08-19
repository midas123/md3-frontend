import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import './Pagination.scss';

// const propTypes = {
//     items: PropTypes.array.isRequired,
//     onChangePage: PropTypes.func.isRequired,
//     initialPage: PropTypes.number,
//     itemsPerPage: PropTypes.number
// }


class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onChangePage(currentPage){
        this.props.UpdatingCurrentPage(currentPage);
    }

    render() {
        var { pager }= this.props;

        if (!pager.pages || pager.pages.length <= 1) {
            
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.onChangePage(pager.currentPage - 1)}>이전</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <a onClick={() => this.onChangePage(page)}>{page}</a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.onChangePage(pager.currentPage + 1)}>다음</a>
                </li>
            </ul>
        );
    }
}



export default Pagination;
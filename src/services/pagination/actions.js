// import { GOODS_PAGINATION, CURRENT_PAGE } from './actionType';

// export const Pagination_Module = (currentPage, itemList) => dispatch =>{
//         var itemsPerPage = 9;
//         // if (currentPage < 1 || page > pager.totalPages) {
//         //     return;
//         // }

//         // get new pager object for specified page
//         var pager = getPager(itemList.length, currentPage, itemsPerPage);
//         console.log("currentpage: "+currentPage+" pager:"+pager+" itemList: "+itemList+" page: ");

//         return dispatch({
//             type: GOODS_PAGINATION,
//             payload: pager
//         });
// }


// export const UpdatingCurrentPage = (currentPage, pager) => dispatch => {
//     console.log("UpdatingCurrentPage:"+currentPage);
//     pager["currentPage"] = currentPage;
//     console.log("pager: "+pager["currentPage"]);
//     return dispatch({
//         type: CURRENT_PAGE,
//         payload: pager
//     })
// }


// function getPager(totalItemsCount, currentPage, itemsPerPage) {
//     var currentPage = currentPage || 1;


//     // calculate total pages
//     var totalPages = Math.ceil(totalItemsCount / itemsPerPage);

//     var startPage, endPage;
//     if (totalPages <= 5) {
//         startPage = 1;
//         endPage = totalPages;
//     } else {
//         startPage = Math.ceil(currentPage/5);
//         endPage = startPage +4;
//     }


//     // calculate start and end item indexes
//     var startIndex = (currentPage - 1) * itemsPerPage;
//     var endIndex = Math.min(startIndex + itemsPerPage - 1, totalItemsCount - 1);
//     // create an array of pages to ng-repeat in the pager control
//     var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
//     // return object with all pager properties required by the view
//     return {
//         totalItemsCount: totalItemsCount,
//         currentPage: currentPage,
//         //itemsPerPage: itemsPerPage,
//         totalPages: totalPages,
//         startPage: startPage,
//         endPage: endPage,
//         startIndex: startIndex,
//         endIndex: endIndex,
//         //pages: pages
//     };


// }



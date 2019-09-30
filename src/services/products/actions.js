import { FETCH_PRODUCTS, CURRENTPAGE_UPDATE, INITIAL_FETCH_PRODUCTS } from './actionType';
import { API_BASE_URL } from '../../services/util/constant';

const compare = {
    lowestprice: (a, b) => {
        a = Number(a.goodsDetail[0].goods_disprice);
        b = Number(b.goodsDetail[0].goods_disprice);
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    },
    highestprice: (a, b) => {
        a = a.goodsDetail[0].goods_disprice;
        b = b.goodsDetail[0].goods_disprice;
        if(a > b) return -1;
        if(a < b) return 1;
        return 0;
    },
    popularity: (a, b) => {
        a = a.goodsDetail[0].goods_sellcount;
        b = b.goodsDetail[0].goods_sellcount;
        if(a > b) return -1;
        if(a < b) return 1;
        return 0;
    },
    newest: (a, b) => {
        a = Date.parse(a.goods_date);
        b = Date.parse(b.goods_date);
        if(a > b) return -1;
        if(a < b) return 1;
        return 0;
    }
}

function getPager(totalItemsCount, currentPage) {
    currentPage = currentPage || 1;
    var itemsPerPage = 9;

    // calculate total pages
    var totalPages = Math.ceil(totalItemsCount / itemsPerPage);
    var startPage, endPage;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        startPage = Math.ceil(currentPage/5);
        endPage = startPage +4;
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage - 1, totalItemsCount - 1);
    // create an array of pages to ng-repeat in the pager control
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    // return object with all pager properties required by the view
    return {
        totalItemsCount: totalItemsCount,
        currentPage: currentPage,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
}
export const fetchProducts = (sortBy, pager, currentPage, category, callback) => {
    return (dispatch) => {
        let goodsList = JSON.parse(localStorage.getItem("goodsList"));
        let exp = localStorage.getItem("goodsListExpiration");
        let now =  Date.now();
        if(((exp == null || undefined) && exp < now) || !goodsList){
            localStorage.removeItem("goodsList");

            fetch(API_BASE_URL+'/api-product/goods/all')
            .then(response =>  
                response.json()
            )
            .then(json => {
                goodsList = json;
                var expires = (60*10);
                var now = Date.now();  
                var Expiration = now + expires*1000; 
                localStorage.setItem("goodsList", JSON.stringify(goodsList));
                localStorage.setItem("goodsListExpiration", Expiration);

                if (!!callback) {
                    callback();
                }

                dispatch({
                    type: INITIAL_FETCH_PRODUCTS,
                    payload : goodsList
                });
            }).catch(function(error) {
                console.log("error: "+error);
            });
        } else {
            dispatch({
                type: INITIAL_FETCH_PRODUCTS,
                payload : goodsList
            });

            if(!!sortBy){
                goodsList = goodsList.sort(compare[sortBy]);
            }
            
            if(!!category){
                var list=[];
                for(var i=0; goodsList.length>i; i++){
                    if(goodsList[i].goods_category1 === category){
                        list.push(goodsList[i])
                    }
                }
                goodsList = list;
            }

            if(!!pager){
                pager = getPager(goodsList.length, currentPage);
                goodsList = goodsList.slice(pager.startIndex, pager.endIndex + 1);
            }
            
            
            if (!!callback) {
                callback();
            }

            dispatch({
                type: FETCH_PRODUCTS,
                payload : goodsList
            });
    
            dispatch({
                type: CURRENTPAGE_UPDATE,
                payload : pager
            });
        }
}    
};



export const UpdatingCurrentPage = (currentPage, pager) => dispatch => {
     pager.currentPage = currentPage;
    return dispatch({
        type: CURRENTPAGE_UPDATE,
        payload: pager
    })
}

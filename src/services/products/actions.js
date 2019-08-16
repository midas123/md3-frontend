import { FETCH_PRODUCTS } from './actionType';

const compare = {
    lowestprice: (a, b) => {
        a = Number(a.goodsDetail[0].goods_disprice);
        b = Number(b.goodsDetail[0].goods_disprice);
        console.log("a: "+a+" b: "+b)
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

export const fetchProducts = (sortBy, callback) => dispatch => {
    return fetch('/api/goods/all')
    .then( response =>  response.json())
    .then(json => {
        let goodsList = json;
        console.log(goodsList);

        if(!!sortBy){
            goodsList = goodsList.sort(compare[sortBy]);
        }
            
        if (!!callback) {
            callback();
          }
          
        return dispatch({
            type: FETCH_PRODUCTS,
            payload : goodsList
        });
    })
    .catch(err => {
        console.log("상품을 정렬할 수 없습니다.")
    });
};
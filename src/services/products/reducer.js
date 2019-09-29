import { FETCH_PRODUCTS, CURRENTPAGE_UPDATE, INITIAL_FETCH_PRODUCTS} from './actionType';

const initialState = {
    goodsList: [],
    initial_goodsList: [],
    pager : {
        currentPage: 1,
        totalPages: 1,
        startPage: 1,
        endPage: 5,
        startIndex: 0,
        endIndex: 8,
        pages: null
    }
};

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                goodsList: action.payload
            };
        case INITIAL_FETCH_PRODUCTS:
            return {
                ...state,
                initial_goodsList: action.payload
            };      
        case CURRENTPAGE_UPDATE:
            return {
                ...state,
                pager: action.payload
            };  
    
            default:
            return state;   
    }
}
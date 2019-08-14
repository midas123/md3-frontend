import { FETCH_PRODUCTS } from './actionType';

const initialState = {
    goodsList: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                ...state,
                goodsList: action.payload   
            };
        default:
            return state;   
    }
}
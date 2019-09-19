import { CATEGORY_UPDATE } from './actionTypes';

const initialState = {
    category: ''
  };

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case CATEGORY_UPDATE:
            console.log("categoryReducer:"+action.payload)
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;    
    }
}
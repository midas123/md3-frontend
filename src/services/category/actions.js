import { CATEGORY_UPDATE } from './actionTypes';


export const updateCategory = (category) => ({
        type: CATEGORY_UPDATE,
        payload: category
})

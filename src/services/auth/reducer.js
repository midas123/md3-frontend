import { LOGIN_USER, LOGOUT_USER } from './actionTypes'; 


const initialState = {
   isLoggedIn: false
};


export default function(state = initialState, action) {
    switch (action.type) {
      case LOGIN_USER: {
        return {
          isLoggedIn: true
        };
    }
      case LOGOUT_USER: {
        return {
          isLoggedIn: false
        };
    }
      default:
        return state;
    }
}
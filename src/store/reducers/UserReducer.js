import {
    GET_USER_INFO,
    GET_USER,
    CLEAR_USER,
    EDIT_USER
} from '../actions/types';

const INITIAL_STATE = {
    user: {},
    userInfo: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return {...state, userInfo: action.payload}
        case GET_USER:
            return {...state, user: action.payload}
        case CLEAR_USER:
            return {...state, user: {}}
        case EDIT_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}
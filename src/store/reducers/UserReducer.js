import {
    GET_USER_INFO,
    GET_USER,
    CLEAR_USER
} from '../actions/types';

const INITIAL_STATE = {
    user: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return action.payload
        case GET_USER:
            return {...state, user: action.payload}
        case CLEAR_USER:
            return {...state, user: {}}
        default:
            return state
    }
}
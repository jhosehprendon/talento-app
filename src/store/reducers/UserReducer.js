import {
    GET_USER_INFO
} from '../actions/types';

const INITIAL_STATE = ''

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_USER_INFO:
            return action.payload
        default:
            return state
    }
}
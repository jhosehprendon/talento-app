import {
    FETCH_CANDIDATES
} from '../actions/types';

const INITIAL_STATE = {
    candidates:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_CANDIDATES:
            return {...state, candidates: action.payload}
        // case FETCH_PROJECT:
        //     return {...state, [action.payload._id]: action.payload}
        // case CREATE_PROJECT:
        //     return {...state, [action.payload.id]: action.payload}
        // case EDIT_PROJECT:
        //     return {...state, [action.payload._id]: action.payload}
        // case DELETE_PROJECT:
        //     return _.omit(state, action.payload)
        // case CLEAR_PROJECTS:
        //     return {...state, projects: []}
        default:
            return state
    }
}
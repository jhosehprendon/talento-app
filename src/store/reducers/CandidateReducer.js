import {
    FETCH_CANDIDATES,
    FETCH_CANDIDATE,
    CREATE_CANDIDATE,
    EDIT_CANDIDATE,
    EDIT_CANDIDATE_NOTE,
    GET_CV,
    ERROR_EDIT_CANDIDATE,
    EDIT_CANDIDATE_TASK
} from '../actions/types';

const INITIAL_STATE = {
    candidates:[],
    errorEditCandidate: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_CANDIDATES:
            return {...state, candidates: action.payload}
        case FETCH_CANDIDATE:
            return {...state, [action.payload._id]: action.payload}
        case CREATE_CANDIDATE:
            return {...state, [action.payload.id]: action.payload}
        case EDIT_CANDIDATE:
            return {...state, [action.payload._id]: action.payload}
        case EDIT_CANDIDATE_NOTE:
            return {...state, [action.payload._id]: action.payload}
        case EDIT_CANDIDATE_TASK:
            return {...state, [action.payload._id]: action.payload}
        case GET_CV:
            return {...state, cv: action.payload}
        case ERROR_EDIT_CANDIDATE:
            return {...state, errorEditCandidate: action.payload}
        // case DELETE_PROJECT:
        //     return _.omit(state, action.payload)
        // case CLEAR_PROJECTS:
        //     return {...state, projects: []}
        default:
            return state
    }
}
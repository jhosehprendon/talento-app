import {
    CREATE_PROJECT,
    FETCH_PROJECTS,
    FETCH_PROJECT,
    EDIT_PROJECT,
    DELETE_PROJECT,
    CLEAR_PROJECTS,
    CHANGE_HEADER_OPEN
} from '../actions/types';
import _ from 'lodash'

const INITIAL_STATE = {
    projects:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_PROJECTS:
            return {...state, projects: action.payload}
        case FETCH_PROJECT:
            return {...state, [action.payload._id]: action.payload}
        case CREATE_PROJECT:
            return {...state, [action.payload.id]: action.payload}
        case EDIT_PROJECT:
            return {...state, [action.payload._id]: action.payload}
        case DELETE_PROJECT:
            return _.omit(state, action.payload)
        case CLEAR_PROJECTS:
            return {...state, projects: []}
        case CHANGE_HEADER_OPEN:
            return {...state, headerOpenContent: action.payload}
        default:
            return state
    }
}

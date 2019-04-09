import {
    CREATE_PORTAFOLIO
} from '../actions/types';

const INITIAL_STATE = {
    portafolio:[]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // case FETCH_PROJECTS:
        //     return {...state, projects: action.payload}
        // case FETCH_PROJECT:
        //     return {...state, [action.payload._id]: action.payload}
        case CREATE_PORTAFOLIO:
            return {...state, [action.payload.id]: action.payload}
        // case EDIT_PROJECT:
        //     return {...state, [action.payload._id]: action.payload}
        // case DELETE_PROJECT:
        //     return _.omit(state, action.payload)
        default:
            return state
    }
}
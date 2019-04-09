import  { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import ProjectReducer from './ProjectReducer';
import CandidateReducer from './CandidateReducer';
import UserReducer from './UserReducer';
import PortafolioReducer from './PortafolioReducer'

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    projects: ProjectReducer,
    candidates: CandidateReducer,
    user: UserReducer,
    portafolio: PortafolioReducer
})
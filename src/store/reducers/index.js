import  { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import ProjectReducer from './ProjectReducer';

export default combineReducers({
    auth: AuthReducer,
    form: formReducer,
    projects: ProjectReducer
})
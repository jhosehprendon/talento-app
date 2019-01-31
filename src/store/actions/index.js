import { SIGN_UP, 
    LOG_IN, 
    SIGN_OUT,
    AUTH_ERROR, 
    CHANGE_AUTH_NULL, 
    CHANGE_AUTH_BACK
} from './types';
import talento from '../../apis/talento';
import history from '../../history';

// AUTHENTICATION

export const signUp = formValues => {
    return async dispatch => {
        try{
            await talento.post('http://localhost:3002/user/signup', {...formValues})
            dispatch({ type: SIGN_UP })
            dispatch(logIn(formValues))
        }
        catch {
            dispatch({ type: AUTH_ERROR })
        }
    }
}

export const logIn = formValues => {
    return async dispatch => {
        const response = await talento.post('http://localhost:3002/user/login', {...formValues})
        dispatch({ type: LOG_IN, payload: response.data })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        history.push('/')
    }
}

export const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    history.push('/')
    return {
        type: SIGN_OUT
    } 
}

export const changeAuthNull = () => {
    return {
        type: CHANGE_AUTH_NULL
    }
}

export const changeAuthBack = () => {
    return {
        type: CHANGE_AUTH_BACK
    }
}
import { SIGN_UP, 
    LOG_IN, 
    SIGN_OUT,
    AUTH_ERROR, 
    CHANGE_AUTH_NULL, 
    CHANGE_AUTH_BACK,
    CREATE_PROJECT,
    FETCH_PROJECTS,
    FETCH_PROJECT,
    EDIT_PROJECT,
    DELETE_PROJECT
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

// PROJECTS

export const createProject = formValues => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')
        // const {userId} = getState().auth
        if(token) {
            const response = await talento.post('http://localhost:3002/projects', formValues, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                }
            })
            dispatch({ type: CREATE_PROJECT, payload: response.data })
            history.push('/')
        } else {
            dispatch(signOut())
        } 
    }
}

export const fetchProjects = () => {
    return async dispatch => {
        const response = await talento.get('http://localhost:3002/projects')
        dispatch({ type: FETCH_PROJECTS, payload: response.data.projects })
    }
}

export const fetchProject = (id) => {
    return async dispatch => {

        const response = await talento.get(`http://localhost:3002/projects/${id}`)
        dispatch({ type: FETCH_PROJECT, payload: response.data.project })
    }
}

export const editProject = (id, formValues) => {
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')
        // const {userId} = getState().auth
        if(token) {
            const response = await talento.patch(`http://localhost:3002/projects/${id}`, formValues, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                }
              })
            dispatch({ type: EDIT_PROJECT, payload: response.data })
            history.push('/')
        } else {
            dispatch(signOut())
        } 
       
    }
}

export const deleteProject = (id) => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        await talento.delete(`http://localhost:3002/projects/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        dispatch({ type: DELETE_PROJECT, payload: id })
        history.push('/')
    }
}
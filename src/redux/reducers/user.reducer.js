import {
    SET_USER
} from '../user.types';

const initialState = {
    user: null
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                app: action.payload
            }
        default:
            return state;
    }
}
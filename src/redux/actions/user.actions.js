import * as types from '../user.types';

export const setUser = user => {
    return {
        type: types.SET_USER,
        payload: user
    }
}
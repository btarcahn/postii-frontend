import { SET_MESSAGE, CLEAR_MESSAGE } from "./type";

export const setMessage = (message: any) => ({
    type: SET_MESSAGE,
    payload: message
});

export const clearMessage = (message: any) => ({
    type: CLEAR_MESSAGE
});

import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT, SET_MESSAGE
} from "./type";
import AuthService from "../services/auth.service";

export const register =
    (email: string, password: string, password_confirmation: string) => (dispatch: any) => {
    return AuthService.register(email, password, password_confirmation)
        .then((response) => {
            dispatch({
               type: REGISTER_SUCCESS
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data
            });

            return Promise.resolve();
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL
            });

            dispatch({
               type: SET_MESSAGE,
               payload: message
            });
        });
};


export const login = (email: string,
                      password: string) => (dispatch: any) => {
    return AuthService.login(email, password)
        .then((data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { email: data }
            });

            return Promise.resolve();
        })
        .catch((error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message
            });

            return Promise.reject();
        });
};

export const logout = () => (dispatch: any) => {
    AuthService.logout()
        .then((data) => {
            return Promise.resolve();
        });

    dispatch({
        type: LOGOUT
    });
};


import axios from "axios";

const API_URL = process.env["DEV_API"];
const AUTH_URL = {
    login: "/auth/sign_in",
    logout: "/auth/sign_out",
    register: "/auth/sign_up"
}

/**
 * Provide an abstraction for accessing the authentication
 * API on the backend.
 * Adapted from: https://www.bezkoder.com/react-typescript-login-example/
 *
 * @author Bach Tran
 * @version 1.0
 */
class AuthService {
    login(email: string, password: string) {
        return axios.post(
            API_URL + AUTH_URL.login, {
                email: email,
                password: password
            })
            .then(response => {
               if (response.data.token) {
                   localStorage.setItem("email", JSON.stringify(response.data));
               }

               return response.data
            });
    }

    logout() {
        localStorage.removeItem("email");

        return axios.delete(
            API_URL + AUTH_URL.logout, {})
            .then(response => response.data);
    }

    register(email: string, password: string, password_confirmation: string) {
        return axios.post(
            API_URL + AUTH_URL.register, {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("email");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();

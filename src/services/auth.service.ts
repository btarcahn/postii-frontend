import axios from "axios";

const API_URL = process.env["DEV_API"] || "http://localhost:3000";
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
                user: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                if (response.status === 201 && response.data.token) {
                    localStorage.setItem("email", JSON.stringify(response.data.token));
                }
                return response;
            })
            .catch(error => {
                if (error.response.status === 422) {
                    return error.response;
                }
                throw error;
            });
    }

    logout() {
        localStorage.removeItem("email");

        return axios.delete(
            API_URL + AUTH_URL.logout, {})
            .then(response => response.data);
    }

    register(email: string, password: string, password_confirmation: string) {
        if (password !== password_confirmation) {
            throw Error("password and password_confirmation don't match.");
        }

        return axios.post(
            API_URL + AUTH_URL.register, {
                user: {
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
            })
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("email");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();

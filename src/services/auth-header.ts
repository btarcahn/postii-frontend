/**
 * Retrieves the token from the server and create
 * the Authorization header.
 */
export default function authHeader() {
    const userStr = localStorage.getItem("email");
    let user = null;
    if (userStr) {
        user = JSON.parse(userStr);
    }

    if (user && user.token) {
        return { Authorization: user.token };
    } else {
        return {};
    }
}
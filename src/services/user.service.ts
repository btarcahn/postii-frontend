import axios from "axios";
import authHeader from "./auth-header";

const API_V1_URL = process.env["DEV_API"] || "http://localhost:3000" + "/api/v1/";

class UserService {

    /** Ping to see if API is working. */
    getPublicContent() {
        return axios.get(API_V1_URL);
    }

    getErrMsgs() {
        return axios.get(API_V1_URL + "err_msgs");
    }

    getCreators() {
        return axios.get(API_V1_URL + "creators",
            { headers: authHeader() });
    }

    getBasicPosters() {
        return axios.get(API_V1_URL + "basic_posters",
            { headers: authHeader() })
    }
}

export default new UserService();

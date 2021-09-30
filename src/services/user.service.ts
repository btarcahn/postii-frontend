import axios from "axios";
import authHeader from "./auth-header";

const API_V1_URL = process.env["DEV_API"] + "/api/v1/";

class UserService {
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

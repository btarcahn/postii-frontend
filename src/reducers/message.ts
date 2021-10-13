import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";

const initialState = {};

export default function (state = initialState,
                         action: { type: string, payload?: any }) {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload };
        case CLEAR_MESSAGE:
            return { message: "" };
        default:
            return state;
    }
}

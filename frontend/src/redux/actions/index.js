import { SET_URL } from "../type";

export function setUrl(url) {
    return { type: SET_URL, payload: url };
}
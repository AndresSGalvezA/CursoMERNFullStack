import { BASE_PATH, API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants'
import jwtDecode from "jwt-decode";

export function getAccessToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return accessToken
}
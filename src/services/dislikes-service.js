import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});
export const findAllTuitsDislikedByUser = (uid) =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>
    api.post(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userAlreadyDislikesTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);
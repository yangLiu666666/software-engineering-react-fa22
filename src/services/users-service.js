import axios from "axios";
//const BASE_URL = "http://my-node-express-project-env.eba-hxq4pgvm.us-east-1.elasticbeanstalk.com";
const BASE_URL =  'http://localhost:4000';
// const BASE_URL = "http://localhost:4000/api";
//const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
  withCredentials: true
});

// export const createUser = (user) =>
//   axios.post(`${USERS_API}`, user)
//     .then(response => response.data);
export const createUser = (user) =>
    api.post('http://localhost:4000/api/users', user)
        .then(response => response.data);

export const findAllUsers = () =>
  api.get(USERS_API)
    .then(response => response.data);

export const findUserById = (uid) =>
  api.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUser = (uid) =>
  api.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    api.delete(`${USERS_API}/username/${username}`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  api.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;
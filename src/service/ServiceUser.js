import axios from "axios";
import {
  axiosWithToken
} from "../config/axios";
import data from "../const";

const USER_API_URL = data.BASE_URL + "/api/user";
const AUTH_API_URL = data.BASE_URL + "/api/auth";

//유저를 하나 가져온다.
export async function getUser(username) {

  const url = USER_API_URL + `/${username}`;
  const response = await axios.get(url);
  return response
}

//유저 수정
export async function updateUser(username, form) {
  const url = USER_API_URL + `/${username}`;
  const response = await axios.post(url, form);
  return response;
}

//이메일 중복체크
export async function checkDup(key, value){

  const url =
  USER_API_URL + `/exists/:email/${value}`;
  const response = await axios.get(url);
  return response;
}

export async function isEmailDuplicated(email) {
  const url = AUTH_API_URL + `/exists/email/${email}`;
  const response = await axios.get(url);
  return response;
}

//닉네임 중복체크
export async function isNicknameDuplicated(username) {
  const url = AUTH_API_URL + `/exists/username/${username}`;
  const response = await axios.get(url);
  return response;
}
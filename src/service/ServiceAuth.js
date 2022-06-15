import axios from "axios";
import { axiosWithToken } from "../config/axios";
import data from "../const";

const AUTH_API_URL = data.BASE_URL + "/api/auth";

//id 기준으로 하나 읽어온다.
export async function signUp(reqData) {
  const SIGNUP_URL = `${AUTH_API_URL}/register/local`;

  console.log(reqData);

  const formData = new FormData();

  Object.keys(reqData).forEach((key) => formData.append(key, reqData[key]));

  if (reqData.profile) {
    formData.append("thumbnail", reqData.thumbnail.image);
  } else {
    //formData.append("profile", null);
  }

  // //for 문을 돌면서 이미지들을 formdata에 append한다
  // for (let i = 0; i < reqData.profile.length; i += 1) {
  //   formData.append("profile", reqData.profile[i].image);
  // }

  console.log(formData.get("thumbnail"));

  const response = await axios.post(SIGNUP_URL, formData, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });
  return response;
}

//로그인 요청
export async function login(param) {

    console.log(param)

    const url = AUTH_API_URL + "/login/local";

    const res = await axios.post(url, param);
    return res;
}

//로그인 요청
export async function googleLogin(param) {


    const url = AUTH_API_URL + "/login/google";

    const res = await axios.post(url, param);
    return res;
}
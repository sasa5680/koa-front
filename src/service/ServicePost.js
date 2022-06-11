import axios from "axios";
import {
  axiosWithToken
} from "../config/axios";
import data from "../const";

console.log(data.BASE_URL);

const POST_API_URL = data.BASE_URL + "/api/post";


//id 기준으로 하나 읽어온다.
export async function readPost(id) {

  const URL = POST_API_URL + `/${id}`;
  const res = await axios.get(URL);

  return res;
}

//페이지 기준으로 읽어온다.
export async function readByPage(page) {

  console.log('read by page');
  const URL = POST_API_URL + `/list?page=${page}&size=${4}`
  const res = await axios.get(URL);

  return res;

}

//유저가 작성한 게시물을 가져온다.
export async function readByPageAndUser(page, userId) {
  const URL = POST_API_URL + `/list/user/${userId}?page=${page}&size=${10}`;
  
  console.log(URL)
  const res = await axios.get(URL);

  return res;
}

//검색어로 게시물을 가져온다.
export async function readByPageAndQuery(page, query) {
  console.log(query);
  const URL = POST_API_URL + `/list/query/${query}?page=${page}&size=${4}`;
  const res = await axios.get(URL);

  return res;
}


//게시물 생성
export async function createPost(formData) {
  const CREAT_URL = POST_API_URL + "/create";

  const result = await axiosWithToken.post(CREAT_URL, formData, {
    headers: {
      "Context-Type": "multipart/form-data",
    },
  });

  console.log(result)
}

export async function deletePost(postId) {

  const URL = POST_API_URL + `/${postId}`;

  const result = await axiosWithToken.delete(URL);

  return result;
}

export async function createReply(postId, content) {

  const URL = POST_API_URL + `/${postId}/reply`;

  const result = await axiosWithToken.post(URL, content);

  return result;

}

export async function deleteReply(postId, replyId) {

  const URL = POST_API_URL + `/${postId}/reply/${replyId}`;

  const result = await axiosWithToken.delete(URL);

  return result;
}

export async function likePost(postId) {

  const URL = POST_API_URL + `/${postId}/like`;

  const result = await axiosWithToken.post(URL, {});

  return result;

}
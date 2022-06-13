import { ConsoleSqlOutlined } from "@ant-design/icons";
import React, { Ref, useRef } from "react";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";

const clientId = "d15ff5faebde3b07af05e6103a72c085";

export default function KakaoLoginBtn({onLogin}) {
  //saga 함수 불러옴


  const onSuccess = async (response) =>  {
    console.log(response);
    const tokenId = response.response.access_token;
    console.log(tokenId);
    //await onGoogleLogin();
    // 구글 로그인 성공시 서버에 전달할 데이터
};

  const onFailure = (error) => {
    console.log(error);
  };
  const target = useRef();
  return (
    <KaKaoLogin
      ref={target}
      token={clientId}
      onSuccess={onSuccess}
      onFail={console.error}
      onLogout={console.info}
    />
  );
}

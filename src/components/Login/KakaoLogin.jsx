import React, { Ref, useRef } from "react";
import KaKaoLogin from "react-kakao-login";
import styled from "styled-components";


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

  return (
    <StyledButton
      style={{}}
      //token={clientId}
      onSuccess={onSuccess}
      onFail={console.error}
      onLogout={console.info}
    />
  );
}

const StyledButton = styled(KaKaoLogin)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: rgb(255, 235, 0);

  border: none;

  box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px;
`;
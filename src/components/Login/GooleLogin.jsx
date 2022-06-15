import React from "react";
import GoogleLogin from "react-google-login";
import { useAccountDispatch } from "../../context/AccountContext";
import { googleLogin } from "../../service/ServiceAuth";

import styled from "styled-components";

const clientId = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;

export default function GoogleLoginBtn({ handleLogin }) {
  
  const onSuccess = async (response) => {
    const { tokenId } = response;

    const getRes = async () => {
      const res = await googleLogin({ token: tokenId });
      return res;
    }

    handleLogin(getRes);
    
    //await onGoogleLogin();
    // 구글 로그인 성공시 서버에 전달할 데이터
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <StyledButton
      clientId={clientId}
      responseType={"id_token"}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

const StyledButton = styled(GoogleLogin)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;

`;

import React, { useCallback } from "react";
import GoogleLogin from "react-google-login";
import { useAccountDispatch } from "../context/AccountContext";
import { googleLogin } from "../service/ServiceAuth";

const clientId =
  "880546170438-subugmdb1ci0l2akecfd6jblem4ai22d.apps.googleusercontent.com";

export default function GoogleLoginBtn({ onGoogleLogin }) {
  
  const dispatch = useAccountDispatch();
  const onLogin = (data) => dispatch({ type: "LOGIN", data });

  const onSuccess = async (response) => {
    const { tokenId } = response;

    try {
      
      const res = await googleLogin({ token: tokenId });
      onLogin(res.data);
    } catch (error) {
      console.log(error);
    }
    
    //await onGoogleLogin();
    // 구글 로그인 성공시 서버에 전달할 데이터
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      responseType={"id_token"}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

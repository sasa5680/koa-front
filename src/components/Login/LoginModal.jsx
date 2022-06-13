import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, message } from "antd";
import { Form, Input, Checkbox, Message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { login } from "../../service/ServiceAuth";
import { useAccountDispatch } from "../../context/AccountContext";
import GoogleLoginBtn from "./GooleLogin";
import KakaoLoginBtn from "./KakaoLogin";

export default function LoginModal({ modalIsOpen, closeModal, afterOpenModal }) {

  const dispatch = useAccountDispatch();
  const onLogin  = (data) => dispatch({ type: "LOGIN", data });

  function resultModal(res, result) {
    
    //로그인 성공하면
    if (result) {

      message.success(`환영합니다 ${res.data.username}님!`, 5);
      closeModal();

      //실패하면 경고 메세지 띄운다.
    } else {
      message.warning(`로그인 정보를 다시 확인하세요!`);
    }
  }
  
  const handleLogin = async (getRes) => {
    try {
      const res = await getRes();
      resultModal(res, true);
      onLogin(res.data);
    
    } catch (error) {
      console.log(error);
      resultModal(null, false);
    }
  }

  const handleSubmit = async (value) => {
    
    const getRes = async () => {
      const res = await login(value);
      return res;
    }

    handleLogin(getRes);
  };

  const Loading = <></>;

  return (
    <StyledModel
      title="Login"
      centered
      width={360}
      visible={modalIsOpen}
      onCancel={() => closeModal()}
      footer={[
        <Link to={`/signup`} onClick={closeModal}>
          계정이 없으세요?
        </Link>,
      ]}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <StyledInput
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <StyledInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <SubmitButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </SubmitButton>
        </Form.Item>
      </Form>

      <OrArea>
        <Line />
        <OrText>or</OrText>
        <Line />
      </OrArea>
      <GoogleLoginBtn handleLogin={handleLogin}></GoogleLoginBtn>
      <KakaoLoginBtn></KakaoLoginBtn>
    </StyledModel>
  );
}

const StyledModel = styled(Modal)`
  overflow: auto;
  z-index: 200;
  //border-radius: 20px;
  //border: 5px gold solid;
`;

const StyledInput = styled(Input)`
  //border-radius: 20px;
  //border: 1px gold solid;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const OrArea = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 40%;
  height: 1px;
  background-color: blue;
`;

const OrText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  font-size: 20px;
`;


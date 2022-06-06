import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import styled from "styled-components";

import { login } from "../service/ServiceAuth";
import { useAccountDispatch } from "../context/AccountContext";

export default function LoginModal({ modalIsOpen, closeModal, afterOpenModal }) {

  const dispatch = useAccountDispatch();
  const onLogin  = (data) => dispatch({ type: "LOGIN", data });

  function resultModal(res, result) {
    
    //로그인 성공하면
    if (result) {
      const modal = Modal.success({
        title: "Welcome!",
        content: `환영합니다 ${res.data.username} !`,
      });

      //5초 후에 성공 모달과 로그인 모달 모두 닫는다.
      setTimeout(() => {
        modal.destroy();
        closeModal();
      }, 5 * 1000);

      //실패하면 경고 메세지 띄운다.
    } else {
      const modal = Modal.warning({
        title: "로그인 실패",
        content: "유저정보를 다시 확인하세요!",
      });
    }
  }
  
  const handleSubmit = async (value) => {
    
    console.log(value)
    try {
      const res = await login(value);
      console.log(res);
      resultModal(res, true);
      onLogin(res.data)       

    } catch (error) {
      console.log(error);
      resultModal(null, false);

    }
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
    </StyledModel>
  );
}

const StyledModel = styled(Modal)`
  overflow: auto;
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


import React from "react";
import { message, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled, { ThemeProvider, css } from "styled-components";

import { login } from "../service/ServiceAuth";
import { useAccountDispatch } from "../context/AccountContext";
import GoogleLoginBtn from "../components/Login/GooleLogin";

export default function SignInPage(props) {

    const dispatch = useAccountDispatch();
    const onLogin = (data) => dispatch({ type: "LOGIN", data });

    function resultModal(res, result) {
      //로그인 성공하면
      if (result) {
        message.success(`환영합니다 ${res.data.username}님!`, 5);
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
        if (props.location.state !== undefined) props.history.push(props.location.state.from.pathname);
        else props.history.push("/");
        } catch (error) {
        console.log(error);
        resultModal(null, false);
      }
    };

    const handleSubmit = async (value) => {
      const getRes = async () => {
        const res = await login(value);
        return res;
      };
      handleLogin(getRes);
    };  

    return (
      <>
        <Main>
          <Body>
            <Inner>
              <Title>Sign-In</Title>
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
            </Inner>
          </Body>
        </Main>
      </>
    );
}

const Main = styled.div `
    
    height: 75vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Body = styled.div`
  width: 400px;
  height: 400px;

  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 10px 15px #e1e1e1;

  @media screen and (max-width: 420px) {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const Inner = styled.div`
    width: 85%;
    height: 85%;
`;

const Title = styled.div`
    
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`

const StyledInput = styled(Input)`
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

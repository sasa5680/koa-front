import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { Upload, message, Textarea } from "antd";
import { signUp } from "../../service/ServiceAuth";
import styled from "styled-components";
import { InputStyle } from "../../common/style";
import { isEmailDuplicated, isNicknameDuplicated } from "../../service/ServiceUser";
import CheckedInput from "./CheckedInput";
const { TextArea } = Input;

export default function SignIn() {
  
  // antd form control
  const [form] = Form.useForm();

  /* 전송 누르고, 성공 시 call 되는 함수 */
  const onFinish = async (values) => {
    
    //파일 있으면 추가
    if(fileList.length > 0) {
      let profile = fileList[0];
      profile = profile.originFileObj;
      values = { ...values, thumbnail: profile };
    } else {
      values = { ...values };

    }
    
    const response = signUp(values);

    response
      .then((data) => {
        console.log(data.data);
        //정보들 추가
      })
      .catch((e) => {
        
      });
  };

  /* 전송 누르고, 실패 시 call 되는 함수 */
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //파일 업로드 이전에 call 되는 함수, 이미지 파일만 받는다.
  function beforeUpload(file) {
    //이미지 파일만 받는다.
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    //2MB 넘기면 안된다
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    //return isJpgOrPng && isLt2M;
    return false;
  }
  //파일 담고있는 state
  const [fileList, setFileList] = useState([]);

  //upload 태그에서 파일 삭제, 추가 할 때 마다 call 되는 함수
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const getFile = (e) => {

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Main>
      <Box>
        <Form
          name="basic"
          initialValues={{
            remember: true,
            intro: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row>
            <Col offset={3} span={18}>
              <LogoBox>Sign-Up Form</LogoBox>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>Email</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              {/* 아이디 */}
              <CheckedInput
                form={form}
                onCheck={isEmailDuplicated}
                name={"email"}
                rule={[
                  {
                    required: true,
                    message: "이메일을 입력해주세요!",
                  },
                  {
                    type: "email",
                    message: "유효한 이메일이 아닙니다!",
                  },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>Password</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              {/* 비밀번호 */}
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력해주세요!",
                  },
                  {
                    pattern: new RegExp(
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
                    ),
                    message:
                      "비밀번호는 8글자 이상, 특수문자와 영문자, 숫자를 모두 포함해야 합니다!",
                  },
                ]}
                hasFeedback
              >
                <StyledPassword />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>Confirm Password</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              {/* 비밀번호 확인 */}
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 다시 입력하세요!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("비밀번호가 일치하지 않습니다!")
                      );
                    },
                  }),
                ]}
              >
                <StyledPassword />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>NickName</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              {/* 닉네임 */}
              <CheckedInput
                form={form}
                onCheck={isNicknameDuplicated}
                name={"username"}
                rule={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  {
                    pattern: new RegExp(/[a-zA-Z0-9가-힣_]/),
                    message: "한글, 숫자, 영어만 가능합니다!",
                  },

                  { min: 4, message: "최소한 3글자 이상" },

                  { max: 10, message: "최대 10글자 이하" },
                ]}
              />
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>Intro</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              {/* 인트로  */}
              <Form.Item name="intro" initialValue="">
                <StyledTextArea maxLength={50} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Label>Profile</Label>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Form.Item name="thumbnail" getValueFromEvent={getFile}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  beforeUpload={beforeUpload}
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col offset={2} span={20}>
              <Form.Item>
                <StyledButton type="primary" htmlType="submit">
                  Submit
                </StyledButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Box>
    </Main>
  );
}

const Main = styled.div`
  
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Box = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 380px;
  //border: 3px solid gold;
  border-radius: 5px;
  background-color: white;
  box-shadow: 2px 10px 15px #e1e1e1;

  @media screen and (max-width: 500px) {
    margin-top: 0px;
    margin-bottom: 0px;
    box-shadow: none;
  }
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const LogoBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledItem = styled(Form.Item)``;

const StyledInput = styled(Input)`
/*   ${InputStyle}
 */  overflow: hidden;
`;

const StyledPassword = styled(Input.Password)`
  /* ${InputStyle} */
`;

const StyledTextArea = styled(TextArea)`
  /* ${InputStyle} */
`;

const StyledButton = styled(Button)`
  width: 100%;
`;


import React, { useState } from "react";
import { MainBody } from "../../common/style"
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Row,
  Col,
  Modal
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { createPost } from "../../service/ServicePost";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";

export default function CreateForm() {
  //store에서 현재 login 여부, 토큰을 가져온다.


  /* 전송 누르고, 성공 시 call 되는 함수 */
  const onFinish = async (values) => {
    //if (!isLogin) return;

    //maxNum은 따로 넣어줘야 한다.(오류 있음)
    const data = { ...values };

    const formData = new FormData();

    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    //for 문을 돌면서 이미지들을 formdata에 append한다
    for (let i = 0; i < fileList.length; i += 1) {
      formData.append("fileList", fileList[i].originFileObj);
    }

    try {

      const response = await createPost(formData);

      const modal = Modal.success({
        title: "Result",
        content: `등록이 완료되었습니다!`,
        onOk() {
          window.location.href = "/";
        },
      });

      setTimeout(() => {
        modal.destroy();
        window.location.href = "/";
      }, 5 * 1000);

    } catch (error) {

      const modal = Modal.warning({
        title: "Result",
        content: `오류가 발생했습니다!`,
      });      
      
    }
  };

  /* 전송 누르고, 실패 시 call 되는 함수(에러처리용) */
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //이미지 파일 리스트
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  //파일 업로드 전에 call, false를 리턴하면 자동 업로드를 막는다.
  function beforeUpload(file) {
    console.log(file.type);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return false;
  }


  return (
    <MainSection>
      <Row>
        <Col offset={1}>
          <Header>게시물 작성</Header>
        </Col>
      </Row>

      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col offset={1}>
            <Label>게시글 title</Label>
          </Col>
        </Row>
        <Row>
          <Col offset={1} span={22}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "제목을 입력하세요!",
                },
              ]}
            >
              <StyledInput
                size="large"
                placeholder="게시물에 들어갈 제목을 입력하세요"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col offset={1}>
            <Label>Content</Label>
          </Col>
        </Row>

        <Row>
          <Col offset={1} span={22}>
            <Form.Item name="content">
              <StyledTextArea
                //showCount
                maxLength={100}
                style={{ fontSize: "15px" }}
                rows={8}
                placeholder={"게시물 내용을 입력하세요"}
                allowClear={true}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col offset={1}>
            <Label>이미지</Label>
          </Col>
        </Row>

        <Row>
          <Col offset={1}>
            <Form.Item>
              <Upload
                //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                accept="image/*"
                beforeUpload={() => {
                  beforeUpload();
                }}
                //defaultFileList={[...fileList]}
                className="upload-list-inline"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col offset={1} span={22}>
            {/* 전송 버튼 */}
            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Submit
              </StyledButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </MainSection>
  );
}
const MainSection = styled.div`
  ${MainBody}
  //background-color: blue;
`;


const Header = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 2px;
`;


const StyledTextArea = styled(TextArea)`
  /* &:focus {
    border: 3px solid red;
  }

  &:hover {
    border: 3px solid red;
  } */

  /* .ant-input:hover {
    border: 1px solid red;
    border-radius: 10px;
  } */

  &::placeholder {
    color: gray;
    font-size: 15px;
  }

  //overflow: hidden;
  font-size: 20px;
  border-radius: 10px;
  border: 1px solid navy;
`;


const StyledInput = styled(Input)`
  border-radius: 10px;
  border: 1px solid navy;

  &::placeholder {
    color: gray;
    font-size: 13px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 35px;
  font-size: 15px;
  margin-right: auto;

  margin-left: auto;
`;

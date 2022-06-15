import React, {useState} from "react";
import {
  TwitterOutlined,
  FacebookOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Modal, Button } from "antd";
import { Form, Input } from "antd";
import { Upload, message, Textarea } from "antd";
import { updateUser }  from "../../service/ServiceUser"

import styled from "styled-components";
const { TextArea } = Input;

export default function UserUpdate({
  modalIsOpen,
  closeModal,
  afterOpenModal,
  user
}) {

  //const [form] = Form.useForm();

  /* 전송 누르고, 성공 시 call 되는 함수 */
  const onFinish = async (values) => {
    //if (!isLogin) return;

    console.log(values);
    const formData = new FormData();

    Object.keys(values).forEach((key) => formData.append(key, values[key]));

    if (fileList.length > 0) {
      formData.append("thumbnail", fileList[0].originFileObj);
    } else {
      //formData.append("profile", null);
    }
    
    console.log(formData.get("thumbnail"));

    try {
      const response = await updateUser(user.profile.username, formData);

      const modal = Modal.success({
        title: "Result",
        content: `등록이 완료되었습니다!`,
        onOk() {
          //window.location.href = "/";
        },
      });

      setTimeout(() => {
        modal.destroy();
        //window.location.href = "/";
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
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      console.log("isArray");
      return e;
    }
    console.log("not Array");
    return e && e.fileList;
  };

  return (
    <StyledModel
      title="유저 정보 수정"
      centered
      width={500}
      visible={modalIsOpen}
      onCancel={() => closeModal()}
      footer={[
        <Button type="primary" danger onClick={closeModal}>
          취소
        </Button>,
      ]}
    >
      <Form
        name="user-update"
        initialValues={{
          email: user.contact.email,
          facebook: user.contact.facebook,
          twitter: user.contact.twitter,
          intro: user.intro
        }}
        onFinish={onFinish}
      >
        <Form.Item name="email">
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            defaultValue={user.contact.email}
          />
        </Form.Item>
        <Form.Item name="facebook">
          <Input
            size="large"
            prefix={<FacebookOutlined className="site-form-item-icon" />}
            defaultValue={user.contact.facebook}
          />
        </Form.Item>
        <Form.Item name="twitter">
          <Input
            size="large"
            prefix={<TwitterOutlined className="site-form-item-icon" />}
            defaultValue={user.contact.twitter}
          />
        </Form.Item>

        <Form.Item name="intro">
          <TextArea
            defaultValue={user.intro}
            rows={6}
          />
        </Form.Item>

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

        <Form.Item>
          <SubmitButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            수정
          </SubmitButton>
        </Form.Item>
      </Form>
    </StyledModel>
  );
}

const StyledModel = styled(Modal)`
  overflow: auto;
  //border-radius: 20px;
  //border: 5px gold solid;
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

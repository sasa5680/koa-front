import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";
import { Form, Input, Checkbox } from "antd";
import { Upload, message, Textarea } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import styled from "styled-components";


export default function UserUpdate({
  modalIsOpen,
  closeModal,
  afterOpenModal,
  user
}) {
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
    console.log(value);
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
          remember: true,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            defaultValue={user.contact.email}
          />
        </Form.Item>
        <Form.Item name="facebook">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            defaultValue={user.contact.facebook}
          />
        </Form.Item>
        <Form.Item
          name="twitter"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            defaultValue={user.contact.twitter}
          />
        </Form.Item>

        <Form.Item name="file" getValueFromEvent={getFile}>
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

const StyledInput = styled(Input)`
  border-radius: 20px;
  border: 1px gold solid;
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

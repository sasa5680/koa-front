import React, { useState } from "react";
import { Modal, Button, Form, Input, Upload, message, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { updatePost, deleteImage } from "../../service/ServicePost";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styled from "styled-components";
import FileUpload from "../../components/FileUpload";
import "./style.css";

const { TextArea } = Input;

export default function PostUpdate({
  modalIsOpen,
  closeModal,
  afterOpenModal,
  post,
  history
}) {
  /* 전송 누르고, 성공 시 call 되는 함수 */
  const onFinish = async (values) => {
    //if (!isLogin) return;
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    //포스트 아이디 추가
    formData.append("postId", post.postId);

    for (let i = 0; i < fileList.length; i += 1) {
      formData.append("fileList", fileList[i].originFileObj);
    }    

    try {
      const response = await updatePost(post.postNum, formData);
      
      //새로고침
      message.success("수정이 완료되었습니다.")
      history.go(0);

    } catch (error) {
      const modal = Modal.warning({
        title: "Result",
        content: `오류가 발생했습니다!`,
      });
    }
  };

  //파일 담고있는 state
  const [fileList, setFileList] = useState([]);
  const pull = (state) => {
    setFileList(state);
  }; 

  //현재 이미지 리스트 
  const [fileListNow, setFileListNow] = useState([...post.image]);

  //이미지 리스트 랜더링
  const deleteImageList = fileListNow.map((data, index) => {
    const onDelete = async () => {
      try {
        await deleteImage(post.postNum, data.filename);
        setFileListNow(fileListNow.filter((file)=> file.src !== data.src));
      } catch (error) {}
    };

    return (
      <CSSTransition key={data.src} timeout={400} classNames="item">
        <ImageItem>
          <StyledImage src={data.src} />
          <Button
            icon={<DeleteOutlined />}
            type="danger"
            shape="round"
            onClick={async () => {
              await onDelete();
            }}
          ></Button>
        </ImageItem>
      </CSSTransition>
    );
  });
  const initial = ["Walk dog", "Sweep floors"];
  const [todos, setTodos] = useState(initial);

  return (
    <StyledModel
      title={<ModalTitle>게시물 수정</ModalTitle>}
      centered
      width={600}
      visible={modalIsOpen}
      onCancel={() => closeModal()}
      footer={[
        <Button type="primary" danger onClick={closeModal}>
          close
        </Button>,
      ]}
    >
      <Form
        name="user-update"
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        onFinish={onFinish}
      >
        {/* 게시물 제목 */}
        <Label>Title</Label>
        <Form.Item name="title">
          <Input size="large" defaultValue={post.title} />
        </Form.Item>

        {/* 게시물 내용 */}
        <Label>Content</Label>
        <Form.Item name="content">
          <TextArea defaultValue={post.content} rows={6} />
        </Form.Item>

        {/* 삭제할 이미지들 */}
        <Label>이미지 삭제</Label>
        <TransitionGroup component={DeleteImageList}>
          {deleteImageList}
        </TransitionGroup>

        {/* 업로드할 이미지들 */}
        <Label>이미지 추가</Label>
        <Form.Item>
          <FileUpload pull={pull}></FileUpload>
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

const ModalTitle = styled.div`
  font-size: 25px;
`
const StyledModel = styled(Modal)`
  overflow: auto;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const Label = styled.div`
  
  font-size: 20px;
  margin-bottom: 10px;
`

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 50px;
`
const DeleteImageList = styled.ul`
  display: block;
  list-style: none outside none;
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
`;

const ImageItem = styled.li`
  float: left;
  display: flex;
  align-items: center;
  width: calc(100% / 2);
  margin-top: 20px;

  @media screen and (max-width: 400px) {
    width: 100%;
  }
`;
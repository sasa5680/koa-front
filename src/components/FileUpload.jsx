import React, { useState } from "react";
import { message, Upload, Button, } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function FileUpload( {pull}){
  
  //파일 업로드 전에 call, false를 리턴하면 자동 업로드를 막는다.
  function beforeUpload(file) {
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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  //파일 담고있는 state
  const [fileList, setFileList] = useState([]);

  //상위 컴포넌트로 리스트를 올려준다.
  pull(fileList);
 
  return (
    <>
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
    </>
  );
}
import React, { useState } from "react";
import { useAccountState } from "../../context/AccountContext"
import { Button, Input, message } from "antd";
import Reply from "./Reply";
import styled from "styled-components";
import { createReply } from "../../service/ServicePost";
import { deleteReply } from "../../service/ServicePost";
import { WechatFilled } from "@ant-design/icons";

import { useLoginModalDispatch } from "../../context/LoginModalContext";
const { TextArea } = Input;

export default function ReplyList( {reply, postId} ) {
  
  const [value, setValue] = useState("");
  //로그인 여부
  const accountState = useAccountState();
  const loginModalDispatch = useLoginModalDispatch();

  const replyList = reply.map((reply, index) => {
    return (
    <Reply 
      handleDelete={()=> handleDelete(reply.id)} 
      data = {reply}
    >
    </Reply>
    )
  })

  const handleChange = e => {
    console.log(e.target.value)
    setValue({
      value: e.target.value,
    });
  };

  //댓글 하나 삭제
  const handleDelete = async (id) => {
    //삭제 함수 call
      console.log(id);

    try {
      const response = await deleteReply(postId, id);

    } catch (error) {

    }
  };

  //댓글 전송
  const handleSubmit = async () => {

    //로그인 되어있지 않으면 리턴
    if (!accountState.isLogin) {
      loginModalDispatch({ type: "OPEN" });
      return;
    }

    //값이 없으면 리턴
    if (value === "") return;
    //console.log("전송");
    try {
      
      const content = {
        content: value.value,
      }
      
      const res = createReply(postId, content);
    } catch (error) {

      console.log(error);
      
    }

    window.location.reload(true);  
};

  return (
    <>
      <ReplyCount>          
        <StyledReplyIcon/>
        <Count>
          {`${reply.length} Comments`}
        </Count>
      </ReplyCount>

      <Editor>
        <TextArea
          onChange={handleChange}
          rows={2}
          placeholder="Leave a comment!"
        />
        <StyledButton type="primary" onClick={handleSubmit}>
          Go
        </StyledButton>
      </Editor>
      {replyList}
    </>
  );
}

const ReplyCount = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

`;
const StyledReplyIcon = styled(WechatFilled)`
  font-size: 50px;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }
`;

const Count = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-left: 20px;

  @media screen and (max-width: 700px) {
    font-size: 25px;
  }
`;

const Editor = styled.div`
  width: 100%;
  display: flex;
`;
const StyledButton = styled(Button)`

  height: 70px;
  width: 20%;
`


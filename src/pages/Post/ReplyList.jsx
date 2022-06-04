import React, { useState, useEffect, useRef } from "react";
import { useAccountState } from "../../context/AccountContext"
import { Button, Input } from "antd";
import Reply from "./Reply";
import styled from "styled-components";
import { createReply } from "../../service/ServicePost";
import { deleteReply } from "../../service/ServicePost";
const { TextArea } = Input;

export default function ReplyList( {reply, postId} ) {
  
  const [value, setValue] = useState("");

  const [replyState, setState] = useState([])
  //로그인 여부
  const accountState = useAccountState();

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

    if (!accountState.isLogin) return;
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

const Editor = styled.div`
  
  width: 100%;
  display: flex;

`

const StyledButton = styled(Button)`

  height: 70px;
  width: 20%;
`


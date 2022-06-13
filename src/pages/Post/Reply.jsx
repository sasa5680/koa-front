import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";
import { useAccountState } from "../../context/AccountContext";
import { dateConverter } from "../../utils/date";

export default function Reply({ data, index, handleDelete }) {
  
  const accountState = useAccountState();

  let UpdateAndDelete = <></>;
  if (accountState.username === data.profile.username) {
      UpdateAndDelete = (
        <UpdateAndDeleteDiv>
          <StyledButton
            icon={<DeleteOutlined />}
            type="danger"
            shape="round"
            onClick={() => handleDelete(data.id)}
          ></StyledButton>
        </UpdateAndDeleteDiv>
      );
  }

  return (
    <ReplySection>
      <AvatarDiv>
        <StyledAvatar src={data.profile.thumbnail} alt="ddd" />
      </AvatarDiv>
      <ContentDiv>
        <AuthorDiv>
          {data.profile.username}
          {UpdateAndDelete}
        </AuthorDiv>
        <TimeAndButtonDiv>{dateConverter(data.createdAt)}</TimeAndButtonDiv>
        <ReplyText>{data.content}</ReplyText>
      </ContentDiv>
    </ReplySection>
  );
}

const ReplySection =styled.div`
  
  display: flex;
  width: 100%;
  margin-top: 30px;
`
const AvatarDiv = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;

`;
const StyledAvatar = styled.img`
  margin-top: 7px;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  @media screen and (max-width: 500px) {
    width: 42px;
    height: 42px;
  }
`;

const ContentDiv = styled.div`
  display: inline-block;
  width: 100%;
  margin-left: 20px;
    
  @media screen and (max-width: 900px) {
    
    margin-left: 0px;
  }
`

const AuthorDiv = styled.div`
  font-size: 25px;
  font-weight: 600;
  display: flex;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const TimeAndButtonDiv = styled.div`
  font-size: 15px;
  align-items: center;
  color: #3a3a3a;
  font-weight: 500;

  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const ReplyText = styled.div`
  font-size: 25px;
  margin-top: 20px;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;
const StyledButton = styled(Button)`

  cursor: pointer;
  //margin-right: 20px;
`

const UpdateAndDeleteDiv = styled.div`
  margin-left: auto;
  margin-right: 10px;
`;
  

import { Row, Col, Avatar } from "antd";
import React from "react";
import styled from "styled-components";
import { dateConverter } from "../../utils/date";

export default function Reply({ data, index, handleDelete }) {
  // <List
  //   dataSource={comments}
  //   header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
  //   itemLayout="horizontal"
  //   renderItem={(props) =>  <Comment {...props} />}
  // />

  const UpdateAndDelete = (
    <UpdateAndDeleteDiv>
      <StyledButton onClick={() => handleDelete(data.id)}>
        delete
      </StyledButton>
    </UpdateAndDeleteDiv>

  )

  return (
    <ReplySection>
      <Row>
        <Col span={3}>
          <Avatar src={data.profile.username.thumbnail} size={50}></Avatar>
        </Col>
        <Col span={21}>
          <Row>
            <Col span={4}>
              <AuthorDiv>{data.profile.username}</AuthorDiv>
            </Col>
            <Col span={10} offset={10}>
              {UpdateAndDelete}
            </Col>
          </Row>
          <Row>
            <Col>
              <ContentDiv>{data.content}</ContentDiv>
            </Col>
          </Row>
          <Row>
            <Col>
              <TimeAndButtonDiv>
                {dateConverter(data.createdAt)}
              </TimeAndButtonDiv>
            </Col>
          </Row>
        </Col>
      </Row>
    </ReplySection>
  );
}

const ReplySection =styled.div`
  
  margin-top: 30px;
`

const AuthorDiv = styled.div`
  
  font-size: 20px;
  font-weight: 400;
`

const ContentDiv = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;

const TimeAndButtonDiv = styled.div`
  
  font-size: 15px;
  align-items: center;
  color: gray;
`
const StyledButton = styled.button`

  width: 100px;
  height : 100%;
  background-color: gold;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 20px;
  color: black;
`

const UpdateAndDeleteDiv = styled.div`
  
  display: flex;
  justify-content: flex-end;
`
  

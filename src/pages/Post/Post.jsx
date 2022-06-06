import React, { useState } from "react";

import { Link } from "react-router-dom";
import { readPost, likePost } from "../../service/ServicePost";
import styled from "styled-components";
import { Col, Row, Avatar, Button, message  } from "antd";

import { UserOutlined, HeartFilled } from "@ant-design/icons";
import ReplyList from "./ReplyList";
import { useAccountState } from "../../context/AccountContext";
import { dateConverter } from "../../utils/date";
import Loading from "../../components/Loading";

export default function Promotion({ match }) {
  const accountState = useAccountState();

  const { id } = match.params;

  

  const [post, setposts] = useState({
    profile: { username: "", thumbnail: "" },
    //Posts: [], //홍보글 목록
    title: "", //로딩중 여부
    content: "", // 현재 페이지
    image: [], //마지막?
    reply: [], //댓글 배열
    createdAt: "",
  });

  const like = async (id) => {

    try {
      
      const response = await likePost(id);
      console.log(response);
    } catch (error) {

      message.error("이미 좋아요를 누른 게시물입니다.");
      console.log(error);
      
    }
  }

  const fetchItems = async () => {
    //로딩 시작
    try {
      console.log(id)
      const response = await readPost(id);
      console.log(response.data)
      setposts(response.data);
    } catch (error) {
      throw error;
    }
  };

  //이미지 리스트 렌더링

  const imageList = post.image.map((file, index) => {
    console.log(file.src);
    return (<StyledImg src={file.src} alt="imageiii" />)
  });

  //로그인 상태면 수정 삭제버튼 보이게 한다.
  let udButton;
  if (accountState.username == post.profile.username) {
    udButton = (
      <>
        <Col>
          <Button>삭제</Button>
        </Col>
      </>
    );
  } else {
    udButton = <></>;
  }

  let profile = <img src={post.profile.thumbnail} width="50" alt="사과" />

  return (
    <Loading fetch={fetchItems}>
      <Row>
        <Col offset={5} span={14}>
          <Section>
            {/* Title Row */}
            <Row>
              <Col span={24}>
                <Title>{post.title}</Title>
              </Col>
            </Row>
            {profile}
            {/* 유저 프로필, 작성시간 Row */}
            <Row style={{ marginTop: "30px", alignItems: "center" }}>
              <Col span={2}>
                <Avatar
                  size={50}
                  src={profile}
                  //icon={<UserOutlined />}
                />
              </Col>
              <Col span={3}>
                <Link to={`/user/${post.profile.username}`}>
                  <h2>{post.profile.username}</h2>
                </Link>
              </Col>
              <Col offset={15} span={4}>
                <h2>{dateConverter(post.createdAt)}</h2>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Line></Line>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ContentSection>{post.content}</ContentSection>
              </Col>
            </Row>

            {/* 이미지 리스트 Row */}
            <Row>
              <Col>{imageList}</Col>
            </Row>

            <Row>
              <Col span={24}>
                <LikeSection
                  onClick={() => {
                    like(id);
                  }}
                >
                  <HeartFilled />
                </LikeSection>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <ReplySection>
                  <ReplyList reply={post.reply} postId={id}></ReplyList>
                </ReplySection>
              </Col>
            </Row>
          </Section>
        </Col>
      </Row>
    </Loading>
  );
}

const Section = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  width: 100%;
  //border: 3px yellowgreen solid;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: bolder;
`;
const ContentSection = styled.div`
  margin-top: 30px;
  font-size: 30px;
  word-break: break-all;
`;

const Line = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 2px;
  background-color: gold;
`;

const StyledImg = styled.img`
  
  max-width: 100%;
  margin-top: 30px;
`

const LikeSection = styled.div`
  margin-top: 100px;
  width: 80px;
  height: 120px;
  border: 2px black solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 300%;
  cursor: pointer;
  transition: 0.2s;
  color: red;

  :hover {
    font-size: 350%;
  }
`;


const ReplySection = styled.div`
  margin-top: 50px;
`;


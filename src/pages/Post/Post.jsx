import React, { useState } from "react";

import { Link } from "react-router-dom";
import { readPost, likePost } from "../../service/ServicePost";
import styled from "styled-components";
import { Col, Avatar, Button, message  } from "antd";

import { UserOutlined, HeartFilled } from "@ant-design/icons";
import ReplyList from "./ReplyList";
import { useAccountState } from "../../context/AccountContext";
import { dateConverter } from "../../utils/date";
import Loading from "../../components/Loading";
import { MainBody } from "../../common/style";

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
    like: 0,
    view: 0,
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
      <MainSection>
        {/* 게시물 타이틀 */}
        <Title>{post.title}</Title>

        {/* 게시물 정보 */}
        <PostInfo>
          <Avatar
            size={50}
            src={profile}
            //icon={<UserOutlined />}
          />
          <Link to={`/user/${post.profile.username}`}>
            <h2>{post.profile.username}</h2>
          </Link>
          <Date>{dateConverter(post.createdAt)}</Date>
        </PostInfo>

        <Line />

        {/* 게시물 텍스트 */}
        <ContentSection>{post.content}</ContentSection>

        {/* 이미지 리스트 */}
        {imageList}

        {/* 좋아요 */}
        <LikeSection
          onClick={() => {
            like(id);
          }}
        >
          <HeartFilled />
        </LikeSection>

        {/* 기타정보 */}
        <InfoSection>
          <div class="info view">{`view: ${post.view}`}</div>
          <div class="info like">{`like: ${post.like}`}</div>
        </InfoSection>

        {/* 댓글 */}
        <ReplySection>
          <ReplyList reply={post.reply} postId={id}></ReplyList>
        </ReplySection>
      </MainSection>
    </Loading>
  );
}

const MainSection = styled.div`
  ${MainBody}
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 50px;
  font-weight: bolder;

  @media screen and (max-width: 700px) {
    font-size: 40px;
  }

  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`;

const Date = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-size: 20px;
  font-weight: 600;
`

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`

const Section = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  overflow: hidden;
  width: 100%;
  //border: 3px yellowgreen solid;
`;

const ContentSection = styled.div`
  margin-top: 30px;
  font-size: 30px;
  word-break: break-all;

  @media screen and (max-width: 700px) {
    font-size: 25px;
  }

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const Line = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledImg = styled.img`
  
  max-width: 100%;
  margin-top: 30px;
`

const InfoSection = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: flex-end;

  .info {
    min-width: 120px;
    height: 40px;
    font-size: 18px;
    color: white;
    margin-left: 20px;
    border-radius: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .view {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .like {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;

const LikeSection = styled.div`
  margin-top: 100px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px #ff4d4f solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 300%;
  cursor: pointer;
  transition: 0.2s;
  color: #ff4d4f;

  :hover {
    font-size: 350%;
  }
`;


const ReplySection = styled.div`
  margin-top: 50px;
`;


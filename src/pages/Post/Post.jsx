import React, { useState } from "react";
import { Link } from "react-router-dom";
import { readPost, deletePost, likePost } from "../../service/ServicePost";
import styled from "styled-components";
import { Avatar, Button, message, Modal } from "antd";
import {
  HeartOutlined,
  EyeOutlined,
  HeartFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ReplyList from "./ReplyList";
import { useAccountState } from "../../context/AccountContext";
import { useLoginModalDispatch } from "../../context/LoginModalContext";
import { dateConverter } from "../../utils/date";
import Loading from "../../components/Loading";
import { MainBody } from "../../common/style";
import PostUpdate from "./PostUpdate";
const { confirm } = Modal;

export default function Post({ match, history}) {

  const accountState = useAccountState();
  const loginModalDsipatch = useLoginModalDispatch();
  
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
    postNum: 0,
  });
  //수정 모달 창 열림 여부
  const [modalIsOpen, setIsOpen] = useState(false);
  
  //삭제 확인 모달 창 열림 여부
  const showDeleteConfirm = async () => {
    confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: "Really?",
      okText: "Delete",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await onDelete(id);
      },
      onCancel() {
      },
    });
  };

  const onDelete = async (id) => {

    try {
      const res = await deletePost(id);
      console.log(res)
      window.location = "/";

    } catch (error) {
      message.error("에러가 발생했습니다.")
    }
  }

  /* 좋아요 버튼 callback */
  const like = async (id) => {

    if(!accountState.isLogin){
      loginModalDsipatch({type: "OPEN"});
      return;
    }

    try {
      const response = await likePost(id);
      console.log(response);
    } catch (error) {

      message.error("이미 좋아요를 누른 게시물입니다.");
    }
  }

  /* 게시물 fetch */
  const fetchItems = async () => {
    //로딩 시작
    try {
      const response = await readPost(id);
      setposts(response.data);
    } catch (error) {
      throw error;
    }
  };

  //이미지 리스트 렌더링
  const imageList = post.image.map((file, index) => {
    return (<StyledImg src={file.src} alt="imageiii" />)
  });

  //로그인 상태면 수정 삭제버튼 보이게 한다.
  let upadateDelte = <></>;
  if (accountState.username === post.profile.username) {
    upadateDelte = (
      <UpadateDelteSection>
        <Button type="primary" size="large" onClick={() => setIsOpen(true)}>
          수정
        </Button>
        <div style={{ width: "10px" }}></div>
        <Button type="danger" size="large" onClick={showDeleteConfirm}>
          삭제
        </Button>
      </UpadateDelteSection>
    );
  } else {
    upadateDelte = <></>;
  }

  let profile = <img src={post.profile.thumbnail} width="50" alt="이미지" />

  return (
    <Loading fetch={fetchItems}>
      <MainSection>
        
        {/* 게시물 타이틀 */}
        <Title>{post.title}</Title>

        {/* 게시물 정보 */}
        <PostInfo>
          <Avatar
            style={{ marginLeft: "5px" }}
            size={50}
            src={profile}
            //icon={<UserOutlined />}
          />
          <Link
            style={{ marginLeft: "10px" }}
            to={`/user/${post.profile.username}`}
          >
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

        <PostProfile>
          <IconDiv>
            <StyledIcon>
              <EyeOutlined
                style={{ color: "#08c"}}
              />
            </StyledIcon>

            <div>{post.view}</div>
          </IconDiv>
          <IconDiv>
            <StyledIcon>
              <HeartOutlined style={{ color: "red" }} />
            </StyledIcon>
            <div>{post.like}</div>
          </IconDiv>
        </PostProfile>

        {/* 삭제 및 업데이트 */}
        {upadateDelte}

        {/* 댓글 */}
        <ReplySection>
          <ReplyList reply={post.reply} postId={id}></ReplyList>
        </ReplySection>
      </MainSection>
      
      {/* 게시물 업데이트 하는 모달 */}
      <PostUpdate
        history={history}
        post={post}
        modalIsOpen={modalIsOpen}
        closeModal={()=>{setIsOpen(false)}}
      />
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
  display: flex;

  @media screen and (max-width: 900px) {
    font-size: 40px;
  }

  @media screen and (max-width: 500px) {
    font-size: 35px;
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
const ContentSection = styled.div`
  margin-top: 30px;
  font-size: 30px;
  word-break: break-all;

  @media screen and (max-width: 900px) {
    font-size: 25px;
    margin-left: 10px;
    margin-right: 10px;
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

const PostProfile = styled.div`
  //width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const StyledIcon = styled.div`
  
  font-size: 35px;
  margin-right: 10px;

  @media screen and (max-width: 500px) {
    font-size: 25px;
  }
`;

const IconDiv = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

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

  @media screen and (max-width: 500px) {
    width: 60px;
    height: 60px;
    font-size: 250%;

    :hover {
      font-size: 300%;
    }
  }
`;

const UpadateDelteSection = styled.div`
  
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

`

const ReplySection = styled.div`
  margin-top: 50px;
`;


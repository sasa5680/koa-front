//리스트 view 요소
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Layout } from "antd";
import { UserOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { dateConverter } from "../../utils/date";
const { Header, Footer, Sider, Content } = Layout;


export default function List({post}) {

  console.log(post)

  const moveLink = (id) => {
    window.location.href = `/post/${id}`;
  }

  const postList = post.map((data, index) => (
    <>
      <StyledLayout
        onClick={() => {
          moveLink(data.postNum);
        }}
      >
        <StyledHeader>
          <div class="inner">{data.title}</div>
        </StyledHeader>
        <StyledContent>
          <div class="inner">{data.content}</div>
        </StyledContent>
        <StyledFooter>
          <UserProfile>
            <Avatar size={40} src={data.profile.thumbnail}/>
            <div>{data.profile.username}</div>
          </UserProfile>
          <PostProfile>
            <div>
              <EyeOutlined style={{ fontSize: "32px", color: "#08c" }} />
              <div>{data.view}</div>
            </div>
            <div>
              <HeartOutlined style={{ fontSize: "32px", color: "red" }} />
              <div>{data.like}</div>
            </div>
            <div>{dateConverter(data.createdAt)}</div>
          </PostProfile>
        </StyledFooter>
      </StyledLayout>
    </>
  ));


    return (
      <>
        <Container>{postList}</Container>
      </>
    );
}

const Container = styled.div`
  
`

const border_radious = "10px"
const maginLeft = "20px";

const StyledLayout = styled(Layout)`
  cursor: pointer;
  margin-top: 20px;
  :hover {
    opacity: 0.5;
  }

  border: 2px black solid;
  border-radius: 5px;
  background-color: #fefec3;
`;

const StyledHeader = styled(Header)`
  width: 100%;

  /* border-top-left-radius: ${border_radious};
  border-top-right-radius: ${border_radious}; */

  font-size: 30px;
  font-weight: 700;

  overflow: hidden;
  padding: 0;

  height: 55px;
  background-color: #ffd228;

  .inner {
    width: 90%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    word-break: break-all;
    display: flex;
    align-items: center;
  }
`;

const StyledContent = styled(Content)`
  font-size: 20px;
  font-weight: 500;

  //margin-left: ${maginLeft};
  width: 100%;
  overflow: hidden;

  margin-top: 30px;
  margin-bottom: 30px;

  .inner {
    word-break: break-all;
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const StyledFooter = styled(Footer)`
  
  width: 100%;

  background-color: #fff584;

  border-bottom-left-radius: ${border_radious};
  border-bottom-right-radius: ${border_radious};
  
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const UserProfile = styled.div`
  
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  width: 30%;

  div {
    padding-left: 10px;
    font-size: 20px;
    font-weight: 500;
  }
` 

const PostProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: auto;

  div {
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 10px;

    div{
      margin-left: 8px;
    }
  }
`;
    

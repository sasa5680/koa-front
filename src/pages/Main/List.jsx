//리스트 view 요소
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Layout } from "antd";
import { UserOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { dateConverter } from "../../utils/date";
import { Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;


export default function List({post, history}) {


  const postList = post.map((data, index) => (
    <StyledLink to={`/post/${data.postNum}`}>
      <StyledLayout>
        <StyledHeader>
          <div class="inner">{data.title}</div>
        </StyledHeader>
        <StyledContent>
          <div class="inner">{data.content}</div>
        </StyledContent>
        <StyledFooter>
          <UserProfile>
            <Avatar size={40} src={data.profile.thumbnail} />
            <div>{data.profile.username}</div>
          </UserProfile>
          <PostProfile>
            <IconDiv>
              <EyeOutlined style={{ fontSize: "32px", color: "#08c" }} />
              <div>{data.view}</div>
            </IconDiv>
            <IconDiv>
              <HeartOutlined style={{ fontSize: "32px", color: "red" }} />
              <div>{data.like}</div>
            </IconDiv>
            <TimeDiv>{dateConverter(data.createdAt)}</TimeDiv>
          </PostProfile>
        </StyledFooter>
      </StyledLayout>
    </StyledLink>
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
    opacity: 0.7;
    transition: 0.2s;
  }

  background-color: #f6f6f6;
  box-shadow: 8px 8px 15px gray;

`;
const StyledHeader = styled(Header)`
  width: 100%;

  /* border-top-left-radius: ${border_radious};
  border-top-right-radius: ${border_radious}; */

  font-size: 30px;
  font-weight: 700;

  padding: 20px;
  overflow: hidden;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  height: 55px;
  background-color: inherit;

  .inner {
    width: 90%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    word-break: break-all;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  @media screen and (max-width: 700px) {
    //display: none;
  }
`;

const StyledContent = styled(Content)`
  font-size: 20px;
  height: 65px;

  //margin-left: ${maginLeft};
  width: 100%;
  overflow: hidden;

  margin-top: 20px;
  margin-bottom: 20px;

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

  background-color: #e1e1e1;

  //border-bottom-left-radius: ${border_radious};
  //border-bottom-right-radius: ${border_radious};

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
  //width: 30%;

  div {
    padding-left: 10px;
    font-size: 20px;
    font-weight: 500;

    @media screen and (max-width: 700px) {
      padding-left: 5px;
    }
  }

  @media screen and (max-width: 700px) {
    margin-left: 5px;
  }
`; 

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  :hover {
    color: black;
  }
`;

const PostProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: auto;
`;

const IconDiv = styled.div`
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const TimeDiv = styled.div`
  
  font-size: 18px;
  font-weight: 400;
`
    

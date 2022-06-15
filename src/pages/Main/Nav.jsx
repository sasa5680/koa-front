import React from "react";
import { Input, Select, Button} from "antd";
import { PlusOutlined, FormOutlined } from "@ant-design/icons";

import { readByPageAndQuery } from "../../service/ServicePost";

import {
  useLoginModalDispatch,
} from "../../context/LoginModalContext";

import {useAccountState} from "../../context/AccountContext"
import {
  usePostListState,
  usePostListDispatch,
} from "../../context/PostListContext";

import styled from "styled-components";

const { Search } = Input;

export default function Nav() {

  const accountState = useAccountState();
  const loginModalDispatch = useLoginModalDispatch();
  
  const postListState = usePostListState();
  const postListdispatch = usePostListDispatch();

  const onClickNewPost = () => {

    if(accountState.isLogin){
      window.location.href = "/newpost";
    } else {
      loginModalDispatch({type: "OPEN"});
    }
  }

  const onSearch = (value) => {
      const fetch = async (page) => {
        try {
          postListdispatch({ type: "LOADING" });

          const response = await readByPageAndQuery(page, value);
          //성공하면 페이지 정보를 갱신한다.

          postListdispatch({ type: "FETCH", action: response.data });
        } catch (error) {
          postListdispatch({ type: "ERROR" });
        }
      };

      postListdispatch({ type: "NEW", action: fetch });
  }
    return (
      <Body>
        <NewPost
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          size="large"
          onClick={onClickNewPost}
        >
          New Post
        </NewPost>
        <NewPostSmall
          type="primary"
          icon={<PlusOutlined />}
          shape="round"
          size="large"
          onClick={onClickNewPost}
        >
          <FormOutlined />
        </NewPostSmall>
        <SearchSection>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </SearchSection>
      </Body>
    );
}



const Body = styled.div`
  border-radius: 5px;
  height: 65px;
  width: 100%;
  background-color: #161671;

  display: flex;
  align-items: center;

  @media screen and (max-width: 600px) {
    height: 55px;

  }
`;

const NewPost = styled(Button)`
  cursor: pointer;
  margin-left: 40px;

  @media screen and (max-width: 600px){
    display: none;
  }
`

const NewPostSmall = styled(Button)`
  cursor: pointer;
  margin-left: 40px;
  display: none;

  @media screen and (max-width: 600px) {
    display:block;
    margin-left: 10px;
  }
`;
const SearchSection = styled.div`
  margin-left: auto;
  margin-right: 30px;
  width: 50%;
  display: flex;

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const StyledSearch = styled(Search)`
    
    width: 100%;
`
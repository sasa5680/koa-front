import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { MainBody } from "../../common/style";
import { Col, Row } from "antd";

import { readByPage } from "../../service/ServicePost";
import List from "./List";
import Nav from "./Nav";

import { usePostListState, usePostListDispatch } from "../../context/PostListContext";

export default function Main() {
  
  const postListState = usePostListState();
  const postListdispatch = usePostListDispatch();

  const fetch = async (page) => {
    try {

      postListdispatch({ type: "LOADING"});

      const response = await readByPage(page);
      //성공하면 페이지 정보를 갱신한다.
      
      postListdispatch({type: "FETCH", action: response.data})
      
    } catch (error) {

      postListdispatch({ type: "ERROR" });
    }
  }

  // 인터섹션 callback (스크롤이 바닥을 찍으면 call 되는 함수)
  const onIntersect = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (postListState.isLast) {
          console.log("last");
          return;
        }
        observer.unobserve(entry.target);
        //새로 데이터를 요청한다.
        const fetch = postListState.fetch;
        console.log(postListState);
        fetch(postListState.page+1);
        console.log("fetch new");
      }
    });

  };

  //스크롤 감시할 element
  const target = useRef();

  //옵저버 등록, 포스트 리스트가 변화하면 다시 call 되어야 한다.
  useEffect(() => {
    let observer;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.0 });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [postListState.Posts]);

  useEffect(()=>{
    postListdispatch({ type: "NEW", action: fetch });
  }, [])


  return (
    <>
      <MainSection>
        <Row>
          <Col span={24}>
            <NavSection>
              <Nav></Nav>
            </NavSection>
          </Col>
        </Row>
        <List post={postListState.Posts}></List>

        <Row>
          <Col span={24}>
            <InterSection ref={target}>
              {postListState.isLoading && <h2>Loading</h2>}
              {postListState.isError && <h2>Error</h2>}
            </InterSection>
          </Col>
        </Row>
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  ${MainBody}
`;

const NavSection = styled.div`
  margin-top: 20px;
`

const InterSection = styled.div`
  width: 100%;
  height: 50px;
`;


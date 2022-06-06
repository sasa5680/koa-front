import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { MainBody } from "../../common/style";
import { Col, Row } from "antd";

import { readByPage } from "../../service/ServicePost";
import Loading from "../../components/Loading";
import List from "./List";
import Nav from "./Nav";

export default function Main() {
  
  //포스트 상태
  const [postsState, setPostsState] = useState({
    Posts: [], //게시글 목록
    isLoading: false, //로딩중 여부
    page: 1, // 현재 페이지
    isLast: false, //마지막 페이지 여부
    isError: false, //에러 여부
  });

  const fetch = async (page) => {
    try {
      const response = await readByPage(page);
      //성공하면 페이지 정보를 갱신한다.

      console.log(response);
      setPostsState({
        ...postsState,
        page: postsState.page + 1,
        isLast: response.data.last,
        Posts: postsState.Posts.concat(response.data.content),
        isLoading: false,
      });
    } catch (error) {

      setPostsState({
        ...postsState,
        isLoading: false,
        isError: true,
      });      
      
    }
  }

  // 인터섹션 callback (스크롤이 바닥을 찍으면 call 되는 함수)
  const onIntersect = async (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (postsState.isLast) {
          console.log("last");
          return;
        }
        observer.unobserve(entry.target);
        //새로 데이터를 요청한다.
        fetch(postsState.page);
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
  }, [postsState.Posts]);

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
        <List post={postsState.Posts}></List>

        <Row>
          <Col span={24}>
            <InterSection ref={target}>
              {postsState.isLoading && <h2>Loading</h2>}
              {postsState.isError && <h2>Error</h2>}
            </InterSection>
          </Col>
        </Row>
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  ${MainBody}
  background-color: #333;
`;

const NavSection = styled.div`
  margin-top: 20px;
`

const InterSection = styled.div`
  width: 100%;
  height: 50px;
  //background-color: red;
`;


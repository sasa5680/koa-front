import React, { useState } from "react";
import { Link } from "react-router-dom";

import { readByPageAndUser } from "../../service/ServicePost";
import PageNation from "../../components/PageNation";
import Loading from "../../components/Loading";
import styled from "styled-components";

export default function UserPost({id}) {

  const [userPostState, setUserPostState] = useState({
    content: [],
    page: 1,
    totalPages: 1,
  });    

  const fetch = async (page) => {
    try {
      const res = await readByPageAndUser(page, id);
      setUserPostState(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };  

  const list = userPostState.content.map((data, index)=>{
    console.log(data);
    return (
      <PostList>
        <MenuLink to={`/post/${data.postNum}`}>{data.title}</MenuLink>
      </PostList>
    );
  })

  return (
    <Loading
      fetch={async () => {
        await fetch(1);
      }}
    >
      <Section>
        <Body>
          {list}
        </Body>
        <Footer>
          <PageNation
            total={userPostState.totalPages}
            onChange={(page) => fetch(page)}
            fetch={(page) => fetch(page)}
            hideNav={true}
          ></PageNation>
        </Footer>
      </Section>
    </Loading>
  );
}

const Section = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Body =styled.div`
  
  width: 100%;
  height: 90%;
`
const Footer = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostList = styled.div`
  padding: 5px;
  width: 100%;
  height: 10%;
  font-size: 15px;
`;

const MenuLink = styled(Link)`
  color: black;
  font-weight: 500;
  text-decoration: none;
`;

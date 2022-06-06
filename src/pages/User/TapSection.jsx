import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import Tabs from "./Tab/Tab";

import TabItem from "./Tab/TabItem";
import PageNation from "../../components/PageNation";
import UserPost from "./UserPost";

export default function TapSection({id}) {

    return (
      <Tabs>
        <TabItem name="소개">
          <Intro>
            <div class = "inner">ddddd</div>
          </Intro>
        </TabItem>
        <TabItem name="작성글">
          <UserPost id = {id}></UserPost>
        </TabItem>
      </Tabs>
    );
}

const Intro = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    height: 90%;
    width: 90%;

    font-size: 25px;
  }
`;
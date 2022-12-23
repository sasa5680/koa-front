import React, { useState }  from "react";
import { Link } from "react-router-dom";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useAccountState, useAccountDispatch } from "../context/AccountContext";
import { useLoginModalDispatch, useLoginModalState} from "../context/LoginModalContext";

import styled, { css } from "styled-components";
import { Button } from "antd";

export default function OffCanvas({ children }) {
  
  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();

  const loginModalState = useLoginModalState();
  const loginModalDispatch = useLoginModalDispatch();  
  
  const [state, setState] = useState(true);
  const toggle = () => {
    setState(!state);
  };

  let content = <></>
  //로그인 되어 있으면 보여줄 요소
  if(accountState.isLogin) {
    content = (
      <>
        <MenuLink to={`/user/${accountState.username}`}>
          {accountState.username}
        </MenuLink>
        <MenuLink onClick={()=>{accountDispatch({ type: "LOGOUT" });}}>LOGOUT</MenuLink>
        <MenuLink to={`/about`}>ABOUT</MenuLink>
      </>
    );
  } else {
    //로그인 안 되어 있으면 보여줄 요소
    content = (
      <>
        <MenuLink
          onClick={() => {
            loginModalDispatch({ type: "OPEN" });
          }}
        >
          LOGIN
        </MenuLink>
        <MenuLink to={`/signup`} onClick={toggle}>
          SIGN-UP
        </MenuLink>
        <MenuLink to={`/about`} onClick={toggle}>
          ABOUT
        </MenuLink>
      </>
    );
  }
  

  return (
    <>
      <Show onClick={toggle} />
      <Body active={state}>
        <div>
          <Close onClick={toggle} />
        </div>
        {content}
      </Body>
    </>
  );
}

const IconStyle = css`
  
  color: black;
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: white;
  }
`;


const Show = styled(DoubleLeftOutlined)`
  ${IconStyle}
  color: white;
  margin-right: 20px;
`;

const Close = styled(DoubleRightOutlined)`
  ${IconStyle}

  margin-top: 15px;
  margin-left: 15px;
`;

const Body = styled.div`
  height: 100vh;
  width: 300px;
  position: fixed;
  background-color: #333;
  top: 0;
  right: ${(props) => (props.active ? "-300px" : "0px")};
  z-index: 1000000;

  transition: 0.3s;
  //background: ${(props) => (props.active ? "darkred" : "limegreen")};
`;

const MenuLink = styled(Link)`
  color: #bbbbbb;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  margin-left: 20px;
`;

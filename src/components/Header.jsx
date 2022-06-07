import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Affix, Button } from "antd";
import LoginModal from "./LoginModal";
import { useAccountState } from "../context/AccountContext";
import { useAccountDispatch } from "../context/AccountContext";
import styled from "styled-components";
import { useLoginModalDispatch, useLoginModalState } from "../context/LoginModalContext";

export default function Header(){

    //모달 창 열림 여부
    function openModal() {
      loginModalDispatch({type: "OPEN"});
    }

    function closeModal() {
      loginModalDispatch({ type: "CLOSE" });
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

  const accountState = useAccountState();
  const accountDispatch = useAccountDispatch();
  
  const loginModalState = useLoginModalState();
  const loginModalDispatch = useLoginModalDispatch();
  
  const onLogout = () => accountDispatch({ type: "LOGOUT" });
  
  let userSection = null;

  //로그인 상태가 아닐경우
  if(!accountState.isLogin){
    userSection = (
      
      <MenuItem>
        <div onClick={openModal}>login</div>
      </MenuItem>
    );

  } else {
    
    //로그인 상태일 경우
    userSection = (
      <>
        <MenuItem>
          <MenuLink to={`/user/${accountState.username}`}>{accountState.username}</MenuLink>
        </MenuItem>
        <MenuItem>
          <div onClick={onLogout}>logout</div>
        </MenuItem>
      </>
    );
  }

    return (
      <>
        <HeaderSection>
          <Logo>
            <LogoLink to={`/`}>KoaBoard</LogoLink>
          </Logo>
          <Menu>
            <MenuItem>
              <MenuLink to={`/about`}>ABOUT</MenuLink>
            </MenuItem>
            {userSection}
          </Menu>
        </HeaderSection>
        <LoginModal
          modalIsOpen={loginModalState.isOpen}
          closeModal={closeModal}
          afterOpenModal={afterOpenModal}
        />
      </>
    );
}

const HeaderSection = styled.div`
  height: 12vh;
  background-color: #287094;
  //background-color: rgba(255, 255, 255, 0.0);
  display: flex;
  align-items: center;

  position: -webkit-sticky;
  //position: sticky;
  top: 0;
`;

const Logo = styled.div`

  height: 100%;
  display: flex;
  font-size: 35px;
  margin-left: 70px;
  position: sticky;
  top: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled(Link)`
  color: white;
  font-weight: 700;
  text-decoration: none;
`

const Menu = styled.div `
  
  height: 100%;
  margin-right: 50px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuLine = styled.div`
  
  width: 3px;
  height: 40%;
  background-color: #676767;

`

const MenuItem = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-left: 20px;
  color: #bbbbbb;
  font-weight: 500;

  & :hover {
    color: white;
    transition: 0.3s;
  }
`;

const MenuLink = styled(Link)`
  color: #bbbbbb;
  font-weight: 500;
  text-decoration: none;
`;

const StyledAffix = styled(Affix)`
  
  position: absolute;
  bottom: 200px;
  right: 200px;
`
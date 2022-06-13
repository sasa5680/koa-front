import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./Login/LoginModal";
import { useAccountState, 
        useAccountDispatch 
} from "../context/AccountContext";
import {
  useLoginModalDispatch,
  useLoginModalState,
} from "../context/LoginModalContext";

import styled from "styled-components";
import OffCanvas from "./OffCanvas";
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
      <>
        <MenuItem>
          <div onClick={openModal}>login</div>
        </MenuItem>
        <MenuItem>
          <MenuLink to={`/signup`}>SIGN UP</MenuLink>
        </MenuItem>
      </>
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
          <StyledOff>
            <OffCanvas />
          </StyledOff>
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
  background: linear-gradient(
    45deg,
    rgba(0, 212, 255, 1) 0%,
    rgba(12, 12, 129, 1) 48%,
    rgba(2, 0, 36, 1) 100%
  );
  //background-color: ${({ theme }) => theme.colors.primary};
  //background-color: rgba(255, 255, 255, 0.0);
  display: flex;
  align-items: center;

  position: -webkit-sticky;
  //position: sticky;
  top: 0;

  @media screen and (max-width: 700px) {
    height: 7.0vh;
  }
`;

const Logo = styled.div`
  height: 100%;
  display: flex;
  font-size: 3.5rem;
  margin-left: 7rem;
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 700px) {
    margin-left: 5px;
    margin-right: auto;
    font-size: 2.8rem;
  }
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
  

  @media screen and (max-width: 700px) {
    display: none; 
  }
`;

const StyledOff = styled.div`
  
  display: none;
  @media screen and (max-width: 700px) {
    display: contents;
    //margin-left: auto;
    margin-right: 20px;
  }
`;

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

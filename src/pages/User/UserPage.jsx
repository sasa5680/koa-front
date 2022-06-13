import React, {useState} from "react";
import Loading from "../../components/Loading";

import { getUser } from "../../service/ServiceUser";
import styled from "styled-components";
import { Col, Row, Avatar, Button } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  MailOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import TapSection from "./TapSection";
import { dateConverter } from "../../utils/date";
import { useAccountState } from "../../context/AccountContext";
import UserUpdate from "./UserUpdate";

export default function UserPage({ match }) {
  const [userDataState, setUserDataState] = useState({
    _id: "",
    email: "",
    profile: {
      thumbnail: "",
      username: "",
    },
    contact: {
      email: "",
      facebook: "",
      twitter: "",
    },
    createdAt: "",
    intro: "",
  });

  //모달 창 열림 여부
  const [modalIsOpen, setIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  const fetchItems = async () => {
    try {
      const res = await getUser(match.params.username);
      console.log(res.data);
      setUserDataState(res.data);
    } catch (error) {
      throw error;
    }
  };

  const accountState = useAccountState();

  let Update = <></>;

  if (accountState.username === match.params.username) {
    Update = <Button></Button>;
  }

  return (
    <Loading fetch={fetchItems}>
      <Body>
          <UserSection>
            <div class="AvatarSection">
              <Avatar size={140} src={userDataState.profile.thumbnail}></Avatar>
            </div>
            <div class="nickname">{userDataState.profile.username}</div>
            <div class="date">
              <CalendarOutlined />
              {dateConverter(userDataState.createdAt)}
            </div>
            {accountState.username == match.params.username && (
              <Button onClick={openModal}>회원정보 수정</Button>
            )}
          </UserSection>
          <SocialSection>
            <div class="title">CONTACT</div>
            <div class="item">
              <MailOutlined style={{ fontSize: "150%" }} />
              <div class="type">Email</div>
              <div class="data">{userDataState.contact.email}</div>
            </div>
            <div class="item">
              <FacebookOutlined style={{ fontSize: "150%" }} />
              <div class="type">Facebook</div>
              <div class="data">{userDataState.contact.facebook}</div>
            </div>
            <div class="item">
              <TwitterOutlined style={{ fontSize: "150%" }} />
              <div class="type">Twitter</div>
              <div class="data">{userDataState.contact.twitter}</div>
            </div>
          </SocialSection>
        <Tab>
          <TapSection
            id={userDataState._id}
            intro={userDataState.intro}
          ></TapSection>
        </Tab>
      </Body>
      
      <UserUpdate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        afterOpenModal={afterOpenModal}
        user={userDataState}
      />
    </Loading>
  );
}

const Body = styled.div`
  position: relative;
  //display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 1150px;
  height: 550px;

  @media screen and (max-width: 1150px) {
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  @media screen and (max-width: 800px) {
    height: fit-content;
  }
`;

const Tab = styled.div`
  margin-left: auto;
  width: 60%;
  height: 100%;

  @media screen and (max-width: 800px) {
    width: 90%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;

    height: 550px;
  }
`;

const User = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  margin-right: auto;

  
`

const UserSection = styled.div`
  //margin-top: 20px;

  position: absolute;
  top: 0;
  left: 0;

  //margin-bottom: 20px;
  width: 35%;
  height: 320px;
  border-radius: 5px;
  //border: 3px #314965 solid;
  align-items: center;
  justify-content: center;

  box-shadow: ${({ theme }) => theme.colors.shadow};
  background-color: white;

  .AvatarSection {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
  }

  .nickname {
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }

  .date {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  @media screen and (max-width: 800px) {
    
    width: 90%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  
  }
`;

const SocialSection = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;

  margin-top: 10px;
  width: 35%;
  border-radius: 5px;
  //box-shadow: 2px 2px 2px gray;
  box-shadow: 2px 10px 15px #e1e1e1;
  background-color: white;

  .container {
    width: 100%;
    height: 25%;
  }

  .icon {
    font-size: 150%;
  }

  .title {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-weight: 600;
  }

  .item {
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 17px;

    .type {
      padding-left: 10px;
    }

    .data {
      font-size: 20px;
      margin-left: auto;
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    width: 90%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  
  }
`;

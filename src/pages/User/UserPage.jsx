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
      <Row style={{ marginTop: "40px", marginBottom: "40px" }}>
        <Col offset={3} span={6}>
          <Row>
            {/* 유저 프로필 섹션 */}
            <UserSection>
              <div class="AvatarSection">
                <Avatar
                  size={140}
                  src="https://joeschmoe.io/api/v1/random"
                ></Avatar>
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

            {/* 소셜 연락처 섹션 */}
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
          </Row>
        </Col>
        <Col offset={1} span={11}>
          <TapSection id={userDataState._id}></TapSection>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col offset={4} span={16}></Col>
      </Row>
      <UserUpdate
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        afterOpenModal={afterOpenModal}
        user={userDataState}
      />
    </Loading>
  );
}

const UserSection = styled.div`
  //margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 320px;
  border-radius: 10px;
  border: 5px navy solid;
  align-items: center;
  justify-content: center;

  .AvatarSection {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .nickname {
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    color: yellowgreen;
  }

  .date {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
`;

const SocialSection = styled.div`
  margin-top: 10px;
  width: 100%;
  border: 1px navy solid;
  border-radius: 10px;

  .icon {
    font-size: 150%;
  }

  .title {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  .item {
    display: flex;
    //align-items: center;
    //vertical-align: middle;
    margin-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 17px;
    border-top: 1px solid navy;

    .type {
      padding-left: 10px;
    }

    .data {
      font-size: 20px;
      margin-left: auto;
      margin-right: 20px;
    }
  }
`;

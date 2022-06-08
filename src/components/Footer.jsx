import React from "react";

import styled from "styled-components";

export default function Footer(){


    return (
      <FooterDiv>
        <div>
          <Title>KoaBoard</Title>
          <Content>copyright &copy; KoaBoard.</Content>
          <Content>all rights reserved?</Content>
        </div>
      </FooterDiv>
    );
}

const FooterDiv = styled.div`
  width: 100%;
  background-color: #000000;

  padding-bottom: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: fit-content;
  }
`;

const ContentDiv = styled.div`
  
  @media screen and (max-width: 500px) {
  }
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
  margin-top: 15px;

  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  font-size: 15px;
  color: #ffffff;
  font-weight: 100;

  display: flex;
  align-items: center;
  justify-content: center;
`;

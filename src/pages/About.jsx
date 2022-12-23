import React from "react";
import styled, { ThemeProvider, css } from "styled-components";
import { MainBody } from "../common/style";
import antdlogo from "../assets/logo_antd.svg"
import herokulogo from "../assets/logo_heroku.svg"
import githubActionlogo from "../assets/logo_githubaction.png"

export default function About() {

    return (
      <MainSection>
        <Section>
          <Inner>
            <Title>Welcome to</Title>
            <Title color>KoaBoard</Title>

            <Body>
              <div>
                this web site is a simple Board made with KOA web framework.
              </div>
              <div>I made this web site to study KOA, React, and Devops.</div>
              <br />

              <div>
                you can upload post with images, leave a comment, and etc.
              </div>
              <div>
                also, you can make your own account with your email or social
                media
              </div>
              <div>And this web serivce supports Mobile View.
                 Press F12 And move the Scroll to Check it!
              </div>
              <br />
              <div>Thanks for visiting!</div>

              <DevSection>
                <TechTitle>Tech Stack</TechTitle>
                <TechTitleSub>Front-End</TechTitleSub>
                <TechList>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_react.png")} />
                    <TechText>React.js</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={antdlogo} />
                    <TechText>ant design</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo
                      src={require("../assets/logo_styledcomponent.png")}
                    />
                    <TechText>Styled Component</TechText>
                  </TechItem>
                </TechList>

                <TechTitleSub>Back-End</TechTitleSub>
                <TechList>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_koa.png")} />
                    <TechText>Koa.js</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_mongodb.png")} />
                    <TechText>MongoDB</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_mongoose.png")} />
                    <TechText>Mongoose js</TechText>
                  </TechItem>
                </TechList>
                <TechTitleSub>DevOps</TechTitleSub>
                <TechList>
                  <TechItem>
                    <TechLogo src={herokulogo} />
                    <TechText>heroku</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_docker.webp")} />
                    <TechText>Docker</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_ec2.png")} />
                    <TechText>Amazon EC2</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={require("../assets/logo_s3.png")} />
                    <TechText>Amazon S3</TechText>
                  </TechItem>
                  <TechItem>
                    <TechLogo src={githubActionlogo} />
                    <TechText>Github Action</TechText>
                  </TechItem>
                </TechList>
              </DevSection>
              <DevSection>
                <TechTitle>Git Repository</TechTitle>
                <div>
                  <a
                    href="https://github.com/sasa5680/koa-front"
                    target="_blank"
                  >
                    Front-End Repository
                  </a>
                </div>
                <div>
                  <a
                    href="https://github.com/sasa5680/koa-backend"
                    target="_blank"
                  >
                    Back-End Repository
                  </a>
                </div>
              </DevSection>
            </Body>
          </Inner>
        </Section>
      </MainSection>
    );
}

const Section = styled.div`
  box-shadow: 2px 10px 15px #e1e1e1;
  margin-top: 50px;
  margin-bottom: 50px;

  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 700px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const Inner = styled.div`
  width: 85%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
  ${(props) =>
    props.color &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}

  @media screen and (max-width: 700px) {
    font-size: 40px;
    margin-top: 0px;
  }
`;

const Body = styled.div`
  margin-top: 110px;
  font-size: 22px;
  font-weight: 400;

  @media screen and (max-width: 700px) {
    font-size: 18px;
  }
`;

const DevSection = styled.div`
    
    margin-top: 100px;
`

const TechTitle = styled.div`
  
  margin-top: 60px;
  font-size: 40px;
  font-weight: 600;
`;

const TechTitleSub = styled.div`
  margin-top: 30px;
  font-size: 25px;
  font-weight: 500;
`;

const TechList = styled.ul`
  display: block;
  list-style: none outside none;
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
`;

const TechLogo = styled.img`
    width: 50px;
    height: 50px;
`

const TechText = styled.div`
  margin-left: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TechItem = styled.li`
  float: left;
  display: flex;
  width: calc(100% / 2);
  margin-top: 20px;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const MainSection = styled.div`
  ${MainBody}
`;

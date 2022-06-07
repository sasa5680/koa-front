import React, { useState } from "react";
import styled from "styled-components";
import { MainBody } from "../common/style";

export default function About() {

    return (
        <MainSection>
            <Title>Welcome to KoaBoard!!</Title>
            <Body>
                this web site is simple Board made with koa, react
                <DevSection>
                    Front
                </DevSection>
            </Body>
        </MainSection>
    );
}

const Title = styled.div`
    
    font-size: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;

`

const Body = styled.div`

    margin-top: 50px;
    margin-left: 50px;
    font-size: 30px;
    
`

const DevSection = styled.div`
    
`

const MainSection = styled.div`
  ${MainBody}
  background-color: yellowgreen;
`;

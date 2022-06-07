import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import TabPane from "./TabItem";

export default function Tabs({ children }) {

  const [tabState, setTabState] = useState([...children])
  const [itemToShow, setItemToShow] = useState(<div></div>);
  const [header, setHeader] = useState([])

  useEffect(() => {
    setHeader(tabState.map(mapper));
    //배열이 비었으면 빈 div를 넣어준다.
    if (tabState.length === 0) {
      setItemToShow(<div></div>);
    } else {
    //아니면 0번의 요소를 넣어준다.
      setItemToShow(tabState[0].props.children);
    }
    return () => {};
  }, []);

  //tab 누르면 callback 함수
  const tabPaneOnclick = (e) => {

    //이름이 맞는 tab 요소를 가져온다.
    const showItem = tabState.filter((item) => item.props.name === e);
    setItemToShow(showItem[0].props.children)
    //tab을 다시 렌더링
    const headers = tabState.map(function(data) {

      let selected = data.props.name === e;

      let tabPane = (
        <TabPaneItem
          selected={selected}
          onClick={() => tabPaneOnclick(data.props.name)}
        >
          {data.props.name}
        </TabPaneItem>
      );    

      return tabPane;
    })

    setHeader(headers);

  }

  const mapper = (data, index) => {
    
    let tabPane = (
      <TabPaneItem
        selected={index === 0}
        onClick={() => tabPaneOnclick(data.props.name)}
      >
        {data.props.name}
      </TabPaneItem>
    );

    return tabPane;
  }
  
  return (
    <Main>
      <Header>{header}</Header>
      <Body>{itemToShow}</Body>
    </Main>
  );
}

const Main = styled.div`
    
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    display: flex;
    width: 100%;
`

const Body = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background-color: white;
  box-shadow: 2px 10px 15px #e1e1e1;
`;

const TabPaneItem = styled.div`
  height: 50px;
  font-size: 20px;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #a6e1ff;
  cursor: pointer;

  :hover {
    background-color: #287094;
    transition: 0.3s;
  }

  //선택되었을 경우 적용되는 CSS
  ${(props) =>
    props.selected &&
    css`
      background-color: #287094;
      transition: 0.2s;
    `}
`;
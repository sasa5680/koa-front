// import React, { useState, useEffect } from "react";
// import styled, { css } from "styled-components";

// export default function Tabs({ children, name }) {

//     const [isActive, setActive] = useState(false);

//     const onClick = () => {setActive(true)}

//     return (
//       <>
//         <TabPaneItem 
//         onClick={onClick}
//         selected= {isActive}
//         >{name}</TabPaneItem>
//       </>
//     );

// }

// const TabPaneItem = styled.div`
//   height: 50px;
//   font-size: 20px;
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border: 1px solid navy;

//   :hover {
//     background-color: green;
//   }

//   //선택되었을 경우 적용되는 CSS
//   ${(props) =>
//     props.selected &&
//     css`
//       background-color: yellow;
//       transition: 0.5s;
//     `}
// `;
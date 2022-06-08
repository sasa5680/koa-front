import { css } from "styled-components";

const theme = {
  color: {
    white: "#ffffff",
    primary: "#fefec3",
  },
};


export const ThemaLight = css`
  background-color: #fefec3;
`;

//공통 스타일 이곳에서 관리
export const MainBody = css`

  margin-left: auto;
  margin-right: auto;
  width: 900px;
`

export const TagStyle = css`
  
  border-radius: 3px;
  background-color: beige;
  border: 2px gold solid;
  margin-top: 10px;
  margin-right: 20px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  //min-width: 80px;
  //font-size: 1.3rem;
`;

export const InputStyle = css`
  border-radius: 5px;
  border: 1px gold solid;
  overflow: hidden;

  &:hover {

  }

  &:focus {

  }
`;

export const Button = css`
  border-radius: 10px;
  border: 1px solid navy;
  font-size: 30px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: navy;
    border: 1px blue solid;
  }
`;
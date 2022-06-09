import styled from "styled-components";

const pixelToRem = (size) => `${size / 16}rem`; 

const fonts = {

}

const colors = {
  primary: "#287094",
  res: "##ff4d4f",
  shadow: "2px 10px 15px #e1e1e1",
};

const common = {
  
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  

}
const theme = {
  colors,
  common,
  fonts,
};

export default theme;
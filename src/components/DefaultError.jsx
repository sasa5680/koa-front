import React, { useState, useCallback } from "react";
import styled from "styled-components";


//에러 나면 기본으로 보여줄 요소

const ErrorSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
`;

export default function DefaultError() {

    return (
      <>
        <ErrorSection>
            Error
        </ErrorSection>
      </>
    );

}



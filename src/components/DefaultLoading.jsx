import React from "react";
import styled from "styled-components";

const LoadingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;

export default function DefaultLoading() {

    return (
    <>
      <LoadingSection>
          Loading...
      </LoadingSection>
    </>
    )
}
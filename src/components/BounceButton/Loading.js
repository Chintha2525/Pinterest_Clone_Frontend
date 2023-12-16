import React from "react";
import styled, { keyframes } from "styled-components";
import Logo from "./Arrow";

const LOGO_SIZE = "48px";
const DURATION = "0.8s";
const DROP_HEIGHT = "40px";
const OFFSET = "calc(80%)";

const bounce = keyframes`
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(${DROP_HEIGHT}) scale(1);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
`;

const LogoWrapper = styled(Logo)`
  width: ${LOGO_SIZE};
  height: ${LOGO_SIZE};

  position: absolute;
  top: ${OFFSET};
  left: calc(50% - ${LOGO_SIZE} / 2);

  animation-name: ${bounce};
  animation-duration: ${DURATION};
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
`;

function Loading() {
  return (
    <LogoWrapper />
  );
}

export default Loading;

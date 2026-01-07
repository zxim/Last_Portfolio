import React from 'react';
import SectionContainer from '@components/Section/SectionContainer';
import ArrowDownSVG from '@public/svgs/arrowDown.svg';
import styled, { keyframes } from 'styled-components';
import { useScroll } from '@hooks/useScroll';

const IntroSection = (): JSX.Element => {
  const { handleScroll, opacity } = useScroll();

  return (
    <SectionContainer
      name='intro'
      onScroll={handleScroll}
      full
    >
      <Background />
      <Wrapper style={{ opacity }}>
        <Typo>
          <MainTypo>SECURITY ENGINEER</MainTypo>
          <SubTypo>PORTFOLIO</SubTypo>
        </Typo>
        <ArrowDown>
          <ArrowDownSVG />
          <ArrowDownSVG />
          <p>SCROLL DOWN</p>
        </ArrowDown>
      </Wrapper>
    </SectionContainer>
  )
};

export default IntroSection;

const arrowDownAni = keyframes`
  0% {
    transform: translateY(0) scale(0.88);
    opacity: 0;
  }
  50% {
    transform: translateY(17px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(31px) scale(0.88);
    opacity: 0;
  }
`
const fadeIn = keyframes`
  0% {
    opacity: 0;
    bottom: 3rem;
  }
  100% {
    opacity: 1;
    bottom: 2rem;
  }
`
const fadeInScale = keyframes`
  0% {
    transform: scale(0.2) translateY(4rem);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0rem);
    opacity: 1;
  }
`
const gradientAni = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background: linear-gradient(-45deg, #000000, #400927, #281648, #016f5e);
  background-size: 300% 300%;
  animation: ${gradientAni} 13s ease-in-out infinite;

  z-index: 0;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Typo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4.5rem;

  font-size: 1rem;
  font-family: var(--font-poppins);
  
  opacity: 0;
  will-change: transform opacity;
  cursor: default;
  animation: ${fadeInScale} 3000ms 500ms cubic-bezier(0.000, 1, 0.000, 1) forwards;

  @media (max-width: 1330px) {
    font-size: 1.16vw;
  }
`
const MainTypo = styled.h1`
  color: #fff;
  line-height: 1.02em;
  font-size: 8.9em;
  font-weight: 900;
  opacity: 1;

  @media (max-width: 470px) {
    line-height: 1.3em;
  }
`
const SubTypo = styled.h3`
  color: #e1df61;
  font-size: 1.8em;
  font-weight: 700;
  letter-spacing: 0.75em;

  @media (max-width: 768px) {
    font-size: 2.6em;
  }
  @media (max-width: 470px) {
    font-size: 3em;
  }
`
const ArrowDown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 2rem;
  height: 5rem;

  opacity: 0;
  will-change: transform opacity;
  cursor: default;
  animation: ${fadeIn} 900ms 1200ms forwards;

  svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    
    opacity: 0;
    stroke: #ffffff59;

    animation: ${arrowDownAni} 1300ms linear infinite;

    &:nth-child(1) {
      animation-delay: 0;
    }
    &:nth-child(2) {
      animation-delay: 650ms;
    }
  }

  &>p {
    color: #fff;
    font-size: 0.875rem;
    margin-bottom: 3.5rem;

    opacity: 0.7;
  }
`
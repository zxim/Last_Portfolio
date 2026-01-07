import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SectionContainer from '@components/Section/SectionContainer';
import { useScroll } from '@hooks/useScroll';

import ContactLinkList from '@/components/Section/ContactSection/ContactLinkList';

const ContactSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleScroll, opacity } = useScroll();
  const className = isVisible ? 'visible' : '';

  return (
    <SectionContainer
      name='contact'
      handleVisible={setIsVisible}
      onScroll={handleScroll}
    >
      <Background />
      <Wrapper style={{ opacity }}>
        <ContentsWrapper className={className}>
          <FormText>
            <GlowingText>저의 포트폴리오를 봐주셔서 감사합니다!</GlowingText>
            <p>아래 링크를 통해 저에 대해 더 알아보세요 <EmojiWrapper>🙇‍♂️</EmojiWrapper></p>
          </FormText>

          <ContactLinksWrapper>
            <ContactLinkList />
          </ContactLinksWrapper>
        </ContentsWrapper>

        <FooterSection>
          <FooterLine />
          <CopyRights>
            Copyright © 2025. minshim All rights reserved.
          </CopyRights>
        </FooterSection>
      </Wrapper>

      <BottomGradient />
      <TopGradient />
    </SectionContainer>
  );
};

export default ContactSection;

const floatAnimation = keyframes`
  0% {
    transform: translateY(-7px);
  }
  100% {
    transform: translateY(5px);
  }
`;

const glowAnimation = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(244, 242, 112, 0.3), 0 0 20px rgba(244, 242, 112, 0.1);
  }
  50% {
    text-shadow: 0 0 15px rgba(244, 242, 112, 0.5), 0 0 30px rgba(244, 242, 112, 0.2);
  }
  100% {
    text-shadow: 0 0 10px rgba(244, 242, 112, 0.3), 0 0 20px rgba(244, 242, 112, 0.1);
  }
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #18161e;
  background-image: radial-gradient(#ffffff14 1.6px, transparent 1.6px);
  background-size: 40px 40px;
  background-attachment: fixed;
  z-index: 0;
  pointer-events: none;
`

const BottomGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 15rem;
  bottom: 0;
  left: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
  z-index: 1;
  pointer-events: none;
`;

const TopGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 8rem;
  top: 0;
  left: 0;
  background: linear-gradient(to top, transparent, rgba(0, 0, 0, 0.4));
  z-index: 1;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 2rem;
  padding-bottom: 16rem;
  font-family: var(--font-pretendard);
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1rem;
    padding-bottom: 8rem;
  }
`;

const ContentsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(20px);
  padding-top: 2.5rem;

  opacity: 0;
  transition: 1400ms 500ms cubic-bezier(0.23, 1, 0.32, 1);
  
  &.visible {
    transform: translateY(0);
    opacity: 1;
  }
`;

const FormText = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
  padding-bottom: 4rem;
  gap: 1.2rem;
  text-align: center;
  
  & > p:last-child {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 400;
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    padding-top: 2rem;
    padding-bottom: 3rem;
    gap: 1rem;
    
    & > p:last-child {
      font-size: 1rem;
    }
  }
  
  @media (max-width: 470px) {
    gap: 0.8rem;
    
    & > p:last-child {
      font-size: 0.9rem;
    }
  }
`;

const GlowingText = styled.p`
  color: #f4f270;
  font-size: 2.2rem;
  font-weight: 700;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (max-width: 470px) {
    font-size: 1.5rem;
  }
`;

const EmojiWrapper = styled.span`
  display: inline-block;
  animation: ${floatAnimation} 2s ease-in-out alternate infinite;
`;

const ContactLinksWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;



const FooterSection = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FooterLine = styled.div`
  width: 40%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(134, 128, 152, 0.3),
    transparent
  );
`;

const CopyRights = styled.div`
  color: #868098;
  font-size: 0.85rem;
  opacity: 0.8;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
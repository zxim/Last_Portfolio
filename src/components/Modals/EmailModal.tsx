'use client';

import { isEmailModalOpenState } from '@/atoms/modal';
import CrossSVG from '@public/svgs/cross.svg';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const EmailModal = (): JSX.Element | null => {
  const [isOpen, setIsOpen] = useRecoilState(isEmailModalOpenState);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Container onClick={handleClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <CrossSVG />
        </CloseButton>
        <Title>Email Address</Title>
        <EmailWrapper>
          <EmailText>tlaals44@naver.com</EmailText>
          <CopyButton onClick={() => navigator.clipboard.writeText('tlaals44@naver.com')}>
            Copy
          </CopyButton>
        </EmailWrapper>
      </ModalBox>
    </Container>
  );
};

export default EmailModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  position: relative;
  background-color: #1e1e2f;
  border: 1px solid #333337;
  border-radius: 1em;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  color: white;
  font-family: var(--font-pretendard);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #fff;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2a3e;
  padding: 0.75rem 1rem;
  border-radius: 0.5em;
`;

const EmailText = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
`;

const CopyButton = styled.button`
  background-color: #4f4f7a;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5em;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 150ms;

  &:hover {
    background-color: #6a6a9c;
  }
`;

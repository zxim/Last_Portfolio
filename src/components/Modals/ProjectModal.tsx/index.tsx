import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import LinkSVG from '@public/svgs/link.svg';
import { isOpenProjectState } from '@/atoms/project';
import CrossSVG from '@public/svgs/cross.svg';
import DocumentSVG from '@public/svgs/document.svg';
import ArrowDownSVG from '@public/svgs/arrowDown.svg';
import { IProjectProps, projectData } from '@/constants/project';
import Issue from '@/components/Modals/ProjectModal.tsx/Issue';
import ReasonText from '@/components/Modals/ProjectModal.tsx/ReasonText';
import FuncList from '@/components/Modals/ProjectModal.tsx/FuncList';
import StyledText from '@/components/Modals/ProjectModal.tsx/StyledText';
import ImageWithSpinner from '@/components/ImageWithSpinner';

const ProjectModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenProjectState);
  const [info, setInfo] = useState<IProjectProps | undefined>(projectData[0]);
  const [isScroll, setIsScroll] = useState(false);
  const [thumbNum, setThumbNum] = useState<number>(0);
  const [randomKey, setRandomKey] = useState(1);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgListRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const MockUpClassName = `${isScroll ? 'scrolled' : 'unScrolled'} ${isOpen ? 'visible' : ''}`;

  const handleScroll = useCallback(() => {
    if (bodyRef.current && contentsRef.current) {
      const { scrollTop } = bodyRef.current;
      const contentsTop = contentsRef.current.offsetTop;

      setIsScroll(scrollTop > contentsTop * 0.1);
    }
  }, []);

  useEffect(() => {
    const bodyElement = bodyRef.current;
    if (isOpen && bodyElement) {
      bodyElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (bodyElement) {
        bodyElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, handleScroll]);

  useEffect(() => {
    if (isOpen) {
      setRandomKey(Math.random())
      setInfo(isOpen);
      setThumbNum(0);
      document.body.style.overflow = 'hidden';
      if (bodyRef.current) {
        bodyRef.current.scrollTo(0, 0);
      }
      setIsScroll(false);
    } else {
      document.body.style.overflow = 'initial';
      setIsScroll(false);
    }
  }, [isOpen]);

  const handleClose = () => setIsOpen(undefined);

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  // ESC 키로 이미지 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isImageModalOpen) {
        setIsImageModalOpen(false);
      }
    };

    if (isImageModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImageModalOpen]);

  return (
    <>
      {isOpen && ( // Conditionally render the overlay
        <ModalOverlay onClick={handleClose}>
          <Container className={isOpen ? 'visible' : ''}> {/* Removed onClick from Container */}
            <Top>
              <ExitBtn onClick={handleClose}>
                <CrossIcon />
              </ExitBtn>
            </Top>
            <Body ref={bodyRef} onClick={(e) => e.stopPropagation()}>
              <BackColor>
                {info && <Image src={info.thumb[thumbNum]} alt={`${info.name}(Thumbnail)_${thumbNum}`} />}
              </BackColor>
              {info && (
                <MockUp className={MockUpClassName}>
                  <Image
                    ref={imgRef}
                    src={info.thumb[thumbNum]}
                    alt={`${info.name}(Thumbnail)_${thumbNum}`}
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                  />
                  {info.thumb.length > 1 && ( // Only render SelectThumbList if there's more than 1 image
            <SelectThumbList ref={imgListRef} $thumbCount={info.thumb.length}>
              {info.thumb.map((i: StaticImageData, idx: number) =>
                <SelectThumb
                  key={idx * randomKey}
                  className={idx === thumbNum ? 'selected' : ''}
                  src={i}
                  alt={`${info.name}(Thumbnail)_${idx}`}
                  onClick={() => setThumbNum(idx)}
                />
              )}
            </SelectThumbList>
          )}
                </MockUp>
              )}
              <Contents ref={contentsRef} className={isScroll ? 'visible' : 'unVisible'}>
                <ContentsWrapper className={isScroll ? 'visible' : 'unVisible'}>
                  <Name>
                    <DocumentIcon />
                    <p>{info?.name}</p>
                  </Name>
                  <Status>
                    <StatusService>
                      <StatusLight />
                      <p>GitHub</p>
                    </StatusService>
                    {info?.url && <LinkBtn href={info?.url} target='_blank'>
                      <span>Youtube 바로가기</span>
                      <LinkIcon />
                    </LinkBtn>}
                    {info?.github ?
                      <LinkBtn href={info?.github} target='_blank'>
                        <span>GitHub 바로가기</span>
                        <LinkIcon />
                      </LinkBtn>
                      : null
                    }
                  </Status>
                  <Info>
                    <Intro>
                      <p>INTRO.</p>
                      {info?.intro}
                    </Intro>
                    <InfoRow>
                      <Label>⏱️ 개발 기간</Label>
                      <InfoText>
                        {`${info?.term} ${info?.termDiff ? `(${info?.termDiff})` : ''}`}
                      </InfoText>
                    </InfoRow>
                    <InfoRow>
                      <Label>👥 구성원</Label>
                      <InfoText>
                        {info?.team || '개인 프로젝트'}
                      </InfoText>
                    </InfoRow>
                    <InfoRow>
                      <Label>기여도</Label>
                      <ContributionList>
                        {info?.contribution.dev ? <Contribution>
                      <span>개발</span>
                      {info?.contribution.dev}
                    </Contribution>
                      : null
                    }
                    {info?.contribution.infra ? <Contribution>
                      <span>인프라</span>
                      {info?.contribution.infra}
                    </Contribution>
                      : null
                    }
                    {info?.contribution.security ? <Contribution>
                      <span>보안</span>
                      {info?.contribution.security}
                    </Contribution>
                      : null
                    }
                      </ContributionList>
                    </InfoRow>
                    <InfoRow>
                      <Label>🛠️ 사용된 기술 스택</Label>
                      <StackList>
                        {info?.stacks.map((i: string, idx: number) =>
                          <Stack key={idx}>{i}</Stack>
                        )}
                      </StackList>
                    </InfoRow>
                    {(info?.func && info?.func.length > 0) &&
                      <InfoRow>
                        <Label>⚡ 주요 기능</Label>
                        <FuncList info={info} />
                      </InfoRow>
                    }
                  </Info>
                  <DetailInfo>
                    <InfoRow>
                      <BlackLabel>🤔 기술 선정 이유</BlackLabel>
                      <ReasonText info={info} />
                    </InfoRow>
                    <InfoRow>
                      <BlackLabel>🐛 개발 이슈</BlackLabel>
                      <Issue info={info} />
                    </InfoRow>
                    <InfoRow>
                      <BlackLabel>💭 개발 후 느낀점</BlackLabel>
                      <DetailInfoText>
                        <StyledText>{info?.learned}</StyledText>
                      </DetailInfoText>
                    </InfoRow>
                  </DetailInfo>
                </ContentsWrapper>
              </Contents>
            </Body>
            <ScrollGradient className={!isScroll ? 'unVisible' : ''} />
            <ScrollNote className={!isScroll ? 'unVisible' : ''}>
              <ArrowDownIcon />
              <p>스크롤을 내리면 프로젝트 정보를 볼 수 있습니다.</p>
            </ScrollNote>
          </Container>
        </ModalOverlay>
      )}

      {/* 전체 화면 이미지 모달 */}
      {isImageModalOpen && info && (
        <ImageModalOverlay onClick={handleImageModalClose}>
          <ImageModalContent onClick={(e) => e.stopPropagation()}>
            <ImageModalCloseBtn onClick={handleImageModalClose}>
              <CrossIcon />
            </ImageModalCloseBtn>
            <ImageModalImage
              src={info.thumb[thumbNum]}
              alt={`${info.name}(Thumbnail)_${thumbNum}`}
            />
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </>
  );
};

export default ProjectModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's above other content but below image modal */
  backdrop-filter: blur(4px); /* Optional: adds a blur effect */
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const flashAni = keyframes`
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%) scale(1);
  width: calc(100% - 12rem);
  max-width: 100rem;
  height: calc(100% - 1rem);

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 1px solid #34343c;
  border-bottom: none;
  box-shadow: 0 0 36px #0000;
  overflow: hidden;

  will-change: transform;
  transition: transform 200ms ease-out, opacity 300ms;
  pointer-events: none;

  &.visible {
    transform: translateX(-50%) translateY(0%) scale(1);
    transition: transform 200ms cubic-bezier(0.215, 0.610, 0.355, 1), opacity 300ms;
    box-shadow: 0 0 36px #0008;
    pointer-events: initial;
  }

  @media (max-width: 2200px) {
    width: calc(100% - 4rem);
    max-width: 80rem;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;

    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  @media (max-width: 768px) {
    border-radius: initial;
  }
`
const CrossIcon = styled(CrossSVG)`
  width: 1.125rem;
  height: 100%;

  fill: #ffffff;
  opacity: 1;

  transition: 100ms;
`
const Top = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 3.75rem;
  padding-right: 0.5rem;
  mix-blend-mode: difference;

  z-index: 10000;

  @media (max-width: 768px) {
    height: 3rem;
    padding-right: 0;
  }
`
const ExitBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  aspect-ratio: 1/1;

  cursor: pointer;
  transition: 100ms;

  &:hover {
    transform: scale(1.15);
  }
`
const Body = styled.div`
  position: relative;
  flex: 1;

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`
const MockUp = styled.div`
  position: absolute;
  top: 0px;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  align-items: center;
  width: 100%;

  opacity: 0;
  transform: scale(0.5) translateY(0);

  z-index: 1000;
  transition: 200ms 100ms cubic-bezier(0.23, 1, 0.320, 1);

  &>img {
    width: 75%;
    max-width: 80rem;
    height: auto;
    aspect-ratio: 3840/2112;
    margin-top: 60px;

    object-fit: contain;
    overflow: hidden;
    border-radius: 0.875rem;
    border: 1px solid #404149;
    box-shadow: 0px 20px 34px #0004;
    -webkit-user-drag: none;
    box-sizing: content-box;
    background-color: #141419;
  }

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &.scrolled {
    transform: scale(1) translateY(-450px);
    transition: 150ms ease-out;
  }

  @media (max-width: 1024px) {
    transform: translateY(0) !important;
    gap: 1.25em;

    &>img {
      width: calc(100% - 2rem) !important;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    gap: 0rem;
    transform: scale(1) !important;
    opacity: 1 !important;

    background-color: #dedfe4;

    &>img {
      width: 100% !important;
      margin-top: 0px;
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #000000;
      box-shadow: none;
      box-sizing: content-box;
    }
  }
`
const BackColor = styled.div`
  width: 100%;
  aspect-ratio: 20/6;

  overflow: hidden;
  
  img {
    position: absolute;
    left: 50%;
    top: -50%;
    width: 200%;
    height: 200%;
    transform: translateX(-50%);
    object-fit: cover;
    filter: blur(70px) brightness(50%) saturate(250%);
    -webkit-user-drag: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 7em;
    background: linear-gradient(#000b, #0000);
  }

  @media (max-width: 1024px) {
    width: 100%;
    aspect-ratio: 20/16 !important;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
const Contents = styled.div`
  position: relative;
  width: 100%;
  padding-top: 8.125em;
  padding-bottom: 10em;
  top: 450px;

  background: #dedfe4;
  opacity: 0;

  transition: 150ms ease-out;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4.375rem;

    background: linear-gradient(#0003, #0000);
  }

  &.visible {
    top: 0;
    opacity: 1;

    transition: 200ms 100ms cubic-bezier(0.23, 1, 0.320, 1)
  }

  @media (max-width: 1024px) {
    top: 0;
    opacity: 1 !important;
    padding-top: 6em;
    padding-bottom: 6em;
  }
  @media (max-width: 768px) {
    padding-top: 1.875em;
    font-size: 0.875rem;

    &::after {
      display: none;
    }
  }
`
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  max-width: 60rem;
  margin: 0 auto;
  
  color: #000;
  font-weight: 500;

  transition: 150ms ease-out;
  
  &.visible {
    opacity: 1;
    transition: 150ms 150ms ease-out;
  }

  @media (max-width: 1024px) {
    width: calc(100% - 1.5rem);
    opacity: 1 !important;
  }
  @media (max-width: 470px) {
    width: calc(100% - 1rem);
  }
`
const Name = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1.125em;
  padding: 0 0.5em;

  &>p {
    color: #000000;
    font-size: 2.25em;
    font-weight: 700;
    letter-spacing: -0.08em;
  }

  @media (max-width: 768px) {
    font-size: 0.875em;
  }
`
const DocumentIcon = styled(DocumentSVG)`
  width: 2em;
  margin-top: 0.2em;

  fill: #ffffff;
  opacity: 1;

  transition: 100ms;
`
const ScrollGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6.875em;

  background: linear-gradient(#0000, #0003);
  opacity: 0;
  
  transition: opacity 150ms;

  &.unVisible {
    opacity: 1;
  }
`
const ScrollNote = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625em;
  position: absolute;
  bottom: 2.5em;
  left: 50%;
  transform: translateX(-50%) translateY(0.5em);
  padding: 0.625em 1.125em;

  background-color: #492e9e;
  border: 1px solid #fff2;
  backdrop-filter: blur(40px);
  border-radius: 1em;
  opacity: 0;

  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  white-space: nowrap;

  transition: 150ms;
  z-index: 1000;

  &.unVisible {
    opacity: 1;
    transform: translateX(-50%) translateY(0px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`
const ArrowDownIcon = styled(ArrowDownSVG)`
  width: 0.75em;
  stroke: #fff;
  opacity: 1;

  transition: 100ms;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25em;
  padding: 0.25em 0.5em;
  padding-bottom: 2em;

  border-bottom: 1px solid #aeaecb;
`
const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75em;
`
const Label = styled.div`
  color: #000000;
  font-size: 1.25em;
  font-weight: 700;
`
const InfoText = styled.p`
  position: relative;
  padding-left: 1em;
  
  font-size: 1em;
  font-weight: 500;
  line-height: 1.75em;
  white-space: pre-wrap;

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: calc(100% - 0.35em);
    width: 0.25em;
    background-color: #aeaecb;
  }
`
const ContributionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`
const Contribution = styled.p`
  display: flex;
  gap: 0.375em;
  padding: 0.125em 0.625em;
  
  border-radius: 0.5em;
  background-color: #f8b3b3;
  
  font-size: 0.875em;
  font-weight: 400;
  line-height: 1.75em;
  white-space: pre-wrap;

  span {
    font-weight: 700;
  }
`
const Status = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  padding: 1em;
  padding-left: 0.5em;
`
const StatusService = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625em;

  color: #747482;
  font-size: 1em;
  font-weight: 500;
  white-space: nowrap;
`
const StatusLight = styled.div`
  width: 0.5em;
  height: 0.5em;

  border-radius: 100%;
  background-color: #7eae03;

  animation: ${flashAni} 800ms infinite alternate;
`
const LinkBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
  border-radius: 0.4em;

  color: #5d5ded;
  font-size: 1em;
  font-weight: 500;
  white-space: nowrap;

  cursor: pointer;
  transition: 150ms;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
`
const LinkIcon = styled(LinkSVG)`
  width: 0.8em;
  height: 0.8em;
  stroke: #9e9eb5;
  margin-bottom: 0.0625em;
`
const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`
const Stack = styled.p`
  display: flex;
  gap: 0.375em;
  padding: 0.125em 0.625em;
  
  border-radius: 0.5em;
  background-color: #7173a6;
  
  color: #fff;
  font-size: 0.875em;
  font-weight: 500;
  line-height: 1.75em;
  white-space: pre-wrap;
`
const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.75em;
  padding: 2em 0.5em;
  padding-bottom: 3em;

  border-bottom: 1px solid #aeaecb;

  @media (max-width: 768px) {
    gap: 2em;
  }
`
const BlackLabel = styled.div`
  color: #030303;
  font-size: 1.25em;
  font-weight: 700;
`
const DetailInfoText = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  
  font-size: 1em;
  font-weight: 500;
  line-height: 1.75em;
  white-space: pre-wrap;
`
const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 0.125em;
  padding: 0.75em 0.75em;
  padding-top: 0.5em;
  max-width: 50em;

  border-radius: 0.375em;
  background-color: #f5f5d8;

  white-space: pre-wrap;
  font-size: 1em;
  font-weight: 500;
  line-height: 1.5em;

  &>p {
    color: #939669;
    font-size: 0.875em;
  }
`
const SelectThumbList = styled.div<{ $thumbCount: number }>`
  display: grid;
  grid-template-columns: ${({ $thumbCount }) => `repeat(${$thumbCount}, 1fr)`};
  gap: 1.25em;
  width: 75%;
  max-width: 80em;

  @media (max-width: 1024px) {
    width: calc(100% - 2em) !important;
    gap: 1em;
  }
  @media (max-width: 768px) {
    width: calc(100% - 0em) !important;
    gap: 0em;
  }
`
const SelectThumb = styled(ImageWithSpinner)`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 3840/2112;

  border-radius: 0.5em;
  background-color: #141419;
  object-fit: contain;
  overflow: hidden;
  border-radius: 0.5em;
  border: 1.5px solid #404149;
  box-shadow: 0em 1.25em 2.125em #0004;
  -webkit-user-drag: none;
  box-sizing: content-box;

  cursor: pointer;
  transition: 100ms;
  will-change: transform;

  &.selected {
    border: 1.5px solid #ca3f3f;
  }

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    border-radius: initial;
    box-shadow: none;
    box-sizing: border-box;
    border: none;

    &:hover {
      transform: scale(1);
    }
  }
`

const ImageModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ImageModalContent = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  animation: scaleIn 0.2s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;

const ImageModalCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const ImageModalImage = styled(Image)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    border-radius: 0;
  }
`;
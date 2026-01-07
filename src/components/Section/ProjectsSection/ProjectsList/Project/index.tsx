import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import LinkSVG from '@public/svgs/link.svg';
import ArrowSVG from '@public/svgs/arrowRight.svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import { isOpenProjectState, projectFilterState } from '@/atoms/project';
import { IProjectProps } from '@/constants/project';
import ProjectStacks from '@/components/Section/ProjectsSection/ProjectsList/Project/ProjectStacks';

interface IProps {
  data: IProjectProps;
}

const Project = ({ data }: IProps): JSX.Element => {
  const [, setIsOpen] = useRecoilState(isOpenProjectState);
  const { thumb, term, name, url, github, team, stacks } = data;
  const selectedStacks = useRecoilValue<string[]>(projectFilterState);

  const handleClickDetail = () => {
    setIsOpen(data);
  }

  const isVisible = selectedStacks.length === 0 || stacks.some((stack: string) => selectedStacks.includes(stack));

  return (
    <Container className={isVisible ? '' : 'visible'}>
      <ThumbnailWrapper onClick={handleClickDetail}>
        <Image
          src={thumb[0]}
          alt={`${name}(Thumbnail)_0`}
          fill
        />
      </ThumbnailWrapper>
      <Row $marginBottom='0.65em'>
        <NameWrapper>
          <Name>
            <span onClick={handleClickDetail}>{name}</span>
            <DetailBtn onClick={handleClickDetail}>
              <p>자세히 보기</p>
              <ArrowIcon />
            </DetailBtn>
          </Name>
        </NameWrapper>
      </Row>
      <Row $marginBottom='1em'>
        <Info>
          <Term>{term}</Term>
          <Units>{team || '개인 프로젝트'}</Units>
        </Info>
      </Row>
      <BtnWrapper>
        {url && <LinkBtn href={url} target='_blank'>
          <span>Youtube 이동</span>
          <LinkIcon />
        </LinkBtn>}
        {github &&
          <LinkBtn href={github} target='_blank'>
            <span>GitHub</span>
            <LinkIcon />
          </LinkBtn>
        }
      </BtnWrapper>
      <ProjectStacks stacks={stacks} />
    </Container>
  )
};

export default Project;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: opacity 150ms ease;

  &.visible {
    opacity: 0.35;

    &:hover {
      opacity: 0.45;
    }
  }

  @media (max-width: 470px) {
    font-size: 0.875rem;
  }
`
const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  aspect-ratio: 1/0.55;
  margin-bottom: 1em;
  
  border-radius: 0.75em;
  border: 1.5px solid #ffffff25;
  overflow: hidden;

  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
  transition: 150ms;

  img {
    object-fit: cover;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  ${Container}:hover & {
    border: 1.5px solid #ffffff4d;
  }

  @media (max-width: 470px) {
    border-radius: 0.625em;
  }
`
const NameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
const Name = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &>span {
    color: #fff;
    font-size: 1.35em;
    font-weight: 500;
    
    cursor: pointer;
    transition: 300ms;
  }

  &>span:hover {
    color: #fffea7;
  }
`
const Row = styled.div<{ $marginBottom?: string }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '1em'};
`
const Info = styled.div`
  display: flex;
  gap: 1rem;
`
const Units = styled.span`
  color: #b38484;
  font-size: 0.875em;
  font-weight: 300;
`
const Term = styled.span`
  color: #706f7e;
  font-size: 0.875em;
  font-weight: 300;
`
const BtnWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  gap: 1.25em;
  margin-bottom: 1.25em;
`
const LinkBtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
  border-radius: 0.4em;

  color: #aba9f7;
  font-size: 0.875em;
  font-weight: 300;

  cursor: pointer;
  transition: 150ms;

  &:hover {
    text-decoration: underline;
    color: #fff;

    svg {
      stroke: #fff;
    }
  }
`
const ArrowIcon = styled(ArrowSVG)`
  width: 0.65em;
  height: 0.65em;

  fill: #838198;
  transition: 100ms;
`
const LinkIcon = styled(LinkSVG)`
  width: 0.75em;
  height: 0.75em;
  stroke: #50505f;
`
const DetailBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4em;
  padding-left: 0.75em;

  color: #838198;
  font-size: 0.875em;
  font-weight: 300;
  white-space: nowrap;
  
  cursor: pointer;
  transition: 100ms;

  &:hover {
    color: #b0b5dd;

    svg {
      fill: #b0b5dd;
    }
  }
`
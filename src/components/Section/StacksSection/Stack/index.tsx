import { projectFilterState } from '@/atoms/project';
import smoothScrollTo from '@/utils/smoothScrollTo';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

interface IProps {
  icon: React.ReactNode;
  name: string;
  name2?: string;
  count: number;
}

const Stack = ({ name, name2, icon, count }: IProps): JSX.Element => {
  const [, setSeletedStacks] = useRecoilState(projectFilterState);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const router = useRouter();

  const handleClickStack = useCallback(async (stack: string) => {
    setSeletedStacks([stack]);
    const targetSection = document.getElementById('projects');
    if (targetSection && count > 0) {
      const targetPosition = targetSection.offsetTop;
      await smoothScrollTo(targetPosition, 450);
      router.replace(`/?section=projects`, { scroll: false });
    }
  }, [setSeletedStacks, router, count]);

  const updateElementPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = mousePositionRef.current.x - rect.left;
      const y = mousePositionRef.current.y - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateElementPosition);
  }, [updateElementPosition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <Container ref={containerRef} onClick={() => handleClickStack(`${name}${name2 ?? ''}`)}>
      <Background />
      <StackIcon>{icon}</StackIcon>
      <StackName>
        <p>{name}</p>
        {name2 && <p>{name2}</p>}
      </StackName>
      {!!count && <Badge>{count}</Badge>}
    </Container>
  );
};

export default React.memo(Stack);

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 7rem;
  min-width: 8.5em;
  aspect-ratio: 8.5 / 10;
  padding-top: 0.375em;
  
  border-radius: 1em;
  border: 1px solid #fff0;
  box-shadow: 0.25em 0.25em 1.75em rgba(0, 0, 0, 0.25);
  background: linear-gradient(rgba(255, 255, 255, 0.005) 50%, rgba(255, 255, 255, 0.025) 100%);
  
  will-change: transform;
  transition: box-shadow 150ms, transform 70ms ease-out, border 70ms ease-out;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    box-shadow: 0.2em 0.2em 1.75em rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transform: scale(1.1);

    &>div:last-child {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 9.5em;
    padding-top: 0.25em;
  }
  @media (max-width: 470px) {
    width: 100%;
    min-width: 8em;
  }
`
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 1em;
  background: radial-gradient(circle 180px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(220, 220, 255, 0.06), rgba(220, 220, 255, 0));
  pointer-events: none;
`
const StackIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%;
`
const StackName = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125em;
  justify-content: center;
  align-items: center;
  padding: 0 1em;
  
  color: #fff;
  font-size: 0.95em;
  font-weight: 500;
  white-space: pre-line;
  text-align: center;
  
  &:has(p:nth-child(2)) {
    justify-content: center;
    padding-bottom: 0.5em;
  }

  @media (max-width: 768px) {
    font-size: 0.85em;
    padding: 0 0.5em;
    &:has(p:nth-child(2)) {
      padding-bottom: 0.7em;
    }
  }
`
const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -0.6em;
  top: -0.6em;
  width: 1.9em;
  height: 1.9em;

  background-color: #77001a;
  box-shadow: -0.1875em 0.1875em 0.625em #0002;
  border-radius: 100%;

  color: #fff;
  font-size: 0.875em;
  font-weight: 500;

  opacity: 0.5;
  transition: 70ms;
`
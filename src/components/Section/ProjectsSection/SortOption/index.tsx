import styled from 'styled-components';
import CrossSVG from '@public/svgs/cross.svg';
import ResetSVG from '@public/svgs/reset.svg';
import { useRecoilState } from 'recoil';
import { projectFilterState } from '@/atoms/project';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SortOption = (): JSX.Element | null => {
  const [selectedStacks, setSeletedStacks] = useRecoilState(projectFilterState);
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  const handleClickStack = (stack: string) => {
    const temp: string[] = [];
    selectedStacks.forEach((i: string) => { if (i !== stack) temp.push(i) });
    setSeletedStacks(temp);
  }

  const handleClickReset = () => {
    setSeletedStacks([]);
  }

  useEffect(() => {
    if (section !== 'projects') {
      setSeletedStacks([]);
    }
  }, [section, setSeletedStacks])

  return selectedStacks.length > 0 ? (
    <Container id='sortOption'>
      <Wrapper>
        <StackList>
          {selectedStacks.map((i: string, idx: number) =>
            <Stack key={idx} onClick={() => handleClickStack(i)}>
              <p>{i}</p>
              <CrossIcon />
            </Stack>
          )}
          <ResetBtn onClick={handleClickReset}>
            <ResetIcon />
            <p>초기화</p>
          </ResetBtn>
        </StackList>
      </Wrapper>
    </Container>
  ) : <Container />
};

export default SortOption;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 2rem);
  padding-top: 5rem;
  padding-bottom: 3rem;
  margin: 0 auto;
  
  background: #000;

  z-index: 100;

  @media (max-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`
const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;

  border-bottom: 5px solid #0e0e13;

  @media (max-width: 768px) {
    padding: 1rem 0rem;
  }
`
const StackList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`
const Stack = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  height: 2.25rem;
  padding: 0 0.875rem;

  border-radius: 8px;
  border: 1px solid #222;

  color: #fff;
  font-size: 0.875rem;
  font-weight: 300;

  cursor: pointer;
  will-change: transform;
  transition: 100ms;

  &:hover {
    transform: scale(1.05);

    svg {
      fill: #e91b1b;
    }
  }
`
const CrossIcon = styled(CrossSVG)`
  width: 0.6rem;
  height: 100%;

  fill: #a80c0c;
  transition: 100ms;
`
const ResetBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.75rem;
  
  color: #ff8484;
  font-size: 0.875rem;

  cursor: pointer;
  transition: 100ms;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
  }
`
const ResetIcon = styled(ResetSVG)`
  width: 0.75rem;
  height: 0.75rem;

  fill: #ff8484;
`
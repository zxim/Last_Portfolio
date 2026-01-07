import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import SectionContainer from '@components/Section/SectionContainer';

// SVG and PNG Imports
import JavascriptSVG from '@public/svgs/stacks/javascript.svg';
import PythonSVG from '@public/svgs/stacks/python.svg';
import PhpSVG from '@public/svgs/stacks/php.svg';
import NodejsSVG from '@public/svgs/stacks/nodejs.svg';
import NextjsSVG from '@public/svgs/stacks/nextjs.svg';
import AwsSVG from '@public/svgs/stacks/aws.svg';
import GitSVG from '@public/svgs/stacks/git.svg';
import MysqlSVG from '@public/svgs/stacks/mysql.svg';
import MariadbSVG from '@public/svgs/stacks/mariadb.svg';
import UbuntuSVG from '@public/svgs/stacks/ubuntu.svg';
import KaliLinuxSVG from '@public/svgs/stacks/kalilinux.svg';
import WiresharkSVG from '@public/svgs/stacks/wireshark.svg';
import BurpSuiteSVG from '@public/svgs/stacks/burpsuite.svg';
import ElasticStackSVG from '@public/svgs/stacks/elasticstack.svg';
import SuricataPNG from '@public/svgs/stacks/suricata.png';
import pfSensePNG from '@public/svgs/stacks/pfSense.png';
import ModSecurityPNG from '@public/svgs/stacks/Modesecurity.png';

import { useScroll } from '@hooks/useScroll';
import Stack from '@components/Section/StacksSection/Stack';
import Title from '@components/Section/Title';
import { projectData } from '@/constants/project';
import Image from 'next/image';
import { useMemo } from 'react'; // Added useMemo

const StacksSection = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState<boolean[]>([]);
  const { handleScroll, opacity } = useScroll();
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRowRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    rowRefs.current[index] = el;
  }, []);

  const stackCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    projectData.forEach(project => {
      project.stacks.forEach(stack => {
        // Normalize stack names to match the format used in Stack component's onClick
        // For example, "ELK Stack" in projectData should match "ELK (SIEM)" in Stack component
        // This requires careful mapping or consistent naming.
        // A more robust solution might involve a separate mapping constant.

        // For simplicity, let's try to match the displayed name in Stack component
        // This might need adjustment if the projectData stack names are very different
        // from the displayed names in the Stack component.
        if (stack.includes('ELK')) {
          counts['ELK (SIEM)'] = (counts['ELK (SIEM)'] || 0) + 1;
        } else if (stack.includes('Suricata')) {
          counts['Suricata (IPS)'] = (counts['Suricata (IPS)'] || 0) + 1;
        } else if (stack.includes('pfSense')) {
          counts['pfSense (F/W)'] = (counts['pfSense (F/W)'] || 0) + 1;
        } else if (stack.includes('ModSecurity')) {
          counts['ModSecurity (WAF)'] = (counts['ModSecurity (WAF)'] || 0) + 1;
        } else if (stack.includes('Kali')) {
          counts['Kali Linux'] = (counts['Kali Linux'] || 0) + 1;
        } else {
          counts[stack] = (counts[stack] || 0) + 1;
        }
      });
    });
    return counts;
  }, []); // Removed projectData from dependency array

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rowRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1) {
            setVisibleRows((prev) => {
              const newState = [...prev];
              if (!newState[index]) {
                newState[index] = entry.isIntersecting;
              }
              return newState;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -70px 0px',
      }
    );

    const currentRows = rowRefs.current; // Capture current value
    currentRows.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRows.forEach((ref) => { // Use captured value in cleanup
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <SectionContainer
      name='stacks'
      handleVisible={setIsVisible}
      onScroll={handleScroll}
    >
      <Background />
      <Wrapper style={{ opacity }}>
        <Title
          isVisible={isVisible}
          main='주요 기술 스택'
          sub='스택을 누르면 해당 스택이 사용된 프로젝트로 이동합니다.'
        />
        <StackList>
          <StackItem>
            <StackType $visible={visibleRows[0]}># Security Solutions</StackType>
            <StackRow ref={setRowRef(0)} $visible={visibleRows[0]}>
              <Stack name='Suricata (IPS)' icon={<Image src={SuricataPNG} alt="Suricata" width={60} height={60} />} count={stackCounts['Suricata (IPS)'] || 0} />
              <Stack name='pfSense (F/W)' icon={<Image src={pfSensePNG} alt="pfSense" width={60} height={60} />} count={stackCounts['pfSense (F/W)'] || 0} />
              <Stack name='ModSecurity (WAF)' icon={<Image src={ModSecurityPNG} alt="ModSecurity" width={60} height={60} />} count={stackCounts['ModSecurity (WAF)'] || 0} />
              <Stack name='ELK (SIEM)' icon={<ElasticStackIcon />} count={stackCounts['ELK (SIEM)'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[1]}># Languages</StackType>
            <StackRow ref={setRowRef(1)} $visible={visibleRows[1]}>
              <Stack name='JavaScript' icon={<JavascriptIcon />} count={stackCounts['JavaScript'] || 0} />
              <Stack name='Python' icon={<PythonIcon />} count={stackCounts['Python'] || 0} />
              <Stack name='PHP' icon={<PhpIcon />} count={stackCounts['PHP'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[2]}># Tools</StackType>
            <StackRow ref={setRowRef(2)} $visible={visibleRows[2]}>
              <Stack name='Wireshark' icon={<WiresharkIcon />} count={stackCounts['Wireshark'] || 0} />
              <Stack name='Burp Suite' icon={<BurpSuiteIcon />} count={stackCounts['Burp Suite'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[3]}># Frameworks</StackType>
            <StackRow ref={setRowRef(3)} $visible={visibleRows[3]}>
              <Stack name='Node.js' icon={<NodejsIcon />} count={stackCounts['Node.js'] || 0} />
              <Stack name='Next.js' icon={<NextjsIcon />} count={stackCounts['Next.js'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[4]}># Operating Systems</StackType>
            <StackRow ref={setRowRef(4)} $visible={visibleRows[4]}>
              <Stack name='Ubuntu' icon={<UbuntuIcon />} count={stackCounts['Ubuntu'] || 0} />
              <Stack name='Kali Linux' icon={<KaliLinuxIcon />} count={stackCounts['Kali Linux'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[5]}># Etc</StackType>
            <StackRow ref={setRowRef(5)} $visible={visibleRows[5]}>
              <Stack name='AWS' icon={<AwsIcon />} count={stackCounts['AWS'] || 0} />
              <Stack name='Git' icon={<GitIcon />} count={stackCounts['Git'] || 0} />
            </StackRow>
          </StackItem>
          <StackItem>
            <StackType $visible={visibleRows[6]}># Databases</StackType>
            <StackRow ref={setRowRef(6)} $visible={visibleRows[6]}>
              <Stack name='MySQL' icon={<MysqlIcon />} count={stackCounts['MySQL'] || 0} />
              <Stack name='MariaDB' icon={<MariadbIcon />} count={stackCounts['MariaDB'] || 0} />
            </StackRow>
          </StackItem>
        </StackList>
      </Wrapper>
      <TopGradient />
    </SectionContainer>
  )
};

export default StacksSection;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(27, 19, 30);
  z-index: 0;
  pointer-events: none;
`
const TopGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  bottom: 0;
  left: 0;
  background: linear-gradient(#0000, #0006);
`
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  
  font-family: var(--font-pretendard);
`
const StackList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5em;
  column-gap: 4em;
  width: calc(100% - 6rem);
  max-width: 61em;
  padding-top: 8em;
  padding-bottom: 10em;

  margin: 0 auto;
  
  font-size: 0.875rem;

  @media (max-width: 1024px) {
    width: calc(100% - 4rem);
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
  @media (max-width: 470px) {
    width: calc(100% - 2rem);
    font-size: 0.6875rem;
  }
`
const StackItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:first-child) {
    margin-top: 1em;
  }
`
const StackType = styled.p<{ $visible: boolean }>`
  width: 100%;
  margin-bottom: 1.125em;

  color: #5e5e6a;
  font-size: 1.35em;
  font-weight: 500;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '10px')});
  transition: 200ms ease-out;
`
const StackRow = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1.5em;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0px' : '10px')});
  transition: opacity 1200ms 250ms cubic-bezier(0.23, 1, 0.320, 1), transform 1200ms 250ms cubic-bezier(0.23, 1, 0.320, 1);

  @media (max-width: 470px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`
// Styled components for icons
const JavascriptIcon = styled(JavascriptSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const PythonIcon = styled(PythonSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const PhpIcon = styled(PhpSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const NodejsIcon = styled(NodejsSVG)`
  width: 5.5em;
  height: 5.5em;
  margin-bottom: -0.625em;
`;
const NextjsIcon = styled(NextjsSVG)`
  width: 5em;
  height: 5em;
`;
const AwsIcon = styled(AwsSVG)`
  width: 5em;
  height: 5em;
`;
const GitIcon = styled(GitSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const MysqlIcon = styled(MysqlSVG)`
  width: 5.5em;
  height: 5.5em;
`;
const MariadbIcon = styled(MariadbSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const UbuntuIcon = styled(UbuntuSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const KaliLinuxIcon = styled(KaliLinuxSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const WiresharkIcon = styled(WiresharkSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const BurpSuiteIcon = styled(BurpSuiteSVG)`
  width: 4.375em;
  height: 4.375em;
`;
const ElasticStackIcon = styled(ElasticStackSVG)`
  width: 4.375em;
  height: 4.375em;
`;



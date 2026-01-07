'use client'

import ProjectModal from '@/components/Modals/ProjectModal.tsx';
import EmailModal from '@/components/Modals/EmailModal';
import styled from 'styled-components';

const Modals = (): JSX.Element => {
  return (
    <Container>
      <ProjectModal />
      <EmailModal />
    </Container>
  )
};

export default Modals;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  z-index: 10001;
`
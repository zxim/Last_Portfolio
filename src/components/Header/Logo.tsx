import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import FavPNG from '@public/meta/fav.png';
import Fav2PNG from '@public/meta/fav2.png';

const Logo = (): JSX.Element => {
  return (
    <Container>
      <AnimatedLogo1 src={Fav2PNG} alt="logo2" />
      <AnimatedLogo2 src={FavPNG} alt="logo" />
    </Container>
  );
};

export default Logo;

const logo1Animation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(-8px);
  }
  10%, 40% {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(0px);
  }
  50%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(8px);
  }
`;

const logo2Animation = keyframes`
  0%, 50% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(8px);
  }
  50.1% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(-8px);
  }
  60%, 90% {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(8px);
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 7.5rem;
  height: 100%;
  position: relative;
`;

const AnimatedLogo1 = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${logo1Animation} 12s infinite;
  width: auto;
  height: 3.25rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AnimatedLogo2 = styled(Image)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${logo2Animation} 12s infinite;
  height: 3.25rem;
  width: auto;

  @media (max-width: 768px) {
    height: 1.125rem;
    animation: none;
    opacity: 1;
  }
`;

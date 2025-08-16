import React from "react";
import useInView from "../hooks/useInView";
import styled from "styled-components";

const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 4rem);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 3rem 0;
  }
`;

const BackgroundAccents = styled.div`
  position: absolute;
  inset: 0;
  z-index: -10;
  pointer-events: none;
`;

const FloatingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(3rem);
  animation: float ${({ $duration }) => $duration}s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  &.circle-1 {
    top: -6rem;
    left: -8rem;
    width: 18rem;
    height: 18rem;
    background: rgba(16, 185, 129, 0.3);
  }

  &.circle-2 {
    top: 6rem;
    right: -8rem;
    width: 20rem;
    height: 20rem;
    background: rgba(20, 184, 166, 0.3);
  }

  &.circle-3 {
    top: 33.333333%;
    left: 50%;
    transform: translateX(-50%);
    width: 14rem;
    height: 14rem;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    filter: blur(30px);
  }

  @media (max-width: 480px) {
    &.circle-1 {
      width: 12rem;
      height: 12rem;
      left: -4rem;
      top: -4rem;
    }
    &.circle-2 {
      width: 14rem;
      height: 14rem;
      right: -5rem;
      top: 6rem;
    }
    &.circle-3 {
      display: none;
    }
  }
`;

const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding-left: max(
    ${({ theme }) => theme.spacing[4]},
    env(safe-area-inset-left)
  );
  padding-right: max(
    ${({ theme }) => theme.spacing[4]},
    env(safe-area-inset-right)
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`;

const Content = styled.div`
  max-width: 46rem;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5.2vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.1;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[500]} 0%,
    ${({ theme }) => theme.colors.primary[700]} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  &.reveal {
    animation: slideInRight 700ms ease 60ms both;
  }
`;

const Subtitle = styled.p`
  margin-top: ${({ theme }) => theme.spacing[5]};
  font-size: clamp(0.95rem, 2vw, 1.125rem);
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 48ch;
  margin-left: auto;
  margin-right: auto;
  &.reveal {
    animation: fadeIn 600ms ease 120ms both;
  }

  b {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;
  &.reveal {
    animation: fadeIn 600ms ease 180ms both;
  }
`;

const PrimaryButton = styled.a`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.primary[600]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.2s ease;
  transform: translateY(0);

  &:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const SecondaryButton = styled.a`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease;
  transform: translateY(0);

  &:hover {
    background: ${({ theme }) => theme.colors.primary[100]};
    transform: translateY(-2px);
  }
`;

const KPIGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing[10]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const KPICard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing[4]};
  text-align: left;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const KPILabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const KPIValue = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Hero = () => {
  const kpiData = [
    { label: "월 폐섬유 전환", value: "1.2t" },
    { label: "CO₂e 절감", value: "~2.7t/월" },
    { label: "오프컷 재활용", value: "72%" },
    { label: "참여 디자이너", value: "14" },
  ];

  return (
    <HeroSection id="home">
      <BackgroundAccents>
        <FloatingCircle className="circle-1" $duration={12} $delay={0} />
        <FloatingCircle className="circle-2" $duration={14} $delay={-3} />
        <FloatingCircle className="circle-3" $duration={16} $delay={-6} />
      </BackgroundAccents>

      <Container>
        <RevealContent />
      </Container>
    </HeroSection>
  );
};

const RevealContent = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <Content ref={ref}>
      <Title>
        <span>Buy the Change.</span>
        <br />
        <GradientText className={inView ? "reveal" : ""}>
          REstyle the Future.
        </GradientText>
      </Title>
      <ButtonGroup className={inView ? "reveal" : ""}>
        <PrimaryButton href="#products">지금 주문</PrimaryButton>
        <SecondaryButton href="#activities">투명성 보기</SecondaryButton>
      </ButtonGroup>
    </Content>
  );
};

export default Hero;

import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing[10]} 0;
`;

const Container = styled.div`
  max-width: 1280px;
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

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Brand = styled.div`
  max-width: 24rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const LogoIcon = styled.div`
  width: 4.25rem;
  height: 4.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const LogoText = styled.div`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const Navigation = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const NavLink = styled.a`
  color: inherit;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 ${({ theme }) => theme.spacing[2]};
`;

const Copyright = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <Brand>
            <Logo>
              <LogoIcon>
                <img
                  src={process.env.PUBLIC_URL + "/Logo.svg"}
                  alt="REstyle"
                  aria-label="REstyle"
                />
              </LogoIcon>
            </Logo>
            <Description>순환은 기본, 투명성은 디폴트.</Description>
          </Brand>
          <Navigation>
            <NavLink href="#activities">투명성</NavLink>
            <Separator>·</Separator>
            <NavLink href="#designers">디자이너</NavLink>
            <Separator>·</Separator>
            <NavLink href="#apply">지원</NavLink>
          </Navigation>
        </FooterContent>
        <Copyright>© {currentYear} REstyle. 모든 권리 보유.</Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

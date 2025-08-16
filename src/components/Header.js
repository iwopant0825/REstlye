import React, { useState } from "react";
import styled from "styled-components";
import { HiMenu, HiX } from "react-icons/hi";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  backdrop-filter: blur(10px);
  background: rgba(18, 26, 23, 0.7);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
`;

const HeaderInner = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 6.25rem;
  height: 6.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const LogoText = styled.a`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.025em;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const AuthButtons = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const LoginButton = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const SignupButton = styled.a`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[100]};
    transform: translateY(-1px);
  }
`;

const MobileMenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(18, 26, 23, 0.6);
  padding: ${({ theme }) => theme.spacing[2]};
  transition: all 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    opacity: 0.8;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(18, 26, 23, 0.85);
  backdrop-filter: blur(12px);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileMenuInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const MobileNavLink = styled.a`
  padding: ${({ theme }) => theme.spacing[2]} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const MobileAuthButtons = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const MobileSignupButton = styled.a`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[900]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { label: "활동", href: "#activities" },
    { label: "제품", href: "#products" },
    { label: "디자이너", href: "#designers" },
    { label: "지원", href: "#apply" },
  ];

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo>
          <LogoIcon>
            <img
              src={process.env.PUBLIC_URL + "/Logo.svg"}
              alt="REstyle"
              aria-label="REstyle"
            />
          </LogoIcon>
        </Logo>

        <DesktopNav>
          {nav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </DesktopNav>

        <AuthButtons>
          <LoginButton href="#signin">로그인</LoginButton>
          <SignupButton href="#signup">회원가입</SignupButton>
        </AuthButtons>

        <MobileMenuButton onClick={toggleMobileMenu} aria-label="메뉴 열기">
          {mobileOpen ? <HiX /> : <HiMenu />}
        </MobileMenuButton>
      </HeaderInner>

      <MobileMenu isOpen={mobileOpen}>
        <MobileMenuInner>
          {nav.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <MobileAuthButtons>
            <LoginButton href="#signin">로그인</LoginButton>
            <MobileSignupButton href="#signup">회원가입</MobileSignupButton>
          </MobileAuthButtons>
        </MobileMenuInner>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;

import React from 'react';
import styled from 'styled-components/macro';

import {QUERIES, COLORS, WEIGHTS} from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';
import MobileMenu from '../MobileMenu';
import SearchInput from "../SearchInput";
import UnstyledButton from "../UnstyledButton/UnstyledButton";
import Icon from "../Icon";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  // For our mobile hamburger menu, we'll want to use a button
  // with an onClick handler, something like this:
  //
  // <button onClick={() => setShowMobileMenu(true)}>

  return (
    <header>
      <SuperHeader />
      <DarkGreyLine />
      <MainHeader>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
          <MobileNav/>
        <Side />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  height: 72px;
  border-bottom: 1px solid ${COLORS.gray[300]};
`;

const Nav = styled.nav`
  display: flex;
  gap: 48px;
  margin: 0px 48px;
  
  @media ${QUERIES.tablet} {
    display: none;
  }
`;

const Side = styled.div`
  flex: 1;
`;

const DarkGreyLine = styled.div`
  background-color: ${COLORS.gray["900"]};
  height: 8px;
  width: 100%;
  display: none;
  
  @media ${QUERIES.tablet} {
    display: revert;
  }
`

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

const MobileNav = () => {
    const [isOpen, setOpen] = React.useState(false);
    return (
        <MobileNavWrapper>
            <UnstyledButton>
                <Icon id="shopping-bag" strokeWidth={2} />
            </UnstyledButton>
            <UnstyledButton>
                <Icon id="search" strokeWidth={2} />
            </UnstyledButton>
            <UnstyledButton onClick={() => setOpen(true)}>
                <Icon id="menu" strokeWidth={2} />
            </UnstyledButton>
            <MobileMenu isOpen={isOpen} onDismiss={() => setOpen(false)}/>
        </MobileNavWrapper>
    );
};

const MobileNavWrapper = styled.div`
  justify-content: flex-end;
  display: none;
  flex:1000;
  
  @media ${QUERIES.tablet} {
    display: flex;
    gap: calc(3vw + 12px);
  }
`

export default Header;

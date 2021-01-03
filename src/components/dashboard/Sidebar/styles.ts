import styled from 'styled-components';

export const SidebarWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const ToggleBar = styled.div`
  width: 2rem;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  z-index: 20;

  svg {
    height: 3.5rem;
    width: 3.5rem;
    color: transparent;
  }

  &:hover {
    background: #161e2e;

    svg {
        color: #fff; 
    }
  }
  
`;
export const SidebarMenu = styled.nav<{ isOpen: boolean }>`
  background: #252f3f;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: ${(props) => (props.isOpen ? '22rem' : '6rem')};
  flex-grow: 0;
  flex-shrink: 0;
  transition: all 1s;

  .menu_list {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    flex-grow: 1;
    justify-content: space-between;

    a,
    a:visited,
    a:focus {
      text-decoration: none;
    }
  }
`;

export const LogoWrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  padding-left: 1.7rem;
  background: #161e2e;
  img {
    height: 3.1rem;
  }
`;

export const UserInfoWrapper = styled(LogoWrapper)<{ isOpen: boolean }>`
  height: 6.2rem;
  background: transparent;

  img {
    border-radius: 500rem;
  }

  .user-info {
    padding-left: 2rem;

    h2 {
      font-family: Roboto, sans-serif;
      color: #ffffff;
      font-size: 1.4rem;
      font-style: normal;
      font-weight: bold;
      line-height: 1.6rem;
    }
    p {
      font-family: Roboto, sans-serif;
      font-size: 1.2rem;
      font-style: normal;
      font-weight: normal;
      line-height: 1.2rem;
      color: #ffffff;
    }
  }

  ${(props) =>
    !props.isOpen &&
    `
    .user-info {
      display: none
    }
  `}
`;

export const MenuItem = styled.li<{ isActive?: boolean; isOpen: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.isActive ? '#161e2e' : 'transparent')};
  color: #ffffff;
  display: flex;
  font-family: Roboto;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: normal;
  height: 4.5rem;
  line-height: 1.6rem;
  margin-bottom: 0.6rem;
  padding-left: 2rem;
  cursor: pointer;

  &:hover {
    background-color: #161e2e;
  }

  svg {
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
  }

  p {
    display: ${(props) => (props.isOpen ? 'inline' : 'none')};
  }
`;

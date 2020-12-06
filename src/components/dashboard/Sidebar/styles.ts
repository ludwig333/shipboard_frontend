import styled from 'styled-components';

export const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 22rem;
  background: #252f3f;
  flex-grow: 0;
  flex-shrink: 0;

  .menu_list {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    flex-grow: 1;
    justify-content: space-between;

    a, a:visited, a:focus{
      text-decoration: none;
    }
  }
`;

export const LogoWrapper = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  padding-left: 2rem;
  background: #161e2e;
  img {
    height: 4.2rem;
  }
`;

export const UserInfoWrapper = styled(LogoWrapper)`
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
`;

export const MenuItem = styled.li<{ isActive?: boolean }>`
  align-items: center;
  background-color: ${(props) => (props.isActive ? '#161e2e' : '#252f3f')};
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
`;

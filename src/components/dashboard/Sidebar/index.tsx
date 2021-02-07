import React, { useEffect, useRef, Ref } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/images/logo-light.png';
import shortLogo from '../../../assets/images/logo-short.png';
import avatar from '../../../assets/images/avatar.jpg';
import { AiOutlineDashboard, AiOutlineRobot } from 'react-icons/ai';
import { TiFlowMerge } from 'react-icons/ti';
import { HiTemplate } from 'react-icons/hi';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { getAuthUser, logOut } from '../../../apis/auth';
import { useAuthDispatch } from '../../../services/Auth/AuthProvider';
import {
  SidebarWrapper,
  SidebarMenu,
  LogoWrapper,
  UserInfoWrapper,
  MenuItem,
  ToggleBar,
} from './styles';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';

interface SidebarProps {
  handleSidebarState: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleSidebarState }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const history = useHistory();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    getAuthUser().then((response) => {
      var x = document.getElementById('username');
      if (x) {
        x.innerHTML = response.data.name;
      }
    });

    handleSidebarState(isOpen);
  }, [isOpen]);

  const handleLogOut = (event: any) => {
    event.preventDefault();
    logOut().then((response) => {
      authDispatch({
        type: 'LOGOUT',
      });
      history.push('/');
    });
  };

  return (
    <SidebarWrapper>
      <SidebarMenu isOpen={isOpen}>
        <LogoWrapper>
          <img src={isOpen ? logo : shortLogo} alt="Logo" />
        </LogoWrapper>
        <UserInfoWrapper isOpen={isOpen}>
          <img src={avatar} alt="Avatar" />
          <div className="user-info">
            <h2 ref={nameRef} id="username"></h2>
            {/* <p>Profile Setting</p> */}
          </div>
        </UserInfoWrapper>
        <div className="menu_list">
          <div className="menu_list-top">
            <Link to="/app">
              <MenuItem isActive isOpen={isOpen}>
                <AiOutlineDashboard className="menu-icon" />
                <p>Dashboard</p>
              </MenuItem>
            </Link>
            <Link to="/bots">
              <MenuItem isOpen={isOpen}>
                <AiOutlineRobot className="menu-icon" />
                <p>Bots</p>
              </MenuItem>
            </Link>
            <Link to="/templates">
              <MenuItem isOpen={isOpen}>
                <HiTemplate className="menu-icon" />
                <p>Templates</p>
              </MenuItem>
            </Link>
          </div>
          <div className="menu_list-bottom">
            {/* <Link to="/settings">
              <MenuItem isOpen={isOpen}>
                <IoSettingsSharp className="menu-icon" />
                <p>Settings</p>
              </MenuItem>
            </Link> */}
            <MenuItem isOpen={isOpen} onClick={handleLogOut}>
              <IoLogOut className="menu-icon" />
              <p>Logout</p>
            </MenuItem>
          </div>
        </div>
      </SidebarMenu>
      <ToggleBar onClick={() => setIsOpen(!isOpen)}>
        {isOpen && <BiChevronsLeft />}
        {!isOpen && <BiChevronsRight />}
      </ToggleBar>
    </SidebarWrapper>
  );
};

export default Sidebar;

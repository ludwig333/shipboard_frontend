import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo-light.png';
import avatar from '../../../assets/images/avatar.jpg';
import { AiOutlineDashboard, AiOutlineRobot } from 'react-icons/ai';
import { TiFlowMerge } from 'react-icons/ti';
import { HiTemplate } from 'react-icons/hi';
import { IoSettingsSharp, IoLogOut } from 'react-icons/io5';
import { getAuthUser } from '../../../apis/auth';

import {
  SidebarWrapper,
  LogoWrapper,
  UserInfoWrapper,
  MenuItem,
} from './styles';

const Sidebar: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // useEffect(() => {
  //   getAuthUser().then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <SidebarWrapper>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
      </LogoWrapper>
      <UserInfoWrapper>
        <img src={avatar} alt="Avatar" />
        <div className="user-info">
          <h2 ref={nameRef}>Jane Doe</h2>
          <p>Profile Setting</p>
        </div>
      </UserInfoWrapper>
      <div className="menu_list">
        <div className="menu_list-top">
          <Link to="/app">
            <MenuItem isActive>
              <AiOutlineDashboard className="menu-icon" />
              Dashboard
            </MenuItem>
          </Link>
          <Link to="/bots">
            <MenuItem>
              <AiOutlineRobot className="menu-icon" />
              Bots
            </MenuItem>
          </Link>
          <Link to="/flows">
            <MenuItem>
              <TiFlowMerge className="menu-icon" />
              Flows
            </MenuItem>
          </Link>
          <Link to="/templates">
            <MenuItem>
              <HiTemplate className="menu-icon" />
              Templates
            </MenuItem>
          </Link>
        </div>
        <div className="menu_list-bottom">
          <Link to="/settings">
            <MenuItem>
              <IoSettingsSharp className="menu-icon" />
              Settings
            </MenuItem>
          </Link>
          <MenuItem>
            <IoLogOut className="menu-icon" />
            Logout
          </MenuItem>
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

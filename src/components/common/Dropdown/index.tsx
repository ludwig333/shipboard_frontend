import React from 'react';
import { DropdownWrapper } from './styles';
import { HiDotsVertical } from 'react-icons/hi';

interface DropDownProps {
  icon?: any;
  items?: { label: string; link: string };
}
const DropDown: React.FC<DropDownProps> = () => {
  return (
    <DropdownWrapper>
      <label className="dropbtn">
        <HiDotsVertical />
      </label>
      <div className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </div>
    </DropdownWrapper>
  );
};

export default DropDown;

import React, { useState } from "react";
import "../../styles/Header.css";
import { IoPeopleOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { TbVectorBezierCircle } from "react-icons/tb";
import { SlArrowDown } from "react-icons/sl";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { userInterface } from "../../types";

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.users.userInfo) as userInterface;

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="header bg-white">
      <div
        className="header-controls ml-auto d-flex align-items-center justify-content-between"
        style={{ width: "200px" }}
      >
        <img
          src={userInfo?.avatar || "https://placekitten.com/300/300"}
          alt={userInfo?.name || "User"}
          className="avatar"
          onClick={handleOpenProfile}
        />
        {isProfileOpen && (
          <div className={`edit-profile${isProfileOpen ? " show" : ""}`}>
            <EditProfile handleClose={handleCloseProfile} />
          </div>
        )}
        <IoPeopleOutline size={24} />
        <TbVectorBezierCircle size={24} />
        <BsPencilSquare size={24} />
        <SlArrowDown size={24} />
      </div>
    </div>
  );
};

export default Header;

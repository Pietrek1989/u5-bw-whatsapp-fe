import React from "react";
import "../../styles/Header.css";
import { IoPeopleOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { TbVectorBezierCircle } from "react-icons/tb";
import { SlArrowDown } from "react-icons/sl";
import EditProfile from "./EditProfile";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import UsersList from "./UsersList";

interface User {
  name: string;
  avatar?: string;
}

const user: User = {
  name: "Amirreza",
  avatar:
    "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
};

const Header: React.FC<{ showUsers: React.Dispatch<React.SetStateAction<boolean>> }> = ({ showUsers }) => {
  const userInfo = useSelector((state: RootState) => state.users.userInfo);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserListOpen, setIsUserListOpen] = useState(false)
  const navigate = useNavigate();

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };
  const handleLogOut = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    navigate("/");
  };
  return (
    <div className="header bg-white">
      <div
        className="header-controls ml-auto d-flex align-items-center justify-content-between"
        style={{ width: "200px" }}
      >
        <img
          src={userInfo?.avatar ? userInfo.avatar : user.avatar}
          alt={userInfo?.name ? userInfo.name : user.name}
          className="avatar"
          onClick={handleOpenProfile}
        />
        {isProfileOpen && (
          <div className={`edit-profile${isProfileOpen ? " show" : ""}`}>
            <EditProfile handleClose={handleCloseProfile} />
          </div>
        )}
        {isUserListOpen && (
          <div className={`users-list${isUserListOpen ? " show" : ""}`}>
            <UsersList showUsers={isUserListOpen} setShowUsers={setIsUserListOpen} />
          </div>
        )}
        <IoPeopleOutline size={24} />
        <TbVectorBezierCircle size={24} />
        <BsPencilSquare size={24} onClick={() => setIsUserListOpen(true)} />
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <SlArrowDown size={24} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#">New Group</Dropdown.Item>
            <Dropdown.Item href="#">New Community</Dropdown.Item>
            <Dropdown.Item href="#">Starred Messages</Dropdown.Item>
            <Dropdown.Item href="#">Select Chats</Dropdown.Item>
            <Dropdown.Item href="#">Settings</Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  );
};

export default Header;

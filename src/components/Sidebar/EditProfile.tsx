// import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { FormEvent } from "react";
import { userInterface } from "../../types";
import "../../styles/Editprofile.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getUserData } from "../../redux/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { BsFillPencilFill } from "react-icons/bs"
type EditProfileProps = {
  handleClose: () => void;
};

const EditProfile = (props: EditProfileProps) => {
  const [user, updateUser] = useState<userInterface>({
    name: "",
    email: "",
    avatar: "",
    // about: "",
  });
  const [name, setName] = useState<String>("");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const userInfo = useSelector((state: RootState) => state.users.userInfo);
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  const getToken = () => {
    return localStorage.getItem("accessToken");
  };
  useEffect(() => {
    updateUser({
      name: userInfo?.name,
      email: userInfo?.email,
      avatar: userInfo?.avatar,
      // about: userInfo?.about,
    });
    setName(userInfo?.name ?? "");
    console.log("now");
  }, [userInfo, updateUser]);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
      console.log(formData.get("avatar"));
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BE_URL}/users/me/avatar`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        console.log(response.data);
        updateUser(response.data);
        dispatch(getUserData());

      } catch (error) {
        console.error(error);
      }
    }
    updateName();
  };
  const updateName = async () => {
    const editedData = { name: name };
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        method: "PUT",
        body: JSON.stringify(editedData),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(getUserData());
    } catch (error) {
      console.log(error);
    }
  };

  // const getMe = async () => {
  //   try {
  //     const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
  //       headers: {
  //         Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
  //       },
  //     });
  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //     } else {
  //       console.error("Error loading user:");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="edit-profile">
      <div className="profile-header">
        <button onClick={props.handleClose}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            version="1.1"
            x="0px"
            y="0px"
            enable-background="new 0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
            ></path>
          </svg>
        </button>
        <h5 className="m-0">Profile</h5>
      </div>
      <div className="profile-body">
        <form onSubmit={handleSubmit}>
          <div className="avatar-container">
            <label htmlFor="avatar">
              <img
                src={user?.avatar || "https://placekitten.com/300/300"}
                alt="Profile Avatar"
              />
              <div className="hover-img-text">
                <div className="image-tag">
                  <p className="p-0 m-0">
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      height="24"
                      width="24"
                      preserveAspectRatio="xMidYMid meet"
                      version="1.1"
                      x="0px"
                      y="0px"
                      enable-background="new 0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.317,4.381H10.971L9.078,2.45C8.832,2.199,8.342,1.993,7.989,1.993H4.905 c-0.352,0-0.837,0.211-1.078,0.468L1.201,5.272C0.96,5.529,0.763,6.028,0.763,6.38v1.878c0,0.003-0.002,0.007-0.002,0.01v11.189 c0,1.061,0.86,1.921,1.921,1.921h18.634c1.061,0,1.921-0.86,1.921-1.921V6.302C23.238,5.241,22.378,4.381,21.317,4.381z  M12.076,18.51c-3.08,0-5.577-2.497-5.577-5.577s2.497-5.577,5.577-5.577s5.577,2.497,5.577,5.577 C17.654,16.013,15.157,18.51,12.076,18.51z M12.076,9.004c-2.17,0-3.929,1.759-3.929,3.929s1.759,3.929,3.929,3.929 s3.929-1.759,3.929-3.929C16.004,10.763,14.245,9.004,12.076,9.004z"
                      ></path>
                    </svg>
                  </p>
                  <p className="p-0 m-0">Add Profile Photo</p>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="form-group form-group-profile-details">
            <label htmlFor="name" className="yourname-title">
              Your name
            </label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                id="name"
                value={name.toString()}
                onChange={(e) => setName(e.target.value)}
              />
              <BsFillPencilFill style={{ color: "#8696a0" }} />
            </div>
          </div>

          <button style={{
            backgroundColor: "#075e54",
            color: "#ffffff",
            borderRadius: "4px",
            padding: "8px 16px",
            fontSize: "1.1rem",
            fontWeight: "500",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.05em",
            outline: "none",
          }} type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

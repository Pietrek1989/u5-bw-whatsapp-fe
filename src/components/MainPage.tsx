import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getHistory, getUserData } from "../redux/actions";
import { setActiveChat } from "../redux/reducers";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar/SideBar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MeassageInput";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

interface ChatPartner {
  name: string;
  avatar: string;
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const socket = io(`${process.env.REACT_APP_BE_URL}`, {
  transports: ["websocket"],
});

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => state.users.chats.active);
  const [isLogged, setIsLogged] = useState(false);
  const fetchData = async () => {
    const data1 = await dispatch(getUserData());
    console.log("dispatch shenanigans", data1);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      fetchData();
    }
    if (localStorage.getItem("accessToken")) {
      setIsLogged(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchData(); //this obviously can't stay, is just for testing purposes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeChat !== "") {
      dispatch(getHistory(activeChat));
      console.log(activeChat);
    }
  }, []);

  useEffect(() => {
    socket.on("welcome", (msg) => {
      console.log(msg);
      socket.on("join-room", (room) => {
        console.log(room);
      });
    });
  }, []);

  const chatPartner: ChatPartner = {
    name: "John Doe",
    avatar:
      "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg",
  };

  const messages: Message[] = [
    {
      sender: "Jane Smith",
      content: "Hey, how are you?",
      timestamp: "10:15 AM",
    },
    {
      sender: "John Doe",
      content: "I am good. How about you?",
      timestamp: "10:16 AM",
    },
    {
      sender: "Jane Smith",
      content: "Doing well, thanks!",
      timestamp: "10:17 AM",
    },
    {
      sender: "John Doe",
      content: "Great! Have a nice day.",
      timestamp: "10:18 AM",
    },
  ];

  const currentUser = "Jane Smith";

  const sendMessage = (messageContent: string) => {
    // Handle sending a message
  };

  if (!isLogged) {
    console.log("User is not logged in", localStorage.getItem("refreshToken"));

    return (
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: 500 }}
      >
        <h2>
          PLEASE <Link to="/">LOG IN</Link>
        </h2>
        <p>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39"
            height="39"
            viewBox="0 0 39 39"
          >
            <path
              fill="#00E676"
              d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
            ></path>
            <path
              fill="#FFF"
              d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
            ></path>
          </svg>
        </p>
      </div>
    );
  } else {
    const isToken = localStorage.getItem("refreshToken");
    console.log(isToken);

    return (
      <Container fluid id="chat-container">
        <Row>
          <Col sm={4} md={3} lg={2} className="sidebar">
            <Sidebar />
          </Col>
          <Col
            sm={8}
            md={9}
            lg={10}
            className="main-chat-window"
            style={{ paddingLeft: 0 }}
          >
            <ChatHeader
              chatPartnerName={chatPartner.name}
              chatPartnerAvatar={chatPartner.avatar}
            />
            <MessageList messages={messages} currentUser={currentUser} />
            <MessageInput sendMessage={sendMessage} />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default MainPage;

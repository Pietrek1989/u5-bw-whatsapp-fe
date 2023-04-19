import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getUserData } from "../redux/actions";
import { setActiveChat } from "../redux/reducers";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar/SideBar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MeassageInput";

interface ChatPartner {
  name: string;
  avatar: string;
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    const data1 = await dispatch(getUserData());
    console.log("dispatch shenanigans", data1);

    await dispatch(setActiveChat("1"));
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      fetchData(); //this obviously can't stay, is just for testing purposes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatPartner: ChatPartner = {
    name: "John Doe",
    avatar: "https://example.com/avatar.jpg",
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
};

export default MainPage;

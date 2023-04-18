import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar/SideBar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MeassageInput';

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
  const chatPartner: ChatPartner = {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  };

  const messages: Message[] = [
    // Sample messages data
  ];

  const currentUser = 'Jane Smith';

  const sendMessage = (messageContent: string) => {
    // Handle sending a message
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={4} md={3} lg={2} className="sidebar">
          <Sidebar />
        </Col>
        <Col sm={8} md={9} lg={10} className="main-chat-window">
          <ChatHeader chatPartnerName={chatPartner.name} chatPartnerAvatar={chatPartner.avatar} />
          <MessageList messages={messages} currentUser={currentUser} />
          <MessageInput sendMessage={sendMessage} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;

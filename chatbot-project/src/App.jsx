import { useState, useEffect } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import { Chatbot } from 'supersimpledev';
import './App.css';

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || [
      {
        message: 'hello chatbot',
        sender: 'user',
        id: 'id1',
        time: 1736127288920,
      },
      {
        message: 'Hello! How can I help you?',
        sender: 'robot',
        id: 'id2',
        time: 1736127291230,
      },
      {
        message: 'can you get me todays date?',
        sender: 'user',
        id: 'id3',
        time: 1736127385356,
      },
      {
        message: 'Today is September 27',
        sender: 'robot',
        id: 'id4',
        time: 1736127385500,
      },
    ]
  );
  useEffect(() => {
    Chatbot.addResponses({
      hello: 'are you ok?',
      test: 'why test?',
    });
  }, []);
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);
  return (
    <div className="app-container">
      {chatMessages.length !== 0 ? (
        <ChatMessages chatMessages={chatMessages} />
      ) : (
        <p className="default-message">
          Welcome to the chatbot project! Send a message using the textbox below
        </p>
      )}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;

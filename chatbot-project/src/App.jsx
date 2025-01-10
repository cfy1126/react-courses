import { useState, useRef, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';
import './App.css';

function useAutoScroll(dependencies) {
  console.log(dependencies);
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [dependencies]);
  return containerRef;
}

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-imge"
            src="https://supersimple.dev/images/loading-spinner.gif"
          />
        ),
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);
    console.log('重新渲染前！！！');
    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
    console.log('重新渲染后');
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          } else if (event.key === 'Escape') {
            setInputText('');
          }
        }}
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}

function ChatMessage(props) {
  const { message, sender } = props;
  return (
    <div
      className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}
    >
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">{message}</div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll(chatMessages);
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState([]);
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

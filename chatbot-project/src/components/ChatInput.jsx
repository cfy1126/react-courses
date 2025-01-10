import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
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
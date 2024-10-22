import React, { useReducer } from 'react';
import icon from '../images/chatbot.png';
import './Chatbot.css';

const initialState = {
  isOpen: false,
  inputText: '',
  chatHistory: [
    { sender: 'bot', message: 'Hi, Welcome to VIIT. How can I help you?' }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CHAT':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_INPUT':
      return { ...state, inputText: action.payload };
    case 'ADD_MESSAGE':
      return { 
        ...state, 
        chatHistory: [...state.chatHistory, action.payload], 
        inputText: '' 
      };
    default:
      return state;
  }
}

function Chatbot() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleOpenChatBot = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
  };

  const handleInputChange = (event) => {
    dispatch({ type: 'SET_INPUT', payload: event.target.value });
  };

  const sendMessage = async () => {
    const { inputText } = state;
    if (inputText.trim() === '') return;

    dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'user', message: inputText } });
const response = await fetch("https://clear-results-joke.loca.lt/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input_text: inputText })
});

    try {
      const response = await fetch("https://clear-results-joke.loca.lt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: inputText })
      });

      const data = await response.json();

      if (data.response) {
        dispatch({ type: 'ADD_MESSAGE', payload: { sender: 'bot', message: data.response } });
        console.log(data.response);
      } else {
        console.error("No response received from the backend.");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const { isOpen, chatHistory, inputText } = state;

  return (
    <div className='chat-container'>
      {isOpen && (
        <div className='chat-window'>
          <ChatHeader />
          <ChatBody chatHistory={chatHistory} />
          <ChatFooter 
            inputText={inputText} 
            handleInputChange={handleInputChange} 
            handleKeyPress={handleKeyPress} 
            sendMessage={sendMessage}
          />
        </div>
      )}
      <div className='chatbot-icon' onClick={toggleOpenChatBot}>
        <img src={icon} alt="ChatBot Icon" />
      </div>
    </div>
  );
}

const ChatHeader = () => (
  <div className='chat-header'>
    <div className='chat-header-text'>
      <span>VIITIAN</span>
      <span className='status-dot'></span>
    </div>
  </div>
);

const ChatBody = ({ chatHistory }) => (
  <div className='chatbot-body'>
    {chatHistory.map((chat, index) => (
      <p key={index} className={chat.sender === 'bot' ? 'bot-message' : 'user-message'}>
        {chat.message}
      </p>
    ))}
  </div>
);

const ChatFooter = ({ inputText, handleInputChange, handleKeyPress, sendMessage }) => (
  <div className='input-container'>
    <input
      type="text"
      placeholder="Type a message..."
      value={inputText}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      aria-label="Type your message"
    />
    <button onClick={sendMessage} aria-label="Send message">Send</button>
  </div>
);

export default Chatbot;

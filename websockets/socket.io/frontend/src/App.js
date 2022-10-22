import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

// no dotenv
const socket = io('http://localhost:5000');
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit('chat', { message, userName });
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Chatty App</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>
              {payload.userName}: <span>{payload.message}</span>
            </p>
          );
        })}
        <form onSubmit={sendChat}>
          <input
            type='text'
            name='chat'
            placeholder='send text'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type='submit'>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;

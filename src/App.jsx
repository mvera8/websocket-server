import React, { useState } from 'react';
import useWebSocket from './hooks/useWebSocket';

const App = () => {
  const { sendMessage, playerId, messages, gameStatus } = useWebSocket('ws://localhost:8080');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({ type: 'chat', message, playerId });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Two-Player Game</h1>

			<p>Game Status: {gameStatus}</p>

      {playerId && <p>You are Player {playerId}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{`Player ${msg.playerId}: ${msg.message}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

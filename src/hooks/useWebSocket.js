import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url) => {
  const ws = useRef(null);
  const [playerId, setPlayerId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [gameStatus, setGameStatus] = useState('Waiting for opponent...');

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onmessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          switch (data.type) {
            case 'player':
              setPlayerId(data.id);
              break;
            case 'start':
              setGameStatus(data.message);
              break;
            case 'opponent_left':
              setGameStatus(data.message);
              break;
            default:
              setMessages((prevMessages) => [...prevMessages, data]);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message', e);
        }
      } else {
        console.error('Received non-string message');
      }
    };

    return () => {
      ws.current.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    console.log('sendMessage');
    console.log('message', message);
    /*
    if (ws.current.readyState === WebSocket.OPEN) {
      try {
        ws.current.send(JSON.stringify(message));
      } catch (e) {
        console.error('Failed to send message', e);
      }
    }
    */

    if (ws.current.readyState === WebSocket.OPEN) {
      console.log('OPEN');

      const stringifyMessage = JSON.stringify(message);
      console.log('stringifyMessage', stringifyMessage);

      ws.current.send(stringifyMessage);
    } else {
      console.log('Close');
    }



  };

  return { sendMessage, playerId, messages, gameStatus };
};

export default useWebSocket;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { io } from 'socket.io-client';
import socketService from './services/socketService';
import { JoinRoom } from './components/joinRoom';
import GameContext, { IGameContextProps } from './gameContext';
import { Game } from './components/game';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const NewGameButton = styled.button`
  outline: none;
  background-color: #8e44ad;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid #8e44ad;
    color: #8e44ad;
  }
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<'x' | 'o'>('x');
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect('https://tictactoe-api.onrender.com')
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>
          Welcome to Tic-Tac-Toe {localStorage.getItem('name')}{' '}
        </WelcomeText>
        {isInRoom && (
          <NewGameButton
            onClick={() => {
              localStorage.removeItem('name');
              window.location.href = '/';
            }}
          >
            New Game
          </NewGameButton>
        )}
        <MainContainer>
          {!isInRoom && <JoinRoom />}
          {isInRoom && <Game />}
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;

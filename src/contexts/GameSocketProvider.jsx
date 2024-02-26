import React, {createContext, useContext, useState, useEffect} from 'react';

export const GameSocketContext = createContext(null);

export const GameSocketProvider = ({children}) => {
    const [gameState, setGameState] = useState("loading");
    const [gameData, setGameData] = useState({
        map: {
            width: 2000, height: 2000,
        }
    })
    const [socket, setSocket] = useState(null);
    const [players, setPlayers] = useState(null);

    return (
        <GameSocketContext.Provider value={{gameState, socket, players, gameData}}>
            {children}
        </GameSocketContext.Provider>);
};

export const useGameSocketContext = () => useContext(GameSocketContext);

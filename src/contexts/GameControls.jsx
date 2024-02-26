import React, { createContext, useContext, useState } from 'react';
import {useGameSocketContext} from "./GameSocketProvider";

export const GameControlsContext = createContext(null);

export const GameControlsProvider = ({ children }) => {
    const [pressedKeys, setPressedKeys] = useState([]);
    const { socket } = useGameSocketContext();

    const pressKey = (key) => {

    }

    return (
        <GameControlsContext.Provider value={{ pressKey }}>
            {children}
        </GameControlsContext.Provider>
    );
};

export const useGameControlsContext = () => useContext(GameControlsContext);

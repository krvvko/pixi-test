// src/App.js
import React from 'react';
import {GameSocketProvider} from "./contexts/GameSocketProvider";
import Game from "./components/Game";
import {SharedActionsProvider} from "./contexts/SharedActionsProvider";

function App() {
    return (
        <GameSocketProvider>
            <SharedActionsProvider>
                <Game />
            </SharedActionsProvider>
        </GameSocketProvider>
    );
}

export default App;

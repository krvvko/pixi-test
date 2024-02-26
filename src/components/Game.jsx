import React from "react";
import {useGameSocketContext} from "../contexts/GameSocketProvider";
import {Stage} from "@pixi/react";
import {PlayerProvider} from "../contexts/PlayerProvider";
import Bullets from "./Bullets";
import {useSharedActionsContext} from "../contexts/SharedActionsProvider";
import Player from "./Player";

const Game = () => {
    // const { gameState } = useGameSocketContext();

    // if (gameState === "loading") return <span>Game socket loading...</span>
    console.log('stage rendered');
    return (
        <Stage>
            <PlayerProvider>
                <Player />
            </PlayerProvider>
            <Bullets />
        </Stage>
    );

}

export default Game;
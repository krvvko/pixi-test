import React from "react";
import {Sprite} from "@pixi/react";
import {usePlayerContext} from "../contexts/PlayerProvider";

const Player = () => {
    const { playerState } = usePlayerContext();
    console.log(playerState)

    return(
        <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={playerState.x}
            y={playerState.y}
            anchor={{ x: 0.5, y: 0.5 }}
        />
    )
}

export default Player;
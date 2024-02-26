import React, {createContext, useContext, useState, useEffect} from 'react';
import * as PIXI from 'pixi.js';
import {useGameSocketContext} from "./GameSocketProvider";

export const SharedActionsContext = createContext(null);

export const SharedActionsProvider = ({children}) => {
    const [bullets, setBullets] = useState([]);

    // const { gameData } = useGameSocketContext();

    const drawBullet = (x, y, angle, bulletSpeed) => {
        const newBullet = {x, y, angle, bulletSpeed};
        // setBullets((currentBullets) => [...currentBullets, newBullet]);
    };
    // useEffect(() => {
    //     const updateBullets = (delta) => {
    //         setBullets((currentBullets) => currentBullets.map((bullet) => ({
    //             ...bullet,
    //             x: bullet.x + Math.cos(bullet.angle) * bullet.bulletSpeed * delta,
    //             y: bullet.y + Math.sin(bullet.angle) * bullet.bulletSpeed * delta,
    //         }))
    //             .filter((bullet) => bullet.x >= 0 && bullet.x <= gameData.map.width && bullet.y >= 0 && bullet.y <= gameData.map.height));
    //     };
    //
    //     const ticker = PIXI.Ticker.shared.add((delta) => updateBullets(delta));
    //
    //     return () => PIXI.Ticker.shared.remove(ticker);
    // }, [gameData.map.height, gameData.map.width, drawBullet]);

    return (
        <SharedActionsContext.Provider value={{ drawBullet, bullets }}>
            {children}
        </SharedActionsContext.Provider>
    );
};

export const useActionsContext = () => useContext(SharedActionsContext);
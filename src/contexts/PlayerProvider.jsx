import React, {createContext, useContext, useState, useEffect, useMemo} from 'react';
import * as PIXI from 'pixi.js';
import {useActionsContext} from "./SharedActionsProvider";

export const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    console.log('rendered')
    const [pressedKeys, setPressedKeys] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [playerState, setPlayerState] = useState({
        health: 100,
        x: 100,
        y: 100,
        currentGun: {
            name: "ar",
            mode: "fullAuto",
            bulletSpeed: 12,
            firerate: 100, // 1 shoot in 100ms
            ammoMax: 30,
            ammoLeft: 30,
        },
        moveSpeed: 5,
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (!pressedKeys[key]) {
                setPressedKeys((prev) => ({ ...prev, [key]: true }));
                if (["w", "a", "s", "d"].includes(key)) console.log('moving', key);
            }
        };

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase(); // Normalize key value
            if (pressedKeys[key]) {
                setPressedKeys((prev) => {
                    const newState = { ...prev };
                    delete newState[key];
                    return newState;
                });
                if (["w", "a", "s", "d"].includes(key)) console.log('stopped', key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys]);

    useEffect(() => {
        const movePlayer = (delta) => {
            let newX = playerState.x;
            let newY = playerState.y;

            if (pressedKeys['w']) newY -= playerState.moveSpeed * delta;
            if (pressedKeys['s']) newY += playerState.moveSpeed * delta;
            if (pressedKeys['a']) newX -= playerState.moveSpeed * delta;
            if (pressedKeys['d']) newX += playerState.moveSpeed * delta;

            setPlayerState((prevState) => ({
                ...prevState,
                x: newX,
                y: newY,
            }));
        };

        const ticker = () => {
            PIXI.Ticker.shared.add((delta) => {
                movePlayer(delta);
            });
        };
        ticker();
        return () => {
            PIXI.Ticker.shared.remove(movePlayer);
        };
    }, [pressedKeys, playerState.x, playerState.y]);

    const shoot = () => {
        const playerX = playerState.x;
        const playerY = playerState.y;
        const mouseX = mousePosition.x;
        const mouseY = mousePosition.y;

        // Calculate angle in radians
        const angle = Math.atan2(mouseY - playerY, mouseX - playerX);

        const bulletSpeed = 10; // Example speed
        // drawBullet(playerX, playerY, angle, bulletSpeed);
        console.log('player shot', playerX, playerY, angle, bulletSpeed);
    };

    useEffect(() => {
        const handleMouseDown = () => {
            shoot();
        };

        const handleMouseUp = () => {
            // Stop shooting if in fullAuto mode
            // clearInterval(shootingInterval); // You'll need to define and manage this interval for fullAuto
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [playerState, shoot]); // Make sure to include shoot function dependency correctly

    useEffect(() => {
        const updateMousePosition = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <PlayerContext.Provider value={{ playerState }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => useContext(PlayerContext);

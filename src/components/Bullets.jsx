import React from "react";
import {useActionsContext} from "../contexts/SharedActionsProvider";
import {Graphics} from "@pixi/react";

const Bullet = ({ x, y }) => {
    return (
        <Graphics
            draw={(g) => {
                g.clear();
                g.beginFill(0xff0000);
                g.drawCircle(0, 0, 5); // Draw a circle for the bullet
                g.endFill();
            }}
            x={x}
            y={y}
        />
    );
};


const Bullets = () => {
    // const { bullets } = useActionsContext();
    // return(
    //     <>{bullets.map((bullet, index) => (
    //         <Bullet key={index} x={bullet.x} y={bullet.y} />
    //     ))}</>
    // )
}

export default Bullets;
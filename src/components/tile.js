import React from "react";
import "../styles/game.css";

export default function Tile(props) {

    const tileToImage = {
        1: require("../img/katsu.png"),
        2: require("../img/curry.png"),
        3: require("../img/red-sushi.png"),
        4: require("../img/orange-sushi.png"),
        5: require("../img/onigiri.png"),
        6: require("../img/ramen.png"),
        7: require("../img/seaweed-roll.png"),
        8: require("../img/roll.png"),
        9: require("../img/tempura.png"),
        10: require("../img/miso-soup.png"),
    }

    const { onClickTile } = props;

    return (
        props.value === 0 ?
            (<div className="empty-tile"></div>) :
            (<div className="tile" onClick={()=> onClickTile([props.row, props.col])} style={{backgroundColor: (props.selected && props.selected[0] === props.row && props.selected[1] === props.col) ?  "#a36e3f" : "#E9A366"}}>
                    <img draggable="false" src={tileToImage[props.value]} alt="tile"/>

            </div>)
    )
}
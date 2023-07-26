import React, {useState, useRef} from 'react';
import Game from './game';
import '../styles/home.css';

export default function Home() {

    const [isOnHome, setIsOnHome] = useState(true)
    const [showVid, setshowVid] = useState(false)

    const clickAudio = new Audio(require("../audio/normal-click.mp3"))
    const vidRef = useRef(null)


    function handleClick() {
        setshowVid(true)
        clickAudio.play()
        const soundtrack = new Audio(require("../audio/soundtrack.mp3"))
        soundtrack.loop = true
        soundtrack.play()
        vidRef.current.play()
    }

    function onVideoEnd() {
        vidRef.current.pause()
        setIsOnHome(false)
    }

    

    return (
        <div className='container'>
            {
                (isOnHome) ? 
                    (<div className="home row">
                        <img className="title" src={require("../img/title.png")} alt="Lian Lian Kan"/>
                        <button className="home-btn" onClick={handleClick}>Start Game</button>
                        <
                            img className="graphic" style={{ display: showVid ? "none" : "block"}} src={require("../img/door-intro.png")} alt="door-intro"/>
                        <video ref={vidRef} onEnded={onVideoEnd} muted preload="auto" style={{maxHeight: "100%", display: showVid ? "block" : "none"}}><source src={require("../img/door-intro.mp4")} type="video/mp4" /></video>


                    </div>) : 
                    (<Game clickAudio={clickAudio}/>)
            }
        </div>
    )
}
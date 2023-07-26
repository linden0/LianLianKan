import React, {useState, useEffect} from 'react';
import Game from './game';
import '../styles/home.css';

export default function Home() {

    const [isOnHome, setIsOnHome] = useState(true)
    const [showGif, setShowGif] = useState(false)

    const clickAudio = new Audio(require("../audio/normal-click.mp3"))
   

    // useEffect(() => {
    //     const soundtrack = new Audio(require("../audio/soundtrack.mp3"))
    //     soundtrack.loop = true
    //     soundtrack.play()

    //     return () => {
    //         soundtrack.pause()
    //     }
    // }, [])

    function handleClick() {
        clickAudio.play()
        const soundtrack = new Audio(require("../audio/soundtrack.mp3"))
        soundtrack.loop = true
        soundtrack.play()
        setShowGif(true)
        setTimeout(() => {
            setIsOnHome(false)
        }
        , 3700)
    }

    

    return (
        <div className='container'>
            {
                (isOnHome) ? 
                    (<div className="home">
                        <img className="title" src={require("../img/title.png")} alt="Lian Lian Kan"/>
                        <button className="home-btn" onClick={handleClick}>Start Game</button>
                        {showGif ? 
                            (<img className="graphic" src={require("../img/door-intro.gif")} alt="door-intro"/>) : 
                            (<img className="graphic" src={require("../img/door-intro.png")} alt="door-intro"/>)
                        }
                    </div>) : 
                    (<Game clickAudio={clickAudio}/>)
            }
        </div>
    )
}
import React, { useState, useRef, useEffect } from 'react';
import '../styles/game.css';
import Tile from './tile';
import { helper } from './pathfinding';
export default function Game(props) {

    const [board, setBoard] = useState([]);
    const [lastMove, setLastMove] = useState(null); // (row, col)
    const [numRows, setNumRows] = useState(0);
    const [numCols, setNumCols] = useState(0);
    const [tilesLeft, setTilesLeft] = useState(0);

    // popup states
    const [showInstructions, setShowInstructions] = useState(false);
    const [showWinPopup, setShowWinPopup] = useState(true);

    const gridRef = useRef(null);
    const iconClickAudio = new Audio(require("../audio/osu.mp3"))
    

    function getRandomNumber() {
        // random number between 1 and 10 inclusive
        return Math.floor(Math.random() * 10) + 1;
    }

    function createBoard() {
        setLastMove(null)
        let gridWidth = parseInt(window.getComputedStyle(gridRef.current).getPropertyValue('width'))
        let gridHeight = parseInt(window.getComputedStyle(gridRef.current).getPropertyValue('height'))
        let numRows = Math.floor((gridHeight-20)/61) + 2
        let numCols = Math.floor((gridWidth-20)/61) + 2
        if (numRows % 2 !== 0) {
            numRows -= 1
        }
        setNumCols(numCols)
        setNumRows(numRows)
        setTilesLeft((numCols-2) * (numRows-2))
        // create 2D array based on window size
        let newBoard = []
        for (let i = 0; i < numRows; i++) {
            const row = []
            for (let j = 0; j < numCols; j++) {
                    row.push(0)
            }
            newBoard.push(row)
        }
        // randomize board, ensuring tiles are in pairs
        for (let j = 0; j < numCols; j++) {
            for (let i = 1; i < numRows - 1; i+=2) {
                if (i === 0 || i === numRows - 1 || j === 0 || j === numCols - 1) {
                } else {
                    let randomNum = getRandomNumber()
                    newBoard[i][j] = randomNum
                    newBoard[i+1][j] = randomNum
                }
            }
        }
        // shuffle board
        let tiles = []
        while (tiles.length < (numCols-2) * (numRows-2)) {
            let randomNum = getRandomNumber()
            tiles.push(randomNum)
            tiles.push(randomNum)
        }
        tiles = tiles.sort(() => Math.random() - 0.5);
        for (let i = 1; i < numRows - 1; i++) {
            for (let j = 1; j < numCols - 1; j++) {
                newBoard[i][j] = tiles.pop()
            }
        }
        setBoard(newBoard)
        

        // ready, go!
    }

    function handleTileClick(move) {
        iconClickAudio.play()
        // if lastMove is null or equal to move, set lastMove to move
        if (lastMove === null || (lastMove[0] === move[0] && lastMove[1] === move[1]) || board[move[0]][move[1]] !== board[lastMove[0]][lastMove[1]]) {
            setLastMove(move)
        // else, check if move is valid
        } else {
            let result = helper(lastMove[0], lastMove[1], 0, `${lastMove[0]}-${lastMove[1]}`, new Set(), numRows, numCols, board, `${lastMove[0]}-${lastMove[1]}`, `${move[0]}-${move[1]}`)
            // if valid
            if (result) {
                // clear icons at lastMove and move
                const newBoard = board.map((row) => [...row]);
                newBoard[lastMove[0]][lastMove[1]] = 0
                newBoard[move[0]][move[1]] = 0
                setBoard(newBoard)


                // update lastMove and tilesLeft
                setLastMove(null)
                // check game completion
                if (tilesLeft === 2) {
                    setShowWinPopup(true);
                }
                setTilesLeft(tilesLeft - 2)

            // else, lastMove = move
            } else {
                setLastMove(move)
            }
        }
    }
    

    function shuffleBoard() {
        props.clickAudio.play()
        // create deep copy of board
        let newBoard = board.map((row) => [...row]);

        // shuffle board with fisher-yates algorithm
        for (let i = numRows - 2; i > 1; i--) {
            for (let j = numCols - 2; j > 1; j--) {
                const k = Math.floor(Math.random() * (i)) + 1; // Random row index
                const l = Math.floor(Math.random() * (j)) + 1; // Random column index
                // Swap elements at (i, j) and (k, l)
                const temp = newBoard[i][j];
                newBoard[i][j] = newBoard[k][l];
                newBoard[k][l] = temp;
            }
        }
        setBoard(newBoard)
    }

    useEffect(() => {
        createBoard();
        // Add the event listener when the component mounts
        window.addEventListener('resize', createBoard);
        
        // Remove the event listener when the component unmounts to avoid memory leaks
        return () => {
          window.removeEventListener('resize', createBoard);
        };
      }, []); 

    return (
        <div className='game-wrapper'>
            { showInstructions && 
                (<div className='popup-wrapper' onClick={()=>setShowInstructions(false)}>
                    <div className='instructions-popup' onClick={(e)=>e.stopPropagation()}>
                        <div className='modal-close-wrapper row'>
                            <div className='modal-close' style={{backgroundImage: `url(${require("../img/close-btn.png")})`}} onClick={()=>{props.clickAudio.play(); setShowInstructions(false)}}></div>
                        </div>
                        <h1>How to Play</h1>
                        <img className="instruction-img" src={require("../img/instructions/Instructions1.png")} alt="instructions"/>
                        <p>Tap two matching tiles to clear them</p>
                        <img className="instruction-img" src={require("../img/instructions/Instructions2.png")} alt="instructions"/>
                        <p>Tiles must have an unblocked path connecting them</p>
                        <img className="instruction-img" src={require("../img/instructions/Instructions3.png")} alt="instructions"/>
                        <p>Paths may not make more than two turns</p>
                        <p>Clear all tiles to win!</p>
                        
                    </div>
                </div>)
            }

            { showWinPopup &&
                (<div className='popup-wrapper'>
                    <div className='win-popup'>
                        <div className='banner'>
                            <img src={require("../img/victory.png")} alt="victory"/>
                        </div>
                        <button className='play-again-btn' onClick={() => {createBoard(); setShowWinPopup(false)}}>Play Again</button>
                        
                    </div>
                </div>)
            }


            <div className='game-bar-wrapper'>
                <div className='game-bar row'>
                    <button className='shuffle-btn'><img src={require("../img/shuffle.png")} alt="shuffle" height="30px" width="30px" onClick={shuffleBoard}/></button>
                    <button className='instruction-btn' onClick={() => {props.clickAudio.play(); setShowInstructions(true)}}>How To Play</button>
                </div>
            </div>
            <div className='game-board-wrapper'>
                <div className='game-board' ref={gridRef} style={{gridTemplateRows: `10px repeat(${numRows - 2}, 1fr) 10px`, gridTemplateColumns: `10px repeat(${numCols - 2}, 1fr) 10px`}}>
                {board.map((row, rowIndex) => (
                    row.map((value, colIndex) => (
                    <Tile key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} value={value} onClickTile={handleTileClick} selected={lastMove}/>
                    ))
                ))}
                </div>
            </div>
        </div>
    )
    

}
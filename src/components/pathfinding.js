function inBounds(r, c, numRows, numCols) {
    return (r >= 0 && r < numRows) && (c >= 0 && c < numCols)
}

function getExpectedCell(prevR, prevC, curR, curC) {
    if (prevR === curR) {
        return (prevC < curC) ? `${curR}-${curC + 1}`: `${prevR}-${curC - 1}`
    } else {
        return (prevR < curR) ? `${curR + 1}-${curC}`: `${curR - 1}-${curC}`
    }
}

function existsTurn(row, col, expectedCell, start) {
    if (expectedCell === start) {
        return false
    }
    return `${row}-${col}` !== expectedCell;
}


export function helper(r, c, numTurns, expectedCell, visited, numRows, numCols, board, start, end) {
    
    // if path is invalid
    if (visited.has(`${r}-${c}`) || (!inBounds(r, c, numRows, numCols)) || (numTurns > 2) || (`${r}-${c}` !== start && `${r}-${c}` !== end && board[r][c] !== 0)) {
        return false
    }
    // if reach target, add end to path
    if (`${r}-${c}` === end) {
        return [[r, c]]
    }
    let neighbors = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
    for (const [row, col] of neighbors) {
        // if neighbor is in bounds, not in visited, and doesn't cause more than 2 turns, and isn't an obstacle
        const newVisited = new Set(visited)
        newVisited.add(`${r}-${c}`)
        const path = helper(
            row,
            col,
            numTurns + existsTurn(row, col, expectedCell, start),
            getExpectedCell(r, c, row, col),
            newVisited,
            numRows,
            numCols,
            board,
            start,
            end
          );
        if (path) {
            return [[r, c], ...path];
        }
    }
    // return false;


}

// let start = [11, 15]
// let end = [10, 16]

// let board = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 10, 1, 3, 9, 5, 9, 10, 2, 4, 7, 4, 7, 3, 10, 3, 10, 0],
// [0, 6, 3, 6, 5, 1, 4, 3, 3, 2, 2, 7, 2, 1, 4, 9, 9, 0],
// [0, 7, 7, 6, 10, 5, 5, 3, 6, 6, 8, 8, 3, 2, 8, 1, 3, 0],
// [0, 10, 2, 8, 7, 3, 8, 4, 7, 1, 3, 3, 2, 9, 4, 1, 4, 0],
// [0, 4, 7, 1, 2, 10, 5, 6, 4, 9, 3, 8, 5, 1, 1, 10, 2, 0],
// [0, 3, 4, 2, 1, 10, 3, 4, 7, 2, 10, 8, 7, 4, 7, 10, 7, 0],
// [0, 4, 10, 10, 9, 10, 9, 4, 9, 8, 1, 1, 2, 5, 7, 9, 8, 0],
// [0, 9, 10, 6, 8, 9, 6, 3, 8, 4, 7, 8, 3, 4, 4, 7, 8, 0],
// [0, 5, 1, 3, 8, 9, 8, 4, 5, 1, 3, 4, 3, 8, 10, 7, 6, 0],
// [0, 2, 8, 0, 1, 9, 8, 4, 4, 5, 5, 2, 4, 1, 8, 2, 4, 0],
// [0, 9, 5, 0, 0, 5, 2, 9, 3, 6, 6, 3, 0, 0, 4, 4, 8, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
// console.log(helper(start[0], start[1], 0, `${start[0]}-${start[1]}`, new Set(), board.length, board[0].length, board, `${start[0]}-${start[1]}`, `${end[0]}-${end[1]}`))
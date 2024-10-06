const solvedSudoku = (board) => {
    if(solve(board, 0, 0))
        return board
    else   
        return "No Valid Solution"
}

const nextCell = (i, j) => {
    if (j == 8)
        return [i + 1, 0]
    return [i, j + 1]
}

const isValid = (board, i, j, c) => {
    for (let index = 0; index < 9; index++) {
        // Check the row and column
        if (board[i][index] == c || board[index][j] == c)
            return false;
    }

    // Check the sub-grid
    let firstI = Math.floor(i / 3) * 3;
    let firstJ = Math.floor(j / 3) * 3;

    for (let ii = firstI; ii < firstI + 3; ii++) {
        for (let jj = firstJ; jj < firstJ + 3; jj++) {
            if (board[ii][jj] == c)
                return false;
        }
    }

    return true;
}

const solve = (board, i, j) => {
    if (i == 9)
        return true; // Reached the end of the board, solution found.

    const nextIndex = nextCell(i, j);

    if (board[i][j] != '.')
        return solve(board, nextIndex[0], nextIndex[1]); // Skip non-empty cells.

    for (let index = 1; index <= 9; index++) {
        let nextChar = String(index);
        if (isValid(board, i, j, nextChar)) {
            board[i][j] = nextChar;
            if (solve(board, nextIndex[0], nextIndex[1]))
                return true; // Solution found, stop further recursion.

            board[i][j] = '.'; // Backtrack
        }
    }

    return false; // No solution found for this branch.
}

const board = [
    ['5','3','.','.','7','.','.','.','.'],
    ['6','.','.','1','9','5','.','.','.'],
    ['.','9','8','.','.','.','.','6','.'],
    ['8','.','.','.','6','.','.','.','3'],
    ['4','.','.','8','.','3','.','.','1'],
    ['7','.','.','.','2','.','.','.','6'],
    ['.','6','.','.','.','.','2','8','.'],
    ['.','.','.','4','1','9','.','.','5'],
    ['.','.','.','.','8','.','.','7','9']
];

console.log(solvedSudoku(board));

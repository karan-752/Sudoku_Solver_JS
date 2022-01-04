function isSafe(board, row, col, num) {
    for(let d=0; d<9; d++) {
        if (board[row][d] == num) {
            return false;
        }
    }
 
    for(let r=0; r<9; r++) {
        if (board[r][col] == num) {
            return false;
        }
    }
 
    let sqrt = Math.floor(Math.sqrt(9));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;
 
    for(let r=boxRowStart; r<boxRowStart + sqrt; r++) {
        for(let d=boxColStart; d<boxColStart + sqrt; d++) {
            if (board[r][d] == num) {
                return false;
            }
        }
    }

    return true;
}
    
function solveSudoku(board) {
    let r = -1;
    let c = -1;
    let isEmpty = true;

    for(var i=0; i<9; i++) {
        for(var j=0; j<9; j++) {
            if(board[i][j] === 0) {
                r = i;
                c = j;
                isEmpty = false;
                break;
            }
        }

        if(!isEmpty) {
            break;
        }
    }

    if(isEmpty) {
        return true;
    }

    for(var num=1; num<=9; num++) {
        if(isSafe(board, r, c, num)) {
            board[r][c] = num;

            if(solveSudoku(board)) {
                return true;    
            }

            else {
                board[r][c] = 0;
            }
        }
    }

    return false;
}

function fillSudoku(board) {
    var grid = document.getElementById('grid');

    for(var i=0; i<9; i++) {
        for(var j=0; j<9; j++) {
            console.log(board[i][j]);
            grid.rows[i].cells[j].children[0].value = board[i][j];
        }
    }
}

function solve() {
    document.getElementById('reset').disabled = true;
    var grid = document.getElementById('grid');
    var board = new Array(9);

    for(var i=0; i<9; i++) {
        board[i] = new Array(9);

        for(var j=0; j<9; j++) {
            if(grid.rows[i].cells[j].children[0].value === '') {
                board[i][j] = 0;
            }

            else {
                board[i][j] = grid.rows[i].cells[j].children[0].value;
            }
        }
    }

    solveSudoku(board);

    fillSudoku(board);
    
    document.getElementById('reset').disabled = false;
}

function resetGrid() {
    var grid = document.getElementById('grid');

    for(var i=0; i<9; i++) {
        for(var j=0; j<9; j++) {
            grid.rows[i].cells[j].children[0].value = '';
        }
    }
}
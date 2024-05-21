const board = document.getElementById('board')
const controls = document.getElementById('controls')
let completedBoard = null
let selectedNum = 0

window.onload = function() {
    createControls()
    createTable()
}

function createControls(){
    const table = document.createElement('table')
    table.id = 'controltable'
    const tableData = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    tableData.forEach(rowData => {
        const row = document.createElement('tr')
        rowData.forEach(cellData => {
            const cell = document.createElement('td')
            cell.classList.add('border1')
            cell.classList.add('controlcell')
            cell.textContent = cellData
            row.appendChild(cell)
        })
        table.appendChild(row)
    })
    controls.appendChild(table)
    controls.innerHTML += `<button id="checkButton" onclick="checkForWin()">Check</button>`
    document.querySelectorAll('.controlcell').forEach(cell => {
        cell.addEventListener('click', controlOnClick)
    })
}

function createTable(){
    completedBoard = generateCompletedBoard()
    shuffleBoard(completedBoard)
    showTable(completedBoard)
    document.querySelectorAll('.empty').forEach(cell => {
        cell.addEventListener('click', tableOnClick)
    })
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false
        }
    }
    return true
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num
                        if (solveSudoku(board)) {
                            return true
                        }
                        board[row][col] = 0
                    }
                }
                return false
            }
        }
    }
    return true
}

function generateCompletedBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0))
    solveSudoku(board)
    return board
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function shuffleBoard(board) {
    for (let i = 0; i < 9; i += 3) {
        let rows = [i, i + 1, i + 2]
        let cols = [i, i + 1, i + 2]
        shuffleArray(rows)
        shuffleArray(cols)
        let tempBoard = board.map(row => row.slice())
        for (let j = 0; j < 3; j++) {
            board[i + j] = tempBoard[rows[j]]
        }
        tempBoard = board.map(row => row.slice())
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 9; k++) {
                board[k][i + j] = tempBoard[k][cols[j]]
            }
        }
    }
}

function showTable(sudokuboard){
    board.innerHTML = `<table id="sudokutable"></table>`
    populateTable(sudokuboard);
}

function populateTable(matrix) {
    for (let row = 0; row < 9; row++) {
        const tr = document.createElement("tr")
        for (let col = 0; col < 9; col++) {
            const td = document.createElement("td")
            td.id = `${row}:${col}`
            if(Math.floor(Math.random()*10)>4){
                td.textContent = matrix[row][col]
            }else{
                td.classList.add('empty')
            }
            td.classList.add('cell2')
            td.classList.add('border1')
            tr.appendChild(td)
        }
        document.getElementById("sudokutable").appendChild(tr)
    }
}

function controlOnClick(e){
    selectedNum = e.target.innerHTML
    document.querySelectorAll('.controlcell').forEach(cell => {
        cell.classList.remove('selected')
    })
    e.target.classList.add('selected')
    document.querySelectorAll('.cell2').forEach(cell => {
        cell.classList.remove('highlight')
        if(cell.innerHTML == selectedNum){
            cell.classList.add('highlight')
        }
    })
}

function tableOnClick(e){
    if(selectedNum != 0){
        e.target.innerHTML = e.target.innerHTML == "" ? selectedNum : ""
        e.target.classList.add('highlight')
    }
}

function checkForWin(){
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            let cell = document.getElementById(`${row}:${col}`)
            cell.classList.remove('highlight')
            if(cell.classList.contains('empty')){
                cell.classList.add(cell.innerHTML == completedBoard[row][col] ? 'green' : 'red')
            }
        }
    }
}
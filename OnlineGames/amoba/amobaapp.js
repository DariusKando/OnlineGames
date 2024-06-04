const board = document.getElementById('board')
let tableData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
let player = "X"

window.onload = function() {
    createTable()
}

function createTable(){
    const table = document.createElement('table')
    table.id = 'table'
    let i = 0
    let j = 0
    tableData.forEach(rowData => {
        const row = document.createElement('tr')
        rowData.forEach(cellData => {
            const cell = document.createElement('td')
            cell.classList.add('border1')
            cell.classList.add('cell')
            cell.classList.add('cellhover')
            cell.id = `${i}:${j}`
            cell.textContent = cellData
            row.appendChild(cell)
            j++
        })
        table.appendChild(row)
        i++
        j=0
    })
    board.appendChild(table)

    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', cellOnClick)
    })
}

function refreshTable(){
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = tableData[cell.id.split(":")[0]][cell.id.split(":")[1]]
    })
}

function checkTable(){
    //horizontal
    for(let i = 0; i < 3; i++){
        if (player == tableData[i][0] && player == tableData[i][1] && player == tableData[i][2]) {
            return true
        }
    }
    //vertical
    for(let i = 0; i < 3; i++){
        if (player == tableData[0][i] && player == tableData[1][i] && player == tableData[2][i]) {
            return true
        }
    }
    //diagonal from top left
    if (player == tableData[0][0] && player == tableData[1][1] && player == tableData[2][2] ) {
        return true
    }
    //diagonal from bottom left
    if ( player == tableData[0][2] && player == tableData[1][1] && player == tableData[2][0]) {
        return true
    }
    return false;
}

function cellOnClick(event){
    e = event.target
    e.classList.remove('cellhover')
    tableData[e.id.split(":")[0]][e.id.split(":")[1]] = player
    if(checkTable()){
        document.querySelectorAll('.cell').forEach(cell => {
            cell.removeEventListener('click', cellOnClick);
            cell.classList.remove('cellhover')
        })
        document.getElementById('win').innerHTML = `<h1>${player} játékos nyert.</h1>`
    }

    player = player == "X" ? "O" : "X"
    refreshTable()
}


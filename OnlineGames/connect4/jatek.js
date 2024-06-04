/** @format */

// fejlesztés opció, tetszőleges tábla méret
let test = document.getElementById("container")
let who = "Red"
let minRows
let row
let col
let tableMatrix = null
document.getElementById("options").firstElementChild.selected = true;

function Setup() {
	minRows = []
	test.hidden = false
	document.getElementById("who").hidden = false
	document.getElementById("valaszt").hidden = true
	col = Number(document.getElementById("options").value.split("_")[0])
	row = Number(document.getElementById("options").value.split("_")[1])
	tableMatrix = createMatrix(row, col)

	for (let i = 0; i < col; i++) {
		let colDiv = document.createElement("div")
		colDiv.classList.add("outline")
		colDiv.setAttribute("id", `id:${i}`)
		test.appendChild(colDiv)
		colDiv.addEventListener("click", () => {
			Click(colDiv)
		})
		colDiv.addEventListener("mouseover", () => {
			placeholder(colDiv.id.split(":")[1])
		})
		colDiv.addEventListener("mouseleave", () => {
			removePlaceholder(colDiv.id.split(":")[1] + "ph")
		})
		minRows.push(row - 1)
	}

	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			let colDiv = document.getElementById(`id:${j}`)
			let div = document.createElement("div")
			div.classList.add("location")
			div.setAttribute("id", i + ":" + j)
			colDiv.appendChild(div)
		}
	}
}

function Click(coldiv) {
	let clicked_col = coldiv.id.split(":")[1]
	let clicked_row = minRows[clicked_col]

	if (clicked_row == -1) {
		return
	}

	fall(clicked_row -1, clicked_col)

	setTimeout(() => {
		document.getElementById(clicked_row + ":" + clicked_col).classList.toggle(who)

	checkMatrix()
	if (CheckForWin()) {
		document.getElementById("who").innerText = `${who} won.`
		document.getElementById('container').classList.add('ifwin')
		openPopup()
	} else {
		who = who == "Red" ? "Yellow" : "Red"
		document.getElementById("who").innerText = `${who}'s turn.`;
	}
	
	removePlaceholder(parseInt(clicked_col) + "ph")
	placeholder(parseInt(clicked_col))

	
	}, 151 * clicked_row);
	minRows[clicked_col]--
}

function placeholder(id) {
	let x = document.getElementById(0 + ":" + id).offsetLeft
	let y = document.getElementById(0 + ":" + id).offsetTop

	let ph = document.createElement("div")
	ph.className = "placeholder " + who
	ph.id = id + "ph"

	ph.style.left = x - 10 + "px"
	ph.style.top = y - 70 + "px"
	document.getElementById("container").appendChild(ph)
}

function removePlaceholder(id) {
	document.getElementById("container").removeChild(document.getElementById(id))
}

function CheckForWin() {
	//horizontal
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col - 3; j++) {
			if (
				who == tableMatrix[i][j] &&
				who == tableMatrix[i][j + 1] &&
				who == tableMatrix[i][j + 2] &&
				who == tableMatrix[i][j + 3]
			) {
				return true
			}
		}
	}
	//vertical
	for (let i = 0; i < row - 3; i++) {
		for (let j = 0; j < col; j++) {
			if (
				who == tableMatrix[i][j] &&
				who == tableMatrix[i + 1][j] &&
				who == tableMatrix[i + 2][j] &&
				who == tableMatrix[i + 3][j]
			) {
				return true
			}
		}
	}
	//diagonal from top left
	for (let i = 0; i < row - 3; i++) {
		for (let j = 0; j < col - 3; j++) {
			if (
				who == tableMatrix[i][j] &&
				who == tableMatrix[i + 1][j + 1] &&
				who == tableMatrix[i + 2][j + 2] &&
				who == tableMatrix[i + 3][j + 3]
			) {
				return true
			}
		}
	}
	//diagonal from bottom left
	for (let i = row - 1; i > 2; i--) {
		for (let j = 0; j < col - 3; j++) {
			if (
				who == tableMatrix[i][j] &&
				who == tableMatrix[i - 1][j + 1] &&
				who == tableMatrix[i - 2][j + 2] &&
				who == tableMatrix[i - 3][j + 3]
			) {
				return true
			}
		}
	}
	return false;
}

function createMatrix(rows, cols) {
	const matrix = []
	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < cols; j++) {
			row.push("empty")
		}
		matrix.push(row)
	}
	return matrix
}

function checkMatrix() {
	document.querySelectorAll(".location").forEach((location) => {
		if (location.classList.contains(who)) {
			tableMatrix[location.id.split(":")[0]][location.id.split(":")[1]] = who
		}
	})
}

function openPopup(){
	document.getElementById('popup').hidden = false
}

function closePopup(){
	location.reload()
	document.getElementById('popup').hidden = true
}

function fall(col, row){
	if(col == 0){
		return;
	}
	
	const interval = 150
	for(let i=0; i<=col; i++){
		setTimeout(() => {
			document.getElementById(i + ":" + row).classList.toggle(who)
			setTimeout(() => {
				document.getElementById(i + ":" + row).classList.remove(who);
			}, 150);
		}, (i - 1) * interval);
	}
}
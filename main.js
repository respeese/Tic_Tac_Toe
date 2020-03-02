const boardModule = (function() {
	let boardArray = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
	];

	function changeMark(round) {
		if(round%2 == 0) {
			return 'O';
		}
		else {
			return 'X';
		}
	}

	function updateBoardArray() {
		let boardTable= document.querySelector("#board-table");
		for(let i=0, row; row = boardTable.rows[i]; i++) {
			for(let j=0, col; col = row.cells[j]; j++) {
				boardArray[i][j] = col.innerHTML;
			}
		}
		console.log(boardArray);
	}

	function checkBoard() {
		//vertical spaces
		for(let col=0, row=0; col<3; col++) {
			if((boardArray[row][col] == 'X') && (boardArray[row+1][col] == 'X') && (boardArray[row+2][col] == 'X')) {
				return 'X';
			}
			if((boardArray[row][col] == 'O') && (boardArray[row+1][col] == 'O') && (boardArray[row+2][col] == 'O')) {
				return 'O';
			}
		}

		//horizontal spces
		for(let col=0, row=0; row<3; row++) {
			if((boardArray[row][col] == 'X') && (boardArray[row][col+1] == 'X') && (boardArray[row][col+2] == 'X')) {
				return 'X';
			}
			if((boardArray[row][col] == 'O') && (boardArray[row][col+1] == 'O') && (boardArray[row][col+2] == 'O')) {
				return 'O';
			}
		}

		//diagnal spaces
		if((boardArray[0][0] == 'X') && (boardArray[1][1] == 'X') && (boardArray[2][2] == 'X')){
			return 'X';
		}
		if((boardArray[0][0] == 'O') && (boardArray[1][1] == 'O') && (boardArray[2][2] == 'O')){
			return 'O';
		}

		if((boardArray[0][2] == 'X') && (boardArray[1][1] == 'X') && (boardArray[2][0] == 'X')) {
			return 'X';
		}
		if((boardArray[0][2] == 'O') && (boardArray[1][1] == 'O') && (boardArray[2][0] == 'O')) {
			return 'O';
		}
	}

	function addClickBoard() {
		tdList = document.querySelectorAll('td');
		tdList.forEach((td) => {
			td.addEventListener('click', (event) => {
				gameModule.updateRound();
				console.log(gameModule.getRound());

				if(td.innerHTML === '') {
					td.innerHTML = boardModule.changeMark(gameModule.getRound());
					boardModule.updateBoardArray();
					td.style = "pointer-events:none;";
				}

				let winner = gameModule.checkGameOver();
				if(winner){
					if(winner == 'X'){
						playerX.wins += 1;
						playerX.sayWin();
						tdList.forEach((td) => {
							td.style="pointer-events:none;";
						})
					}
					else if(winner == 'O'){
						player0.wins += 1;
						player0.sayWin();
						tdList.forEach((td) => {
							td.style="pointer-events:none;";
						})
					}
					else if(winner == 'tie'){
						playerX.sayTie();
						tdList.forEach((td) => {
							td.style="pointer-events:none;";
						})
					}
				}
			})
		})
	}

	return {boardArray, changeMark, updateBoardArray, checkBoard, addClickBoard};
})();



const gameModule = (function() {
	console.log("Game started");
	let round = 0;
	let isGameOver = false;

	function renderBoard(){
		let boardTable= document.querySelector("#board-table");
		for(let i=0, row; row = boardTable.rows[i]; i++) {
			for(let j=0, col; col = row.cells[j]; j++) {
				col.innerHTML = boardModule.boardArray[i][j];
			}
		}

		boardModule.addClickBoard(round);		
	}

	function setIsGameOver(bool) {
		isGameOver = bool;
	}

	function getIsGameOver() {
		return isGameOver;
	}

	function updateRound() {
		round += 1;
	}

	function setRound(val) {
		round = val;
	}

	function getRound() {
		return round;
	}

	function checkGameOver() {
		if(round >= 5) {
			if(boardModule.checkBoard() == 'X') {
				setIsGameOver(true);
				return 'X';
			}
			else if(boardModule.checkBoard() == 'O') {
				setIsGameOver(true);
				return 'O';
			}
			else if(round ==9){
				return 'tie';
			}
			else{
				return;
			}
		}
	}
	
	return {getIsGameOver, getRound, updateRound, renderBoard, checkGameOver,};
})();



const playerFactory = (mark, name) => {
	let winnerContainer = document.querySelector('#winner-container');
	let playAgainContainer = document.querySelector('#play-again-container');
	let wins = 0;

	function getWins() {
		return wins;
	}

	function updateWins(){
		wins += 1;
	}

	function setWins(num){
		wins = num;
	}

	function sayWin() {
		winnerContainer.innerHTML = name+" won! Good job!";
		playAgainContainer.innerHTML = '<button id="play-again-btn">Play Again</button>';
	}

	function sayTie(){
		winnerContainer.innerHTML = "It's a tie...";
		playAgainContainer.innerHTML = '<button>Play Again</button>';
	}

	return {mark, name, getWins, updateWins, setWins, sayWin, sayTie};
}


let playerX = playerFactory('X', 'Ryan');
let player0 = playerFactory('O', 'Jeff');
gameModule.renderBoard();




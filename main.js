let playerX;
let playerO;


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


	function newBoard() {
		let tdList = document.querySelectorAll('td');
		tdList.forEach((td) => {
			td.innerHTML = "";
		})

		updateBoardArray();
	}


	function updateBoard() {
		let tdList = document.querySelectorAll('td');
		tdList.forEach((td) => {
			td.addEventListener('click', (event) => {
				gameLogic.updateRound();

				if(td.innerHTML === '') {
					td.innerHTML = boardModule.changeMark(gameLogic.getRound());
					boardModule.updateBoardArray();
					td.style = "pointer-events:none;";
				}

				gameLogic.checkRoundOver();
				
			})
		})
	}

	function enableBoardClicks(){
		tdList = document.querySelectorAll('td');
		tdList.forEach((td) => {
			td.style="pointer-events:auto;";
		})
	}

	return {newBoard, boardArray, changeMark, updateBoardArray, checkBoard, updateBoard, enableBoardClicks};
})();


const displayModule = (function() {
	let displayContainer = document.querySelector('#display-container');

	function renderBoard(){
		let boardTable= document.querySelector("#board-table");
		for(let i=0, row; row = boardTable.rows[i]; i++) {
			for(let j=0, col; col = row.cells[j]; j++) {
				col.innerHTML = boardModule.boardArray[i][j];
			}
		}

		boardModule.updateBoard(gameLogic.getRound());		
	}

	function sayWin(player) {

		displayContainer.innerHTML = player.getName()+" won! Good job!";
		displayContainer.innerHTML+= '<br><button id="new-game-btn"><i class="fa fa-refresh" aria-hidden="true"></i></button>';
		displayContainer.innerHTML += '<br><button id="play-again-btn">Next Round</button>';
		gameLogic.playAgain();
		gameLogic.newGame();
	}

	function sayTie(){
		displayContainer.innerHTML = "It's a tie...";
		displayContainer.innerHTML+= '<br><button id="new-game-btn"><i class="fa fa-refresh" aria-hidden="true"></i></button>';
		displayContainer.innerHTML += '<button id="play-again-btn">Next Round</button>';
		gameLogic.playAgain();
		gameLogic.newGame();
	}

	function showNames(){
		let playForm = document.querySelector('#play-form');
		let p1NameElement = document.querySelector('#playerX');
		let p2NameElement = document.querySelector('#playerO');
		let p1Name = p1NameElement.value;
		let p2Name = p2NameElement.value;

		clearDisplayContainer();

		if(!p1Name){
			p1Name = 'Player 1';
		}
		if(!p2Name){
			p2Name = 'Player 2';
		}

		document.querySelector('#pX-name').innerHTML = p1Name;
		document.querySelector('#pO-name').innerHTML = p2Name;
	}

	function clearDisplayContainer(){
		displayContainer.innerHTML="";
	}


	return {renderBoard, sayWin, sayTie, showNames, clearDisplayContainer};
})();


const gameLogic = (function() {
	let round = 0;
	let isGameOver = false;

	function newGame(){
		let newGameBtn = document.querySelector('#new-game-btn');
		newGameBtn.addEventListener('click', () => {
			location.reload();
		})
	}

	function playAgain() {
		let playAgainBtn = document.querySelector('#play-again-btn');
		playAgainBtn.addEventListener('click', () => {
			boardModule.newBoard();
			boardModule.enableBoardClicks();
			displayModule.clearDisplayContainer();
			setRound(0);
			setIsGameOver(false);
		})
	}

	function play(){
		let playBtn = document.querySelector('#play-btn');

		playBtn.addEventListener('click', (event)=>{
			event.preventDefault();
			displayModule.showNames();

			let p1 = document.querySelector('#pX-name').innerHTML;
			let p2 = document.querySelector('#pO-name').innerHTML;

			makePlayers(p1, p2);
			playBtn.style.display='none';
			displayModule.renderBoard();
		})
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

	function checkRoundOver() {
		if(round >= 5) {
			if(boardModule.checkBoard() == 'X') {
				setIsGameOver(true);
				endRound('X');
			}
			else if(boardModule.checkBoard() == 'O') {
				setIsGameOver(true);
				endRound('O');
			}
			else if(round == 9){
				setIsGameOver(true);
				endRound('tie');
			}
			

		}
	}

	function endRound(winner){
		let tdList = document.querySelectorAll('td');

		if(winner == 'X'){
			playerX.updateWins();
			displayModule.sayWin(playerX);
			document.querySelector('#pX-score').innerHTML = playerX.getWins();

			tdList.forEach((td) => {
				td.style="pointer-events:none;";
			})
		}
		else if(winner == 'O'){
			playerO.updateWins();
			displayModule.sayWin(playerO);
			document.querySelector('#pO-score').innerHTML = playerO.getWins();
			tdList.forEach((td) => {
				td.style="pointer-events:none;";
			})
		}


		else if(winner == 'tie'){
			displayModule.sayTie();
			tdList.forEach((td) => {
				td.style="pointer-events:none;";
			})
		}
		
	}

	function makePlayers(p1Name, p2Name){
		playerX = playerFactory('X', p1Name);
		playerO = playerFactory('O', p2Name);
	}
	
	return {playAgain, play, getIsGameOver, getRound, updateRound, endRound, checkRoundOver, makePlayers, newGame};
})();



const playerFactory = (mark, n) => {
	let wins = 0;
	let name = n;


	function getWins() {
		return wins;
	}

	function updateWins(){
		wins += 1;
	}

	function setWins(num){
		wins = num;
	}

	function getName(){
		return name;
	}

	function setName(newName) {
		name = newName;
	}


	function resetPlayer() {
		setWins(0);
		setName("");
	}

	return {getWins, updateWins, setWins, getName, setName, resetPlayer};
}

gameLogic.play();








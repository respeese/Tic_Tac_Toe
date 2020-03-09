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
				displayModule.highlightNames(gameLogic.round);
				gameLogic.updateRound();


				if(td.innerHTML === '') {
					td.innerHTML = boardModule.changeMark(gameLogic.round);
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

		boardModule.updateBoard(gameLogic.round);		
	}

	function sayWin(player) {

		displayContainer.innerHTML = player.name+" won! Good job!";
		displayContainer.innerHTML+= '<br><button id="new-game-btn"><i class="fa fa-refresh" aria-hidden="true"></i></button>';
		displayContainer.innerHTML += '<br><button id="new-round-btn">Next Round</button>';
		gameLogic.newRound();
		gameLogic.newGame();
	}

	function sayTie(){
		displayContainer.innerHTML = "It's a tie...";
		displayContainer.innerHTML+= '<br><button id="new-game-btn"><i class="fa fa-refresh" aria-hidden="true"></i></button>';
		displayContainer.innerHTML += '<br><button id="new-round-btn">Next Round</button>';
		gameLogic.newRound();
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

	function highlightNames(round){
		let pXName = document.querySelector('#pX-name');
		let pOName = document.querySelector('#pO-name');

		if(round % 2== 0){
			pOName.classList.add('highlighted');
			pXName.classList.remove('highlighted');
		}
		else{
			pXName.classList.add('highlighted');
			pOName.classList.remove('highlighted');
		}
	}

	function clearDisplayContainer(){
		displayContainer.innerHTML="";
	}


	return {renderBoard, sayWin, sayTie, showNames, highlightNames, clearDisplayContainer};
})();


const gameLogic = (function() {
	let round = 0;

	function newGame(){
		let newGameBtn = document.querySelector('#new-game-btn');
		newGameBtn.addEventListener('click', () => {
			location.reload();
		})
	}

	function newRound() {
		let newRoundBtn = document.querySelector('#new-round-btn');
		newRoundBtn.addEventListener('click', () => {
			boardModule.newBoard();
			boardModule.enableBoardClicks();
			displayModule.clearDisplayContainer();
			gameLogic.round = 0;;

			let p1Name = document.querySelector('#pX-name');
			let p2Name = document.querySelector('#pO-name');

			p1Name.classList.add('highlighted');
			p2Name.classList.remove('highlighted');
		})
	}

	function play(){
		let playBtn = document.querySelector('#play-btn');

		playBtn.addEventListener('click', (event)=>{
			event.preventDefault();
			displayModule.showNames();
			

			let p1 = document.querySelector('#pX-name').innerHTML;
			let p1Name = document.querySelector('#pX-name');
			let p2 = document.querySelector('#pO-name').innerHTML;

			p1Name.classList.add('highlighted');
			makePlayers(p1, p2);
			playBtn.style.display='none';
			displayModule.renderBoard();
		})
	}

	function updateRound() {
		this.round += 1;
	}

	function checkRoundOver() {
		if(this.round >= 5) {
			if(boardModule.checkBoard() == 'X') {
				endRound('X');
			}
			else if(boardModule.checkBoard() == 'O') {
				endRound('O');
			}
			else if(this.round == 9){
				endRound('tie');
			}
			

		}
	}

	function endRound(winner){
		let tdList = document.querySelectorAll('td');

		if(winner == 'X'){
			playerX.updateWins();
			displayModule.sayWin(playerX);
			document.querySelector('#pX-score').innerHTML = playerX.wins;

			tdList.forEach((td) => {
				td.style="pointer-events:none;";
			})
		}
		else if(winner == 'O'){
			playerO.updateWins();
			displayModule.sayWin(playerO);
			document.querySelector('#pO-score').innerHTML = playerO.wins;
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
	
	return {newRound, play, updateRound, endRound, checkRoundOver, makePlayers, newGame, round};
})();



const playerFactory = (mark, n) => {
	let wins = 0;
	let name = n;

	function updateWins(){
		this.wins += 1;
	}

	return {wins, name, updateWins};
}

gameLogic.play();









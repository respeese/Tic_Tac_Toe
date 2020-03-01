const boardModule = (function() {
	return {
		boardArray: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
		],
		changeMark: function(round) {
			if(round%2 == 0) {
				return 'O';
			}
			else {
				return 'X';
			}
		},
	};
})();

const gameModule = (function() {
	let round = 0;

	return {
		renderBoard: function() {
			let boardTable= document.querySelector("#board-table");
			for(let i=0, row; row = boardTable.rows[i]; i++) {
				for(let j=0, col; col = row.cells[j]; j++) {
					col.innerHTML = boardModule.boardArray[i][j];
				}
			}

			tdList = document.querySelectorAll('td');
			tdList.forEach((td) => {
				td.addEventListener('click', () => {
					round++;
					console.log(round);
					if(td.innerHTML === '') {
						td.innerHTML = boardModule.changeMark(round);
					}
				})
			})
		},

	};
})();

const playerFactory = (mark) => {

	return {mark};
}

gameModule.renderBoard();
boardModule.changeMark();
'use strict';

function Game() {

	let ar = [],
	current = {},
	timer = {},
	counter,
	gameField = document.getElementById('gameField'),
	records = {},
	gameRecords = [],
	size,
	user;

	this.start = function (_size, _user) {
		size = _size;
		user = _user;
		counter = 0;
		setGame();
		createField();
		timer.start = new Date;
	}

	function endGame() {
		let score = (new Date) - timer.start;
		setRecords(score);
	}

	function setRecords(score) {
		let length = gameRecords.length,
			maxLength = 3;
		
		if (length == maxLength &&  gameRecords[length].score <= score) {
			return;
		}

		gameRecords.push({
			user: user,
			score: score
		});

		gameRecords.sort((a, b) => a.score - b.score);

		if (gameRecords.length > maxLength) {
			gameRecords.pop();
		}
		
		gameRecords.some(
			(item, index, array)=>{
				
				if(item.user == user && item.score == score) {
					alert(`Congratulations ${user}! Your place: ${index+1}, Your score: ${score}`);
				}
				return false;
			}
		);
	}

	function createField() {
		const table = document.createElement('table');

		for (let i = 0; i < size; i++) {
			let row = document.createElement('tr')

				for (let j = 0; j < size; j++) {
					let cell = document.createElement('td');
					let img = document.createElement('img')
						img.src = 'img/' + ar[i][j] + '.jpg';

					img.dataset.img = ar[i][j];
					img.style.filter = 'contrast(0)';
					cell.id = ar[i][j];
					cell.appendChild(img);
					row.appendChild(cell);
				}
				table.appendChild(row);
		}

		table.addEventListener('click', openImg);

		gameField.innerHTML = null; ;
		gameField.appendChild(table);
	}

	function stopPropagation(e) {
		e.stopPropagation();
	}

	function openImg(e) {

		console.log('click');
		let img = e.target.nodeName === 'IMG' ? e.target : null;
		if (!img || !!img.dataset.isOpen) {
			return;
		}
		img.style.filter = 'contrast(1)';
		img.dataset.isOpen = true;

		if (!current.img) {
			current.img = img;
			return;
		} else if (current.img.dataset.img !== img.dataset.img) {
			delete img.dataset.isOpen;
			delete current.img.dataset.isOpen;
			let currentImg = current.img,
			table = e.currentTarget;
			table.addEventListener('click', stopPropagation, true);
			setTimeout(function () {
				img.style.filter = currentImg.style.filter = 'contrast(0)';
				table.removeEventListener('click', stopPropagation, true);
			}, 500);

		} else {
			counter++;
		};
		delete current.img;
		if (counter >= size * size / 2) {
			endGame();
		}
	}

	function setGame() {
		let length = size * size / 2,
		arr2 = [];
		for (var i = 0; i < length; i++) {
			arr2[i] = i;
		};

		arr2 = arr2.concat(arr2);
		arr2.sort(function () {
			return Math.random() - 0.5;
		});

		for (var i = 0; i < size; i++) {
			ar[i] = arr2.splice(0, size)
		}
	}

}

var game = new Game();

function startGame() {

	let size = document.getElementById('size').value,
	user = document.getElementById('user').value;
	if (user.length < 3) {
		alert('Name mast be longer than 2 characters');
		return;
	}

	game.start(size, user);
}

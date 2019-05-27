'use strict';

function Game() {
	let ar = [],
	current = {},
	timer,
	counter,
	gameField = document.getElementById('gameField'),
	recordsField = document.getElementById('recordsField'),
	startMenu = document.getElementById('startMenu'),
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
		timer = new Date;
		startMenu.style.height = 0;
	}

	this.showRecords = function () {
		let length = gameRecords.length,
		list = document.createElement('ul'),
		li = createLi('#', 'user', 'score');

		list.appendChild(li);

		for (let i = 0; i < length; i++) {
			let ind = i > 9 ? '0' + (i + 1) : i + 1;

			li = createLi(ind, gameRecords[i].user, gameRecords[i].score);//`<span>${ind}</span> <span>${gameRecords[i].user}</span> <span>${gameRecords[i].score}</span>`;
			if (gameRecords[i].user == user)
				li.style.fontWeight = '700';
			list.appendChild(li);
		};

		showField(recordsField, list)
	}

	function createLi(ind, user, score) {
		let li = document.createElement('li');
		
		li.innerHTML =`<span>${ind}</span> <span>${user}</span> <span>${score}</span>`;
		return li;
	}

	function showField(parentEl, children) {
		parentEl.innerHTML = null;
		parentEl.appendChild(children);
	}

	function endGame() {
		let score = (new Date) - timer;
		setRecords(score);
		startMenu.style.height = 'auto';
	}

	function setRecords(score) {
		let length = gameRecords.length,
		maxLength = 10;

		if (length == maxLength && gameRecords[length].score <= score) {
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
			(item, index, array) => {

			if (item.user == user && item.score == score) {
				alert(`Congratulations ${user}! Your place: ${index+1}, Your score: ${score}`);
			}
			return false;
		});
	}

	function createField() {
		const table = document.createElement('table');
		let rows='';

		for (let i = 0; i < size; i++) {
			let tds = '';

				for (let j = 0; j < size; j++) {
					
					//let flipper = `<div class="flip-container" data-img="${ar[i][j]}">
					//	<div class="flipper">
					//		<div class="front"></div>
					//		<div class="back"><img src="img/${ar[i][j]}.jpg"></div>
					//	 </div>
					//</div>`;
					
					//let cell = document.createElement('td'),
					//img = document.createElement('img');

					let img = `<img src="img/${ar[i][j]}.jpg" data-img="${ar[i][j]}" style="filter:contrast(0)">`;
					
						tds += `<td>${img}</td>`;
					//img.dataset.img = ar[i][j];
					//img.style.filter = 'contrast(0)';
					//cell.appendChild(img);
					//cell.innerHTML = flipper;
					
				}
				rows += `<tr>${tds}</tr>`;
				//table.appendChild(row);
		}
		table.innerHTML = rows;

		table.addEventListener('click', openImg);

		gameField.innerHTML = null; ;
		gameField.appendChild(table);
	}

	function stopPropagation(e) {
		e.stopPropagation();
	}

	function openImg(e) {
		//let target = e.target.className === 'front' ? e.target : null,
		//	table = e.currentTarget;
		//if (!target) {
		//	return;
		//};
		//let cell = target.parentNode.parentNode;
		//
		//if (!current.cell) {
		//	cell.classList.add('open');
		//	current.cell = cell;
		//	return;
		//} else if (current.cell.dataset.img !== cell.dataset.img) {
		//	cell.classList.remove('open');
		//	current.cell.classList.remove('open');
		//	openSecondImg(table, cell);
		//} else {
		//	counter++;
		//	isAllImagesOpened() ? openSecondImg(table, cell, endGame) : openSecondImg(table, cell);
		//};
		//delete current.cell;
		
		////////////////////////////////////////////
		let img = e.target.nodeName === 'IMG' ? e.target : null,
		table = e.currentTarget,
		currentImg = current.img;
		
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
			openSecondImg(table, img, currentImg, 'contrast(0)');
		} else {
			counter++;
			isAllImagesOpened() ? openSecondImg(table, img, currentImg, 'opacity(0)', endGame) : openSecondImg(table, img, currentImg, 'opacity(0)');
		};
		delete current.img;
	}

	function isAllImagesOpened() {
		return counter >= size * size / 2;
	}
	
	//function openSecondImg(table, cell, func) {
	//	table.addEventListener('click', stopPropagation, true);
	//	setTimeout(() => {
	//		cell.classList.add('open');
	//		table.removeEventListener('click', stopPropagation, true);
	//		if (func)
	//			func();
	//	}, 500);
	//}

	function openSecondImg(table, img, currentImg, filter, func) {
		table.addEventListener('click', stopPropagation, true);
		setTimeout(() => {
			img.style.filter = currentImg.style.filter = filter;
			table.removeEventListener('click', stopPropagation, true);
			if (func)
				func();
		}, 500);
	}

	function setGame() {
		let length = size * size / 2,
		arr2 = [];
		for (var i = 0; i < length; i++) {
			arr2[i] = i;
		};

		arr2 = arr2.concat(arr2);
		arr2.sort(() => Math.random() - 0.5);

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
function showRecords() {
	game.showRecords();
}

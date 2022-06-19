let level = 19;
let turn = 0;
let correct = 0;
let cardOne = '';
let cardTwo = '';
let cardOneEl = '';
let cardTwoEl = '';
let numberArray = [];

let container = document.createElement('div');
container.id = 'container';
document.body.prepend(container);

let gameArea = document.createElement('div');
gameArea.id = 'gameArea';
container.append(gameArea);

let gameContent = document.createElement('div');
gameContent.id = 'gameContent';
gameArea.append(gameContent);

createMenu();

function fadeIn(el, time){
	el.style.cssText = 'opacity:1';
	setTimeout(function(){
		el.removeAttribute('style');
	}, time);
}

function fadeOut(el, time){
	el.style.cssText = 'opacity:0;';
	setTimeout(function(){
		el.innerHTML = '';
	}, time);
}

function shuffleArray(arr) {
	arr.sort(() => Math.random() - 0.5);
}

function changeLevel(){
	fadeOut(gameContent, 500);

	setTimeout(function(){
		let levelSelect = document.createElement('input');
		levelSelect.id = 'levelSelect';
		levelSelect.type = 'number';
		levelSelect.min = 1;
		levelSelect.max = 99;
		levelSelect.value = 1;
		gameContent.append(levelSelect);

		let levelSubmit = document.createElement('button');
		levelSubmit.id = 'levelSubmit';
		levelSubmit.innerText = 'Go to Level';
		levelSubmit.addEventListener('click', function(){
			if(levelSelect.value > 0 && levelSelect.value < 100){
				level = levelSelect.value;
				fadeOut(gameContent, 500);
				setTimeout(function(){
					displayLevel();
				}, 500);
			}else{
				levelSelect.style.cssText = 'border: 2px solid red;'
			}
		});
		gameContent.append(levelSubmit);
	}, 600);

	setTimeout(function(){
		fadeIn(gameContent, 500);
	}, 750);
}

function setCards(){
	numberArray = [];
	let numCards = (level < 14)? (level * 2) + 2 : 28;
	let numbers = numCards / 2;
	for(let i = 1; i <= numbers; i++){
		numberArray.push(i);
		numberArray.push(i);
	}
	shuffleArray(numberArray);
}

function createMenu(){
	let title = document.createElement('div');
	title.id = 'title';
	title.innerText = 'Memory Game';
	gameContent.append(title);

	let playBtnOuter = document.createElement('div');
	playBtnOuter.id = 'playBtnOuter';
	gameContent.append(playBtnOuter);

	let playBtn = document.createElement('button');
	playBtn.id = 'playBtn';
	playBtn.innerText = 'Play';
	playBtn.addEventListener('click', function(){
		fadeOut(gameContent, 500);
		setTimeout(function(){
			displayLevel();
		}, 500);

	});
	playBtnOuter.append(playBtn);
	fadeIn(gameContent, 500);
}

function displayLevel(){
	let levelSpan = document.createElement('span');
	levelSpan.id = 'levelSpan';
	levelSpan.innerText = 'level ' + level;
	gameContent.append(levelSpan);
	fadeIn(gameContent, 500);
	setTimeout(function(){
		fadeOut(gameContent, 500);
	}, 2000);
	setTimeout(function(){
		createGame();
	}, 2600);
}

function createGame(){
	setCards();
	let numCards = (level < 14)? (level * 2) + 2 : 28;
	for(let i = 0; i < numCards; i++){
		let card = document.createElement('div');
		card.id = i;
		card.className = 'card';
		gameContent.append(card);

		let cardInner = document.createElement('div');
		cardInner.className = 'cardInner';
		card.append(cardInner);

		let cardFront = document.createElement('div');
		cardFront.className = 'cardFront';
		cardInner.append(cardFront);

		let cardBack = document.createElement('div');
		cardBack.className = 'cardBack';
		cardInner.append(cardBack);

		let cardBackSpan = document.createElement('span');
		cardBackSpan.className = 'cardBackSpan';
		cardBackSpan.innerText = numberArray[i];
		cardBack.append(cardBackSpan);

		card.addEventListener('click', function(){
			if(turn < 2 && cardInner.style.cssText != 'transform: rotateY(180deg);' && cardInner.style.cssText != 'transform: rotateY(180deg); border: 3px solid green;'){
				cardOneEl = (turn == 0)? cardInner : cardOneEl;
				cardTwoEl = (turn == 1)? cardInner : cardTwoEl;
				cardOne = (turn == 0)? cardOne : numberArray[i];
				cardTwo = (turn == 1)? cardTwo : numberArray[i];
				cardInner.style.cssText = 'transform: rotateY(180deg)';
				turn++;
				if(turn == 2){
					if(cardOne == cardTwo){
						cardOneEl.style.cssText = 'transform: rotateY(180deg);border: 3px solid green';
						cardTwoEl.style.cssText = 'transform: rotateY(180deg);border: 3px solid green';
						correct = correct + 2;
						if(correct == numCards){
							level++;
							correct = 0;
							setTimeout(function(){
								fadeOut(gameContent, 500);
							}, 1000);
							setTimeout(function(){
								displayLevel();
							}, 1600);
						}
					}else{
						let coe = cardOneEl;
						let cte = cardTwoEl;
						setTimeout(function(){
							coe.style.cssText = '';
							cte.style.cssText = '';
						}, 1000);
					}
					turn = 0;
					cardOne = '';
					cardTwo = '';
					cardOneEl = '';
					cardTwoEl = '';
				}
			}
		});
	}
	fadeIn(gameContent, 500);
}
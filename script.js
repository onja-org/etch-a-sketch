// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shake = document.querySelector('.shake');
const commandBtns = document.querySelectorAll('.command');
const range = document.querySelector('.range');
const selectColor = document.querySelector('#color-change');

let RAINBOW_COLOR = true;
let RANDOM_COLOR = false;
let moveAmount = 50;

// setup our canvas for drawing
const { width, height } = canvas; // object destructuring (ES6)

// random x and y between 0 and width / height
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = moveAmount;

ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function

// ES6 parameter destructuring
const draw = ({ key }) => {
	if (RAINBOW_COLOR) {
		hue = hue + 10;
	}
	if (RANDOM_COLOR) {
		hue = Math.floor(Math.random() * 360);
	}

	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	console.log(key);
	ctx.beginPath();
	ctx.moveTo(x, y);

	console.log(key, moveAmount);
	// change x and y
	switch (key) {
		case 'ArrowUp':
			y = y - moveAmount;
			break;
		case 'ArrowDown':
			y = y + moveAmount;
			break;
		case 'ArrowLeft':
			x = x - moveAmount;
			break;
		case 'ArrowRight':
			x = x + moveAmount;
			break;
		default:
			break;
	}

	ctx.lineTo(x, y);
	ctx.stroke();
};

// write a handler for the keys (switch statement)
const handleKey = e => {
	if (e.key.includes('Arrow')) {
		//e.preventDefault();
		draw({ key: e.key });
	}
};
// clear / shake function
const clearCanvas = () => {
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height);
	canvas.addEventListener(
		'animationend',
		() => {
			console.log('SHAKED');
			canvas.classList.remove('shake');
		},
		{ once: true }
	);
};

const handleCommands = e => {
	if (!e.target.dataset.key) return;
	draw({ key: e.target.dataset.key });
};

const handleRange = e => {
	e.preventDefault();
	console.log('CHANGE', e.currentTarget.value);
	moveAmount = Math.floor(e.currentTarget.value);
	ctx.lineWidth = moveAmount;
};

const handleColor = e => {
	const colorSelected = e.currentTarget.value;
	e.preventDefault();
	switch (colorSelected) {
		case 'rainbow':
			RAINBOW_COLOR = true;
			RANDOM_COLOR = false;
			break;
		case 'random':
			RAINBOW_COLOR = false;
			RANDOM_COLOR = true;
			break;
		case 'blue':
			hue = 230;
			RAINBOW_COLOR = false;
			RANDOM_COLOR = false;
			break;
		case 'red':
			hue = 0;
			RAINBOW_COLOR = false;
			RANDOM_COLOR = false;
			break;
		case 'green':
			hue = 110;
			RAINBOW_COLOR = false;
			RANDOM_COLOR = false;
			break;
		case 'yellow':
			hue = 60;
			RAINBOW_COLOR = false;
			RANDOM_COLOR = false;
			break;
		default:
			break;
	}
};

// listen for arrow keys
window.addEventListener('keydown', handleKey);
shake.addEventListener('click', clearCanvas);
range.addEventListener('change', handleRange);
selectColor.addEventListener('change', handleColor);
commandBtns.forEach(btn => btn.addEventListener('click', handleCommands));

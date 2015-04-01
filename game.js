var canvas = document.getElementById('game'),
	context = canvas.getContext('2d'),
	keys = {},
	bullets = [],
	player = new Box({
		x: 10,
		y:10,
		width:50,
		height:50,
		color: '#f4ed12',
		speed: 5
	});

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	//add event listeners for key down.
	window.addEventListener('keydown', function (e) {
		keys[e.keyCode] = true;
		//check which key has been pressed..
		console.log('key pressed: ' + e.keyCode);
		//check our object..
		console.log(keys);
		e.preventDefault();
	});

	//delete object when keyup.
	window.addEventListener('keyup', function (e) {
		delete keys[e.keyCode];
	});

	//constructor function to hold our box values..
	function Box(options) {
		this.x = options.x || 10;
		this.y = options.y || 10;
		this.width = options.width || 100;
		this.height = options.height || 100;
		this.color = options.color || '#000000';
		this.speed = options.speed || 5;
		this.direction = options.direction || 'right';
	}

	function update() {
		input(player);
		boundaries(player);

		bullets.forEach(function (b){
			if (b.direction == 'left') {
				b.x -= b.speed;
			}

			if (b.direction == 'right') {
				b.x += b.speed;
			}

			if (b.direction == 'up') {
				b.y -= b.speed;
			}

			if (b.direction == 'down') {
				b.y += b.speed;
			}
		});
	}

	function boundaries(box) {
		if (box.x <= 0) {
			box.x = 0;
		}

		if (box.y <= 0) {
			box.y = 0;
		}

		if (box.x + box.width >= canvas.width) {
			box.x = canvas.width - box.width;
		}

		if (box.y + box.height >= canvas.height) {
			box.y = canvas.height - box.height;
		}
	}

	function drawBox(box) {
		context.fillStyle = box.color;
		context.fillRect(box.x, box.y, box.width, box.height);
	}

	//function to check which keys have been pressed inorder to perform actions..
	function input(player) {
		/*
			37: left
			38: up
			39: right
			40: down
		*/
		if (37 in keys) {
			player.x -= player.speed;
			player.direction = 'left';
		}
		if (39 in keys) {
			player.x += player.speed;
			player.direction = 'right';
		}
		if (38 in keys) {
			player.y -= player.speed;
			player.direction = 'up';
		}
		if (40 in keys) {
			player.y += player.speed;
			player.direction = 'down';
		}

		//finally the bullets (32 = spacebar)..
		if ( 32 in keys) {
			bullets[bullets.length] = new Box({
				x: player.x + player.width / 2,
				y: player.y + player.height / 2,
				width:4,
				height: 4,
				color: '#e3dc01',
				speed: 10,
				direction: player.direction
			});
			// console.log('yes');
		}
	}

	/*
		fillRect:
			x position 10
			y position 10
			width 100
			height 100
	*/
	function draw() {
		//clear the box so we can animate the box and not elongate it.
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawBox(player);

		bullets.forEach(function (b) {
			drawBox(b);
		});
	}

	function loop() {
		// console.log('looping');
		update();
		draw();
		window.requestAnimationFrame(loop);
	}

	loop();
function startGame() {
	myGamePiece = new component(50, 70, "stand.png", 10, 170, "image");
	myScore = new component("20px", "Helvetica", "black", 470, 25, "text");
	myBackground = new component(600, 300, "citymarket.jpg", 0, 0, "image");
	myGameArea.start();
}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function () {
		this.canvas.width = 600;
		this.canvas.height = 300;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener("keydown", function (e) {
			myGameArea.keys = myGameArea.keys || [];
			myGameArea.keys[e.keyCode] = true;
		});
		window.addEventListener("keyup", function (e) {
			myGameArea.keys[e.keyCode] = false;
		});
	},
	stop: function () {
		clearInterval(this.interval);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};

function updateGameArea() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece.crashWith(myObstacles[i])) {
			myGameArea.stop();
			return;
		}
	}
	myGameArea.clear();
	myBackground.update();
	myGameArea.frameNo += 1;
	if (myGameArea.frameNo == 1 || everyinterval(150)) {
		x = myGameArea.canvas.width;
		minHeight = 30;
		maxHeight = 80;
		height = Math.floor(
			Math.random() * (maxHeight - minHeight + 1) + minHeight
		);
		minGap = 50;
		maxGap = 200;
		gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
		myObstacles.push(
			new component(height, 50, "fire.png", gap + 600, 190, "image")
		);
	}
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += -1;
		myObstacles[i].update();
		myGamePiece.speedX = 0;
		myGamePiece.speedY = 0;
		if (myGameArea.keys && myGameArea.keys[37]) {
			myGamePiece.speedX = -1;
		}
		if (myGameArea.keys && myGameArea.keys[39]) {
			myGamePiece.speedX = 1;
		}
		if (myGameArea.keys && myGameArea.keys[38]) {
			myGamePiece.speedY = -10;
		}
		if (myGameArea.keys && myGameArea.keys[40]) {
			myGamePiece.speedY = 1;
		}
	}
	myScore.text = "SCORE: " + +myGameArea.frameNo;
	myScore.update();
	{
		myGamePiece.newPos();
		myGamePiece.update();
	}

	function everyinterval(n) {
		if ((myGameArea.frameNo / n) % 1 == 0) {
			return true;
		}
		return false;
	}
}

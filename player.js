var myGamePiece;

function component(width, height, color, x, y, type) {
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.gravity = 0.05;
	this.gravitySpeed = 0;
	this.floor = height + 55;
	this.bounce = 0.1;
	this.update = function () {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		}
		if (type == "image") {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	this.newPos = function () {
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
	};
	this.hitBottom = function () {
		var rockbottom = myGameArea.canvas.height - this.floor;
		if (this.y > rockbottom) {
			this.y = rockbottom;
			this.gravitySpeed = -(this.gravitySpeed * this.bounce);
		}
	}
	this.crashWith = function (otherobj) {
		var myleft = this.x;
		var myright = this.x + this.width;
		var mytop = this.y;
		var mybottom = this.y + this.height;
		var otherleft = otherobj.x;
		var otherright = otherobj.x + otherobj.width;
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + otherobj.height;
		var crash = true;
		if (
			mybottom < othertop ||
			mytop > otherbottom ||
			myright < otherleft ||
			myleft > otherright
		) {
			crash = false;
		}
		return crash;
	};

}
function move(dir) {
    if (dir == "up") {myGamePiece.speedY = -1; myGamePiece.image.src = "jump2.png"}
	if (dir == "down") { myGamePiece.speedY = 1; myGamePiece.image.src = "down.png";}
    if (dir == "left") {myGamePiece.speedX = -1; myGamePiece.image.src = "back.png" }
    if (dir == "right") {myGamePiece.speedX = 1; myGamePiece.image.src = "run.png"}
}
function accelerate(n) {
	myGamePiece.gravity = n;
  }

function clearmove() {
	myGamePiece.image.src = "stand.png";
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
}

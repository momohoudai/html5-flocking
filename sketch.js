function CheckButton(x, y, w, h, label) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.label = label;
	this.checked = false;
	
}

CheckButton.prototype.draw = function() {
	this.checked ? fill(0, 255, 0) : fill(255, 0, 0);
	stroke(200);
	push();
	translate(this.x, this.y);
	beginShape();
	vertex(0, 0);
	vertex(this.w, 0);
	vertex(this.w, this.h);
	vertex(0, this.h);
	endShape(CLOSE);
		
	
	this.checked ? fill(0) : fill(255);
	textSize(32);
	textAlign(CENTER,CENTER);
	text(this.label, this.w/2, this.h/2);
	pop();
	

}

CheckButton.prototype.collide = function() {
	if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
		if (this.callbackFn != null) {
			this.callbackFn(this);
		}
		this.checked = !this.checked;
		return true;
	}
	return false;
}

function setup() {
	windowResized();
	

	this.boids = [];
	this.isTouchDown = false;
	for(let i = 0; i < 100; ++i) {
		boids.push(new Boid(width / 2, height / 2));
	}
	
	this.buttonAlign = new CheckButton(20, 20, 140, 50, "Align");
	this.buttonSeperate = new CheckButton(20, 80, 140, 50, "Seperate");
	this.buttonCohesion = new CheckButton(20, 140, 140, 50, "Cohere");
}


function windowResized() {
	resizeCanvas(windowWidth * 0.99, windowHeight * 0.98);
}

function draw() {
	background(0);
	
	if (isTouchDown == true) {
		this.boids.push(new Boid(mouseX, mouseY));
	}
	
	for (let boid of boids) {
		boid.flock(this.boids, this.buttonAlign.checked, this.buttonSeperate.checked, this.buttonCohesion.checked ); 
		boid.update();
	}
	
	this.buttonAlign.draw();
	this.buttonSeperate.draw();
	this.buttonCohesion.draw();
}

function touchStarted() {
	if (this.buttonAlign.collide() || this.buttonSeperate.collide() || this.buttonCohesion.collide()) 
		return;
	this.isTouchDown =  true;
}
function touchEnded() {
	this.isTouchDown = false; 
}
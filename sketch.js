
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
	
	//{x, y, w, h, sliderW, sliderH, min, max, value, label}
	this.sliderTest = new Slider({
		x: 400,
		y: 400,
		w: 100, 
		h: 20, 
		sliderW: 20, 
		sliderH: 40, 
		min: 0, 
		max: 100, 
		value: 50, 
		label: "alignment"
	});
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
	
	this.sliderTest.draw();
}

function touchStarted() {
	if (this.buttonAlign.collide() || this.buttonSeperate.collide() || this.buttonCohesion.collide()) 
		return;
	
	if (this.sliderTest.isCollide(mouseX, mouseY)) {
		
		return;
	}
		
	this.isTouchDown =  true;
}
function touchEnded() {
	this.isTouchDown = false; 
}
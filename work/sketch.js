var SLIDER_ALIGNMENT = 0;
var SLIDER_SEPERATE = 1;
var SLIDER_COHESION = 2;

var TYPE_BOID = 0;
var TYPE_PREDATOR = 1;

var DEBUG = false;
var PAUSE = false;
var SPATIAL_PARTITON = true;


function setup() {
	this.grid = new Grid(50, 50);
	windowResized();
	
	this.boids = [];
	this.isTouchDown = false;
	for(let i = 0; i < 500; ++i) {
		boids.push(new Boid(random(0.0, width), random(0.0, height)));
	}
	this.predators = [new Predator(200, 200)];	

	this.sliders = [
		new Slider({
			x: 20,
			y: 110,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 1.0, 
			value: 0.5, 
			label: "alignment",
			textSize: 24,
		}),
		new Slider({
			x: 20,
			y: 150,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 2.0, 
			value: 1.0, 
			label: "seperation",
			textSize: 24,
		}),
		new Slider({
			x: 20,
			y: 190,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 1.0, 
			value: 0.5, 
			label: "cohesion",
			textSize: 24,
		})
	]

	this.spawnSwitch = new Switch({
		x: 20,
		y: 230,
		w: 230,
		h: 50,
		labelT: 'Touch spawns Boids',
		labelF: 'Touch spawns Predators',
		colorT: '#999999',
		colorF: '#CC0000'
	})
}


function windowResized() {
	resizeCanvas(windowWidth * 0.99, windowHeight * 0.98);
	this.grid.resize();
}

function drawStats(x, y) {
	stroke(200);
	fill(255)
	push();
	textSize(20);
	textAlign(LEFT,LEFT);
	text("FPS: " + floor(frameRate()), x ,y);
	text("Boids: " + this.boids.length, x , y + 30);
	text("Predators: " + this.predators.length, x , y + 60);
	pop();
}


function draw() {
	background(0);
	
	// updates
	if (!PAUSE) {
		if (isTouchDown == true) {
			if (this.spawnSwitch.checked)
				this.boids.push(new Boid(mouseX, mouseY));
			else
				this.predators.push(new Predator(mouseX, mouseY));
		}

		this.grid.update(this.boids);
		
		for (let boid of boids) {
			if (SPATIAL_PARTITON) {
				let objList = this.grid.getObjectsInCellAndNeighbours(boid.position.x, boid.position.y)
				let state = {
					boidList: objList,
					predatorList: this.predators,
					alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
					seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
					cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
					alignmentRadius: 50.0,
					seperateRadius: 50.0,
					cohesionRadius: 50.0
				}
				boid.update(state);
			}
			else {
				let state = {
					boidList: this.boids,
					predatorList: this.predators,
					alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
					seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
					cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
					alignmentRadius: 50.0,
					seperateRadius: 50.0,
					cohesionRadius: 50.0
				}
				boid.update(state);
			}
			
		}

		for(let predator of this.predators) predator.update();
		for(let slider of this.sliders) slider.update();
	}

	// Rendering
	for (let boid of boids) boid.draw();
	for(let predator of this.predators) predator.draw();
	for(let slider of this.sliders) slider.draw();
	this.spawnSwitch.draw();

	if (DEBUG) {
		this.grid.drawDebug()
	}
	drawStats(20, 20);


}


function touchStarted() {

	let sliderTouched = false;
	for (let slider of this.sliders) {
		if (slider.touchStarted()) {
			sliderTouched = true;
		}
	}

	if (sliderTouched)
		return;

	if (this.spawnSwitch.processTouch()) 
		return;
		
	this.isTouchDown =  true;
}
function touchEnded() {
	for (let slider of this.sliders) 
		slider.touchEnded();

	this.isTouchDown = false; 
}
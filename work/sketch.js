var SLIDER_ALIGNMENT = 0;
var SLIDER_SEPERATE = 1;
var SLIDER_COHESION = 2;

function setup() {
	this.grid = new Grid(50, 50);
	windowResized();
	

	this.boids = [];
	this.isTouchDown = false;
	for(let i = 0; i < 100; ++i) {
		boids.push(new Boid(random(0.0, width), random(0.0, height)));
	}


	this.predators = [new Predator(200, 200)];

	
	this.sliders = [
		new Slider({
			x: 20,
			y: 20,
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
			y: 60,
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
			y: 100,
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
		y: 140,
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

function draw() {
	background(0);
	
	if (isTouchDown == true) {
		if (this.spawnSwitch.checked)
			this.boids.push(new Boid(mouseX, mouseY));
		else
			this.predators.push(new Predator(mouseX, mouseY));
	}
	
	for (let boid of boids) {
		let state = {
			boidList: this.boids,
			predatorList: this.predators,
			alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
			seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
			cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
		}
		boid.update(state);
	}

	for(let predator of this.predators) {
		predator.update();
	}

	for(let slider of this.sliders) {
		slider.update();
	}
	this.spawnSwitch.draw();

	this.grid.drawDebug();
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
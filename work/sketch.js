var SLIDER_ALIGNMENT = 0;
var SLIDER_SEPERATE = 1;
var SLIDER_COHESION = 2;


function setup() {
	windowResized();
	

	this.boids = [];
	this.isTouchDown = false;
	for(let i = 0; i < 200; ++i) {
		boids.push(new Boid(random(0.0, width), random(0.0, height)));
	}
	
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
			max: 1.0, 
			value: 0.5, 
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
		let state = {
			boidList: this.boids,
			alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
			seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
			cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
		}
		boid.update(state);
	}
	
	for(let slider of this.sliders) {
		slider.update();
	}
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
		
	this.isTouchDown =  true;
}
function touchEnded() {
	for (let slider of this.sliders) 
		slider.touchEnded();

	this.isTouchDown = false; 
}
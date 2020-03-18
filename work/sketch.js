var SLIDER_ALIGNMENT = 0;
var SLIDER_SEPERATE = 1;
var SLIDER_COHESION = 2;

var TYPE_BOID = 0;
var TYPE_PREDATOR = 1;

var DEBUG = false;
var PAUSE = false;
var SPATIAL_PARTITON = true;
var SHOW_MENU = true;



function setup() {
	this.boidCount = 0;
	this.predatorCount = 0;
	this.objs = [];
	this.grid = new Grid(50, 50);
	windowResized();
	

	addPredator(200, 200);
	this.isTouchDown = false;
	for(let i = 0; i < 500; ++i) {
		addBoid(random(0.0, width), random(0.0, height));
	}

	this.sliders = [
		new Slider({
			x: 40,
			y: 130,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 2.0, 
			value: 0.5, 
			label: "alignment",
			textSize: 24,
		}),
		new Slider({
			x: 40,
			y: 170,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 2.0, 
			value: 0.5, 
			label: "seperation",
			textSize: 24,
		}),
		new Slider({
			x: 40,
			y: 210,
			w: 100, 
			h: 10, 
			sliderW: 15, 
			sliderH: 25, 
			min: 0.0, 
			max: 2.0, 
			value: 0.5, 
			label: "cohesion",
			textSize: 24,
		})
	]

	this.spawnSwitch = new Switch({
		x: 40,
		y: 250,
		w: 230,
		h: 50,
		labelT: 'Touch spawns Boids',
		labelF: 'Touch spawns Predators',
		colorT: '#999999',
		colorF: '#CC0000'
	})

	// hide button
	this.hideButton = new CircleButton({x: 20, y: 20, r: 20});

	this.uiBack = new RectBack({x: 5, y: 5, w: 300, h: 320, c: '#005500AA'});
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
	text("Boids: " + this.boidCount, x , y + 30);
	text("Predators: " + this.predatorCount, x , y + 60);
	pop();
}

function addPredator(x, y) {
	this.objs.push(new Predator(x, y));
	this.predatorCount++;
}

function addBoid(x, y) {
	this.objs.push(new Boid(x, y));
	this.boidCount++;
}

function draw() {
	background(0);
	
	// updates
	if (!PAUSE) {
		if (isTouchDown == true) {
			if (this.spawnSwitch.checked)
				addBoid(mouseX, mouseY);
			else
				addPredator(mouseX, mouseY);
		}
		this.grid.update(this.objs);
		
		for (let obj of this.objs) {
			if (SPATIAL_PARTITON) {
				let objList = this.grid.getObjectsInCellAndNeighbours(obj.position.x, obj.position.y)
				let state = {
					objList: objList,
					alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
					seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
					cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
					alignmentRadius: 50.0,
					seperateRadius: 50.0,
					cohesionRadius: 50.0,
					avoidRadius: 50.0
				}
				obj.update(state);
			}
			else {
				let state = {
					objList: this.objs,
					alignmentFactor: this.sliders[SLIDER_ALIGNMENT].getValue(),
					seperateFactor: this.sliders[SLIDER_SEPERATE].getValue(),
					cohesionFactor: this.sliders[SLIDER_COHESION].getValue(),
					alignmentRadius: 50.0,
					seperateRadius: 50.0,
					cohesionRadius: 50.0,
					avoidRadius: 50.0
				}
				obj.update(state);
			}
			
		}

		menuUpdate();
	}

	// Rendering
	for (let obj of this.objs) 
		obj.draw();
	
	menuDraw();

	if (DEBUG) {
		this.grid.drawDebug();
	}

	this.hideButton.draw();
	
}


function touchStarted() {

	if (menuTouchStarted())
		return;
	
	if (this.hideButton.isCollide(mouseX, mouseY)) {
		SHOW_MENU = !SHOW_MENU;
		return;
	}
		
	this.isTouchDown =  true;
}
function touchEnded() {
	menuTouchEnded();

	this.isTouchDown = false; 
}

function menuDraw() {
	if (!SHOW_MENU) 
		return;

	this.uiBack.draw(0, 80, 0, 200);



	for(let slider of this.sliders) 
		slider.draw();
	this.spawnSwitch.draw();
	drawStats(40, 40);
}

function menuUpdate(){
	for(let slider of this.sliders) 
		slider.update();
}

function menuTouchStarted() {
	if (!SHOW_MENU) 
		return false;
	
	let sliderTouched = false;
	for (let slider of this.sliders) {
		if (slider.touchStarted()) {
			sliderTouched = true;
		}
	}

	if (sliderTouched)
		return true;

	if (this.spawnSwitch.processTouch()) 
		return true;

	if (this.uiBack.isCollide(mouseX, mouseY))
		return true;
	
	return false;
}

function menuTouchEnded() {
	if (!SHOW_MENU) 
		return;
	 
	for (let slider of this.sliders) 
		slider.touchEnded();
}

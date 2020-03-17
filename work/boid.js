

function Boid(x, y) {

	this.maxSpeed = 3;
	this.maxSteer = 0.05;
	this.radius = 5;

	this.acceleration = createVector(0,0);
	this.velocity = createVector(random(-2, 2), random(-2, 2));
	this.velocity.normalize();
	this.velocity.mult(this.maxSpeed);
	this.position = createVector(x, y);
	this.oldPosition = createVector(x, y);

	this.alignmentRadius = 50.0;
	this.seperateRadius = 50.0;	
	this.cohesionRadius = 50.0;
	this.avoidRadius = 50.0;

	this.type = TYPE_BOID;

}

Boid.prototype.update = function(state)
{
	this.flock(state);
	this.integrate();
	this.wrap();
}



Boid.prototype.flock = function({objList, predatorList, alignmentFactor, seperateFactor, cohesionFactor}) {
	let alignmentForce = createVector(0.0);
	let seperateForce = createVector(0.0);
	let cohesionForce = createVector(0.0);
	let neighbourCount = 0;

	for(let obj of objList) {
		alignmentForce.add(this.align(obj));
		seperateForce.add(this.seperate(obj));
		cohesionForce.add(this.cohere(obj));
		++neighbourCount;
	}

	if (neighbourCount > 0 ) {
		alignmentForce.div(neighbourCount);
		alignmentForce.normalize();
	}

	this.addForce(p5.Vector.mult(alignmentForce, alignmentFactor));
	this.addForce(p5.Vector.mult(seperateForce, seperateFactor));
	this.addForce(p5.Vector.mult(cohesionForce, cohesionFactor));
}

Boid.prototype.align = function(obj) {
	if (obj.type != TYPE_BOID)
		return;
	let vec = createVector(0,0);
	let distance = p5.Vector.dist(this.position, obj.position);
	if (distance > 0 && distance < this.alignmentRadius) {
		// Accumulate velocity based on distance
		vec.set(obj.velocity);
		if (vec.magSq() > 0)
			vec.normalize();
		let factorBaseOnDistance = lerp(1.0, 0.0, distance/this.alignmentRadius);
		vec.mult(factorBaseOnDistance)
	}
	return vec;
}

Boid.prototype.avoid = function(obstacleList) {
	let obstacleCount = 0;
	let dir = createVector(0,0);
	for (let obstacle of obstacleList) {
		let distance = p5.Vector.dist(this.position, obstacle.position);
		if (distance > 0 && distance < this.avoidRadius) {
			dir = p5.Vector.sub(this.position, obstacle.position);
			++obstacleCount;
		}
	}

	if (obstacleCount > 0 ) {
		dir.div(obstacleCount);
	
		if (dir.mag() > 0) {
			dir.normalize();
			dir.mult(this.maxSpeed);
			dir.sub(this.velocity);
			dir.limit(this.maxSteer);
		}
	
		return dir;
	}
	else {
		return createVector(0,0)
	}
}

Boid.prototype.cohere = function(boidList) {

	// Find the center of all boids around current boid
	// Midpoint formula: (all positions)/(number of positions)
	let neighbourCount = 0;
	let midpoint = createVector(0,0);
	
	for (let boid of boidList) {
		let distance = p5.Vector.dist(this.position, boid.position);
		if (distance > 0 && distance < this.cohesionRadius) {
			midpoint.add(boid.position);
			neighbourCount++;
		}
	}
	
	if(neighbourCount > 0)
	{
		midpoint.div(neighbourCount);
		let dir = p5.Vector.sub(midpoint, this.position);
		if (dir.magSq() > 0)
			dir.normalize();
		dir.mult(this.maxSpeed);
		dir.sub(this.velocity);
		dir.limit(this.maxSteer);
		return dir;
	}
	else {
		return createVector(0,0);
	}
}

Boid.prototype.seperate = function(boidList) {
	let neighbourCount = 0;
	let dir = createVector(0,0);
	// For each neighbour, accumulate all vector from neighbour to current boid.
	for(let boid of boidList) {
		let distance = p5.Vector.dist(this.position, boid.position);
		if (distance > 0 && distance < this.seperateRadius) {
			// Accumulate velocity based on distance
			let diff = p5.Vector.sub(this.position, boid.position);
			if (diff.magSq() > 0)
				diff.normalize();	
			
			let factorBaseOnDistance = lerp(1.0, 0.0, distance/this.seperateRadius);
			diff.mult(factorBaseOnDistance)
			dir.add(diff);
			neighbourCount++;
		}
	}
	
	if (neighbourCount > 0 ) {
		dir.div(neighbourCount);
	
		if (dir.mag() > 0) {
			// Implement Reynolds: Steering = Desired - Velocity
			// Desired = dir * maxSpeed
			// https://www.youtube.com/watch?v=4zhJlkGQTvU
			dir.normalize();
			dir.mult(this.maxSpeed);
			dir.sub(this.velocity);
			dir.limit(this.maxSteer);
		}
	
		return dir;
	}
	else {
		return createVector(0,0);
	}
}

Boid.prototype.addForce = function(force) {
	this.acceleration.add(force);
}

Boid.prototype.integrate = function() {
	this.oldPosition = this.position.copy();
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.maxSpeed);
	this.position.add(this.velocity);
	this.acceleration.mult(0);

}

Boid.prototype.wrap = function()  {
	if (this.position.x > width + this.radius)
		this.position.x = -this.radius;
	if (this.position.x < -this.radius) 
		this.position.x = width + this.radius;
	if (this.position.y > height + this.radius)
		this.position.y = -this.radius;
	if (this.position.y < -this.radius) 
		this.position.y = height + this.radius;
}

Boid.prototype.draw = function() {
	// Draw a triangle rotated in the direction of velocity
	let theta = this.velocity.heading() + radians(90);
	fill(127, 127, 127);
	stroke(200);
	push();
	translate(this.position.x, this.position.y);
	rotate(theta);
	beginShape();
	vertex(0, -this.radius * 2);
	vertex(-this.radius, this.radius * 2);
	vertex(this.radius, this.radius * 2);
	endShape(CLOSE);
	pop();
}


function Predator(x, y) {
	this.maxSpeed = 1.5;
	this.maxSteer = 0.05;

	
	this.position = createVector(x, y);
	this.velocity = createVector(random(-2, 2), random(-2, 2));
	this.acceleration = createVector(0, 0);
	this.velocity.normalize();
	this.idealDirection = this.velocity.copy();
	this.velocity.mult(this.maxSpeed);

	this.radius = 5;

	this.randomMovementTimer = 0.0;
	this.randomMovementDuration = random(2500.0, 5000.0);
	this.maxSteer = 0.05;
	this.idealDirection = createVector(0,0)
	
}

Predator.prototype.update = function() {
	this.randomMovement();
	
	this.integrate();
	this.wrap();

	this.render();
}
Predator.prototype.randomMovement = function() {
	if (this.randomMovementTimer > this.randomMovementDuration) {
		this.idealDirection = createVector(random(-1.0, 1.0), random(-1.0, 1.0));
		this.idealDirection.normalize();
		this.idealDirection.mult(this.maxSpeed);
		this.idealDirection.sub(this.velocity);
		this.idealDirection.limit(this.maxSteer);
		this.randomMovementTimer = 0.0;
		this.randomMovementDuration = random(2500.0, 5000.0);
	}
	this.randomMovementTimer += deltaTime;

	this.addForce(this.idealDirection);
}

Predator.prototype.addForce = function(force) {
	this.acceleration.add(force);
}

Predator.prototype.integrate = function() {
	this.velocity.add(this.acceleration);
	this.velocity.limit(this.maxSpeed);
	this.position.add(this.velocity);
	this.acceleration.mult(0);

}

Predator.prototype.wrap = function()  {
	if (this.position.x > width + this.radius)
		this.position.x = -this.radius;
	if (this.position.x < -this.radius) 
		this.position.x = width + this.radius;
	if (this.position.y > height + this.radius)
		this.position.y = -this.radius;
	if (this.position.y < -this.radius) 
		this.position.y = height + this.radius;
}
Predator.prototype.render = function() {
	// Draw a triangle rotated in the direction of velocity
	let theta = this.velocity.heading() + radians(90);
	fill(255, 0, 0);
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

function Predator(x, y) {
	this.maxSpeed = 1.5;
	this.maxSteer = 0.05;

	this.position = createVector(x, y);
	this.velocity = createVector(random(-2, 2), random(-2, 2));
	this.velocity.normalize();
	this.velocity.mult(this.maxSpeed);

	this.radius = 5;
}

Predator.prototype.update = function() {
	this.position.add(this.velocity);
	this.integrate();
	this.wrap();

	this.render();
}
Predator.prototype.integrate = function() {
	this.position.add(this.velocity);
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
function Slider({x, y, w, h, sliderW, sliderH, min, max, value, label}){
	this.x = x;
	this.y = y; 
	this.w = w;
	this.h = h;

	this.sliderW = sliderW;
	this.sliderH = sliderH;
	this.label = label;
	this.min = min;
	this.max = max;
	this.value = constrain(value, this.min, this.max);
	
	let minSliderX = this.x - this.sliderW/2;
	let maxSliderX = this.x + this.w - this.sliderW/2;
	this.sliderX = lerp(minSliderX, maxSliderX, value/max);
	this.sliderY = this.y - this.sliderH/4;

}	

Slider.prototype.draw = function() {
	fill(255)
	stroke(200);
	
	push();
	translate(this.x, this.y);
	beginShape(); // slider 
	vertex(0, 0);
	vertex(this.w, 0);
	vertex(this.w, this.h);
	vertex(0, this.h);
	endShape(CLOSE);
	pop();
	
	push();
	translate(this.sliderX, this.sliderY);
	beginShape(); // bar 
	vertex(0, 0);
	vertex(this.sliderW, 0);
	vertex(this.sliderW, this.sliderH);
	vertex(0, this.sliderH);
	endShape(CLOSE);
	pop();
}

Slider.prototype.isCollide = function(x, y) {
	// Bar collision
	if ( x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h)
		return true;
	
	if ( x >= this.sliderX && x <= this.sliderX + this.sliderW && 
		 y >= this.sliderY && y <= this.sliderY + this.sliderH )
		 return true;
	return false;
}

Slider.prototype.drag = function(x,y) {
	if ( x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h)
		return true;
	
	if ( x >= this.sliderX && x <= this.sliderX + this.sliderW && 
		 y >= this.sliderY && y <= this.sliderY + this.sliderH ) {
	
	}
	
}


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

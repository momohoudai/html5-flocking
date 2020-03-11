function Slider({x, y, w, h, sliderW, sliderH, min, max, value, label, textSize}){
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
	this.textSize = textSize;
	
	this.minSliderX = this.x - this.sliderW/2;
	this.maxSliderX = this.x + this.w - this.sliderW/2;
	
	this.sliderX = lerp(this.minSliderX, this.maxSliderX, this.value/this.max);
	this.sliderY = this.y + this.h/2 - this.sliderH/2;

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

		
	fill(255);
	textSize(this.textSize);
	textAlign(LEFT, CENTER);
	text(this.label, this.x + this.w + this.textSize/2, this.y + this.h/2);
}

Slider.prototype.update = function() {

	this.slide();
	this.draw();
}

Slider.prototype.slide = function() {
	if(this.isDragging) {
		this.sliderX = constrain(mouseX - this.sliderW/2, this.minSliderX, this.maxSliderX);		
		this.getValue();
	}
}

Slider.prototype.getValue = function() {
	let sliderMidX = this.sliderX + this.sliderW/2;
	let percentage = ((sliderMidX - this.x) / this.w) 
	return lerp(this.min, this.max, percentage);
	 
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

Slider.prototype.touchStarted = function() {
		
	if (this.isCollide(mouseX, mouseY)) {
		this.isDragging = true;
	    return true;
	}
	return false;
	
}

Slider.prototype.touchEnded = function() {
	this.isDragging = false;
}


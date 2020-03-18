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

function Switch({x, y, w, h, labelT, labelF, colorT, colorF}) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.labelT = labelT;
	this.labelF = labelF;
	this.colorT = colorT;
	this.colorF = colorF;
	
	this.checked = true;
	
}

Switch.prototype.draw = function() {
	this.checked ? fill(this.colorT) : fill(this.colorF);
	stroke(200);
	push();
	translate(this.x, this.y);
	beginShape();
	vertex(0, 0);
	vertex(this.w, 0);
	vertex(this.w, this.h);
	vertex(0, this.h);
	endShape(CLOSE);
	fill(255)
	textSize(20);
	textAlign(CENTER,CENTER);
	text(this.checked ? this.labelT : this.labelF, this.w/2, this.h/2);
	pop();
}
	

Switch.prototype.processTouch = function() {
	if (mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
		this.checked = !this.checked;
		return true;
	}
	return false;
}


function CircleButton({x, y, r, c}) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
}

CircleButton.prototype.draw = function() {
	fill(this.color);
	circle(this.x, this.y, this.radius);
}

CircleButton.prototype.isCollide = function(x,y) {
	let vec = createVector(x - this.x, y - this.y);
	let distance = vec.mag();

	return distance <= this.radius;
}

function RectBack({x,y,w,h,c}) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = c;

}

RectBack.prototype.isCollide = function(x,y) {
	return x >= this.x && x <= this.x + this.w && 
		y >= this.y && y <= this.y + this.h;
}

RectBack.prototype.draw = function() {
	fill(this.color)
	rect(this.x, this.y, this.w, this.h);
}

function Button({x,y,w,h, color, colorDown, text}) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
	this.colorDown = colorDown;
	this.text = text;
	this.isDown = false;
}

Button.prototype.draw = function() {
	fill(this.isDown ? this.colorDown : this.color);
	textSize(20);
	textAlign(CENTER,CENTER);
	text(this.text, this.w/2, this.h/2);
	rect(this.x, this.y, this.w, this.h);
}

RectBack.prototype.isCollide = function(x,y) {
	return x >= this.x && x <= this.x + this.w && 
		y >= this.y && y <= this.y + this.h;
}

Button.prototype.processTouch = function() {
	if (this.isCollide(mouseX, mouseY)) {
		this.isDown = true;
		return true;
	}
	else {
		this.isDown = false;
		return false;
	}
}
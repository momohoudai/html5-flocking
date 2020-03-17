function Grid(cw, ch) {
    this.cw = cw; //cell width in pixels
    this.ch = ch; //cell height in pixels

    this.rows = 0;
    this.cols = 0;

    this.arr = [];
    this.resize();
}

Grid.prototype.resize = function() {
    this.cols = ceil(width / this.cw); 
    this.rows = ceil(height / this.ch); 

    this.arr.length = this.rows * this.cols;
}

Grid.prototype.update = function(boidList) {
    
}

Grid.prototype.hash = function(x, y) {
    let xx = floor(x / this.ch);
    let yy = floor(y / this.cw);

    return floor(this.cols * yy + xx);
}


Grid.prototype.drawDebug = function() {
    let h = this.hash(mouseX, mouseY);
    let x = floor(floor(h % this.cols) * this.cw);
    let y = floor(floor(h / this.cols) * this.ch);
    console.log(h);
    fill(0,0,0,0);
	stroke(200);
	push();
	translate(x, y);
	beginShape();
	vertex(0, 0);
	vertex(this.cw, 0);
    vertex(this.cw, this.ch);
    vertex(0, this.ch);
	endShape(CLOSE);
	pop();
}



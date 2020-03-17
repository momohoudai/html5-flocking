function Grid(cw, ch) {
    this.cw = cw; //cell width in pixels
    this.ch = ch; //cell height in pixels

    this.rows = 0;
    this.cols = 0;

    this.arr = [];
    this.resize();
}

Grid.prototype.getObjectsInCell = function(x, y) {
    let h = this.hash(x,y);
    if (h >= 0)
        return this.arr[h];
    return null;
}

Grid.prototype.resize = function() {
    this.cols = ceil(width / this.cw); 
    this.rows = ceil(height / this.ch); 

    this.arr.length = this.rows * this.cols;
    this.clear();
}

Grid.prototype.clear = function() {
    for(let i = 0; i < this.arr.length; ++i) {
        this.arr[i] = [];
    }
}

Grid.prototype.update = function(list) {
    this.clear();
    for (let obj of list) {
        // get the hash of the boid
        let h = this.hash(obj.position.x, obj.position.y);
        if (h >= 0)
            this.arr[h].push(obj);
    }    
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
    if (h < 0) 
        return;
    console.log(this.arr[h].length);
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



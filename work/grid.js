function Grid(cw, ch) {
    this.cw = cw; //cell width in pixels
    this.ch = ch; //cell height in pixels

    this.rows = 0;
    this.cols = 0;

    this.arr = [];
    this.resize();
}

Grid.prototype.isHashValid = function(h) {
    return h >= 0 && h < this.rows * this.cols;
}

Grid.prototype.getObjectsInCell = function(x, y) {
    let h = this.hash(x,y);
    if (this.isHashValid(h))
        return this.arr[h];
    return null;
}

Grid.prototype.getObjectsInCellByHash = function(h) {
    if (this.isHashValid(h))
        return this.arr[h];
    return null;
}

Grid.prototype.getObjectsInCellAndNeighbours = function(x,y) {
    let h = this.hash(x,y);
    if (!this.isHashValid(h))
        return [];

    let result = [];
    let t = null;

    t = this.getObjectsInCellByHash(h - this.cols - 1); if (t) result.push(...t); // top
    t = this.getObjectsInCellByHash(h - this.cols + 0); if (t) result.push(...t); // top
    t = this.getObjectsInCellByHash(h - this.cols + 1); if (t) result.push(...t); // top-right
    t = this.getObjectsInCellByHash(h - 1); if (t) result.push(...t); // left
    t = this.getObjectsInCellByHash(h + 0); if (t) result.push(...t); // middle
    t = this.getObjectsInCellByHash(h + 1); if (t) result.push(...t); // right
    t = this.getObjectsInCellByHash(h + this.cols - 1); if (t) result.push(...t); // bottom-left
    t = this.getObjectsInCellByHash(h + this.cols + 0); if (t) result.push(...t); // bottom
    t = this.getObjectsInCellByHash(h + this.cols + 1); if (t) result.push(...t); // bottom-right


    return result;
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
        if (this.isHashValid(h))
            this.arr[h].push(obj);
    }    
}
/*
Grid.prototype.update = function(list) {
    for (let obj of list) {
        // get the hash of the boid
        let nh = this.hash(obj.position.x, obj.position.y);
        let oh = this.hash(obj.oldPosition.x, obj.oldPosition.y);
        if (nh == oh) // ignore if the  
            continue;
        if (this.isHashValid(h))
            this.arr[h].push(obj);
    }    
}*/

Grid.prototype.hash = function(x, y) {
    let xx = floor(x / this.ch);
    let yy = floor(y / this.cw);

    return floor(this.cols * yy + xx);
}


Grid.prototype.drawDebug = function() {
    let h = this.hash(mouseX, mouseY);
    let x = floor(floor(h % this.cols) * this.cw);
    let y = floor(floor(h / this.cols) * this.ch);
    if (!this.isHashValid(h))
        return;
    //console.log(this.getObjectsInCellAndNeighbours(mouseX, mouseY).length)
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



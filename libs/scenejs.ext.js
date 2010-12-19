Camera = SceneJS.Camera;



Spherical  = SceneJS.createNodeType("spherical");
Planet  = SceneJS.createNodeType("planet");
Globe  = SceneJS.createNodeType("globe");
Circle  = SceneJS.createNodeType("circle", "geometry");
Curve  = SceneJS.createNodeType("curve", "geometry");


SceneJS.LookAt.prototype.setTarget = function(target) {

	dx = target.x - this._lookX;
  dy = target.y - this._lookY;
	dz = target.z - this._lookZ;
	dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
	
	this._eyeX += dx;
	this._eyeY += dy;
	this._eyeZ += dz;
	this.translate(0.0,0.0,-dist);

	this.setLook({x: this._eyeX + this.dir.x, y: this._eyeY + this.dir.y, z: this._eyeZ + this.dir.z});
  this.setUp(this.up);
	this._setDirty(); 
}


SceneJS.LookAt.prototype._init = function(params) {
    this._mat = null;
    this._xform = null;

		this._yaw = 0.0;
		this._pitch = 0.0;		
		this._roll = 0.0;		
		this.up = params.up;
		this.right = {x: 1.0, y:0.0, z:0.0};
		this.dir = {x: 0.0, y:0.0, z:1.0};
		
    this.setEye(params.eye);
    this.setUp(params.up);

    this.setLook(params.look);

};

SceneJS.LookAt.prototype.update = function() {
  sinPitch = Math.sin(this._pitch);
  cosPitch = Math.cos(this._pitch);
  sinYaw   = Math.sin(this._yaw); 
  cosYaw   = Math.cos(this._yaw);
  sinRoll  = Math.sin(this._roll);
  cosRoll  = Math.cos(this._roll);
  
  this.right.x = cosYaw*cosRoll + sinYaw*sinPitch*sinRoll;
  this.right.y = sinRoll*cosPitch;
  this.right.z = cosYaw*sinPitch*sinRoll - sinYaw*cosRoll;

  this.up.x = sinYaw*sinPitch*cosRoll - cosYaw*sinRoll;
  this.up.y = cosRoll*cosPitch;
  this.up.z = sinRoll*sinYaw + cosRoll*cosYaw*sinPitch;

  this.dir.x = cosPitch*sinYaw;
  this.dir.y = -sinPitch;
  this.dir.z = cosPitch*cosYaw;  
  
  this.setLook({x: this._eyeX + this.dir.x, y: this._eyeY + this.dir.y, z: this._eyeZ + this.dir.z});
  this.setUp(this.up);
	this._setDirty();  
}

SceneJS.LookAt.prototype.translate = function(x,y,z) {
	this._eyeX += this.dir.x * z;
	this._eyeY += this.dir.y * z;
	this._eyeZ += this.dir.z * z;
	this._eyeX += this.right.x * x;
	this._eyeY += this.right.y * x;
	this._eyeZ += this.right.z * x;
	this._lookX = this._eyeX + this.dir.x;
	this._lookY = this._eyeY + this.dir.y;
	this._lookZ = this._eyeZ + this.dir.z;
	this._setDirty();
}


SceneJS.LookAt.prototype.rotate = function(x,y,z) {
	this._pitch += x;
	this._yaw  += y;
	this._roll += z;
}


getNodePos = function(node) {
  query = new SceneJS.utils.query.QueryNodePos({ canvasWidth : 1, canvasHeight : 1	});
	query.execute({ nodeId: node });
	return query.getResults().worldPos;
}



Sunlight = function() {
	return new SceneJS.Light({
          mode: "point",
          pos: { x: 0.0, y: 0.0, z: 0.0 }, // Position
          color: { r: 1.0, g: 1.0, b: 1.0 },
          diffuse: true,   // Contribute to diffuse lighting
          specular: true,  // Contribute to specular lighting
        })
}

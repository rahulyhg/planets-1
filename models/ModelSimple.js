

/**
 * @constructor
 */
ModelSimple = function(params) {
	BasePlanetModel.call(this);	
    params.name = "ModelSimple";
    params.spheres = 2;
    this.init(params);

    this.sun.setEnabled(false);
    
    this.setSpeed0 = function(speed) {
        this.sphere[0].setSpeed(-speed);
    }
    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.update = function(time) {
        this.addCurve(0, this.root, this.calcCurve({depth: -1, node: this.planet.mesh}), colors["Path"]);
        BasePlanetModel.prototype.update.call(this, time);
    }

};

ModelSimple.prototype = new BasePlanetModel;
ModelSimple.prototype.constructor = ModelSimple;

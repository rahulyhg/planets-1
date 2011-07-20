
Wurst = function() {
    this.setAxisAngle1 = function(angle) {
        this.sphere[1].setAxisAngle(90 - angle);
    }


    this.setSpeed3 = function(speed) {
        this.sphere[3].setSpeed(speed);
        this.sphere[4].setSpeed(-speed);
    }
}
/**
 * @constructor
 */
Model4 = function(params) {
	BasePlanetModel.call(this);
	params.name = params.name || "Model4";
  params.spheres = params.spheres || 4;
   
  this.genSpheres(params);
  Wurst.call(this);




    this.update = function(time) {
        this.addCurve({index: 0, anchor: this.sphere[1].anchor, start: 1, stop: 5, node: this.planet.mesh, color: colors["Path"]});
        this.addCurve({index: 1, anchor: this.sphere[2].anchor, start: 2, stop: 5, node: this.planet.mesh, color: colors["Hippo"]});
        BasePlanetModel.prototype.update.call(this, time);
        
    }
};

Model4.prototype = new BasePlanetModel;
Model4.prototype.constructor = Model4;


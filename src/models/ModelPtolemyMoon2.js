

/**
 * @constructor
 * @extends ModelPtolemyBase
 */
ModelPtolemyMoonBase = function() {
}

ModelPtolemyMoonBase.prototype = new ModelPtolemyBase;
ModelPtolemyMoonBase.prototype.constructor = ModelPtolemyMoonBase;

ModelPtolemyMoonBase.prototype.create = function(params) {
	  ModelPtolemyBase.prototype.create.call(this, params);	
    this.factor = 1.0/7.0;


    this.updateSunDist = function() {
      this.realSunS[1].setScale(this.sphere[3].radius*this.factor);
      this.realSunS[2].setScale(this.sphere[3].equant*this.factor);
      this.realSunS[2].anchor.position.z = this.sphere[3].radius*this.factor; 
      this.realSun.setDist(this.sphere[3].equant*this.factor);  
    };
    
    
    /** @override */
    this.adjustAnomaly = function() {
      var tmp = this.sphere[2].getRotateAngle() - 2*this.sphere[3].getRotateAngle(); 
      this.sphere[2].anchor.rotation.y = tmp/PI_SCALE;
      var tmp = 2*this.sphere[3].getRotateAngle();
      var realAngle = tmp/PI_SCALE - Math.asin((-this.sphere[2].radius/this.sphere[3].radius) * Math.sin(tmp/PI_SCALE));      
      this.sphere[3].anchor.rotation.y = realAngle;
      this.sphere[4].anchor.rotation.y = -this.sphere[4].anchor.rotation.y;

      //TODO: magic??? 
      var lambdaN = mod(this.lambdaAN/PI_SCALE - this.wd/PI_SCALE, 360);
      // inclination correction
      this.ptolemySphere.pivot.rotation.y = lambdaN;
      this.ptolemySphere.anchor.rotation.y -= lambdaN;   


      // mean anomaly correction
      //TODO: 2 disjoint models :)
      if(this.state.accurateMoon) {
        var realAngle2 = tmp/PI_SCALE - Math.asin((this.sphere[2].radius/this.sphere[3].radius) * Math.sin(tmp/PI_SCALE));            
        var adjustment = realAngle2-realAngle;
      } else {
        var adjustment = tmp/PI_SCALE-realAngle;
      }
      this.sphere[4].anchor.rotation.y += adjustment;   
      
    }

    // override setBaseRadius to draw corret sphere 3 line from crank to epi
    this.oldSetBaseRadius = this.setBaseRadius;
    this.setBaseRadius = function(value) {
      this.oldSetBaseRadius(value);
      if(this.state.accurateMoon) this.sphere[2].crankPoint.position.z = -this.sphere[2].radius*this.factor;
    }
};


/**
 * @constructor
 * @extends ModelPtolemyMoonBase
 */
ModelPtolemyMoon2 = function() {
  this.create();
}

ModelPtolemyMoon2.prototype = new ModelPtolemyMoonBase;
ModelPtolemyMoon2.prototype.constructor = ModelPtolemyMoon2;
ModelPtolemyMoon2.prototype.name = "ModelPtolemyMoon2";




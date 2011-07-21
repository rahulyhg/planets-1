

/**
 * @constructor
 */
ModelPtolemyMoon2 = function(params) {
    params.name = "ModelPtolemyMoon2";
    params.spheres = 4;
	  ModelPtolemyBase.call(this, params);	
    this.factor = 1.0/7.0;
    this.setAnimSpeed(600);


    this.updateSunDist = function() {
      this.realSunS[1].setScale(this.sphere[3].radius*this.factor);
      this.realSunS[2].setScale(this.sphere[3].equant*this.factor);
      this.realSunS[2].anchor.position.z = this.sphere[3].radius*this.factor; 
      this.realSun.setDist(this.sphere[3].equant*this.factor);  
    };
    
    this.adjustAnomaly = function() {
      var tmp = this.sphere[2].getRotateAngle() - 2*this.sphere[3].getRotateAngle(); 
      this.sphere[2].anchor.rotation.y = degToRad(tmp);
      var tmp = 2*this.sphere[3].getRotateAngle();
      var realAngle = tmp/PI_SCALE - Math.asin((-this.sphere[2].radius/this.sphere[3].radius) * Math.sin(tmp/PI_SCALE));      
      this.sphere[3].anchor.rotation.y = realAngle;
      var adjustment = tmp/PI_SCALE-realAngle;

      var realAngle2 = tmp/PI_SCALE - Math.asin((this.sphere[2].radius/this.sphere[3].radius) * Math.sin(tmp/PI_SCALE));            
//      var adjustment = realAngle2-realAngle;

      this.sphere[4].anchor.rotation.y += adjustment;      
      
    }
        
    
    this.reset = function () {
        ModelBase.prototype.reset.call(this);
        this.setEquant( Utils.toDec(this.currentPlanet.equant));
        this.setRadiusD( Utils.toDec(this.currentPlanet.derefentRadius) ); 
        this.setRadiusE( Utils.toDec(this.currentPlanet.epicycleRadius) ); 
        this.sphere[2].setOffsetRotateAngle( 0 );
        this.sphere[2].setOffsetRotateSpeed( 0 );        
        this.sphere[3].setOffsetRotateAngle( 0 );
        this.sphere[3].setOffsetRotateSpeed( 0 );
       
        this.sphere[4].setBobAngle(0);
        
        //TODO: move to preset
        this.sphere[2].radius = 12.5;
        this.sphere[2].setScale(this.sphere[2].radius*this.factor);
        this.sphere[3].pivot.position.z = this.sphere[2].radius*this.factor;        
        
        this.adjustAnomaly();       
        
       
        // sun stuff
        this.realSunS[1].setOffsetRotateSpeed(0);
        this.realSunS[1].setOffsetRotateAngle( 56.5 );    
        this.realSunS[1].setRotateAngle( 274.25 );
        this.realSunS[2].setRotateAngle( (360-274.25) );

        this.realSunS[2].setScale(0);
        this.realSun.setDist(0);
        this.realSunS[1].setSpeed(365.2466666);
        this.realSunS[2].setSpeed(-365.2466666);

    }    

    
};

ModelPtolemyMoon2.prototype = new ModelBase;
ModelPtolemyMoon2.prototype.constructor = ModelPtolemyMoon2;

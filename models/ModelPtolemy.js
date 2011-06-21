

/**
 * @constructor
 */
ModelPtolemy = function(params) {
	BasePlanetModel.call(this);	
    params.name = "ModelPtolemy";
    params.spheres = 2;
    this.init(params);

    this.factor = 1.0/10.0;
    
    this.sphere[0].realAngle = 0;


    this.epicycleRadius = [ {x: 0,y: 0,z: 0}, {x: 0, y: 0,z: 10} ];
    this.epicycleRadiusLine = new Curve({trails: false, pos: this.epicycleRadius, color: colors["S1"] }); 
    this.root.addNode(this.epicycleRadiusLine);
    
    this.deferentRadius = [ {x: 0,y: 0,z: 0}, {x: 0, y: 0,z: 10} ];
    this.deferentRadiusLine = new Curve({trails: false, pos: this.deferentRadius, color: colors["S0"] }); 
    this.root.addNode(this.deferentRadiusLine);


    
    this.equantPlanet = [ {x: 0,y: 0,z: 0}, {x: 0, y: 0,z: 10} ];
    this.equantPlanetLine = new Curve({trails: false, pos: this.equantPlanet, color: {r:1.0,g:1.0,b:0.0} }); 
    this.root.addNode(this.equantPlanetLine);
    
    this.setShowSphere0(false);
    this.setShowSphere1(false);
    
    this.setShowSphere0 = function(state) { this.sphere[0].setVisuals(["npole","equator"], state) };
    this.setShowSphere1 = function(state) { this.sphere[1].setVisuals(["equator"], state) };
    
    
    this.setEquant = function(value) {
      this.sphere[0].equant = value;
      this.earth.setDist(value*this.factor);
      this.equantPlanet[0] = {x: 0,y: value*this.factor, z: 0};
    };
    this.getEquant = function() { return this.sphere[0].equant; }
    
    this.sphere[0].updateMovement = function(step) {
      this.rotateAngle += this.step * step;
      
      this.setRotateAngle(this.rotateAngle);
    };
  
    this.sphere[0].setRotateAngle = function(angle) {
      this.rotateAngle = angle; 
      var realAngle = this.rotateAngle/PI_SCALE - Math.asin((this.equant/this.radius) * Math.sin(this.rotateAngle/PI_SCALE));
      this.setArcAngle(realAngle*PI_SCALE);
      this.anchor.rotation.y = realAngle;
    };

    this.setRadius0 = function(value) {
      this.sphere[0].radius = value;
      this.sphere[0].setScale(value*this.factor);
      this.sphere[0].visuals.npole.position.y = 0.0;      
      this.sphere[1].anchor.position.z = value*this.factor;

    };
    this.getRadius0 = function() { return this.sphere[0].radius; }

  
        
    this.setRadius1 = function(value) {
      this.radius1 = value;
      this.sphere[1].setScale(value*this.factor);
      this.planet.setDist(value*this.factor);
    };
    this.getRadius1 = function() { return this.radius1; }

    this.setEquant(6.0);
    this.setRadius0(60.0); 
    this.setRadius1(33.00);    
    
    this.setSpeed0 = function(speed) {
      this.sphere[0].setSpeed(speed);
    }
    
    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.update = function(time) {
        this.addCurve({index: 0, anchor: this.root, start: -1, node: this.planet.mesh, color: colors["Path"]});
  

        this.epicycleRadius[0] = this.sphere[0].visuals.markerball.currentPos();
        this.epicycleRadius[1] = this.sphere[1].visuals.markerball.currentPos();
        this.epicycleRadiusLine.setPos(this.epicycleRadius);
          
        this.deferentRadius[1] = this.sphere[0].visuals.markerball.currentPos();
        this.deferentRadiusLine.setPos(this.deferentRadius);
        
        this.equantPlanet[1] = this.planet.mesh.currentPos();;
        this.equantPlanetLine.setPos(this.equantPlanet);
        
        
        BasePlanetModel.prototype.update.call(this, time);
    }
    
    this.reset = function () {
        BasePlanetModel.prototype.reset.call(this);
    }    

};

ModelPtolemy.prototype = new BasePlanetModel;
ModelPtolemy.prototype.constructor = ModelPtolemy;

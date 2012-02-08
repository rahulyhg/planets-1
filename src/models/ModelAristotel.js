
/**
 * @constructor
 * @extends ModelBase
 */
ModelAristotle = function(params) {
    this.name = "ModelAristotle";
    this.create(params);
    params.spheres = 4;
    
    this.genSpheres(params);
    BaseMixin.call(this);
    

    // add unwinding spheres
    var s5 = this.sphere[5] = new Spherical({ scale: 7.0, axisAngle: 0.0, speed: 0.0, color: config.colors["S4"]}),
    s6 = this.sphere[6] = new Spherical({ scale: 6.5, axisAngle: 0.0, speed: 0.0, color: config.colors["S3"]}),
    s7 = this.sphere[7] = new Spherical({ scale: 6.0, axisAngle: 0.0, speed: 0.0, color: config.colors["S2"]}),
    s8 = this.sphere[8] = new Spherical({ vortex: true, scale: 5.0, axisAngle: 0.0, speed: 0.0, color: config.colors["S1"]});
    
    this.updateList.push(s5);
    this.updateList.push(s6);    
    this.updateList.push(s7);    
    this.updateList.push(s8);  
        
    this.sphere[4].anchor.addNode(s5);
    this.sphere[5].anchor.addNode(s6);
    this.sphere[6].anchor.addNode(s7);
    this.sphere[7].anchor.addNode(s8);



    // create nice joint gfx element and add it          
    this.createJoint = function(params) {
      var mat = new THREE.LineBasicMaterial( { linewidth: params.linewidth, color: rgbToHex(params.color) } );
      params.to.gfx.njoint = new THREE.Line( aLine, mat );
      params.to.gfx.sjoint = new THREE.Line( aLine, mat );
      params.to.gfx.njoint.scale.y = params.from.gfx.scale-params.to.gfx.scale;
      params.to.gfx.njoint.position.y = params.to.gfx.scale;
      params.to.gfx.sjoint.scale.y = -(params.from.gfx.scale-params.to.gfx.scale);
      params.to.gfx.sjoint.position.y = -params.to.gfx.scale;
      params.to.anchor.addNode(params.to.gfx.njoint);
      params.to.anchor.addNode(params.to.gfx.sjoint);
    }
   this.createJoint({from: this.sphere[4], to: this.sphere[5], color: config.colors["S4"], linewidth:4 }); 
   this.createJoint({from: this.sphere[3], to: this.sphere[6], color: config.colors["S3"], linewidth:3 }); 
   this.createJoint({from: this.sphere[2], to: this.sphere[7], color: config.colors["S2"], linewidth:2 }); 
   this.createJoint({from: this.sphere[1], to: this.sphere[8], color: config.colors["S1"], linewidth:1 }); 

  this.sphere[5].setVisuals(["sjoint", "njoint", "sphere","arc1","arc2","equator","npole","spole","rotationarc","markerarc","markerball"]);
  this.sphere[6].setVisuals(["sjoint", "njoint", "sphere","arc1","arc2","equator","npole","spole","rotationarc","markerarc","markerball"]);
  this.sphere[7].setVisuals(["sjoint", "njoint", "sphere","arc1","arc2","equator","npole","spole","rotationarc","markerarc","markerball"]);
  this.sphere[8].setVisuals(["sjoint", "njoint", "sphere","arc1","arc2","equator","npole","spole","rotationarc","markerarc","markerball"]);   

   // show hide stuff
   this.setShowSphere18 = function(state) {
      this.sphere[1].setGfx(["npole","spole"], state);
      this.sphere[8].setGfx(["sjoint","njoint","npole","spole"], state);
    }
   this.getShowSphere18 = function() { return false; };

   this.setShowSphere36 = function(state) {
      this.sphere[3].setGfx(["npole","spole"], state);
      this.sphere[6].setGfx(["sjoint","njoint","npole","spole"], state);
    }
   this.getShowSphere36 = function() { return false; };

   this.setShowSphere27 = function(state) {
      this.sphere[2].setGfx(["npole","spole"], state);
      this.sphere[7].setGfx(["sjoint","njoint","npole","spole"], state);
    }
   this.getShowSphere27 = function() { return false; };
   
   this.setShowSphere45 = function(state) {
      this.sphere[4].setGfx(["npole","spole"], state);
      this.sphere[5].setGfx(["sjoint","njoint","npole","spole"], state);
    }
   this.getShowSphere45 = function() { return false; };      
   
   this.setShowSphere5 = function(state) { this.sphere[5].setShow(state); } 
   this.getShowSphere5 = function() { return this.sphere[5].getShow(); };

   this.setShowSphere6 = function(state) { this.sphere[6].setShow(state); }
   this.getShowSphere6 = function() { return this.sphere[6].getShow(); };

   this.setShowSphere7 = function(state) { this.sphere[7].setShow(state); }
   this.getShowSphere7 = function() { return this.sphere[7].getShow(); };

   this.setShowSphere8 = function(state) { this.sphere[8].setShow(state); }
   this.getShowSphere8 = function() { return this.sphere[8].getShow(); };
   
   
    // ecliptic
    this.setAxisAngle2 = function(angle) {
      var angle1 = this.sphere[2].getAxisAngle();
      var angle7 = this.sphere[8].getAxisAngle();
      var diff = angle - angle1;
      this.sphere[2].setAxisAngle(angle1 + diff);
      this.sphere[8].setAxisAngle(angle7 - diff);
    }

    this.setAxisAngle3 = function(angle) {
      var angle2 = this.sphere[3].getAxisAngle();
      var angle6 = this.sphere[7].getAxisAngle();
      var diff = angle - angle2;
      this.sphere[3].setAxisAngle(angle2 + diff);
      this.sphere[7].setAxisAngle(angle6 - diff);

    }


    this.setAxisAngle4 = function(angle) {
      var angle3 = this.sphere[4].getAxisAngle();
      var angle5 = this.sphere[6].getAxisAngle();
      var diff = angle - angle3;
      this.sphere[4].setAxisAngle(angle3 + diff);
      this.sphere[5].setAxisAngle(0);
      this.sphere[6].setAxisAngle(angle5 - diff);
    }


    this.setSpeed1Old = this.setSpeed1;
    
    this.setSpeed1 = function(speed) {
      this.setSpeed1Old(speed);
      this.sphere[8].setSpeed(this.sphere[1].getSpeed());
    }

    this.getSpeed1Old = this.getSpeed1;
    this.getSpeed1 = function() {
      return this.getSpeed1Old();
    }

    this.setSpeed2 = function(speed) {
      this.sphere[2].setSpeed(speed);
      this.sphere[7].setSpeed(-speed);
    }

    this.setSpeed3 = function(speed) {
        this.sphere[3].setSpeed(speed);
        this.sphere[4].setSpeed(-speed);
        this.sphere[5].setSpeed(speed);
        this.sphere[6].setSpeed(-speed);
    }

    this.setRotateStart2 = function(start) {
      this.sphere[2].setRotateStart(start);
      this.sphere[7].setRotateStart(-start);
    }

    this.setRotateStart3 = function(start) {
      this.sphere[3].setRotateStart(start);
      this.sphere[6].setRotateStart(-start);
    }

    this.setRotateStart4 = function(start) {
      this.sphere[4].setRotateStart(start);
      this.sphere[5].setRotateStart(-start);
    }

    /** @override */
    this.reset = function() {
        ModelBase.prototype.reset.call(this);
        this.setShowSphere2(false);
        this.setShowSphere3(false);   
        this.setShowSphere4(false);
        this.setShowSphere5(false);   
        this.setShowSphere6(false);
        this.setShowSphere7(false);   
    }

    /** @override */
    this.update = function(time) {
      this.addCurve({index: 0, anchor: this.sphere[1].anchor, start: 2, stop: 5, node: this.planet.mesh, color: config.colors["Path"]});
      this.addCurve({index: 1, anchor: this.sphere[2].anchor, start: 3, stop: 5, node: this.planet.mesh, color: config.colors["Hippo"]});
      ModelBase.prototype.update.call(this, time);
    }

};

ModelAristotle.prototype = new ModelBase;
ModelAristotle.prototype.constructor = ModelAristotle;


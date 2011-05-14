
Model5 = function(params) {
    params.name = "Model5";
    params.spheres = 5;
    this.init(params);

    this.setSpeed0 = function(speed) {
        this.sphere[0].setSpeed(-speed);
    }

    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.alpha=0;
    this.getAlpha = function() {return this.alpha; }
    this.setAlpha = function(val) {
        this.alpha=val;
        this.updateMovement();
    }


    this.beta=0;
    this.getBeta = function() {return this.beta; }
    this.setBeta = function(val) {
        this.beta=val;
        this.updateMovement();
    }

    this.gamma=0;
    this.getGamma = function() {return this.gamma; }
    this.setGamma = function(val) {
        this.gamma=val;
        this.updateMovement();
    }

    this.setCurrentPlanet = function(node) {
      BasePlanetModel.prototype.setCurrentPlanet.call(this,node);
      this.setAlpha(this.currentPlanet.alpha);
      this.setBeta(this.currentPlanet.beta);
      this.setGamma(this.currentPlanet.gamma);

    }
    this.updateMovement = function() {
        var alpha = (this.alpha!=0) ? 360/this.alpha : 0;
        var beta = (this.beta!=0) ? 360/this.beta : 0;
        var gamma = (this.gamma!=0) ? 360/this.gamma : 0;
        this.sphere[2].setStep(alpha);
        this.sphere[3].setStep(-beta);
        this.sphere[4].setStep(gamma);
    }

    this.update = function(time) {
        this.addCurve(0, this.sphere[0].curve, this.calcCurve({depth: 0, node: this.planet.mesh}), colors["Path"]);
        //this.addCurve(1, this.sphere[3].curve, this.calcCurve(2, this.name + "Planet"), colors["Hippo"]);
        BasePlanetModel.prototype.update.call(this, time);
    }


};

Model5.prototype = new BasePlanetModel;
Model5.prototype.constructor = Model5;

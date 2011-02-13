/**
 * Created by IntelliJ IDEA.
 * User: seb
 * Date: 12.02.2011
 * Time: 20:10:55
 * To change this template use File | Settings | File Templates.
 */


ModelMoon = function(params) {
    params.name = "ModelMoon";
    params.spheres = 4;
    this.init(params);

    this.metonYear = 0;
    this.setMetonYear = function(val) {
        this.metonYear = Number(val);
    }
    this.getMetonYear = function() {
        return this.metonYear;
    }

    this.metonSynodicMonths = 0;
    this.setMetonSynodicMonths = function(val) {
        this.metonSynodicMonths = Number(val);
    }
    this.getMetonSynodicMonths = function() {
        return this.metonSynodicMonths;
    }

    this.metonDays = 0; // days per cycle
    this.setMetonDays = function(val) {
        this.metonDays = Number(val);
    }
    this.getMetonDays = function() {
        return this.metonDays;
    }

    this.metonDraconiticMonths = 0;
    this.setMetonDraconiticMonths = function(val) {
        this.metonDraconiticMonths = Number(val);
    }
    this.getMetonDraconiticMonths = function() {
        return this.metonDraconiticMonths;
    }

    this.getMetonZodicalMonths = function() {
        return this.metonYear + this.metonSynodicMonths;
    }
    this.getMetonDaysPerYear = function() {
        return this.metonDays / this.metonYear;
    }
    this.getSynodicDaysPerMonth = function() {
        return this.metonDays / this.metonSynodicMonths;
    }
    this.getZodicalDaysPerMonth = function() {
        return this.metonDays / this.getMetonZodicalMonths();
    }
    this.getDraconiticDaysPerMonth = function() {
        return this.metonDays / this.metonDraconiticMonths;
    }

    this.setCurrentMoonModel = function(node) {
        var currentModel = moonModels[node];
        this.moonSpeed1 = currentModel.speed1;
        this.moonSpeed2 = currentModel.speed2;
    }

    this.updateMoon = function() {
        this.draco = model.getDraconiticDaysPerMonth();
        this.zodic = model.getZodicalDaysPerMonth();
        model.sphere[1].setSpeed(this.moonSpeed1(this.draco, this.zodic));
        model.sphere[2].setSpeed(this.moonSpeed2(this.draco, this.zodic));
        model.sphere[3].setSpeed(0);
    }

    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.setCurrentMoonModel("Mendell");
};

ModelMoon.prototype = new BasePlanetModel;
ModelMoon.prototype.constructor = ModelMoon;

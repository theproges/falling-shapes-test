app.modules.stage.controller = function(model) {
    app.modules.base.controller.call(this, model);

    // - PROPS -
    this.view = null;


    // - HANDLERS -
    this.onShapeOutOfScreen = function(index) {
        this.view.removeShape(index);
        this.updateModel();
    };

    this.onStageClick = function(cords) {
        var shapeIndex = this.view.getShapeIndexByCords(cords);

        if (shapeIndex >= 0) {
            this.view.removeShape(shapeIndex);
        }
        else {
            this.generateSingleShape(cords);
        }

        this.updateModel();
        eventManager.notify(eventList.ON_STATISTIC_UPDATE);
    };

    this.onControlsUpdate = function() {
        this.updateControlData();
    };


    // - METHODS -
    this.run = function() {
        var viewSettings = {
            width: config.stageWidth,
            height: config.stageHeight,
            gravityValue: model.gravityValue,
            generationSpeedValue: model.generationSpeedValue,
            onShapeOutOfScreen: this.onShapeOutOfScreen.bind(this),
            onStageClick: this.onStageClick.bind(this)
        };
        this.view = new app.modules.stage.view(viewSettings);

        eventManager.subscribe(eventList.ON_CONTROLS_UPDATE, this.onControlsUpdate.bind(this));

        setInterval(function(){
            this.generateShapes(model.generationSpeedValue);
        }.bind(this), 1000);
    };

    this.generateShapes = function(count) {
        if (count <= 0) return;

        for (var i = 0; i < count; i++) {
            this.generateSingleShape();
            this.updateModel();
        }
    };

    this.generateSingleShape = function(startCords) {
        var shapeSettings;
        var shapeType = batman.getRandomInt(0, 1);

        switch (shapeType) {
            case config.shapeTypes.polygon: shapeSettings = this.getPolygonSettings(startCords); break;
            case config.shapeTypes.ellipse: shapeSettings = this.getEllipseSettings(startCords); break;
            case config.shapeTypes.random: shapeSettings = this.getRandomShapeSettings(startCords); break;
        }

        this.view.addShape(shapeSettings);
    };

    this.getPolygonSettings = function(startCords) {
        var minSidesCount = 3;
        var maxSidesCount = 6;
        var curSidesCount = batman.getRandomInt(minSidesCount, maxSidesCount);
        var sumAngle = 180 * (curSidesCount - 2);
        var angleStep = 30;
        var leftAngle = sumAngle;
        var averageLength = batman.getRandomInt(50, 100);
        var lengthStep = null;
        var backColor = this.getRandomColor();
        var borderColor = this.getRandomColor();
        var firstX = startCords && startCords.x ? startCords.x : batman.getRandomInt(averageLength, config.stageWidth - averageLength);
        var firstY = startCords && startCords.y ? startCords.y : -averageLength * 2;
        var firstPoint = new PIXI.Point(firstX, firstY);
        var points = [firstPoint];
        var settings = {};

        for (var i = 0; i < curSidesCount - 1; i++) {
            leftAngle -= angleStep;
            lengthStep = batman.getRandomInt(0, 10);
            points.push(new PIXI.Point(
                    firstPoint.x + (averageLength - lengthStep) * Math.cos(leftAngle),
                    firstPoint.y + (averageLength - lengthStep) * Math.sin(leftAngle)
                )
            );
            console.log(leftAngle);
        }

        settings.type = config.shapeTypes.polygon;
        settings.backColor = backColor;
        settings.borderColor = borderColor;
        settings.points = points;
        settings.parent = this.view.rootCnt;

        return settings;
    };

    this.getEllipseSettings = function(startCords) {
        var isCircle = batman.getRandomInt(0,1) === 1;
        var width = batman.getRandomInt(20, 80);
        var height = isCircle ? width : batman.getRandomInt(20, 80);
        var firstX = startCords && startCords.x ? startCords.x : batman.getRandomInt(width, config.stageWidth - width);
        var firstY = startCords && startCords.y ? startCords.y : -height;
        var centerPoint = new PIXI.Point(firstX, firstY);
        var settings = {
            width: width,
            height: height,
            centerPoint: centerPoint,
            type: config.shapeTypes.ellipse,
            backColor: this.getRandomColor(),
            borderColor: this.getRandomColor(),
            parent: this.view.rootCnt
        };

        return settings;
    };

    this.getRandomShapeSettings = function(startCords) {
        // todo
    };

    this.updateModel = function() {
        model.shapesCount = this.view.getTotalCount();
        model.occupiedSquare = this.view.getTotalSquare();
        eventManager.notify(eventList.ON_STATISTIC_UPDATE);
    };

    this.updateControlData = function() {
        this.view.setData({
            gravityValue: model.gravityValue,
            generationSpeedValue: model.generationSpeedValue
        });
    };

    this.getRandomColor = function() {
        return batman.getRandomInt(0, 16777215);
    };

    this.run();
};
app.modules.stage.controller.prototype = Object.create(app.modules.base.controller);
app.modules.stage.controller.prototype.constructor = app.modules.stage.controller;
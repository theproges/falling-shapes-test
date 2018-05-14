app.modules.stage.view = function(settings) {
    app.modules.base.view.call(this);

    var width = settings.width;
    var height = settings.height;
    var gravityValue = settings.gravityValue;
    var generationSpeedValue = settings.generationSpeedValue;
    var onShapeOutOfScreen = settings.onShapeOutOfScreen;
    var onStageClick = settings.onStageClick;
    var gravityStep = config.gravityStep;
    var renderer = PIXI.autoDetectRenderer(width, height);
    var rootCnt = new PIXI.Container();
    var ticker = new PIXI.ticker.Ticker();
    var canvasElement = document.getElementById('canvas');
    var shapesList = [];
    ticker.add(function(){
        this.update();
        renderer.render(rootCnt);
    }.bind(this));
    ticker.start();
    canvasElement.appendChild(renderer.view);


    // - PROPS -
    this.rootCnt = rootCnt;
    this.gravityValue = gravityValue;
    this.generationSpeedValue = generationSpeedValue;


    // - METHODS -
    this.setData = function(data) {
        this.gravityValue = data.gravityValue;
        this.generationSpeedValue = data.generationSpeedValue;
    };

    this.addShape = function(settings) {
        var shapeViews = app.modules.stage.shapeViews;
        var type = settings.type;
        var shape = null;

        switch (type) {
            case config.shapeTypes.polygon: shape = new shapeViews.Polygon(settings); break;
            case config.shapeTypes.ellipse: shape = new shapeViews.Ellipse(settings); break;
            case config.shapeTypes.random: shape = new shapeViews.Random(settings); break;
        }

        shapesList.push(shape);
    };

    this.removeShape = function(index) {
        shapesList[index].dispose();
        shapesList.splice(index, 1);
    };

    this.getShapeIndexByCords = function(cords) {
        var index = -1;
        if (shapesList.length === 0) return index;

        for (var i = shapesList.length - 1; i >= 0; i--) {
            if (shapesList[i].contains(cords.x, cords.y)) {
                index = i;
                break;
            }
        }

        return index;
    };

    this.update = function() {
        if (shapesList.length === 0) return;

        var index = 0;
        while (index < shapesList.length) {
            var shape = shapesList[index];
            shape.moveBy(null, gravityStep * this.gravityValue);

            if (shape.isOutOfScreen()) {
                onShapeOutOfScreen(index);
            }
            index++;
        }
    };

    this.getTotalSquare = function() {
        var square = 0;
        for (var i = 0, len = shapesList.length; i < len; i++) {
            square += shapesList[i].getSquare();
        }

        return square;
    };

    this.getTotalCount = function() {
        return shapesList.length;
    };

    canvasElement.addEventListener('click', function(e) {
        var cords = {
            x: e.layerX,
            y: e.layerY
        };

        onStageClick(cords);
    });
};
app.modules.stage.view.prototype = Object.create(app.modules.base.view);
app.modules.stage.view.prototype.constructor = app.modules.stage.view;
app.modules.stage.shapeViews.Ellipse = function(settings) {
    app.modules.stage.shapeViews.BaseShape.call(this, settings);

    var centerPoint = settings.centerPoint;
    var width = settings.width;
    var height = settings.height;
    var hitArea;

    this.moveBy = function (stepX, stepY) {
        if (!centerPoint) return;

        centerPoint.x += stepX ? stepX : 0;
        centerPoint.y += stepY ? stepY : 0;

        this.draw();
    };

    this.draw = function() {
        this.graphics.clear();
        this.graphics.lineStyle(4, this.borderColor, 1);
        this.graphics.beginFill(this.backColor, 1);
        this.graphics.moveTo(centerPoint.x, centerPoint.y);
        this.graphics.drawEllipse(centerPoint.x, centerPoint.y, width, height);
        this.graphics.hitArea = hitArea = new PIXI.Ellipse(centerPoint.x, centerPoint.y, width, height);
    };

    this.isOutOfScreen = function() {
        var bottomY = config.stageHeight;

        return centerPoint.y - height > bottomY;
    };

    this.getSquare = function() {
        if (!width || !height) return;

        return Math.round(Math.PI * width * height);
    };

    this.contains = function(x, y) {
        if (!hitArea) return false;

        return hitArea.contains(x, y);
    }
};
app.modules.stage.shapeViews.Ellipse.prototype = Object.create(app.modules.stage.shapeViews.BaseShape);
app.modules.stage.shapeViews.Ellipse.prototype.constructor = app.modules.stage.shapeViews.Ellipse;
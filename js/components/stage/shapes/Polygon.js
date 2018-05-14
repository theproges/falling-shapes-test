app.modules.stage.shapeViews.Polygon = function(settings) {
    app.modules.stage.shapeViews.BaseShape.call(this, settings);

    var pointsCount = this.points.length;
    var hitArea;

    this.moveBy = function (stepX, stepY) {
        if (this.points.length === 0) return;

        for (var i = 0, len = this.points.length; i < len; i++) {
            this.points[i].x += stepX ? stepX : 0;
            this.points[i].y += stepY ? stepY : 0;
        }

        this.draw();
    };

    this.draw = function() {
        this.graphics.clear();

        this.graphics.lineStyle(4, this.borderColor, 1);
        this.graphics.beginFill(this.backColor, 1);
        this.graphics.moveTo(this.points[pointsCount - 1].x, this.points[pointsCount - 1].y);

        for (var i = 0; i < pointsCount; i++) {
            this.graphics.lineTo(this.points[i].x, this.points[i].y);
        }

        this.graphics.hitArea = hitArea = new PIXI.Polygon(this.points);
    };

    this.isOutOfScreen = function() {
        var isOut = true;
        var bottomY = config.stageHeight;

        for (var i = 0; i < pointsCount; i++) {
            if (this.points[i].y < bottomY) {
                isOut = false;
                break;
            }
        }

        return isOut;
    };

    this.getSquare = function() {
        if (this.points.length === 0) return;

        var sum = 0;
        var square = 0;
        var firstPoint = this.points[0];
        for (var i = 0, len = this.points.length; i < len; i++) {
            var curPoint = this.points[i];
            var nextPoint = this.points[i + 1];
            if (nextPoint) {
                sum += curPoint.x * nextPoint.y - nextPoint.x * curPoint.y;
            } else {
                sum += curPoint.x * firstPoint.y - firstPoint.x * curPoint.y;
            }
            square = Math.round(Math.abs(sum) / 2);
        }

        return square;
    };

    this.contains = function(x, y) {
        if (!hitArea) return false;

        return hitArea.contains(x, y);
    }
};
app.modules.stage.shapeViews.Polygon.prototype = Object.create(app.modules.stage.shapeViews.BaseShape);
app.modules.stage.shapeViews.Polygon.prototype.constructor = app.modules.stage.shapeViews.Polygon;
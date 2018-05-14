app.modules.stage.shapeViews.BaseShape = function (settings){
    this.type = settings.type;
    this.points = settings.points;
    this.graphics = new PIXI.Graphics();
    this.parent = settings.parent;
    this.backColor = settings.backColor;
    this.borderColor = settings.borderColor;

    this.parent.addChild(this.graphics);
    this.graphics.interactive = true;

    this.dispose = function() {
        this.parent.removeChild(this.graphics);
    };
};
var app = {
    modules: {
        stage:{
            controller: null,
            view: null,
            shapeViews: {
                polygon: null,
                ellipse: null,
                random: null,
                base: null
            }
        },
        ui: {
            controller: null,
            view: null
        },
        base: {
            controller: null,
            view: null
        }
    },
    model: {
        gravityValue: 1,
        generationSpeedValue: 1,
        occupiedSquare: 8,
        shapesCount: 0
    },
    run: function(){
        for(var name in this.modules) {
            if (name === 'base') continue;
            new this.modules[name].controller(this.model);
        }
    }
};
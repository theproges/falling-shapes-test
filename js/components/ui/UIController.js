app.modules.ui.controller = function(model) {
    app.modules.base.controller.call(this);

    var view;
    var gravityStep = config.gravityControlStep;
    var generatorStep = config.generatorControlStep;

    var onIncGravity = function() {
        var max = config.maxGravityValue;
        if (model.gravityValue + gravityStep <= max) {
            model.gravityValue += gravityStep;
        }
        else {
            model.gravityValue = max;
        }

        updateControls();
        eventManager.notify(eventList.ON_CONTROLS_UPDATE);
    };

    var onDecGravity = function() {
        var min = config.minGravityValue;
        if (model.gravityValue - gravityStep >= min) {
            model.gravityValue -= gravityStep;
        }
        else {
            model.gravityValue = min;
        }

        updateControls();
        eventManager.notify(eventList.ON_CONTROLS_UPDATE);
    };

    var onIncGenerator = function() {
        var max = config.maxGenerationSpeedValue;
        if (model.generationSpeedValue + generatorStep <= max) {
            model.generationSpeedValue += generatorStep;
        }
        else {
            model.generationSpeedValue = max;
        }

        updateControls();
        eventManager.notify(eventList.ON_CONTROLS_UPDATE);
    };

    var onDecGenerator = function() {
        var min = config.minGenerationSpeedValue;
        if (model.generationSpeedValue - generatorStep >= min) {
            model.generationSpeedValue -= generatorStep;
        }
        else {
            model.generationSpeedValue = min;
        }

        updateControls();
        eventManager.notify(eventList.ON_CONTROLS_UPDATE);
    };

    var updateControls = function() {
        view.updateControls({
            gravityValue: model.gravityValue,
            generatorValue: model.generationSpeedValue
        });
    };

    var onUpdateStatistic = function() {
        view.updateStatistic({
            shapesCount: model.shapesCount,
            occupiedSquare: model.occupiedSquare
        });
    };
    eventManager.subscribe(eventList.ON_STATISTIC_UPDATE, onUpdateStatistic.bind(this));

    var viewSettings = {
        onIncGravity: onIncGravity,
        onDecGravity: onDecGravity,
        onIncGenerator: onIncGenerator,
        onDecGenerator: onDecGenerator
    };
    view = new app.modules.ui.view(viewSettings);
    updateControls();
};
app.modules.ui.controller.prototype = Object.create(app.modules.base.controller);
app.modules.ui.controller.prototype.constructor = app.modules.ui.controller;
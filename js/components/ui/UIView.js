app.modules.ui.view = function(settings) {
    app.modules.base.view.call(this);

    var totalCountValueElement = document.getElementById('shapesCountValue');
    var squareValueElement = document.getElementById('totalSquareValue');
    var gravityValueElement = document.getElementById('gravityValue');
    var generatorValueElement = document.getElementById('generatorValue');
    var incGravityBtn = document.getElementById('incGravityBtn');
    var decGravityBtn = document.getElementById('decGravityBtn');
    var incGeneratorBtn = document.getElementById('incGeneratorBtn');
    var decGeneratorBtn = document.getElementById('decGeneratorBtn');

    var onIncGenerator = settings.onIncGenerator;
    var onDecGenerator = settings.onDecGenerator;
    var onIncGravity = settings.onIncGravity;
    var onDecGravity = settings.onDecGravity;

    this.updateStatistic = function(data) {
        totalCountValueElement.innerHTML = data.shapesCount;
        squareValueElement.innerHTML = data.occupiedSquare;
    };

    this.updateControls = function(data) {
        gravityValueElement.innerHTML = data.gravityValue;
        generatorValueElement.innerHTML = data.generatorValue;
    };

    incGeneratorBtn.addEventListener('click', onIncGenerator);
    decGeneratorBtn.addEventListener('click', onDecGenerator);
    incGravityBtn.addEventListener('click', onIncGravity);
    decGravityBtn.addEventListener('click', onDecGravity);
};
app.modules.ui.view.prototype = Object.create(app.modules.base.view);
app.modules.ui.view.prototype.constructor = app.modules.ui.view;
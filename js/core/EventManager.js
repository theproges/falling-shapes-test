var eventManager = (function(){
    var subscriptions = {};

    function subscribe(eventName, callback) {
        if (subscriptions[eventName]) {
            subscriptions[eventName].push(callback);
        }
        else {
            subscriptions[eventName] = [callback];
        }
    }

    function notify(eventName, data) {
        var callbackList = subscriptions[eventName];
        if (callbackList) {
            for (var i = 0, len = callbackList.length; i < len; i++) {
                callbackList[i](data);
            }
        }
    }

    return {
        subscribe: subscribe,
        notify: notify
    };
})();
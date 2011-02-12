/**
 * a jsf event queue which fixes a major jsf limitation of not being able to
 * remove an event handler from the event queue itself
 * The idea is to register the queue as event handler itself and then delegate
 * the incoming events to all registered sublisteners
 *
 * aka:
 *
 * jsf event queue --delegates event --> extended queue --> delegates event --> registered listeners
 *
 */
//we reserve a private namespace for our init vars
(function() {

    var _RT = myfaces._impl.core._Runtime;

    _RT.reserveNamespace("extras.apache.ExtendedEventQueue");
    _RT.reserveNamespace("extras.apache.ExtendedErrorQueue");

    var _extras = extras.apache;
    var _util = myfaces._impl._util;

    _extras.ExtendedEventQueue = new _util._ListenerQueue();
    _extras.ExtendedErrorQueue = new _util._ListenerQueue();

    jsf.ajax.request.addOnEvent(function(eventData) {
        _extras.ExtendedEventQueue.broadcastEvent(eventData);
    });

    jsf.ajax.request.addOnError(function(eventData) {
        _extras.ExtendedErrorQueue.broadcastEvent(eventData);
    });

})();
//we now init after that we should have two singleton queues and
//and a registered error and event handler which delegates to those queues


myfaces._impl.core._Runtime.extendClass("myfaces._impl._util.QueueElem", Object, {

    priority: 0,
    startable: null

});

/**
 * prority queue implementation based upon the myfaces high speed ajax queuing system core
 * we reuse our optimized high speed queue to introduce a priority queue which
 * allows multiple parallel executions
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl._util.PriorityQueue", myfaces._impl._util._Queue, {
    _inProcessCnt: 0,

    /**
     * process queue, send request, if exists
     */
    processQueue: function() {

        for (; this._inProcessCnt < 2; this._inProcessCnt++) {
            var curReq = this.dequeue();
            if (curReq) {
                curReq.startable.send();
            }
        }
        if (this._inProcessCnt == 2) {
            this._inProcessCnt = 1;
        }
    },

    /**
     * sort criteria for our internal queue
     *
     * @param a
     * @param b
     */
    sortFunc: function(a, b) {
        if ('undefined' == typeof a.priority && 'undefined' == typeof a.priority) return 0;
        if ('undefined' == typeof a.priority) return -1;
        return b.priority - a.priority;
    },

    /**
     * specialized enqueuing which takes the priority into consideration
     *
     * @param startable an  object which has to implement the method start() the dequeuing after the start operation is finished has to be performed by the object itself
     * @param priority
     */
    enqueue: function(startable, priority) {

        this._callSuper("enqueue", [queueElem]);
        this._q.sort(this.sortFunc);
        if(this._inProcessCnt < 1) {
            this.processQueue();
        }
    }
});

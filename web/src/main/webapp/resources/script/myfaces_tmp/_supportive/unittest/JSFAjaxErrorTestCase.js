/**
 * testcase which treats the error condition properly
 * if an error is raised then the testcase succeeds
 * if the error is not performed then the testcase
 * fails
 */
myfaces._impl.core._Runtime.extendClass("myfaces._supportive.unittest.JSFAjaxErrorTestCase", myfaces._supportive.unittest.JSFAjaxTestCase, {
    constructor_: function(args) {
        this._callSuper("constructor_", args);
    },

    /**
     * event
     * @param data the incoming jsf.js xhr data
     */
    _onEvent: function(evt) {

        try {
            var processedEvent = {};
            this._Lang.mixMaps(processedEvent, evt);
            this._processedEvents.push(evt);
            if (evt.status == "begin") {
                this.onStart(evt);
            } else if (evt.status == "complete") {
                this.onDone(evt);
            } else if (evt.status == "success") {
                if (this._defer) {
                    setTimeout(this._Lang.hitch(this, function() {
                        try {
                            this.onSuccess(evt);

                        } finally {
                            if (!this._globalProcess && !this._manualTearDown) {
                                this._tearDown();
                                this.tearDown();
                            }
                        }
                    }), this._defer);
                    return;
                }
                try {
                    this.onSuccess(evt);

                } finally {
                    if (!this._globalProcess && !this._manualTearDown) {
                        this._tearDown();
                        this.tearDown();
                    }
                }
            }
        } catch (e) {
            this.fail(e.toString().replace(/[^A-Za-z\s\n]+/g, " "));
        }
    },


    /**
     * callbacks for error and
     * @param evt the incoming event data
     */
    _onError: function(evt) {
        try {
            this._onErrorCalled = true;
            this.onError(evt);
            if (!this._globalProcess) {
                this.postcondition(evt);
            }
        } finally {
            if (!this._globalProcess && !this._manualTearDown) {
                this._tearDown();
                this.tearDown();
            }
        }

    },
    onError: function(evt) {
    //handle the ajax error handling here
    },

    onSuccess: function(evt) {
        this.fail("onsuccess called");
    }
});
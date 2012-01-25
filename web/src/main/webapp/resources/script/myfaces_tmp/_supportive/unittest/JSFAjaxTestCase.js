/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * a specialized testcase which takes the jsf ajax engine under consideration
 */
myfaces._impl.core._Runtime.extendClass("myfaces._supportive.unittest.JSFAjaxTestCase",
    myfaces._supportive.unittest.TestCase, {

        _processedEvents: null,
        _processedGlobalEvents : null,

        _globalProcess: false,
        _manualPostCondition: true,
        _defer: 0,
        _manualTearDown: false,

        constructor_: function(args) {
            this._callSuper("constructor_", args);
            //post condition must be called manually
            this._manualPostCondition = true;
            this._processedevents = [];

            this._onGlobalEvent = this._Lang.hitch(this, this._onGlobalEvent);
            this.onGlobalStart = this._Lang.hitch(this, this.onGlobalStart);
            this.onGlobalDone = this._Lang.hitch(this, this.onGlobalDone);
            this.onGlobalSuccess = this._Lang.hitch(this, this.onGlobalSuccess);
            this.onGlobalError = this._Lang.hitch(this, this.onGlobalError);

            this.onStart = this._Lang.hitch(this, this.onStart);
            this.onDone = this._Lang.hitch(this, this.onDone);
            this.onSucccess = this._Lang.hitch(this, this.onSucccess);

            this._onEvent = this._Lang.hitch(this, this._onEvent);
            this._onError = this._Lang.hitch(this, this._onError);

            this.onError = this._Lang.hitch(this, this.onError);
            this.tearDown = this._Lang.hitch(this, this.tearDown);

            this.ajaxRequest = this._Lang.hitch(this, this.ajaxRequest);

            this._processedGlobalEvents = [];
            this._processedEvents = [];
        },

        setup: function() {
            this._callSuper("setup");
            if (this._globalProcess) {
                jsf.ajax.addOnEvent(this._onGlobalEvent);
                jsf.ajax.addOnError(this.onError);
            }
        },

        _onGlobalEvent: function(evt) {
            try {
                var processedEvent = {};
                this._Lang.mixMaps(processedEvent, evt);
                if (this._processedGlobalEvents)
                    this._processedGlobalEvents.push(evt);
                if (evt.status == "begin") {
                    this.onGlobalStart(evt);
                } else if (evt.status == "complete") {
                    this.onGlobalDone(evt);
                } else if (evt.status == "success") {
                    if (this._defer) {
                        setTimeout(this._Lang.hitch(this, function() {
                            try {
                                this.onGlobalSuccess(evt);
                                if (this._globalProcess) {
                                    this.postcondition();

                                }
                            } finally {
                                if (this._globalProcess && !this._manualTearDown) {
                                    this._tearDown();
                                    this.tearDown();
                                }
                            }
                        }), this._defer);
                        return;
                    }
                    try {
                        this.onGlobalSuccess(evt);
                        if (this._globalProcess) {
                            this.postcondition();

                        }
                    } finally {
                        if (this._globalProcess && !this._manualTearDown) {
                            this._tearDown();
                            this.tearDown();
                        }
                    }
                }
            } catch (e) {
                this.fail(e.toString());
            }

        },
        //global callbacks


        ajaxRequest
        :
        function(source, evt, options) {
            var finalOptions = options || {};

            options.onevent = this._onEvent;
            options.onerror = this._onError;

            jsf.ajax.request(source, evt, finalOptions);
        }
        ,

        /**
             * callbacks for error and
             * @param evt the incoming event data
             */
        _onError: function(evt) {
            this.onError(evt);
            this.fail("onError called, Responsecode:" + evt.responseCode + " - Responsetext:" + evt.responseText.replace(/[^A-Za-z\s\n]+/g, " "));
            if (!this._globalProcess) {
                this._tearDown();
                this.tearDown();
            }
        }
        ,

        onGlobalStart: function(evt) {

        }
        ,
        onGlobalDone: function(evt) {

        }
        ,
        onGlobalSuccess: function(evt) {

        }
        ,
        onGlobalError: function(evt) {
            if (this._globalProcess) {
                this._tearDown();
                this.tearDown();
            }
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
                                if (!this._globalProcess) {
                                    this.postcondition();
                                }
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
                        if (!this._globalProcess) {
                            this.postcondition();
                        }
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

        //global callbacks
        onStart: function(evt) {

        }
        ,
        onDone: function(evt) {

        }
        ,
        onSuccess: function(evt) {

        }
        ,
        onError: function(evt) {

        }
        ,
        tearDown: function() {
            this._callSuper("tearDown");
        }

    })
;
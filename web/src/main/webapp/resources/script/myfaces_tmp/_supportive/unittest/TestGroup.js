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
 * auto TestGroup, the group has two modes
 * a) automated lifecycle
 * b) manually triggered lifecycle
 *
 * a) is run through automatically after start
 * b) is run through manually and triggered by the teardown
 * method of the testcases (needed for deferred executions)
 */
//we reserve some global vars for the tests to make them shorter

_class("myfaces._supportive.unittest.TestGroup", Object, {
    _description: null,
    testCases: null,
    _allTestsPassed: true,
    _url: null,
    _startTime : null,
    _endTime: null,
    _performanceTime: null,

    _Lang: myfaces._impl._util._Lang,
    _Dom: myfaces._impl._util._Dom,

    constructor_: function(args) {
        this._Lang.applyArgs(this, args);
        this.testCases = [];
        this._statisticsEngine = this._statisticsEngine || new myfaces._supportive.unittest.AjaxStatisticsEngine();
        this.tearDown = this._Lang.hitch(this, this.tearDown);
        this._tearDown = this._Lang.hitch(this, this._tearDown);
        this._url = this._url ||window.location.href.replace(/autotest\=true\&{0,1}/gi,"");
    },

    addCase: function(testCase) {
        this.testCases.push(testCase);
        return this;
    },

    fail: function(message, testCase) {
        this._allTestsPassed = false;
    },
    /**
     * helper builder pattern to keep the code lean
     *
     * @param attrs
     * @param postCondition
     */
    defineCase: function(attrs, postCondition) {
        if ('undefined' == typeof postCondition) {
            this.testCases.push(new myfaces._supportive.unittest.TestCase(attrs));
        } else {
            this.testCases.push(new myfaces._supportive.unittest.TestCase({
                testGroup: this,
                description: attrs,
                postcondition: postCondition
            }));
        }
        return this;
    },

    setup: function() {
        //helper for myfaces jquery seems to clean up the namespace in ie
        //window.myfaces = window.myfaces ||{};
        //myfaces.config = myfaces.config ||{};
        //myfaces.config.projectStage = "Development";


        this._startTime = new Date();
        this._statisticsEngine.startTestGroup(this);

        var testCases = this.testCases;
        for (var cnt = 0; cnt < testCases.length; cnt++) {
            //this is the only time the testframework can throw an error
            //a unit test must at least contain a description
            if (!testCases[cnt]._description) {
                throw Error("Description in testCase missing:" + testCases[cnt].toString());
            }
            testCases[cnt].attr("statisticsEngine", this._statisticsEngine);
            testCases[cnt].attr("testGroup", this);
            //we decorate the teardown function of the testcase
            //to get a callback into our own next method to call
            //the next testcase once the preceeding one is finished
            (function(cnt2, _t) {
                var oldFunc = testCases[cnt2].tearDown;
                //we decorate the teardown to trigger the next properly
                testCases[cnt2].tearDown = _t._Lang.hitch(_t, function() {
                    try {
                        oldFunc();
                    } catch (e) {
                        console.error(e);
                    } finally {
                        //the defer is needed so that we are out of the function
                        //to avoid a stack overflow
                        setTimeout(this._Lang.hitch(this, function() {
                            this.next();
                        }), 0);
                    }
                });
            })(cnt, this);
        //if we do not scope correctly in an inner function, then we run into the
        //last oldfunc instead of the current one of the loop
        }
        this._currentLifecyclePos = 0;
    },

    next: function() {
        if (this._currentLifecyclePos == this.testCases.length) {
            try {

                for (var cnt = 0; this._allTestsPassed && cnt < this.testCases.length; cnt++) {
                    this._allTestsPassed = this._allTestsPassed & !this.testCases[cnt].isFailed();
                }

                //TODO postcondition call only if he lifecycle has succeeded
                if (this._allTestsPassed && !this.postcondition()) {
                    this.logError("Precondition failed for test group");
                    return false;
                }
            } finally {
                this._tearDown();
                this.tearDown();
            }
            return false;
        }

        var lifecyclePos = this._currentLifecyclePos;
        this._currentLifecyclePos ++;
        //we defer until the end of the execution to perform the next lifecycle

        this._lifeCycle(lifecyclePos);

        //we now can increment

        return true;
    },

    /*
     runAuto: function() {
     var testCases = this.testCases;

     for (var cnt = 0; cnt < testCases.length; cnt++) {
     this._lifeCycle(cnt);
     }

     },
     */

    _lifeCycle: function(cnt) {
        try {
            var testCases = this.testCases;
            testCases[cnt].setup();
            if (!testCases[cnt].precondition()) {
                testCases[cnt].fail("skipping test: precondition failed for ", testCases[cnt]);
                return;
            }

            testCases[cnt].run();

            if (!testCases[cnt].isFailed() && !testCases[cnt].attr("manualPostCondition")) {
                testCases[cnt].postcondition();
                if (testCases[cnt].isFailed()) {

                    testCases[cnt].fail("skipping test: postcondition failed ");
                }
            }
        } catch(e) {
            testCases[cnt].fail("exception in test, fail" + e.toString());
        } finally {
            if (!testCases[cnt]._manualPostCondition) {
                testCases[cnt]._tearDown();
                testCases[cnt].tearDown();
            }
        }
    },

    logInfo: function(message) {
        this._statisticsEngine.logInfo(this._description, message);
    },
    logDebug: function(message) {
        this._statisticsEngine.logDebug(this._description, message);
    },
    logError: function(message) {
        this._statisticsEngine.logError(this._description, message);
    },
    precondition: function() {
        return true;
    },


    postcondition: function() {

        return true;
    },
    _tearDown: function() {
        this._endTime = new Date();
        if(this._endTime && this._startTime) {
            this._performanceTime = this._endTime.getTime() - this._startTime.getTime();
        }
    },
    tearDown: function() {
        this._statisticsEngine.endTestGroup(this);
    },

    start: function() {
        this.setup();
        this.logInfo("Starting test");
        if (!this.precondition()) {
            this.logError("Precondition failed for test group");
            return;
        }
        this.next();

    },

    /**
     * helper to reduce the auto forwarding code
     * @param url
     */
    autoForward: function(url) {
        //we timeout because then our postprocessing is securely done
        setTimeout(function() {
            if (window.location.href.indexOf("autotest=true") != -1) {
                if (url.indexOf("?") == -1) {
                    window.location.href = url + "?autotest=true";
                } else {
                    window.location.href = url + "&autotest=true";
                }
            }
        },300);
    },
    attr: function(name, value) {
        if ('undefined' != typeof value) {
            this["_" + name] = value;
            return value;
        } else {
            return this["_" + name];
        }
    }

});
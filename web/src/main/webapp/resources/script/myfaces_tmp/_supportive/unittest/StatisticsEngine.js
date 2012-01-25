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
 * A simple statistics engine which keeps track of the current progress
 * it currently only logs data
 * This is the most basic implementation
 */
myfaces._impl.core._Runtime.extendClass("myfaces._supportive.unittest.StatisticsEngine", Object, {


    _numberOfTestsPerformed: 0,
    _numberOfTestsSucceeded: 0,
    _numberOfTestsFailed: 0,

    _testCaseFailed: false,
    _fails: null,

    _Lang: myfaces._impl._util._Lang,
    _Logger: myfaces._impl._util._Logging,

    constructor_: function() {
        this._performed = [];
        this._fails = [];
    },

    attr: function(name, value) {
        if ('undefined' != typeof value) {
            this["_" + name] = value;
            return value;
        } else {
            return this["_" + name];
        }
    },

    /**
     * Simple assert true
     *
     * @param message the assertion message
     * @param assertionOutcome the assertion outcome (true or false)
     */
    assertTrue: function(testcase, message, assertionOutcome) {
        if (!assertionOutcome) {
            this._Logger.logError(testcase, ":", message, "assertionOutcome:", assertionOutcome);
            this._testCaseFailed = true;
            return false;
        }
        this._Logger.logInfo(testcase, ":", message, "assertionOutcome:", assertionOutcome);
        return true;
    },

    /**
     * Simple assert false
     *
     * @param message the assertion message
     * @param assertionOutcome the assertion outcome (true or false)
     */
    assertFalse: function(testCase, message, assertionOutcome) {
        if (assertionOutcome) {
            this._Logger.logError(testCase, ":", message, "assertionOutcome:", assertionOutcome);
            this._testCaseFailed = true;
            return false;
        }
        this._Logger.logInfo(testCase, ":", message, "assertionOutcome:", assertionOutcome);
        return true;
    },

    startTestCase: function(testCase) {
        this._Logger.logInfo("Starting Testcase:", testCase.attr("description"));
    },

    endTestCase: function(testCase) {
        this._numberOfTestsPerformed++;
        if (this._testCaseFailed) {
            this._numberOfTestsFailed ++;
            this._testCaseFailed = false;
            this._fails.push(testCase.attr("description"));
        } else {
            this._numberOfTestsSucceeded++;
        }

        this._Logger.logInfo("Ending testcase:", testCase.attr("description"));
    },

    startTestGroup: function(testGroup) {
        this._Logger.logInfo("Starting Testgroup:", testGroup.attr("description"));
    },

    endTestGroup: function(testGroup) {
        var _Logger = this._Logger;
        _Logger.logInfo("Ending Testgroup:", testGroup.attr("name"));
        _Logger.logInfo("","--------------------------------------------------------------------------------");
        _Logger.logInfo("","Final Results");

        _Logger.logInfo("","Number of tests performed", this._numberOfTestsPerformed);
        _Logger.logInfo("","Number of tests succeeded", this._numberOfTestsSucceeded);
        _Logger.logInfo("","Number of tests failed", this._numberOfTestsFailed);

        for (var cnt = 0; cnt < this._fails.length; cnt++) {
            _Logger.logError("Test Failed:", this._fails[cnt]);
        }
    },


    logInfo: function(testCase, message) {
        this._Logger.logInfo(testCase, message);
    },
    logDebug: function(testCase, message) {
        this._Logger.logDebug(testCase, message);
    },
    logError: function(testCase, message) {
        this._Logger.logError(testCase, message);
    },


    fail: function(testCase, message) {
        this._Logger.logError(testCase, ":", message);
        this._testCaseFailed = true;
        return false;
    }
});
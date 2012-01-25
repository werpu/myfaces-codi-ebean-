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
 * An implementation of the statistics engine which sends the jsoned
 * data down to a collectors servlet once a testgroup is performed
 *
 * the data schema is
 * groups [
 *  {
 *      name:groupName,
 *
 *      testCases:[ {
 *          name:<testcaseName>
 *          url:<url to the originating page>
 *          assertions: [{
 *              type: <AssertTrue, AssertFalse, Fail>
 *              outcome: <true, false>
 *              message: <Message>
 *              failure: <true, false>
 *          }]
 *          success: true|false
 *      }]*,
 *
 *      assertions: [
 *         type: <AssertTrue, AssertFalse, Fail>
 *         outcome: <true, false>
 *         message: <Message>
 *         failure: <true, false>
 *      ],
 *
 *      finalResult: {
 *          numberOfTestsPerformed: <No Performed>
 *          numberOfTestsSucceeded: <No Succeeded>
 *          numberOfTestsFailed: <NoFailed>
 *      }
 *  }*
 * ]
 */
myfaces._impl.core._Runtime.extendClass("myfaces._supportive.unittest.AjaxStatisticsEngine", myfaces._supportive.unittest.StatisticsEngine, {

    _serviceUrl:"./collector.statistics",
    _groupsPerformed:null,
    _currentGroup:null,
    _currentTestCase:null,

    constructor_:function (args) {
        this._callSuper("constructor_", args);
        this._groupsPerformed = [];
    },

    startTestGroup:function (testGroup) {
        this._callSuper("startTestGroup", testGroup);
        this._currentGroup = {};
        this._currentGroup.name = testGroup.attr("description");
        this._currentGroup.testCases = [];
        this._currentGroup.finalResult = {};
        this._currentGroup.url = testGroup.attr("url");
        this._currentGroup.finalResult.numberOfTestsPerformed = 0;
        this._currentGroup.finalResult.numberOfTestsSucceeded = 0;
        this._currentGroup.finalResult.numberOfTestsFailed = 0;
        this._currentGroup.assertions = [];
        this._groupsPerformed.push(this._currentGroup);

    },

    startTestCase:function (testCase) {
        this._callSuper("startTestCase", testCase);
        this._currentTestCase = {};
        this._currentTestCase.name = this.attr("description");
        this._currentTestCase.assertions = [];
        this._currentTestCase.success = true;
        this._currentGroup.testCases.push(this._currentTestCase);
    },

    endTestCase:function (testCase) {
        this._currentTestCase.success = !testCase.attr("failed");
        this._callSuper("endTestCase", testCase);

    },

    endTestGroup:function (testGroup) {
        this._callSuper("endTestGroup", testGroup);
        this._currentGroup.finalResult.numberOfTestsPerformed = this._numberOfTestsPerformed;
        this._currentGroup.finalResult.numberOfTestsSucceeded = this._numberOfTestsSucceeded;
        this._currentGroup.finalResult.numberOfTestsFailed = this._numberOfTestsFailed;
        this._currentGroup.finalResult.performanceTime = testGroup.attr("performanceTime") || 0;
        this._sendTestResults();
    },

    pushAssertion:function (assertion) {
        if (this._currentTestCase)
            this._currentTestCase.assertions.push(assertion);
        else
            this._currentGroup.assertions.push(assertion);
    },

    assertTrue:function (testCase, message, assertionOutcome) {
        var ret = this._callSuper("assertTrue", testCase, message, assertionOutcome);
        var assertion = {};
        assertion.type = "assertTrue";
        assertion.message = message;
        assertion.outcome = assertionOutcome;
        assertion.failure = !assertionOutcome;
        this.pushAssertion(assertion);
        return ret;
    },

    assertFalse:function (testCase, message, assertionOutcome) {
        var ret = this._callSuper("assertFalse", testCase, message, assertionOutcome);
        var assertion = {};
        assertion.type = "assertFalse";
        assertion.message = message;
        assertion.outcome = assertionOutcome;
        assertion.failure = assertionOutcome;
        this.pushAssertion(assertion);
        return ret;
    },

    fail:function (testCase, message) {
        var ret = this._callSuper("fail", testCase, message);
        var assertion = {};
        assertion.type = "assertFalse";
        assertion.message = message;
        assertion.outcome = false;
        assertion.failure = true;
        this.pushAssertion(assertion);
        return ret;
    },

    /*send the test results down the server
     * via a synchronous http post*/
    _sendTestResults:function () {
        var xhr = new myfaces._impl.xhrCore.engine.Xhr1({
            xhrObject:myfaces._impl.core._Runtime.getXHRObject()
            });

        var data = "sendstats=true&testGroup=" + escape(JSON.stringify(this._groupsPerformed));
        xhr.open("post", this._serviceUrl, false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //try {
        //    xhr.setRequestHeader("Content-length", data.length);
        //    xhr.setRequestHeader("Connection", "close");
        //} catch (e) {
        //avoid a chrome error with content length and connection
        //chrome writes refused to set unsafe header....
        //}
        xhr.send(data);
    }
});


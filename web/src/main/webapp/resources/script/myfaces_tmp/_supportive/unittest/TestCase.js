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
var _RT = myfaces._impl.core._Runtime;
var _class = myfaces._impl.core._Runtime.extendClass;
var _Lang = myfaces._impl._util._Lang;
var _Dom = myfaces._impl._util._Dom;

/**
 * Simple base testcase
 */
_class("myfaces._supportive.unittest.TestCase", Object, {
    _description: null,
    _manualPostCondition: false,
    _statisticsEngine: null,
    _failed: false,
    _finalFail: false,

    _testGroup: null,

    _Lang: myfaces._impl._util._Lang,
    _Dom: myfaces._impl._util._Dom,


    constructor_: function(args) {
        this._Lang.applyArgs(this, args);
        this.precondition = this._Lang.hitch(this, this.precondition);
        this.postcondition = this._Lang.hitch(this, this.postcondition);
        this.run = this._Lang.hitch(this, this.run);
        this.setup = this._Lang.hitch(this, this.setup);
        this.tearDown = this._Lang.hitch(this, this.tearDown);
        this.attr = this._Lang.hitch(this, this.attr);

    },

    attr: function(name, value) {
        if ('undefined' != typeof value) {
            this["_" + name] = value;
            return value;
        } else {
            return this["_" + name];
        }
    },

    setup: function() {
        this._statisticsEngine.startTestCase(this);
    },

    precondition: function() {
        return true;
    },

    run: function() {

    },

    postcondition: function() {
        return true;
    },

    endCase: function() {
        this._statisticsEngine.endTestCase(this);
    },

    _tearDown: function() {
        this.endCase();
    },

    tearDown: function() {
    },

    assertTrue: function( message, condition) {
        if(this._finalFail) return;
        condition = !! condition;
        this._failed = this._failed ||!this._statisticsEngine.assertTrue(this._description, message, condition);
    },

    assertFalse: function( message, condition) {
        if(this._finalFail) return;
        condition = !! condition;
        this._failed = this._failed ||!this._statisticsEngine.assertFalse(this._description, message, condition);
    },

    fail: function(message) {
        this._statisticsEngine.fail(this._description, message);
        this._failed = true;
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

    isFailed: function() {
        return this._failed;
    }
});
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

myfaces._impl.core._Runtime.extendClass("myfaces._impl.xhrCore._IFrameRequest", myfaces._impl.xhrCore._AjaxRequest, {

    _sourceForm: null,

    constructor_: function(arguments) {
        this._callSuper("constructor_", arguments);
    },

    getViewState: function() {
        var _Lang = myfaces._impl._util._Lang;
        var _ret;
        if (!this._partialIdsArray || this._partialIdsArray.length == 0) {
            _ret = new FormData(this._sourceForm);
        } else {
            _ret = _Lang.createFormDataDecorator(new FormData());
            this._ajaxUtil.encodeSubmittableFields(_ret, this._xhr, this._context, this._source,
                    this._sourceForm, this._partialIdsArray);
        }
        return _ret;
    },

    _formDataToURI: function(formData) {
        if (formData.makeFinal()) return formData.makeFinal();
        //deficit in the html5 spec for a uri we have to work over the old method
        return this._callSuper("getViewState").makeFinal();
    },

    _getTransport: function() {
        return new XMLHttpRequest();
    }

});
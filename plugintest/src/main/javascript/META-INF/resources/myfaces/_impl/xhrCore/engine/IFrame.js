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
 * XHR Engine which utilizes an iframe
 *
 * main difference we have to pass a source form in the constructor
 * TODO we have to emulate the xhr level2 form object
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl.xhrCore.engine.IFrame", myfaces._impl.xhrCore._FinalizeableObj, {

    /*standard attributes*/
    timeout: 0,
    readyState: 0,
    method: "POST",
    url:null,
    async:true,

    FRAME_ID: "_mf_comm_frm",
    /*the target frame responsible for the communication*/
    _frame: null,
    /*the sourceform*/
    _sourceForm: null,

    CLS_NAME: "myfaces._impl.xhrCore._IFrameRequest",

    readyState: null,


    _requestHeader: null,
    _aborted: false,

    /**
     * constructor which shifts the arguments
     * to the protected properties of this clas
     *
     * @param arguments
     */
    constructor_: function(arguments) {
        //we fetch in the standard arguments
        this._callSuper("constructor", arguments);
        this._Lang.applyArgs(this, arguments);
        this._initDefaultFinalizableFields();
        this._requestHeader = {};

        this._Lang = myfaces._impl._util._Lang;
        this._Dom = myfaces._impl._util._Dom;
        this._RT = myfaces._impl.core._Runtime;
        this._XHRConst = myfaces._impl.xhrCore.engine.XhrConst;
        this.readyState = this._XHRConst.READY_STATE_UNSENT;
    },

    setRequestHeader: function(key, value) {
        this._requestHeader[key] = value;
    },

    open: function(method, url, async) {
        this.readyState = this._XHRConst.READY_STATE_OPENED;
        var _Impl = this._getImpl();
        var _RT = myfaces._impl.core._Runtime;

        this._frame = this._createTransportFrame();

        //we append an onload handler to the frame
        //to cover the starting and loading events,
        //timeouts cannot be covered in a cross browser way

        //we point our onload handler to the frame, we do not use addOnLoad
        //because the frame should not have other onload handlers in place
        if (!_RT.browser.isIE) {
            this._frame.onload = this._Lang.hitch(this, this._callback);
        } else {
            //ie has a bug, onload is not settable outside of innerHTML on iframes
            this._frame.onload_IE = this._Lang.hitch(this, this._callback);
        }

        this.method = method;
        this.url = url;
        this.async = async;

        var myevt = {};
        this._addProgressAttributes(myevt, 10, 100);
        this.onprogress(myevt);
    },

    send: function(formData) {
        var myevt = {};
        this._addProgressAttributes(myevt, 20, 100);
        this.onloadstart(myevt);
        this.onprogress(myevt);

        var oldTarget = formData.form.target;
        var oldMethod = formData.form.method;
        var oldAction = formData.form.action;
        try {
            //this._initAjaxParams();
            for (var key in this._requestHeader) {
                formData.append(key, this._requestHeader[key]);
            }

            formData.form.target = this._frame.name;
            formData.form.method = this.method;
            if (this.url) {
                formData.form.action = this.url;
            }
            this.readyState = this._XHRConst.READY_STATE_LOADING;
            this.onreadystatechange(myevt);
            formData.form.submit();
        } finally {
            formData.form.action = oldAction;
            formData.form.target = oldTarget;
            formData.form.method = oldMethod;
            formData._finalize();
        }
    },
    /*we can implement it, but it will work only on browsers
     * which have asynchronous iframe loading*/
    abort: function() {
        this._aborted = true;
        this.onabort({});
    },

    //onprogress and onabort for now not called
    onreadystatechange: function(evt) {
    },

    onprogress: function(evt) {
    },
    onabort: function(evt) {
    },
    onerror: function(evt) {
    },
    onload: function(evt) {
    },
    ontimeout: function(evt) {
    },
    onloadend: function(evt) {
    },


    _addProgressAttributes: function(evt, percent, total) {
        //http://www.w3.org/TR/progress-events/#progressevent
        evt.lengthComputable = true;
        evt.loaded = percent;
        evt.total = total;

    },


    _callback: function() {
        //aborted no further processing
        if (this._aborted) return;
        try {
            var myevt = {};
            this._addProgressAttributes(myevt, 100, 100);
            this.readyState = this._XHRConst.READY_STATE_DONE;
            this.onreadystatechange(myevt);

            this.responseText = this._getFrameText();
            this.responseXML = this._getFrameXml();
            this.readyState = this._READY_STATE_DONE;

            this.onreadystatechange(myevt);
            this.onloadend();

            if (!this._Lang.isXMLParseError(this.responseXML)) {
                this.status = 201;
                this.onload();
            } else {
                this.status = 0;
                //we simulate the request for our xhr call
                this.onerror();
            }


        } finally {
            this._frame = null;
        }
    },



    /**
     * returns the frame text in a browser independend manner
     */
    _getFrameDocument: function() {
        //we cover various browsers here, because almost all browsers keep the document in a different
        //position
        return this._frame.contentWindow.document || this._frame.contentDocument || this._frame.document;
    }
    ,

    _getFrameText: function() {
        var framedoc = this._getFrameDocument();
        //also ie keeps the body in framedoc.body the rest in documentElement
        var body = framedoc.body || framedoc.documentElement;
        return  body.innerHTML;
    }
    ,

    _clearFrame: function() {
        var framedoc = this._getFrameDocument();
        var body = framedoc.documentElement || framedoc.body;
        //ie8 in 7 mode chokes on the innerHTML method
        //direct dom removal is less flakey and works
        //over all browsers, but is slower
        this._Dom._removeChildNodes(body, false);
    }
    ,

    /**
     * returns the processed xml from the frame
     */
    _getFrameXml: function() {
        var framedoc = this._getFrameDocument();
        //same situation here, the xml is hosted either in xmlDocument or
        //is located directly under the frame document
        return  framedoc.XMLDocument || framedoc;
    }
    ,

    _createTransportFrame: function() {
        var _RT = this._RT;
        var frame = document.getElementById(this._FRAME_ID);
        //normally this code should not be called
        //but just to be sure
        if (!frame) {
            if (!_RT.browser.isIE) {
                frame = document.createElement('iframe');

                //probably the ie method would work on all browsers
                //but this code is the safe bet it works on all standards
                //compliant browsers in a clean manner

                this._Dom.setAttribute(frame, "src", "about:blank");
                this._Dom.setAttribute(frame, "id", this._FRAME_ID);
                this._Dom.setAttribute(frame, "name", this._FRAME_ID);
                this._Dom.setAttribute(frame, "type", "content");
                this._Dom.setAttribute(frame, "collapsed", "true");
                this._Dom.setAttribute(frame, "style", "display:none");

                document.body.appendChild(frame);
            } else { //Now to the non compliant browsers
                var node = document.createElement("div");
                this._Dom.setAttribute(node, "style", "display:none");
                //we are dealing with two well known iframe ie bugs here
                //first the iframe has to be set via innerHTML to be present
                //secondly the onload handler is immutable on ie, we have to
                //use a dummy onload handler in this case and call that one
                //from the onload handler
                node.innerHTML = "<iframe id='" + this._FRAME_ID + "' name='" + this._FRAME_ID + "' style='display:none;' src='about:blank' type='content' onload='this.onload_IE();'  ></iframe>";

                //avoid the ie open tag problem
                var body = document.body;
                if (body.firstChild) {
                    body.insertBefore(node, document.body.firstChild);
                } else {
                    body.appendChild(node);
                }
            }

        }
        //helps to for the onload handlers and innerhtml to be in sync again
        return document.getElementById(this._FRAME_ID);

    },

    _startTimeout: function() {
        if (this.timeout == 0) return;
        this._timeoutTimer = setTimeout(this._Lang.hitch(this, function() {
            if (!this._xhrObject.readyState == this._XHRConst.READY_STATE_DONE) {
                this._aborted = true;
                clearTimeout(this._timeoutTimer);
                //we cannot abort an iframe request
                this.ontimeout({});
                this._timeoutTimer = null;
            }
        }), this.timeout);
    }
});

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
 * An implementation of an xhr request object
 * with partial page submit functionality, and jsf
 * ppr request and timeout handling capabilities
 *
 * Author: Werner Punz (latest modification by $Author: ganeshpuri $)
 * Version: $Revision: 1.4 $ $Date: 2009/05/31 09:16:44 $
 */

/**
 * @class
 * @name _AjaxRequest
 * @memberOf myfaces._impl.xhrCore
 * @extends myfaces._impl.xhrCore._BaseRequest
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl.xhrCore._AjaxRequest", myfaces._impl.xhrCore._BaseRequest,
        /** myfaces._impl.xhrCore._AjaxRequest.prototype */
        {

            _contentType: "application/x-www-form-urlencoded",
            /*source element issuing the request*/
            _source: null,
            /*encoding*/
            _encoding:null ,
            /*context passed down from the caller*/
            _context:null,
            /*source form issuing the request*/
            _sourceForm: null,
            /*passthrough parameters*/
            _passThrough: null,

            /*queue control*/
            _timeout: null,
            _delay:null,
            _queueSize:-1,
            _xhrQueue: null,

            /*pps*/
            _partialIdsArray : null,

            //non exposed params
            _ajaxUtil: null,
            /*xhr object, internal param*/
            _xhr: null,
            // _exception: null,
            // _requestParameters: null,
            /**
             * Constructor
             * <p />
             * note there is a load of common properties
             * inherited by the base class which define the corner
             * parameters and the general internal behavior
             * like _onError etc...
             * @param {Map} an arguments map which an override any of the given protected
             * instance variables, by a simple name value pair combination
             */
            constructor_: function(args) {

                try {
                    this._callSuper("constructor", args);
                    this._initDefaultFinalizableFields();
                    this._onException = this._Lang.hitch(this, this._stdErrorHandler);
                    this._onWarn = this._Lang.hitch(this, this._stdErrorHandler);

                    /*namespace remapping for readability*/
                    //we fetch in the standard arguments
                    //and apply them to our protected attributes
                    this._Lang.applyArgs(this, arguments);

                    this._ajaxUtil = new myfaces._impl.xhrCore._AjaxUtils(this._onException, this._onWarn);
                } catch (e) {
                    //_onError
                    this._onException(this._xhr, this._context, "myfaces._impl.xhrCore._AjaxRequest", "constructor", e);
                }
            },

            /**
             * Sends an Ajax request
             */
            send : function() {
                try {
                    /*we wrap the xhr object*/
                    /*TODO move this into a reusable place*/
                    this._xhr = this._getTransport();

                    var targetURL;
                    if (typeof this._sourceForm.elements["javax.faces.encodedURL"] == 'undefined') {
                        targetURL = this._sourceForm.action;
                    } else {
                        targetURL = this._sourceForm.elements["javax.faces.encodedURL"].value;
                    }

                    var formData = this.getViewState();
                    for (var key in this._passThrough) {
                        formData.append(key, this._passThrough[key]);
                    }

                    this._xhr.open(this._ajaxType, targetURL +
                            ((this._ajaxType == "GET") ? "?" + this._formDataToURI(formData) : "")
                            , true);

                    var contentType = this._contentType;
                    if (this._encoding) {
                        contentType = contentType + "; charset:" + this._encoding;
                    }

                    this._xhr.setRequestHeader(this._CONTENT_TYPE, this._contentType);
                    this._xhr.setRequestHeader(this._HEAD_FACES_REQ, this._VAL_AJAX);

                    this._xhr.timeout = this._timeout || 0;

                    this._xhr.onprogress = this._Lang.hitch(this, this.onprogress);
                    this._xhr.ontimeout = this._Lang.hitch(this, this.ontimeout);
                    this._xhr.onloadend = this._Lang.hitch(this, this.ondone);
                    this._xhr.onload = this._Lang.hitch(this, this.onsuccess);
                    this._xhr.onerror = this._Lang.hitch(this, this.onerror);

                    var _Impl = this._getImpl();
                    _Impl.sendEvent(this._xhr, this._context, _Impl.BEGIN);

                    this._xhr.send((this._ajaxType != "GET") ? formData : null);

                } catch (e) {
                    //_onError//_onError
                    this._onException(this._xhr, this._context, "myfaces._impl.xhrCore._AjaxRequest", "send", e);
                }
            },


            ondone: function() {
                this._getImpl().sendEvent(this._xhr, this._context, this._getImpl().COMPLETE);
            },


            onsuccess: function(evt) {
                try {
                    var _Impl = this._getImpl();

                    //now we have to reroute into our official api
                    //because users might want to decorate it, we will split it apart afterwards
                    this._context._mfInternal = this._context._mfInternal || {};
                    this._context._mfInternal._mfRequest = this;

                    jsf.ajax.response(this._xhr, this._context);

                    _Impl.sendEvent(this._xhr, this._context, _Impl.SUCCESS);

                } catch (e) {
                    this._onException(this._xhr, this._context, "myfaces._impl.xhrCore._AjaxRequest", "callback", e);
                } finally {
                    if (this.isQueued()) {
                        this._xhrQueue.processQueue();
                    }
                    //ie6 helper cleanup
                    delete this._context.source;
                    this._finalize();
                }
            },

            onerror: function(evt) {
                var _Impl = this._getImpl();

                //_onError
                var errorText = "";
                try {
                    var UNKNOWN = this._Lang.getMessage("UNKNOWN");
                    var errorText = this.Lang.getMessage("ERR_REQU_FAILED", null,
                            (this._xhr.status || UNKNOWN),
                            (this._xhr.statusText || UNKNOWN));

                } catch (e) {
                    errorText = this._Lang.getMessage("ERR_REQ_FAILED_UNKNOWN", null);
                } finally {
                    try {
                        _Impl.sendError(this._xhr, this._context, _Impl.HTTPERROR,
                                _Impl.HTTPERROR, errorText);
                    } finally {
                        if (this._xhrQueue) {
                            this._xhrQueue.processQueue();
                        }
                        //ie6 helper cleanup
                        delete this.getContext().source;

                    }
                    this._finalize();
                }
                //_onError
            },

            onprogress: function(evt) {
                //do nothing for now
            },

            ontimeout: function(evt) {
                try {
                    var _Impl = this._getImpl();

                    //we issue an event not an error here before killing the xhr process
                    _Impl.sendEvent(this._xhr, this._context, _Impl.TIMEOUT_EVENT,
                            _Impl.TIMEOUT_EVENT);
                    //timeout done we process the next in the queue
                } finally {
                    //We trigger the next one in the queue
                    if (this._xhrQueue) {
                        this._xhrQueue.processQueue();
                    }
                    this._finalize();
                }
            },



            _formDataToURI: function(formData) {
                formData.makeFinal();
            },

            _getTransport: function() {
                return new myfaces._impl.xhrCore.engine.Xhr1({_xhrObject: myfaces._impl.core._Runtime.getXHRObject()});
            },



            //----------------- backported from the base request --------------------------------
            //non abstract ones
            /**
             * Spec. 13.3.1
             * Collect and encode input elements.
             * Additionally the hidden element javax.faces.ViewState
             *
             *
             * @return  an element of formDataWrapper
             * which keeps the final Send Representation of the
             */
            getViewState : function() {
                var ret = this._Lang.createFormDataDecorator(new Array());

                this._ajaxUtil.encodeSubmittableFields(ret, this._xhr, this._context, this._source,
                        this._sourceForm, this._partialIdsArray);

                return ret;
            },

            _getImpl: function() {
                this._Impl = this._Impl || myfaces._impl.core._Runtime.getGlobalConfig("jsfAjaxImpl", myfaces._impl.core.Impl);
                return this._Impl;
            },


            /**
             * Client error handlers which also in the long run route into our error queue
             * but also are able to deliver more meaningful messages
             * note, in case of an error all subsequent xhr requests are dropped
             * to get a clean state on things
             *
             * @param request the xhr request object
             * @param context the context holding all values for further processing
             * @param sourceClass (String) the issuing class for a more meaningful message
             * @param func the issuing function
             * @param exception the embedded exception
             */
            _stdErrorHandler: function(request, context, sourceClass, func, exception) {
                try {
                    var _Impl = this._getImpl();
                    _Impl.stdErrorHandler(request, context, sourceClass, func, exception);
                } finally {
                    if (this._xhrQueue) {
                        this._xhrQueue.cleanup();
                    }
                }
            },

            getXhr: function() {
                return this._xhr;
            },

            getContext: function() {
                return this._context;
            },

            setQueue: function(queue) {
                this._xhrQueue = queue;
            },

            isQueued: function() {
                return this._xhrQueue;
            },

            //cleanup
            _finalize: function() {
                //final cleanup to terminate everything
                this._Lang.clearExceptionProcessed();

                //this._context.source;
                if (this._xhr.readyState == this._READY_STATE_DONE) {
                    this._callSuper("_finalize");
                }
            }
        });


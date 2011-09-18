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
 * a basic node wrapper which capsules all needed
 * operations for our node handling. Due to the functional
 * builder approach we get a leaner code density than we would
 * have with a purely imperative one.
 *
 *
 * Note the query ops will return the node
 * @namespace myfaces._impl._dom.Node
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl._dom.Node", Object, {

            _NODE_UTILS: myfaces._impl._dom._NodeUtils,
            _QUERY: myfaces._impl._dom.Query,


            _Lang:  myfaces._impl._util._Lang,
            _RT:    myfaces._impl.core._Runtime,
            _NodeUtils: myfaces._impl._dom._NodeUtils,

            /** @namespace this._dummyPlaceHolder */
            _dummyPlaceHolder:null,


            _id:  null,
            _name: null,
            /** @namespace this._referencedNode */
            _referencedNode: null,
            /** @namespace this._tagName */
            _tagName: null,

            DATA_ATTR_JAVASCRIPT_VAR: "data-ezw_javascriptvar",

            constructor_: function(elem) {
                this._referencedNode = this._NODE_UTILS.byIdOrName(elem);
                var _defProp = Object.defineProperty;

                _defProp(this, "id", {
                    set: function(id) {
                        this._referencedNode = id;
                    },
                    get: function() {
                        return this._referencedNode.id;
                    }
                });
                _defProp(this, "value", {
                    set: function(value) {
                        this._referencedNode.value = value;
                    },
                    get: function() {
                        return this._referencedNode.value;
                    }
                });

                _defProp(this, "javascriptVar", {
                    get: function() {
                        return window[ this._referencedNode.getAttribute(this.DATA_ATTR_JAVASCRIPT_VAR)];
                    },
                    readonly: true
                });

                _defProp(this, "childNodes", {
                    get: function() {
                        return new myfaces._impl._dom.NodeList(this._referencedNode.childNodes);
                    }
                });
                _defProp(this, "parentNode", {
                    get: function() {
                        return new myfaces._impl._dom.Node(this._referencedNode.parentNode);
                    }
                });
                _defProp(this, "offsetParent", {
                    get: function() {
                        if (this._referencedNode.offsetParent)
                            return new myfaces._impl._dom.Node(this._referencedNode.offsetParent);
                        else return null;
                    }
                });
                _defProp(this, "offsetTop", {
                    get: function() {
                        return this._referencedNode.offsetTop;
                    }
                });
                _defProp(this, "offsetLeft", {
                    get: function() {
                        return this._referencedNode.offsetLeft;
                    }
                });
                _defProp(this, "offsetHeight", {
                    get: function() {
                        return this._referencedNode.offsetHeight;
                    }
                });
                _defProp(this, "offsetWidth", {
                    get: function() {
                        return this._referencedNode.offsetWidth;
                    }
                });

                _defProp(this, "offset", {
                    get: function() {
                        return {x: this._referencedNode.offsetLeft,
                            y: this._referencedNode.offsetTop,
                            h: this._referencedNode.offsetHeight,
                            w: this._referencedNode.offsetWidth};
                    }
                });

                _defProp(this, "absoluteOffsetLeft", {
                    get: function() {
                        var offset = 0;
                        var obj = this;
                        do {
                            offset += obj.offsetLeft;
                        } while (obj = obj.offsetParent);
                        return offset;
                    }
                });
                _defProp(this, "absoluteOffsetTop", {
                    get: function() {
                        var offset = 0;
                        var obj = this;
                        do {
                            offset += obj.offsetTop;
                        } while (obj = obj.offsetParent);
                        return offset;
                    }
                });

                _defProp(this, "nodeName", {
                    get: function() {
                        return this._referencedNode.nodeName;
                    }
                });
            },

            isTag: function(name) {
                /*we lazily store the tagName for future references*/
                this._tagName = this._tagName || this._referencedNode.tagName;
                return this._referencedNode.tagName.toLowerCase() == name;
            }
            ,

            getId: function() {
                this._id = this._id || this._referencedNode.id;
                return this._id;
            }
            ,

            getName: function() {
                this._name = this._name || this._referencedNode.name;
                return this._name;
            }
            ,

            nodeIdOrName: function() {
                return this.getId() || this.getName();
            }
            ,

            /*purges the given node and all its subelements from the dom tree*/
            purge: function() {

                this._NodeUtils.deleteItem(this._referencedNode);

                this._referencedNode = null;
                this._id = null;
                this._name = null;
            }
            ,

            purgeChilds: function() {
                this.childNodes.purge();
                return this;
            }
            ,

            detach: function() {
                if (!this._referencedNode.parentNode) {
                    return this;
                }
                this._referencedNode = this._referencedNode.parentNode.removeChild(this._referencedNode);
                return this;
            }
            ,

            setStyle: function(key, val) {
                this._referencedNode.style[key] = val;
                return this;
            }
            ,

            style: function(styleMap) {
                for (var key in styleMap) {
                    if (!key) continue;
                    this.setStyle("" + key, styleMap[key]);
                }
                return this;
            }
            ,

            removeStyle: function(key) {
                this._referencedNode.style.removeProperty(key);
                return this;
            }
            ,

            getStyle: function(key, val) {
                return this._referencedNode.style[key];
            }
            ,

            setAttribute: function(attr, val) {
                this._NodeUtils.setAttribute(this._referencedNode, attr, val);
                return this;
            }
            ,

            getAttribute: function(attr) {
                return this._NodeUtils.getAttribute(this._referencedNode, attr);
            }
            ,

            outerHTML: function(markup) {
                var ret = this._NodeUtils.outerHTML(markup);
                if (ret.length == 0) return null;
                if (ret.length == 1) {
                    return new Node(ret[0]);
                } else {
                    return new NodeList(ret[0]);
                }
            }
            ,

            innerHTML: function(markup, autoEval) {
                myfaces._impl._dom._NodeUtils.innerHTML(this._referencedNode, markup, !!autoEval);
                //we defer until finished, webkit issue that innerhtml often
                //is not finished when the next op is performed
                //a query fixes that
                var ret = this.querySelectorAll("div");
                return ret;
            }
            ,

            getInnerHTML: function() {
                return this._referencedNode.innerHTML;
            }
            ,

//childNodes: function() {

//},

//parentNode: function() {
//    return new Node(this._referencedNode.parentNode);
//},

            sibling: function() {
                return new Node(this._referencedNode.sibling);
            }
            ,

            siblings: function() {
                return new NodeList(this._referencedNode.siblings);
            }
            ,

            isForm: function() {
                return !!document.forms[this._id];
            }
            ,

            runScripts: function() {
                this._NODE_UTILS.runScripts(this._referencedNode);
                return this;
            }
            ,

            hasClass: function(clazz) {
                return this._NODE_UTILS.hasClass(this._referencedNode, clazz);
            }
            ,

            toggleClass: function(clazz) {
                if (this.hasClass(clazz)) {
                    this.removeClass(clazz);
                } else {
                    this.addClass(clazz);
                }
                return this;
            }
            ,

            addClass: function(clazz) {
                clazz = (this._Lang.isString(clazz)) ? [clazz] : this._Lang.objToArray(clazz);
                this._Lang.arrForEach(clazz, this._Lang.hitch(this, function(item) {
                    this._NODE_UTILS.addClass(this._referencedNode, item);
                }));

                return this;
            }
            ,

            removeClass: function(clazz) {
                clazz = (this._Lang.isString(clazz)) ? [clazz] : this._Lang.objToArray(clazz);
                this._Lang.arrForEach(clazz, this._Lang.hitch(this, function(item) {
                    this._NODE_UTILS.removeClass(this._referencedNode, item);
                }));

                return this;
            }
            ,

            addEventListener: function(evt, listener, useCapture) {
                if (this._referencedNode.addEventListener) {
                    this._referencedNode.addEventListener(evt, listener, useCapture);
                }
                return this;
            }
            ,

            removeEventListener: function(type, listener, useCapture) {
                if (this._referencedNode.removeEventListener) {
                    if (listener) {
                        this._referencedNode.removeEventListener(type, listener, useCapture);
                    } else {
                        this._referencedNode.removeEventListener(type);
                    }
                }
                return this;
            }
            ,

            querySelector: function(query) {
                return myfaces._impl._dom.Node.querySelector(query, this._referencedNode);
            }
            ,
            querySelectorAll: function(query) {
                return myfaces._impl._dom.Node.querySelectorAll(query, this._referencedNode);
            }
            ,

            toDomNode: function() {
                return this._referencedNode;
            }
            ,

//causes an asynchronous delay for a certain period of time
//until we can perform the subsequent operation,
//this is a one time op after which we work again on another function
            delay: function(timeout) {
                return this._NODE_UTILS.getEngine().decorateDelay(this, timeout);
            }
            ,
//causes an asynchronous delay for a certain period of time
//until we can perform the subsequent operation,
//this is a one time op after which we work again on another function
            delayTransition: function(fallbackTimeout) {
                return this._NODE_UTILS.getEngine().decorateDelayTransition(this, fallbackTimeout);
            }
            ,

            alert: function(msg) {
                alert(msg);
                return this;
            }
            ,

            setTransitionDuration: function(time) {
                this.setStyle("transitionDuration", time)
                        .setStyle("mozTransitionDuration", time)
                        .setStyle("webkitTransitionDuration", time);
                return this;
            }
            ,

            insertBefore: function(node) {
                this.detach();
                if (node._referencedNode) {
                    node._referencedNode.insertBefore(this._referencedNode)
                } else {
                    node.insertBefore(this._referencedNode)
                }
                return this;
            }
            ,
            insertAfter: function(node) {
                this.detach();
                if (node._referencedNode) {
                    node._referencedNode.insertAfter(this._referencedNode)
                } else {
                    node.insertAfter(this._referencedNode)
                }
                return this;
            }
            ,
            moveUp: function() {
                var previousSibling = this._referencedNode.previousSibling;
                if (!previousSibling) return this;
                return this.insertBefore(previousSibling);
            }
            ,
            moveDown: function() {
                var nextSibling = this._referencedNode.nextSibling;
                if (!nextSibling) return this;
                return this.insertAfter(nextSibling);
            }
            ,
            /**
             * additionalData = {
             *     _evt_type: String
             *     _evt_channel: String
             *     _evt_bubbles: boolean
             *     _evt_cancellable: boolean
             * }
             * @param event
             * @param additionalData
             */
            dispatchEvent: function(event, /*optional*/ additionalData) {
                additionalData.src = additionalData.src || this;
                event = this._NODE_UTILS.createEvent(event, additionalData);
                this._referencedNode.dispatchEvent(event);
                return this;
            }
            ,

            offset: function() {
                return {x: this._referencedNode.offsetLeft,
                    y: this._referencedNode.offsetTop,
                    h: this._referencedNode.offsetHeight,
                    w: this._referencedNode.offsetWidth};
            }
            ,

            position: function() {
                this._NODE_UTILS.getEngine().getPositition(this._referencedNode);
            }
            ,

            offsetParent: function() {
                return this._referencedNode.offsetParent;
            }
            ,
            exec: function(func) {
                func();
                return this;
            }
            ,

            globalMousePos: function() {
                return {x: this._NODE_UTILS.getEngine().mousePosX, y: this._NODE_UTILS.getEngine().mousePosY};
            }
            ,
            /*global eval the embedded scripts of this node*/
            runScripts: function() {
                this._NODE_UTILS.getEngine().runScripts(this._referencedNode, true);
                return this;
            }
            ,
            /**
             * returns the referenced javascript var for this node
             */
            jsVar: function() {
                return window[this._referencedNode.getAttribute(this.DATA_ATTR_JAVASCRIPT_VAR)];
            }
            ,
            equals: function(node) {
                return this._referencedNode == node.referencedNode;
            }

        },
//static methods
        {
            querySelectorAll: function(query, node) {
                if (!node) {
                    node = document;
                }
                if (node instanceof myfaces._impl._dom.NodeList) {
                    return node.querySelectorAll(query);
                } else if (node instanceof myfaces._impl._dom.Node) {
                    return node.querySelectorAll(query);
                } else {
                    var queryResult = (node.querySelectorAll) ? node.querySelectorAll(query) : myfaces._impl._dom._Query(query, node);
                    return new myfaces._impl._dom.NodeList(queryResult);
                }
            }
            ,

            querySelector: function(query, node) {
                if (!node) {
                    node = document;
                }
                if (node instanceof myfaces._impl._dom.NodeList) {
                    return node.querySelector(query);
                } else if (node instanceof myfaces._impl._dom.Node) {
                    return node.querySelector(query);
                } else {
                    var queryResult = (node.querySelector) ? node.querySelector(query) : myfaces._impl._dom._Query(query, node);
                    queryResult = (queryResult) ? queryResult : null;
                    return ( (queryResult ) ? new myfaces._impl._dom.Node(queryResult) : null);
                }
            }
            ,

            byIdOrName: function(elem) {
                var ret = myfaces._impl._dom._NodeUtils.byIdOrName(elem);
                return (ret) ? new myfaces._impl._dom.Node(ret) : null;
            }
            ,

            window: function() {
                return myfaces._impl._dom.Node.querySelector("window");
            }
            ,
            document: function() {
                return myfaces._impl._dom.Node.querySelector("document");
            }
            ,
            body: function() {
                return myfaces._impl._dom.Node.querySelector("body");
            }
            ,
            head: function() {
                return myfaces._impl._dom.Node.querySelector("head");
            }
            ,
            requestAnimFrame: function(func) {
                var animFunc = (window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.oRequestAnimationFrame ||
                        window.msRequestAnimationFrame ||
                        function(/* function */ callback, /* DOMElement */ element) {
                            window.setTimeout(callback, 1000 / 60);
                        });
                animFunc(func);
            }
        }
)
        ;




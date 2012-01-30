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
 * NodeList implementation which implements
 * the same methods if possible as Node
 * but for an entire nodelist
 *
 * @namespace myfaces._impl._dom.NodeList
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl._dom.NodeList", Object, {
    _Lang:myfaces._impl._util._Lang,
    _NODE_UTILS:myfaces._impl._dom._NodeUtils,

    _nodes:null, /*array of nodes to process*/


    constructor_:function (nodes) {
        this._nodes = [];

        if (nodes.length) {
            for (var cnt = 0; cnt < nodes.length; cnt++) {
                this._nodes.push(new myfaces._impl._dom.Node(nodes[cnt]));
            }

        }

        Object.defineProperty(this, "id", {
            get:function () {
                return this._stdOp3("id");
            },
            readOnly:true
        });

        //TODO childnodes
        //checked
        //value

        Object.defineProperty(this, "javascriptVar", {
            get:function () {
                return this._stdOp3("javascriptVar");
            },
            readOnly:true
        });

        Object.defineProperty(this, "length", {
            get:function () {
                return (this._nodes) ? this._nodes.length : 0;
            },
            readOnly:true
        });
        Object.defineProperty(this, "offsetHeight", {
            get:function () {
                var retVal = 0;
                for (var cnt = 0; this._nodes && cnt < this._nodes.length; cnt++) {
                    retVal += this._nodes[cnt].offsetHeight;
                }
                return retVal;
            },
            readOnly:true
        });
        Object.defineProperty(this, "offsetWidth", {
            get:function () {
                var retVal = 0;
                for (var cnt = 0; this._nodes && cnt < this._nodes.length; cnt++) {
                    retVal += this._nodes[cnt].offsetWidth;
                }
                return retVal;
            },
            readOnly:true
        });
        Object.defineProperty(this, "offsetLeft", {
            get:function () {
                var retVal = 0;
                for (var cnt = 0; this._nodes && cnt < this._nodes.length; cnt++) {
                    retVal += this._nodes[cnt].offsetLeft;
                }
            },
            readOnly:true
        });
        Object.defineProperty(this, "offsetTop", {
            get:function () {
                var retVal = 0;
                for (var cnt = 0; this._nodes && cnt < this._nodes.length; cnt++) {
                    retVal += this._nodes[cnt].offsetTop;
                }
                return retVal;
            },
            readOnly:true
        });
        Object.defineProperty(this, "offset", {
            get:function () {
                return this._stdOp3("offset");
            },
            readOnly:true
        });
        Object.defineProperty(this, "absoluteOffsetLeft", {
            get:function () {
                return this._stdOp3("absoluteOffsetLeft");
            },
            readOnly:true
        });

        Object.defineProperty(this, "absoluteOffsetTop", {
            get:function () {
                return this._stdOp3("absoluteOffsetTop");
            },
            readOnly:true
        });

        Object.defineProperty(this, "nodeName", {
            get:function () {
                return this._stdOp3("nodeName");
            },
            readOnly:true
        });
        Object.defineProperty(this, "tagName", {
            get:function () {
                return this._stdOp3("tagName");
            },
            readOnly:true
        });

    },

    concat:function (node) {
        if (!node instanceof myfaces._impl._dom.Node &&
            !node instanceof  myfaces._impl._dom.NodeList) {
            throw Error("Node of wrong type");
        }
        if (node instanceof  myfaces._impl._dom.NodeList) {
            for (var cnt = 0; cnt < node.length; cnt++) {
                this._nodes.push(node.get(cnt));
            }

        } else {
            this._nodes.push(node);

        }

    },

    get:function (index) {
        return this._nodes[index];
    },

    forEach:function (closure) {
        this._Lang.arrForEach(this._nodes, closure);
    },

    filter:function (closure) {
        this._Lang.arrFilter(this._nodes, closure);
    },

    isTag:function (name) {
        for (var cnt = 0; cnt < this._nodes.length; cnt++) {
            if (this._nodes[cnt].isTag(name)) return true;
        }
        return false;
    },

    getId:function () {
        return this._stdOp2("getId");
    },

    getName:function () {
        return this._stdOp2("getName");
    },

    nodeIdOrName:function () {
        return this._stdOp2("nodeIdOrName");
    },

    /*purges the given node and all its subelements from the dom tree*/
    purge:function () {
        return this._stdOp("purge");
    },

    detach:function () {
        return this._stdOp("detach");
    },

    innerHTML:function (markup, autoEval) {
        return this._stdOp("innerHTML", markup, !!autoEval);
    },

    isForm:function () {
        var res = this._stdOp2("isForm");
        for (var cnt = 0; cnt < res.length; cnt++) {
            if (res[cnt]) return true;
        }
        return false;
    },

    getInnerHTML:function () {
        var ret = this._stdOp2("getInnerHTML");
        return ret.join("");
    },

    setAttribute:function (attr, val) {
        return this._stdOp("setAttribute", attr, val);
    },

    getAttribute:function (attr) {
        return this._stdOp2("getAttribute", attr);
    },

    setStyle:function (attr, val) {
        return this._stdOp("setStyle", attr, val);
    },

    style:function (styleMap) {
        return this._stdOp("style", styleMap);
    },
    /**
     * applies a style cross browser in a way
     * that the prefixes are added
     * -webkit
     * -moz
     * -ie
     * -opera
     * @param styleMap
     */
    styleCrossBrowser:function (styleMap) {
        return this._stdOp("style", styleMap);
    },

    removeStyle:function (attr) {
        return this._stdOp("removeStyle", attr);
    },

    addEventListener:function (type, val, useCapture) {
        return this._stdOp("addEventListener", type, val, useCapture);
    },

    removeEventListener:function (type, val, useCapture) {
        return this._stdOp("removeEventListener", type, val, useCapture);
    },

    //now the replacement to all functions we have
    //we simply hook a selector engine in and be done with it
    querySelectorAll:function (query) {
        var res = this._stdOp2("querySelectorAll");
        if (res.length == 0) return null;
        var ret = new myfaces._impl._dom.NodeList();
        for (var cnt = 0; cnt < res.length; cnt++) {
            ret.append(res[cnt]);
        }
        return ret;
    },

    querySelector:function (query) {
        var res = this._stdOp2("querySelector");
        return (res.length) ? new myfaces._impl._dom.NodeList(res) : null;
    },

    runScripts:function () {
        this._stdOp("runScripts");
    },

    hasClass:function (clazz) {
        for (var cnt = 0; cnt < this.length; cnt++) {
            if (this._nodes[cnt].hasClass(clazz)) return true;
        }
        return false;
    },

    toggleClazz:function (clazz) {
        return this._stdOp("toggleClazz", clazz);
    },

    addClass:function (clazz) {
        return this._stdOp("addClass", clazz);
    },

    removeClass:function (clazz) {
        return this._stdOp("removeClass", clazz);
    },

    toDomNode:function () {
        return this._stdOp2("toDomNode");
    },

    delay:function (timeout) {
        return this._NODE_UTILS.getEngine().decorateDelay(this, timeout);
    },

    alert:function (msg) {
        return this._stdOp("alert", msg);
    },

    setTransitionDuration:function (duration) {
        return this._stdOp("setTransitionDuration", duration);
    },

    insertBefore:function (node) {
        return this._stdOp("insertBefore", node);
    },
    insertAfter:function (node) {
        return this._stdOp("insertAfter", node);
    },
    moveUp:function (node) {
        return this._stdOp("moveUp", node);
    },
    moveDown:function (node) {
        return this._stdOp("moveDown", node);
    },

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
    dispatchEvent:function (event, /*optional*/ additionalData) {
        additionalData.src = additionalData.src || this;
        event = this._NODE_UTILS.createEvent(event, additionalData);
        return this._stdOp("dispatchEvent", event);
    },

    offsetParent:function () {
        return this._stdOp2("offsetParent");
    },

    exec:function (func) {
        func();
        return this;
    },

    globalMousePos:function () {
        return {x:this._NODE_UTILS.getEngine().mousePosX, y:this._NODE_UTILS.getEngine().mousePosY};
    },

    runScripts:function () {
        return this._stdOp("runScripts");
    },

    /*
     * helpers to reduce the locs, by defining the
     * functionality of most operations as generic methods
     *
     * @param functionCall
     */
    _stdOp:function (functionCall /*vararg arguments*/) {

        var args = (arguments.length > 1) ? this._Lang.objToArray(arguments).slice(1) : [];
        var closure = function (node) {
            node[functionCall].apply(node, args);
        };
        this.forEach(closure);
        return this;
    },


    _stdOp2:function (functionCall /*vararg arguments*/) {
        var ret = [];
        var args = (arguments.length > 1) ? this._Lang.objToArray(arguments).slice(1) : [];
        var closure = function (node) {
            ret.push(node[functionCall].apply(node, args));
        };
        this.forEach(closure);
        return ret;
    },

    _stdOp3:function (property) {
        var ret = [];
        var closure = function (node) {
            ret.push(node[property]);
        };
        this.forEach(closure);
        return ret;
    }

});

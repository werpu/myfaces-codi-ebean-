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
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl._dom.NodeList", Object, {
    _Lang: myfaces._impl._util._Lang,

    _nodes: null, /*array of nodes to process*/
    length: null,
    constructor_: function(nodes) {
        this._nodes = [];
        if (nodes.length) {
            for (var cnt = 0; cnt < nodes.length; cnt++) {
                this._nodes.push(new myfaces._impl._dom.Node(nodes[cnt]));
            }
            this.length = this._nodes.length;
        } else {
            this._nodes.push(new myfaces._impl._dom.Node(nodes));
        }
    },

    concat: function(node) {
        if (!node instanceof myfaces._impl._dom.Node &&
                ! node instanceof  myfaces._impl._dom.NodeList) {
            throw Error("Node of wrong type");
        }
        if (node instanceof  myfaces._impl._dom.NodeList) {
            for (var cnt = 0; cnt < node.getLength(); cnt++) {
                this._nodes.push(node.get(cnt));
            }
            this.length = this._nodes.length;

        } else {
            this._nodes.push(node);
            this.length = this._nodes.length;
        }

    },

    get: function(index) {
        return this._nodes[index];
    },

    forEach: function(closure) {
        this._Lang.arrForEach(this._nodes, closure);
    },

    filter: function(closure) {
        this._Lang.arrFilter(this._nodes, closure);
    },

    isTag: function(name) {
        for (var cnt = 0; cnt < this._nodes.length; cnt++) {
            if (this._nodes[cnt].isTag(name)) return true;
        }
        return false;
    },

    getId: function() {
        var ret = [];
        var closure = function(node) {
            ret.push(node.getId());
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return ret;
    },

    getName: function() {
        var ret = [];
        var closure = function(node) {
            ret.push(node.getName());
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return ret;
    },

    nodeIdOrName: function() {
        var ret = [];
        var closure = function(node) {
            ret.push(node.nodeIdOrName());
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return ret;
    },

    /*purges the given node and all its subelements from the dom tree*/
    purge: function() {
        var ret = [];
        var closure = function(node) {
            node.purge();
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
    },

    detach: function(items) {
        var ret = [];
        var closure = function(node) {
            node.detach();
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
    },

    innerHTML: function(markup) {
        var ret = [];
        var closure = function(node) {
            node.innerHTML(markup);
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
    },

    getInnerHTML: function() {
        var ret = [];
        var closure = function(node) {
            ret.push(node.getInnerHTML());
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return ret.join("");
    },

    setAttribute: function(attr, val) {
        var closure = function(node) {
            node.setAttribute(attr, val);
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return this;
    },

    setStyle: function(attr, val) {
        var closure = function(node) {
            node.setStyle(attr, val);
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return this;
    },

    addEventListener: function(type, val, useCapture) {
        var closure = function(node) {
            node.addEventListener(type, val, useCapture);
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return this;
    },

    removeEventListener: function(type, val, useCapture) {
        var closure = function(node) {
            node.removeEventListener(type, val, useCapture);
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return this;
    },

    //now the replacement to all functions we have
    //we simply hook a selector engine in and be done with it
    querySelectorAll: function(query) {
        var ret = new NodeList();
        var closure = function(elem) {
            var res = elem.querySelectorAll(elem);
            if (res) {
                ret.concat(res);
            }
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return (ret.length) ? ret : null;
    },

    querySelector: function(query) {
        var ret = new NodeList();
        var closure = function(elem) {
            var res = elem.querySelector(elem);
            if (res) {
                ret.concat(res);
            }
        }
        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return (ret.length) ? ret : null;
    },

    runScripts: function() {
        this.forEach(function(node) {
            node.runScripts();
        });
    },

    addClass: function(clazz) {
        this.forEach(function(node) {
            node.addClass(clazz);
        });
    },

    removeClass: function(clazz) {
        this.forEach(function(node) {
            node.removeClass(clazz);
        });
    },

    toDomNode: function() {
        var ret = [];

        function closure(elem) {
            ret.push(elem.toDomNode());
        }

        try {
            this.forEach(closure);
        } finally {
            delete closure;
        }
        return ret;
    },

    delay: function(delayTime) {
         return this._NODE_UTILS.getEngine().decorateDelay(this, timeout);
    },

    alert: function(msg) {
        alert(msg);
        return this;
    }

});

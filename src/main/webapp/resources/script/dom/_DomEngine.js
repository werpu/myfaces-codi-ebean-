/**
 * Dom Engines with browser dependend low level dom operations.
 * Note, this class is only to be used as internal class
 * for the public api reference the selector api
 * and the included node and nodeutils classes
 */
myfaces._impl.core._Runtime.extendClass("myfaces._impl._dom._DomEngine", Object, {

            /*table elements which are used in various parts */
            TABLE_ELEMS:  {
                "thead": true,
                "tbody": true,
                "tr": true,
                "th": true,
                "td": true,
                "tfoot" : true
            },

            _Lang:  myfaces._impl._util._Lang,
            _RT:    myfaces._impl.core._Runtime,
            _dummyPlaceHolder:null,


            /**
             * Run through the given Html item and execute the inline scripts
             * (IE doesn't do this by itself)
             * @param {|Node|} item
             */
            runScripts: function(item, xmlData) {
                var finalScripts = [];
                var execScrpt = this._Lang.hitch(this, function(item) {
                    if (item.tagName && this._Lang.equalsIgnoreCase(item.tagName, "script")) {
                        var src = item.getAttribute('src');
                        if ('undefined' != typeof src
                                && null != src
                                && src.length > 0
                                ) {
                            //we have to move this into an inner if because chrome otherwise chokes
                            //due to changing the and order instead of relying on left to right
                            if ((src.indexOf("ln=scripts") == -1 && src.indexOf("ln=javax.faces") == -1) || (src.indexOf("/jsf.js") == -1
                                    && src.indexOf("/jsf-uncompressed.js") == -1))
                                if (finalScripts.length) {
                                    //script source means we have to eval the existing
                                    //scripts before running the include
                                    this._RT.globalEval(finalScripts.join("\n"));

                                    finalScripts = [];
                                }
                            this._RT.loadScriptEval(src, item.getAttribute('type'), false, "UTF-8", false);
                            //TODO handle embedded scripts
                        } else {
                            // embedded script auto eval
                            var test = (!xmlData) ? item.text : this._Lang.serializeChilds(item);
                            var go = true;
                            while (go) {
                                go = false;
                                if (test.substring(0, 1) == " ") {
                                    test = test.substring(1);
                                    go = true;
                                }
                                if (test.substring(0, 4) == "<!--") {
                                    test = test.substring(4);
                                    go = true;
                                }
                                if (test.substring(0, 11) == "//<![CDATA[") {
                                    test = test.substring(11);
                                    go = true;
                                }
                            }
                            // we have to run the script under a global context
                            //we store the script for less calls to eval
                            finalScripts.push(test);

                        }
                    }
                });
                try {
                    var scriptElements = myfaces._impl._dom.Node.querySelectorAll("script", item);
                    if (scriptElements == null) return;
                    for (var cnt = 0; cnt < scriptElements.length; cnt++) {
                        execScrpt(scriptElements.get(cnt).toDomNode());
                    }
                    if (finalScripts.length) {
                        this._RT.globalEval(finalScripts.join("\n"));
                    }
                } finally {
                    //the usual ie6 fix code
                    //the IE6 garbage collector is broken
                    //nulling closures helps somewhat to reduce
                    //mem leaks, which are impossible to avoid
                    //at this browser
                    execScrpt = null;
                }
            },


            getDummyPlaceHolder: function(markup) {
                var created = false;
                if (!this._dummyPlaceHolder) {
                    this._dummyPlaceHolder = document.createElement("div");
                    created = true;
                }

                //ieMobile in its 6.1-- incarnation cannot handle innerHTML detached objects so we have
                //to attach the dummy placeholder, we try to avoid it for
                //better browsers so that we do not have unecessary dom operations
                if (this._RT.browser.isIEMobile && created) {
                    this.insertFirst(this._dummyPlaceHolder);

                    this.setAttribute(this._dummyPlaceHolder, "style", "display: none");

                }

                return this._dummyPlaceHolder;
            },

            /**
             * builds up a correct dom subtree
             * if the markup is part of table nodes
             * The usecase for this is to allow subtable rendering
             * like single rows thead or tbody
             *
             * @param item
             * @param markup
             */
            _buildTableNodes: function(item, markup) {
                var evalNodes;
                var itemNodeName = (item.nodeName || item.tagName).toLowerCase();
                var probe = this.getDummyPlaceHolder(); //document.createElement("div");
                if (itemNodeName == "td") {
                    probe.innerHTML = "<table><tbody><tr><td></td></tr></tbody></table>";
                } else {
                    probe.innerHTML = "<table><" + itemNodeName + "></" + itemNodeName + ">" + "</table>";
                }
                var depth = this._determineDepth(probe);

                this._removeChildNodes(probe, false);
                probe.innerHTML = "";

                var dummyPlaceHolder = this.getDummyPlaceHolder();//document.createElement("div");
                if (itemNodeName == "td") {
                    dummyPlaceHolder.innerHTML = "<table><tbody><tr>" + markup + "</tr></tbody></table>";
                } else {
                    dummyPlaceHolder.innerHTML = "<table>" + markup + "</table>";
                }
                evalNodes = dummyPlaceHolder;
                for (var cnt = 0; cnt < depth; cnt++) {
                    evalNodes = evalNodes.childNodes[0];
                }
                evalNodes = (evalNodes.parentNode) ? evalNodes.parentNode.childNodes : null;
                return this.detach(evalNodes);
            },

            detach: function(items) {
                var ret = [];
                if ('undefined' != typeof items.nodeType) {
                    if (items.parentNode) {
                        ret.push(items.parentNode.removeChild(items));
                    } else {
                        ret.push(items);
                    }
                    return ret;
                }

                items = this._Lang.objToArray(items);
                for (var cnt = 0; cnt < items.length; cnt++) {
                    ret.push(items[cnt].parentNode.removeChild(items[cnt]));
                }
                return ret;
            },

            _determineDepth: function(probe) {
                var depth = 0;
                var newProbe = probe;
                for (; newProbe &&
                               newProbe.childNodes &&
                               newProbe.childNodes.length &&
                               newProbe.nodeType == 1; depth++) {
                    newProbe = newProbe.childNodes[0];
                }
                return depth;
            },

            _isTable: function(item) {
                var itemNodeName = (item.nodeName || item.tagName).toLowerCase();
                return itemNodeName == "table";
            },

            /**
             * checks if the provided element is a subelement of a table element
             * @param itemNodeName
             */
            _isTableElement: function(item) {
                var itemNodeName = (item.nodeName || item.tagName).toLowerCase();
                return !!this.TABLE_ELEMS[itemNodeName];
            },

            /**
             * replaces an element with another element or a set of elements
             *
             * @param item the item to be replaced
             *
             * @param evalNodes the elements
             */
            replaceElements: function (item, evalNodes) {
                var evalNodesDefined = evalNodes && 'undefined' != typeof evalNodes.length;
                if (!evalNodesDefined) {
                    throw new Error(this._Lang.getMessage("ERR_REPLACE_EL"));
                }

                var parentNode = item.parentNode;

                var sibling = item.nextSibling;
                var resultArr = this._Lang.objToArray(evalNodes);

                for (var cnt = 0; cnt < resultArr.length; cnt++) {
                    if (cnt == 0) {
                        this.replaceElement(item, resultArr[cnt]);
                    } else {
                        if (sibling) {
                            parentNode.insertBefore(resultArr[cnt], sibling);
                        } else {
                            parentNode.appendChild(resultArr[cnt]);

                        }
                    }
                }

                return resultArr;
            },

            /**
             * builds up a correct dom subtree
             * if the markup is part of table nodes
             * The usecase for this is to allow subtable rendering
             * like single rows thead or tbody
             *
             * @param item
             * @param markup
             */
            _buildTableNodes: function(item, markup) {
                var evalNodes;
                var itemNodeName = (item.nodeName || item.tagName).toLowerCase();
                var probe = this.getDummyPlaceHolder(); //document.createElement("div");
                if (itemNodeName == "td") {
                    probe.innerHTML = "<table><tbody><tr><td></td></tr></tbody></table>";
                } else {
                    probe.innerHTML = "<table><" + itemNodeName + "></" + itemNodeName + ">" + "</table>";
                }
                var depth = this._determineDepth(probe);

                this._removeChildNodes(probe, false);
                probe.innerHTML = "";

                var dummyPlaceHolder = this.getDummyPlaceHolder();//document.createElement("div");
                if (itemNodeName == "td") {
                    dummyPlaceHolder.innerHTML = "<table><tbody><tr>" + markup + "</tr></tbody></table>";
                } else {
                    dummyPlaceHolder.innerHTML = "<table>" + markup + "</table>";
                }
                evalNodes = dummyPlaceHolder;
                for (var cnt = 0; cnt < depth; cnt++) {
                    evalNodes = evalNodes.childNodes[0];
                }
                evalNodes = (evalNodes.parentNode) ? evalNodes.parentNode.childNodes : null;
                return this.detach(evalNodes);
            },

            insertFirst: function(newNode) {
                var body = document.body;
                if (body.childNodes.length > 0) {
                    body.insertBefore(newNode, body.firstChild);
                } else {
                    body.appendChild(newNode);
                }
            },

            isManualScriptEval: function() {

                if (!this._Lang.exists(myfaces, "config._autoeval")) {
                    var _Browser = this._RT.browser;
                    //now we rely on the document being processed if called for the first time
                    var evalDiv = document.createElement("div");
                    this._Lang.reserveNamespace("myfaces.config._autoeval");
                    //null not swallowed
                    myfaces.config._autoeval = false;

                    var markup = "<script type='text/javascript'> myfaces.config._autoeval = true; </script>";
                    //now we rely on the same replacement mechanisms as outerhtml because
                    //some browsers have different behavior of embedded scripts in the contextualfragment
                    //or innerhtml case (opera for instance), this way we make sure the
                    //eval detection is covered correctly
                    this.setAttribute(evalDiv, "style", "display:none");

                    //it is less critical in some browsers (old ie versions)
                    //to append as first element than as last
                    //it should not make any difference layoutwise since we are on display none anyway.
                    this.insertFirst(evalDiv);

                    //we remap it into a real boolean value
                    this.outerHTML(evalDiv, markup);
                }

                return  !myfaces.config._autoeval;
            },


            //causes an asynchronous delay for a certain period of time
            //until we can perform the subsequent operation,
            //this is a one time op after which we work again on another function
            decorateDelay: function(target, timeout) {
                //TODO enable a delayed execution
                //first we generate the delegation map
                var _Lang = myfaces._impl._util._Lang;
                var delegationMap = {};

                for (var key in target) (function(orig, key, delFn, delegationMap) {
                    if (!key || typeof delFn != "function") {
                        return;
                    }

                    delegationMap[key] = function() {
                        //note the this here will be remapped by our decoration function
                        //as well as _callDelegate(methodName, args)  will be provided
                        //in case of an ongoing delay we have to push all subsequent operations onto a call stack
                        this._mutex = this._mutex || false;
                        this._callStack = this._callStack || [];

                        if (this._mutex) {
                            this._callStack.push({key: key, args: _Lang.objToArray(arguments)});
                            return this;
                        }
                        var args = arguments;
                        this._mutex = true;

                        setTimeout(_Lang.hitch(this, function () {
                            var newArgs = [];

                            try {
                                newArgs.push(key);
                                newArgs = newArgs.concat(_Lang.objToArray(args));

                                // all subsequent operations are again performed on the original object
                                return this._callDelegate.apply(this, newArgs);
                            } finally {
                                try {
                                    //now we resolve the call stack as javascript would do it on its own
                                    if (this._callStack.length) {
                                        var scope = this;
                                        for (var cnt = 0; cnt < this._callStack.length; cnt++) {
                                            var parms = [];
                                            parms.push(this._callStack[cnt].key);
                                            parms = (scope._callDelegate) ? parms.concat(this._callStack[cnt].args) : parms;
                                            scope = (scope._callDelegate) ? scope._callDelegate.apply(scope, parms) : scope[key].apply(scope, parms);
                                        }
                                    }
                                } finally {
                                    delete this._callStack;
                                    delete this._mutex;
                                }
                            }
                        }), timeout);

                        return this;
                    };
                })(target, key, target[key], delegationMap);
                delete delegationMap["constructor_"];
                delete delegationMap["constructor"];
                var clz = myfaces._impl.core._Runtime.delegateObj("myfaces._impl._dom._DomEngine._tmp", target, delegationMap);
                myfaces._impl._dom._DomEngine._tmp = null;
                return new clz();
            }

        });


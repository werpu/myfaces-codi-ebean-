myfaces._impl.core._Runtime.singletonExtendClass("myfaces._impl._dom._DomEngineNonCompliant", myfaces._impl._dom._DomEngine, {
            mousePosX: -1, /*position X dynamically set*/
            mousePosY: -1, /*position Y dynamically set*/
            //TODO code the IE mouse position handler


            IE_QUIRKS_EVENTS : {
                "onabort": true,
                "onload":true,
                "onunload":true,
                "onchange": true,
                "onsubmit": true,
                "onreset": true,
                "onselect": true,
                "onblur": true,
                "onfocus": true,
                "onkeydown": true,
                "onkeypress": true,
                "onkeyup": true,
                "onclick": true,
                "ondblclick": true,
                "onmousedown": true,
                "onmousemove": true,
                "onmouseout": true,
                "onmouseover": true,
                "onmouseup": true
            },

            outerHTML: function(item, markup) {
                var evalNodes;
                //table element replacements like thead, tbody etc... have to be treated differently
                if (this._isTableElement(item)) {
                    evalNodes = this._buildTableNodes(item, markup);
                } else {
                    evalNodes = this._buildNodesCompliant(markup);
                }
                var evalNodeLen = evalNodes.length;

                if (evalNodeLen == 1) {
                    var ret = evalNodes[0];
                    item.parentNode.replaceChild(ret, item);
                    return ret;
                } else {
                    return this.replaceElements(item, evalNodes);
                }
            },

            /**
             * bugfixing for ie6 which does not cope properly with setAttribute
             */
            setAttribute : function(node, attr, val) {

                /*
                 Now to the broken browsers IE6+.... ie7 and ie8 quirks mode

                 we deal mainly with three problems here
                 class and for are not handled correctly
                 styles are arrays and cannot be set directly
                 and javascript events cannot be set via setAttribute as well!

                 or in original words of quirksmode.org ... this is a mess!

                 Btw. thank you Microsoft for providing all necessary tools for free
                 for being able to debug this entire mess in the ie rendering engine out
                 (which is the Microsoft ie vms, developers toolbar, Visual Web Developer 2008 express
                 and the ie8 8 developers toolset!)

                 also thank you http://www.quirksmode.org/
                 dojotoolkit.org and   //http://delete.me.uk/2004/09/ieproto.html
                 for additional information on this mess!

                 The lowest common denominator tested within this code
                 is IE6, older browsers for now are legacy!
                 */
                attr = attr.toLowerCase();

                if (attr === "class") {
                    //setAttribute does not work for winmobile browsers
                    //firect calls work
                    node.className = val;
                } else if (attr === "name") {
                    //the ie debugger fails to assign the name via setAttr
                    //in quirks mode
                    node[attr] = val;
                } else if (attr === "for") {
                    if (!_Browser.isIEMobile || _Browser.isIEMobile >= 7) {
                        node.setAttribute("htmlFor", val);
                    } else {
                        node.htmlFor = val;
                    }
                } else if (attr === "style") {
                    //We have to split the styles here and assign them one by one
                    var styles = val.split(";");
                    var stylesLen = styles.length;
                    for (var loop = 0; loop < stylesLen; loop++) {
                        var keyVal = styles[loop].split(":");
                        if (keyVal[0] != "" && keyVal[0] == "opacity") {
                            //special ie quirks handling for opacity

                            var opacityVal = Math.max(100, Math.round(parseFloat(keyVal[1]) * 10));
                            //probably does not work in ie mobile anyway
                            if (!_Browser.isIEMobile || _Browser.isIEMobile >= 7) {
                                node.style.setAttribute("arrFilter", "alpha(opacity=" + opacityVal + ")");
                            }
                            //if you need more hacks I would recommend
                            //to use the class attribute and conditional ie includes!
                        } else if (keyVal[0] != "") {
                            if (!_Browser.isIEMobile || _Browser.isIEMobile >= 7) {
                                node.style.setAttribute(keyVal[0], keyVal[1]);
                            } else {
                                node.style[keyVal[0]] = keyVal[1];
                            }
                        }
                    }
                } else {
                    //check if the attribute is an event, since this applies only
                    //to quirks mode of ie anyway we can live with the standard html4/xhtml
                    //ie supported events
                    if (this.IE_QUIRKS_EVENTS[attr]) {
                        if (this._Lang.isString(attr)) {
                            //event resolves to window.event in ie
                            node.setAttribute(attr, function() {
                                //event implicitly used
                                return this._Lang.globalEval(val);
                            });
                        }
                    } else {
                        //unknown cases we try to catch them via standard setAttributes
                        if (!_Browser.isIEMobile || _Browser.isIEMobile >= 7) {
                            node.setAttribute(attr, val);
                        } else {
                            node[attr] = val;
                        }
                    }
                }
            },


            /**
             * cross ported from dojo
             * fetches an attribute from a node
             *
             * @param {String} node the node
             * @param {String} attr the attribute
             * @return the attributes value or null
             */
            getAttribute : function(/* HTMLElement */node, /* string */attr) {
                //	summary
                //	Returns the value of attribute attr from node.
                node = this.byId(node);
                // FIXME: need to add support for attr-specific accessors
                if ((!node) || (!node.getAttribute)) {
                    // if(attr !== 'nwType'){
                    //	alert("getAttr of '" + attr + "' with bad node");
                    // }
                    return null;
                }
                var ta = typeof attr == 'string' ? attr : new String(attr);

                // first try the approach most likely to succeed
                var v = node.getAttribute(ta.toUpperCase());
                if ((v) && (typeof v == 'string') && (v != "")) {
                    return v;	//	string
                }

                // try returning the attributes value, if we couldn't get it as a string
                if (v && v.value) {
                    return v.value;	//	string
                }

                // this should work on Opera 7, but it's a little on the crashy side
                if ((node.getAttributeNode) && (node.getAttributeNode(ta))) {
                    return (node.getAttributeNode(ta)).value;	//	string
                } else if (node.getAttribute(ta)) {
                    return node.getAttribute(ta);	//	string
                } else if (node.getAttribute(ta.toLowerCase())) {
                    return node.getAttribute(ta.toLowerCase());	//	string
                }
                return null;	//	string
            },

            /**
             * for performance reasons we work with replaceElement and replaceElements here
             * after measuring performance it has shown that passing down an array instead
             * of a single node makes replaceElement twice as slow, however
             * a single node case is the 95% case
             *
             * @param item
             * @param evalNodes
             */
            replaceElement: function(item, evalNode) {
                item.parentNode.insertBefore(evalNode, item);
                this._removeNode(item, false);
            },

            //now to another nasty issue:
            //for ie we have to walk recursively over all nodes:
            //http://msdn.microsoft.com/en-us/library/bb250448%28VS.85%29.aspx
            //http://weblogs.java.net/blog/driscoll/archive/2009/11/13/ie-memory-management-and-you
            //http://home.orange.nl/jsrosman/
            //http://www.quirksmode.org/blog/archives/2005/10/memory_leaks_li.html
            //http://www.josh-davis.org/node/7
            _removeNode: function(node, breakEventsOpen) {
                if (!node) return;
                var b = this._RT.browser;

                //now to the browsers with non working garbage collection
                this._removeChildNodes(node, breakEventsOpen);

                try {
                    //outer HTML setting is only possible in earlier IE versions all modern browsers throw an exception here
                    //again to speed things up we precheck first
                    if (!this._isTableElement(childNode)) {
                        //we do not do a table structure innnerhtml on table elements except td
                        //htmlunit rightfully complains that we should not do it
                        node.innerHTML = "";
                    }
                    if (b.isIE && 'undefined' != typeof node.outerHTML) {//ie8+ check done earlier we skip it here
                        node.outerHTML = '';
                    } else {
                        node = this.detach(node)[0];
                    }
                    if (!b.isIEMobile) {
                        delete node;
                    }
                } catch (e) {
                    //on some elements we might not have covered by our table check on the outerHTML
                    // can fail we skip those in favor of stability
                    try {
                        // both innerHTML and outerHTML fails when <tr> is the node, but in that case
                        // we need to force node removal, otherwise it will be on the tree (IE 7 IE 6)
                        this.detach(node);
                    } catch (e1) {
                    }
                }
            }
            ,

            /**
             * recursive delete child nodes
             * node, this method only makes sense in the context of IE6 + 7 hence
             * it is not exposed to the public API, modern browsers
             * can garbage collect the nodes just fine by doing the standard removeNode method
             * from the dom API!
             *
             * @param node  the node from which the childnodes have to be deletd
             * @param breakEventsOpen if set to true a standard events breaking is performed
             */
            _removeChildNodes: function(node, breakEventsOpen) {
                if (!node) return;

                //node types which cannot be cleared up by normal means
                var disallowedNodes = this.TABLE_ELEMS;

                //for now we do not enable it due to speed reasons
                //normally the framework has to do some event detection
                //which we cannot do yet, I will dig for options
                //to enable it in a speedly manner
                //ie7 fixes this area anyway
                //this.breakEvents(node);

                var b = this._RT.browser;
                if (breakEventsOpen) {
                    this.breakEvents(node);
                }

                for (var cnt = node.childNodes.length - 1; cnt >= 0; cnt -= 1) {
                    var childNode = node.childNodes[cnt];
                    //we cannot use our generic recursive tree walking due to the needed head recursion
                    //to clean it up bottom up, the tail recursion we were using in the search either would use more time
                    //because we had to walk and then clean bottom up, so we are going for a direct head recusion here
                    if ('undefined' != typeof childNode.childNodes && node.childNodes.length)
                        this._removeChildNodes(childNode);
                    try {
                        var nodeName = (childNode.nodeName || childNode.tagName) ? (childNode.nodeName || childNode.tagName).toLowerCase() : null;
                        //ie chokes on clearing out table inner elements, this is also covered by our empty
                        //catch block, but to speed things up it makes more sense to precheck that
                        if (!disallowedNodes[nodeName]) {
                            //outer HTML setting is only possible in earlier IE versions all modern browsers throw an exception here
                            //again to speed things up we precheck first
                            if (!this._isTableElement(childNode)) {    //table elements cannot be deleted
                                childNode.innerHTML = "";
                            }
                            if (b.isIE && b.isIE < 8 && 'undefined' != childNode.outerHTML)
                                childNode.outerHTML = '';
                            else {
                                node.removeChild(childNode);
                            }
                            if (!b.isIEMobile) {
                                delete childNode;
                            }
                        }
                    } catch (e) {
                        //on some elements the outerHTML can fail we skip those in favor
                        //of stability

                    }
                }
            }
            ,

            /**
             * break the standard events from an existing dom node
             * (note this method is not yet used, but can be used
             * by framework authors to get rid of ie circular event references)
             *
             * another way probably would be to check all attributes of a node
             * for a function and if one is present break it by nulling it
             * I have to do some further investigation on this.
             *
             * The final fix is to move away from ie6 at all which is the root cause of
             * this.
             *
             * @param node the node which has to be broken off its events
             */
            breakEvents: function(node) {
                if (!node) return;
                var evtArr = this.IE_QUIRKS_EVENTS;
                for (var key in evtArr) {
                    if (key != "onunload" && node[key]) {
                        node[key] = null;
                    }
                }
            },

            innerHTML: function(node, markup) {
                if (!node) return;
                this._removeChildNodes(node);
                node.innerHTML = markup;
            },

            createEvent: function(event, /*optional*/ additionalData) {
                throw Exception("not supported yet");
            },

            getTransitionEndEvent: function() {
                return false;
            },
            getPositition: function(obj) {
                var orig = obj;
                var left = 0;
                var top = 0;

                if (obj.offsetParent) {
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                    while (obj = obj.offsetParent) {
                        left += (obj.offsetLeft - obj.scrollLeft + obj.clientLeft);
                        top += (obj.offsetTop - obj.scrollTop + obj.clientTop);
                    }
                }
                return {x:left, y:top, w: orig.offsetWidth, h: orig.offsetHeight};
            }

        });
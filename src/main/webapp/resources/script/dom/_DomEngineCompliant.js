myfaces._impl.core._Runtime.singletonExtendClass("myfaces._impl._dom._DomEngineCompliant", myfaces._impl._dom._DomEngine, {
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

            setAttribute : function(node, attr, val) {
                node.setAttribute(attr, val);
            },

            getAttribute : function(node, attr) {
                return node.getAttribute(attr);
            },


            _removeNode: function(elem, breakEventsOpen) {
                this.detach(elem);
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
                item.parentNode.replaceChild(evalNode, item);
            },




            /**
             * non ie browsers do not have problems with embedded scripts or any other construct
             * we simply can use an innerHTML in a placeholder
             *
             * @param markup the markup to be used
             */
            _buildNodesCompliant: function(markup) {
                var dummyPlaceHolder = this.getDummyPlaceHolder(); //document.createElement("div");
                dummyPlaceHolder.innerHTML = markup;
                return this._Lang.objToArray(dummyPlaceHolder.childNodes);
            },


            _removeNode: function(node, breakEventsOpen) {
                if (!node) return;
                if ('undefined' != typeof node.parentNode && null != node.parentNode) //if the node has a parent
                    node.parentNode.removeChild(node);
            },

            innerHTML: function(node, markup) {
                if (!node) return;
                node.innerHTML = markup;
            },

            //TODO this code is html5 centric we probable have to shift it over
            //To the dom engine
            createEvent: function(event, /*optional*/ additionalData) {
                if (this._Lang.isString(event)) {
                    var evtType = event;
                    event = document.createEvent(additionalData._evt_type || "Event");
                    var bubbles = additionalData["_evt_bubbles"] || false;
                    var cancellable = additionalData["_evt_cancellable"] || true;

                    event.additionalData = additionalData;
                    event.initEvent(evtType, bubbles, cancellable);
                }
                return event;
            },

            //from https://gist.github.com/702826
            getTransitionEndEvent: function() {
                if ('ontransitionend' in window) {
                    // Firefox
                    transition = 'transitionend';
                } else if ('onwebkittransitionend' in window) {
                    // Chrome/Saf (+ Mobile Saf)/Android
                    transition = 'webkitTransitionEnd';
                } else if ('onotransitionend' in document.querySelector("div") || navigator.appName == 'Opera') {
                    // Opera
                    // As of Opera 10.61, there is no "onotransitionend" property added to DOM elements,
                    // so it will always use the navigator.appName fallback
                    transition = 'oTransitionEnd';
                }else if(this._RT.browser.isFF > 3.9){
                    //mozilla does not have ontransitionend anymore after 4.0
                    transition = 'transitionend';
                } else {
                    // IE - not implemented (even in IE9) :(
                    transition = false;
                }
                return transition;
            }


        });
